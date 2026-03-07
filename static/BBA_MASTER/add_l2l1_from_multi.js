'use strict';

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// --- Global Settings ---
const skipUe = true;
const onlyMsgList = false;

const args = process.argv.slice( 2 );

if( args.length < 2 ) {
    printUsage();
    return;
}

const dir = args[0];
const dirIf = dir + '/if/';

const version = args[1];

let genMulti = true;
for( let i = 2; i < args.length; ++i ) {
    switch( args[i] ) {
        case '--js-only': genMulti = false; break;
    }
}

let multiStrings = [];
try{
    multiStrings =  genMulti ?
        generateMulti(dir, dirIf, version) :
        fs.readFileSync( `./multi/${ version }`, { encoding: 'utf8', flag: 'r' } ).split(/\r?\n/);
} catch(e) {
    console.log(e.message);
    return;
}

!onlyMsgList && console.log( '--- Generate JS script based on multi' );

// A hack to handle 22R3 files. There is a line where the only separator is a colon (no space)
for (let i = 0; i < multiStrings.length; i += 1)
    multiStrings[i] = multiStrings[i].replace(/([a-z]:)([a-z])/g,'$1 $2')

const commonTypesFunc = {
    'boolean': 'l2l1_getU8',
    'uint8': 'l2l1_getU8',
    'uint16': 'l2l1_getU16',
    'uint32': 'l2l1_getU32',
    'uint64': 'l2l1_getU64',
    'int8': 'l2l1_getI8',
    'int16': 'l2l1_getI16',
    'int32': 'l2l1_getI32',
    'int64': 'l2l1_getI64',
    'float32': 'l2l1_getF32'
};

let consts = {};
let types = {
    'boolean': 'boolean',
    'uint8': 'uint8',
    'uint16': 'uint16',
    'uint32': 'uint32',
    'uint64': 'uint64',
    'int8': 'int8',
    'int16': 'int16',
    'int32': 'int32',
    'int64': 'int64',
    'float32': 'float32'
};
let typesSize = {
    'boolean': 1,
    'uint8': 1,
    'uint16': 2,
    'uint32': 4,
    'uint64': 8,
    'int8': 1,
    'int16': 2,
    'int32': 4,
    'int64': 8,
    'float32': 4
};
let typesAlign = {
    'boolean': 1,
    'uint8': 1,
    'uint16': 2,
    'uint32': 4,
    'uint64': 8,
    'int8': 1,
    'int16': 2,
    'int32': 4,
    'int64': 8,
    'float32': 4
};
let typesFunc = {};
let structs = {};
let unions = [];
let exts = [];
let versioned = [];
let messages = [];

let namespace = '';
let name, type, value;

// let linesToCheck = [ ...Array( multiStrings.length ).keys() ];

// Prepare
// while( linesToCheck.length ) {
for( let i = 0; i < multiStrings.length; ++i ) {
    // let i = linesToCheck.shift();
    const line = multiStrings[i];
    let lineArgs = line.replace(/\s+/g, ' ').trim().split(' ');

    switch( lineArgs[0] ) {
        case 'const':
            lineArgs = line.replace(/([+\-*/])/g, ' $1 ').replace(/\s+/g, ' ').trim().split(' ');
            name = lineArgs[1].split(':')[0];
            type = lineArgs[2];
            value = 0;
            let op = '+';
            //TODO: The following lines repeat the code in solveParen
            //      I think that this can be refactored, instead of the loop below I would call
            //      [value, rest] = solveParen(lineArgs.slice(4), consts, namespace),
            //      then check if rest is empty.
            //      solveParen can then be renamed to calculateValue.
            for( let i = 4; i < lineArgs.length; ++i ) {
                if( lineArgs[i].startsWith( '#' ) || lineArgs[i].startsWith( '"' ) )
                    break;

                if( '+-*/'.includes( lineArgs[i] ) ) {
                    op = lineArgs[i];
                    continue;
                }

                let num = parseInt( lineArgs[i] );
                if( isNaN( num ) ) {
                    let arg = lineArgs[i];
                    if (arg[0] === '(') {
                        [num, lineArgs] = solveParen(lineArgs.slice(i), consts, namespace)
                    }
                    else {
                        if (!arg.includes(':')) arg = namespace + '::' + arg;
                        if (consts.hasOwnProperty(arg)) {
                            num = consts[arg];
                        } else {
                            // linesToCheck.push( i );
                            // if( linesToCheck.length < 5 )
                            console.log('Err: unknown operand, line: ' + lineArgs + arg);
                        }
                    }
                }

                switch( op ) {
                    case '+': value += num; break;
                    case '-': value -= num; break;
                    case '*': value *= num; break;
                    case '/': value /= num; break;
                    default: console.log( 'Err: wrong operator' ); break;
                }
            }
            name = namespace + '::' + name;
            if( consts.hasOwnProperty( name ) && consts[name] !== value ) {
                console.log( 'Err: const overwriting: ' + name + ', old value: ' + consts[name] + ', new value: ' + value );
                return;
            }
            consts[name] = value;
            break;
        case 'typedef':
            name = namespace + '::' + lineArgs[1].split(':')[0];
            type = lineArgs[2];
            // if( lineArgs.length > 3 && lineArgs[3].startsWith( 'range' ) ) {
            //     let range = line.substring( line.indexOf('[') + 1, line.indexOf(']') ).split(',');
            //     // TODO: calc and save range to later verification
            //     // console.log( range );
            // }

            types[name] = type;
            typesSize[name] = typesSize[type];
            typesAlign[name] = typesAlign[type];
            break;
        case 'enumeration':
            name = namespace + '::' + lineArgs[1];
            let max = 0;
            for( ++i; i < multiStrings.length; ++i ) {
                const lineArgs = multiStrings[i].replace(/\s+/g, ' ').trim().split(' ');
                if( lineArgs[0] === 'end' ) break;
                if( lineArgs.length < 3 || lineArgs[0].startsWith('#') || lineArgs[0].startsWith('"') ) continue;
                let num = parseInt( lineArgs[2] );
                if( isNaN( num ) ) {
                    console.log( 'Enumeration error ' + name + ' ' + lineArgs );
                    return;
                }
                if( num > max ) max = num;
            }
            let size = ( max > 0xFFFFFFFF ) ? 8 : ( ( max > 0xFFFF ) ? 4 : ( ( max > 0xFF ) ? 2 : 1 ) );
            types[name] = 'uint' + ( 8 * size );
            typesSize[name] = size;
            typesAlign[name] = size;
            break;
        case 'namespace':
            namespace = lineArgs[1];
            break;
        case 'structure':
            name = lineArgs[1];
            structs[namespace + '::' + name] = i + 1;
            if(lineArgs[2] === '@versioned'){
                versioned.push(namespace + '::' + name);
            }
            break;
        case 'union':
            name = lineArgs[1];
            structs[namespace + '::' + name] = i + 1;
            unions.push( namespace + '::' + name );
            break;
        case 'extension_point':
            name = lineArgs[1];
            structs[namespace + '::' + name] = i + 1;
            exts.push( namespace + '::' + name );
            break;
        case 'message':
            name = lineArgs[1].split(':')[0];
            type = lineArgs[2];
            if( !type.includes(':') ) {
                type = namespace + '::' + type;
            }
            let id = parseInt( lineArgs[3].split(':')[1] );
            let idHex = id.toString( 16 ).toUpperCase();
            while( idHex.length < 4 ) idHex = '0' + idHex;
            // console.log( name + ' ' + type + ' ' + idHex );
            messages.push( {
                'id': '0x' + idHex,
                'name': name,
                'type': type,
                'namespace': namespace
            });
            break;
    }
}

let structSize = 0;
let structAlign = 4;

let structsToCheck = Object.keys( structs );
// console.log( '--- Calculating structs sizes' );
while( structsToCheck.length ) {
    let structName = structsToCheck.shift();
    structSize = 0;
    structAlign = 4;
    // console.log( structName )
    calcStructSize( structName.split(':')[0], structName );
    if( structSize === -1 ) {
        structsToCheck.push( structName );
    } else {
        typesSize[structName] = structSize;
        typesAlign[structName] = structAlign;
    }
}

messages.sort( function( a, b ) { return parseInt( a.id ) - parseInt( b.id ); } );

// Remove duplicate messages
let lastMsgId = '~';
for( let i = 0; i < messages.length; ) {
    if( messages[i].id === lastMsgId ) {
        messages.splice( i, 1 );
    } else {
        lastMsgId = messages[i++].id;
    }
}

const t1 = '    ';
const t2 = t1 + t1;
const t3 = t2 + t1;
const t4 = t3 + t1;
const t5 = t4 + t1;

let jsStrings = [];
jsStrings.push( "packetPropToStrMap['l2l1.message'] = {" );
jsStrings.push( messages.map( m => t1 + m.id + ": '" + m.namespace + '::' + m.name + "'" ).join(',\n') );
jsStrings.push( '};', '' );

!onlyMsgList && console.log( '  Add next line to l2l1_versions in js/l2l1.js' );
console.log( "'" + version + "': [ " + messages.map( m => m.id ).join(', ') + ' ],' );

jsStrings.push( 'function l2l1_decode_msg( l2l1, pktEnd ) {' );
jsStrings.push( t1 + 'let off1 = 0, off2 = 0, off3 = 0, off4 = 0, off5 = 0, off6 = 0;' );
jsStrings.push( t1 + 'let len1 = 0, len2 = 0, len3 = 0, len4 = 0, len5 = 0, len6 = 0;' );
jsStrings.push( t1 + 'let discriminator1 = 0, discriminator2 = 0, discriminator3 = 0, discriminator4 = 0, discriminator5 = 0, discriminator6 = 0;' );
jsStrings.push( t1 + 'let version_offset1 = 0, version_offset2 = 0, version_offset3 = 0, version_offset4 = 0, version_offset5 = 0, version_offset6 = 0;' );
jsStrings.push( t1 + 'let version_indicator1 = 0, version_indicator2 = 0, version_indicator3 = 0, version_indicator4 = 0, version_indicator5 = 0, version_indicator6 = 0;' );
jsStrings.push( t1 + 'let element_size1 = 0, element_size2 = 0, element_size3 = 0, element_size4 = 0, element_size5 = 0, element_size6 = 0;' );

jsStrings.push( t1 + 'switch( l2l1.message ) {' );

let offStack = [];
let off = 0;
let loopLvl = 0;
let versionLvl = 0;

for( const msg of messages ) {
    jsStrings.push( t2 + 'case ' + msg.id + ': { // ' + msg.namespace + '::' + msg.name );
    off = 0;
    // console.log( 'Parse msg: ' + msg );
    parseStruct( msg.namespace, msg.type, t3, 'l2l1' );
    jsStrings.push( t2 + '}' );
    jsStrings.push( t2 + 'break;' );
}
jsStrings.push( t1 + '}' );
jsStrings.push( '}' );

!onlyMsgList && console.log( '--- Save JS script to ./js/l2l1/' + version + '.js' );
let fileDesc = fs.openSync( 'js/l2l1/' + version + '.js', 'w' );
for( let i = 0; i < jsStrings.length; ++i ) {
    fs.writeSync( fileDesc, jsStrings[i] + '\n' );
}
fs.closeSync( fileDesc );

// console.log( typesSize );
// console.log( typesAlign );
// console.log( structs );
// console.log( consts );

// ------------------- Local Functions -------------------

function generateMulti(dir, dirIf, version){
    !onlyMsgList && console.log( '--- Checkout tags/' + version );
    try {
        execSync( 'git -C ' + dir + ' checkout tags/' + version );
    } catch( e ) {
        throw Error( 'Can\'t checkout tags/' + version + ', if tag is correct then try to update repository by git pull' );
    }

    !onlyMsgList && console.log( '--- Combine multi to one file: ' + version );

    let files = [];
    let fileDependencies = [];
    let files2 = { 'L1MacSec': [], 'l1_common': [], 'lunum_common': [], 'L1': [], 'L1Call': [], 'L1ChannelStreamer': [], 'L1Config': [], 'L1Cpri': [], 'L1ECpri': [], 'L1Fcp': [], 'L1Log': [], 'L1PoolMgmt': [], 'SyncM': [], 'Cell': [], 'LTE_LUNUM_DlData': [], 'LteLunum_DlData': [], 'LteLunum_DlCell': [], 'LteLunum_DlUlCell': [], 'DlCell': [], 'DlData': [], 'UlCell': [], 'UlData': [],'DlDataFH': [], 'UlDataFH': [], 'DlPool': [], 'UlPool': [], 'LteLunum_L1ECpri': [], 'L1Status': [], 'L1SyncSlave': [] };
    let doneFiles = [];

    fs.readdirSync( dirIf, { withFileTypes: true } ).forEach( file => {
        if( file.isFile() && path.extname( file.name ) === '.pg' ) {
            if( !skipUe || !file.name.toLowerCase().includes('ue') ) {
                files.push( file.name );
            }
        }
    });

    while( files.length ) {
        const file = files.shift();
        const filePath = dirIf + file;
        const fileData = fs.readFileSync( filePath, { encoding: 'utf8', flag: 'r' } );
        const fileLines = fileData.split(/\r?\n/);

        let namespace = '';
        fileDependencies[file] = [];

        for( const line of fileLines ) {
            if( line.startsWith('include') ) {
                let includeFile = line.split('"')[1];
                if( !includeFile.includes('/') ) includeFile = path.dirname( file ) + '/' + includeFile;

                if( path.extname( file ) !== '.pt' ) fileDependencies[file].push( includeFile );

                if( !doneFiles.includes( includeFile ) && !files.includes( includeFile ) ) {
                    files.push( includeFile );
                }
            } else if( line.startsWith( 'namespace' ) ) {
                namespace = line.split( ' ' )[1];
            }
        }

        if( files2.hasOwnProperty( namespace ) ) {
            files2[namespace].push( file );
        } else if( namespace !== '' ) {
            throw Error( 'Err: unknown namespace: ' + namespace + '. File: ' + file );
        }

        doneFiles.push( file );
    }

    doneFiles = [];
    const multiStrings = [];
    // console.log( '--- Read all files and add lines to multiStrings' );
    // console.log( fileDependencies );
    for( const namespace in files2 ) {
        files2[namespace].sort();
        files2[namespace].sort( function( a, b ) {
            return ( path.extname( a ) === '.pt' ? 0 : 1 ) - ( path.extname( b ) === '.pt' ? 0 : 1 );
        });
        let isNamespaceDeclared = false;

        while( files2[namespace].length ) {
            let file = files2[namespace].shift();
            let ok = true;
            for( const dep of fileDependencies[file] ) {
                if( !doneFiles.includes( dep ) ) {
                    files2[namespace].push( file );
                    ok = false;
                }
            }
            // console.log( file );
            if( !ok ) continue;
            const fileLines = fs.readFileSync( dirIf + file, { encoding: 'utf8', flag: 'r' } ).split(/\r?\n/);
            for( const line of fileLines ) {
                if( line.startsWith('include') ) continue;
                if( line.startsWith('namespace') ) {
                    if( isNamespaceDeclared ) continue;
                    isNamespaceDeclared = true;
                }
                multiStrings.push( line );
            }
            doneFiles.push( file );
        }
    }

    // Remove double lines and save file
    let fileDesc = fs.openSync( './multi/' + version, 'w' );
    let lastline = '';
    for( let i = 0; i < multiStrings.length; ) {
        const line = multiStrings[i];
        if( lastline === '' && line === '' ) {
            multiStrings.splice( i, 1 );
        } else {
            fs.writeSync( fileDesc, line + '\n' );
            ++i;
        }
        lastline = line;
    }
    fs.closeSync( fileDesc );
    return multiStrings;
}

function findClosing(data) {
    let level = 0
    for (let pos = 0; pos < data.length; pos +=1) {
        if (data[pos] === '(')
            level += 1
        if (data[pos] === ')')
            if (level === 1)
                return pos
            else
                level -= 1
    }
    return -1
}

function solveParen(args, consts, namespace) {
    const data = args.join(' ')
    const closingParenPos = findClosing(data)
    let lineArgs = data.slice(1, closingParenPos).split(' ')
    let rest = data.slice(closingParenPos+1)
    let op = '+'
    let value = 0
    for( let i = 0; i < lineArgs.length; ++i ) {
        if( '+-*/'.includes( lineArgs[i] ) ) {
            op = lineArgs[i];
            continue;
        }
        let num = parseInt( lineArgs[i] );
        if( isNaN( num ) ) {
            let arg = lineArgs[i];
            if (arg[0] === '(') {
                [num, lineArgs] = solveParen(lineArgs.slice(i), consts, namespace)
            }
            else {
                if (!arg.includes(':')) arg = namespace + '::' + arg;
                if (consts.hasOwnProperty(arg)) {
                    num = consts[arg];
                } else {
                    console.log('Err: unknown operand, line: ' + lineArgs + arg);
                }
            }
        }
        switch( op ) {
            case '+': value += num; break;
            case '-': value -= num; break;
            case '*': value *= num; break;
            case '/': value /= num; break;
            default: console.log( 'Err: wrong operator' ); break;
        }
    }
    console.log('Value in parenthesis: ', lineArgs, ' evaluates to :', value, '; rest: ', rest || 'None')
    return [value, rest.split(' ')]
}

function calcAlign( size, align ) {
    return ( size % align !== 0 ) ? align - ( size % align ) : 0;
}

function calcStructSize( namespace, struct ) {
    // console.log( '--- ' + struct );
    const isUnion = unions.includes( struct );
    const isExt = exts.includes( struct );
    const isVersioned = versioned.includes(struct);
    if(isVersioned){
        // structSize += calcAlign(structSize, 4) + 8;
    }
    for( let i = structs[struct]; i < multiStrings.length; ++i ) {
        const lineArgs = multiStrings[i].replace(/\s+/g, ' ').trim().split(' ');
        if( lineArgs[0] === 'end' ) break;
        if( lineArgs[0] === '' || lineArgs[0].startsWith('#') || lineArgs[0] === 'const' ) continue;

        if( !lineArgs[0].includes(':') ) lineArgs.splice( 1, 1 );
        let type = lineArgs[1];
        if( type === 'mib' || type === 'BCCH_BCH_Message' ) {
            type = 'uint8[4]';
            lineArgs.push( '{no_length_field}' );
        }
        if (isExt) {
            type = 'uint32[2]';
            lineArgs.push( '{no_length_field}' );
        }
        let isArray = type.includes('[');
        let arrLen = 0;

        if( isArray ) {
            arrLen = type.split('[')[1].split(']')[0];
            if( consts.hasOwnProperty( arrLen ) ) arrLen = consts[arrLen];
            else if( consts.hasOwnProperty( namespace + '::' + arrLen ) ) arrLen = consts[namespace + '::' + arrLen];
            if( isNaN( parseInt( arrLen ) ) ) {
                console.log( 'Cant clarify array len: ' + multiStrings[i] );
                structSize = -1;
                return;
            }
            type = type.split('[')[0];
        }

        if( !typesSize.hasOwnProperty( type ) ) {
            type = namespace + '::' + type;
            if( !typesSize.hasOwnProperty( type ) ) {
                // console.log( 'Unknown type: ' + type );
                structSize = -1;
                return;
            }
        }

        let align = typesAlign[type];
        let size = typesSize[type];

        // console.log( type + ': ' + align + ' ' + size + ' ' + structSize );
        if( !isArray ) {
            if( isUnion ) {
                if( structSize < typesSize[type] ) structSize = typesSize[type];
            } else {
                structSize += calcAlign(structSize, typesAlign[type]) + typesSize[type];
            }
            if( align === 8 ) structAlign = 8;
        } else {
            const isFVVSTA = lineArgs.includes( '@same_version_for_all_elements' );
            const isNoLengthField = lineArgs.includes( '{no_length_field}' );
            const isDynamicAlloc = lineArgs.includes( '{dynamic_alloc}' ) | isFVVSTA;
            const isDynamicPacked = lineArgs.includes( '{dynamic_packed}' );

            if( isFVVSTA ) {
                structSize += calcAlign(structSize, 4) + 16;
            }
            else if( isDynamicAlloc ) {
                structSize += calcAlign(structSize, 4) + 8;
            } else if( isDynamicPacked ) {
                structSize += 2;
            } else {
                if( isNoLengthField ) {
                    structSize += calcAlign( structSize, align < 4 ? 4 : align );
                    // console.log( '1: ' + structSize );
                } else {
                    structSize += calcAlign( structSize, 4 ) + 4;
                    structSize += calcAlign( structSize, align < 4 ? 4 : align );
                }
                structSize += arrLen * size;
                // console.log( '2: ' + structSize );
                structSize += calcAlign( structSize, align < 4 ? 4 : align  );
                // console.log( '3: ' + structSize );
            }
        }
    }
    if( structSize % structAlign !== 0 ) structSize += structAlign - ( structSize % structAlign );
    // console.log( '4: ' + structSize );
}

function alignOff( num ) {
    if( off % num !== 0 ) off += num - ( off % num );
}

function parseStruct( namespace, struct, tab, parent, versionOverride = false ) {
    let isUnion = unions.includes( struct );
    let isExt = exts.includes( struct );
    let isVersioned = versioned.includes(struct);

    if(isVersioned){
        if(versionOverride === false){
            ++versionLvl;

            let offName = loopLvl > 0 ? 'off' + loopLvl : '';
            jsStrings.push(tab + 'version_offset' + versionLvl + ' = ' + off + ' + l2l1_getU32( ' + ( !offName ? off : offName + ( off ? ' + ' + off : '' ) ) + ' )');
            off += 4;
            jsStrings.push(tab + 'version_indicator' + versionLvl + ' = l2l1_getU32( ' + ( !offName ? off : offName + ( off ? ' + ' + off : '' ) ) + ' )');
            off += 4;
            ++loopLvl;
            offStack.push(off);
            off = 0;
            jsStrings.push(`${tab}off${loopLvl} = version_offset${versionLvl};`);
        }

        jsStrings.push(`${tab}switch (version_indicator${versionLvl}) {`);
        {
            tab += '    ';

            jsStrings.push(`${tab}default:`);
            jsStrings.push(`${tab}case 0: {`);
            {
                tab += '    ';
                for( let i = structs[struct]; i < multiStrings.length; ++i ) {
                    const end = parseStructMember( multiStrings[i], namespace, tab, parent, isUnion, isExt );
                    if(end) break;
                }
                tab = tab.slice(4);
            }
            jsStrings.push(`${tab}}`);
            jsStrings.push(`${tab}break;`);

            tab = tab.slice(4);
        }
        jsStrings.push(`${tab}}`);

        if(versionOverride === false){
            --loopLvl;
            --versionLvl;

            off = offStack.pop();
        }

    } else{
        for( let i = structs[struct]; i < multiStrings.length; ++i ) {
            const end = parseStructMember( multiStrings[i], namespace, tab, parent, isUnion, isExt );
            if(end) break;
        }
    }

    // Get size of union, set size to the largest member of union
    if( isUnion ) off = typesSize[struct];

    // Align struct size
    if( off % typesAlign[struct] !== 0 ) off += typesAlign[struct] - ( off % typesAlign[struct] );
}

function parseStructMember( multiString, namespace, tab, parent, isUnion, isExt ) {
    const lineArgs = multiString.replace(/\s+/g, ' ').trim().split(' ');
    if( lineArgs[0] === 'end' ) return true;
    if( lineArgs[0] === '' || lineArgs[0].startsWith('#') || lineArgs[0] === 'const' ) return false;

    let name = lineArgs[0].split(':')[0];
    if( !lineArgs[0].includes(':') ) lineArgs.splice( 1, 1 );
    let type = lineArgs[1];
    if( type === 'mib' || type === 'BCCH_BCH_Message' ) {
        type = 'uint8[4]';
        lineArgs.push( '{no_length_field}' );
    }

    let isArray = type.includes('[');
    let arrLen = 0;

    if( isExt ) {
        const discriminator = lineArgs[2].split('=')[1];
        jsStrings.push(tab + 'case ' + discriminator + ': {');
        tab = tab + '    ';
    }

    if( isArray ) {
        arrLen = type.split('[')[1].split(']')[0];
        if( consts.hasOwnProperty( arrLen ) ) arrLen = consts[arrLen];
        else if( consts.hasOwnProperty( namespace + '::' + arrLen ) ) arrLen = consts[namespace + '::' + arrLen];
        if( isNaN( parseInt( arrLen ) ) ) {
            throw new Error( 'Cant clarify array len' );
        }
        type = type.split('[')[0];
    }

    let arrMaxLen = arrLen;

    let isStruct = false;
    if( types.hasOwnProperty( type ) ) {
        type = types[type];
    } else {
        if( !type.includes(':') ) type = namespace + '::' + type;
        if( types.hasOwnProperty( type ) ) {
            type = types[type];
        } else if( structs.hasOwnProperty( type ) ) {
            isStruct = true;
        } else {
            throw new Error( `Unknown type: ${type}` );
        }
    }

    let typeNamespace = type.split(':')[0];

    let offName = loopLvl > 0 ? 'off' + loopLvl : '';
    let offPrefix = ( loopLvl > 0 ? 'off' + loopLvl + ' + ' : '' );

    if( !isArray ) {
        alignOff( typesAlign[type] );
        if( !isStruct ) {
            jsStrings.push( tab + parent + '.' + name + ' = ' + commonTypesFunc[type] + '( ' + ( !offName ? off : offName + ( off ? ' + ' + off : '' ) ) + ' );' );
            if( !isUnion ) off += typesSize[type];
        } else {
            const structIsExt = exts.includes(type);
            jsStrings.push( tab + 'let ' + name + ' = ' + parent + '.' + name + ' = {};' );
            if( !structIsExt ){
                parseStruct( typeNamespace, type, tab, name );
            } else {
                ++loopLvl;
                alignOff( 4 );

                let extArrOff = ( !offName ? ( off ? off : '' ) : offName + ( off ? ' + ' + off : '' ) );
                if( extArrOff !== '' ) extArrOff += ' + ';
                extArrOff += 'l2l1_getU32( ' + ( !offName ? off : offName + ( off ? ' + ' + off : '' ) ) + ' )';
                const extArrLen = 'l2l1_getU32( ' + offPrefix + ( off + 4 ) + ' )';
                off += 8;
                jsStrings.push(tab + 'off' + loopLvl + ' = ' + extArrOff + ';');
                jsStrings.push(tab + 'len' + loopLvl + ' = ' + extArrLen + ';');

                offStack.push(off);
                off = 0;

                let iName = 'i' + loopLvl;
                jsStrings.push( tab + 'for( let ' + iName + ' = 0; ' + iName + ' < len' + loopLvl + '; ++' + iName + ' ) {' );

                offName = loopLvl > 0 ? 'off' + loopLvl : '';
                offPrefix = ( loopLvl > 0 ? 'off' + loopLvl + ' + ' : '' );

                ++loopLvl;
                let extOff = ( !offName ? ( off ? off : '' ) : offName + ( off ? ' + ' + off : '' ) );
                if( extOff !== '' ) extOff += ' + ';
                extOff += 'l2l1_getU32( ' + ( !offName ? off : offName + ( off ? ' + ' + off : '' ) ) + ' )';
                const discriminator = 'l2l1_getU32( ' + offPrefix + ( off + 4 ) + ' )';
                off += 8;
                tab = tab + '    ';
                jsStrings.push(tab + 'off' + loopLvl + ' = ' + extOff + ';');
                jsStrings.push(tab + 'discriminator' + loopLvl + ' = ' + discriminator + ';');

                jsStrings.push(tab + 'switch( discriminator' + loopLvl + ' ) {')

                offStack.push(off);
                off = 0;

                tab = tab + '    ';
                parseStruct( typeNamespace, type, tab , name );

                jsStrings.push(tab + 'default: {');
                jsStrings.push(tab + '}');

                tab = tab.slice(4);

                off = offStack.pop();

                jsStrings.push( tab + '}' );

                --loopLvl;
                jsStrings.push( tab + 'off' + loopLvl + ' += ' + off + ';' );
                tab = tab.slice(4);
                jsStrings.push( tab + '}' );
                off = offStack.pop();
                --loopLvl;
            }
        }
    } else {
        // https://confluence.ext.net.nokia.com/pages/viewpage.action?pageId=1695278886
        // Fixed Version Versioned Structure Array
        const isFVVSTA = lineArgs.includes( '@same_version_for_all_elements' );
        const isNoLengthField = lineArgs.includes( '{no_length_field}' );
        const isDynamicAlloc = lineArgs.includes( '{dynamic_alloc}' ) | isFVVSTA;
        const isDynamicPacked = lineArgs.includes( '{dynamic_packed}' );
        let arrOff = 0;
        let arrVer = 0;
        let arrElemSize = 0;

        if( isFVVSTA){
            alignOff( 4 );
            arrVer = 'l2l1_getU32( ' + offPrefix + ( off ) + ' )';
            off += 4;
            arrOff = ( !offName ? ( off ? off : '' ) : offName + ( off ? ' + ' + off : '' ) );
            if( arrOff !== '' ) arrOff += ' + ';
            arrOff += 'l2l1_getU32( ' + ( !offName ? off : offName + ( off ? ' + ' + off : '' ) ) + ' )';
            off += 4;
            arrLen = 'l2l1_getU32( ' + offPrefix + off + ' )';
            off += 4;
            arrElemSize = 'l2l1_getU32( ' + offPrefix + off + ' )';
            off += 4;
        }
        else if( isNoLengthField ) {
            alignOff( typesAlign[type] < 4 ? 4 : typesAlign[type] );
            arrOff = ( !offName ? off : offName + ( off ? ' + ' + off : '' ) );
        } else if( isDynamicAlloc ) {
            alignOff( 4 );
            arrOff = ( !offName ? ( off ? off : '' ) : offName + ( off ? ' + ' + off : '' ) );
            if( arrOff !== '' ) arrOff += ' + ';
            arrOff += 'l2l1_getU32( ' + ( !offName ? off : offName + ( off ? ' + ' + off : '' ) ) + ' )';
            arrLen = 'l2l1_getU32( ' + offPrefix + ( off + 4 ) + ' )';
            off += 8;
        } else if( isDynamicPacked ) {
            arrLen = 'l2l1_getU8( ' + offPrefix + off + ' )';
            arrOff = offPrefix + ( off + 1 ) + ' + l2l1_getU8( ' + offPrefix + ( off + 1 ) + ' )';
            off += 2;
        } else {
            alignOff( 4 );
            arrLen = 'l2l1_getU32( ' + offPrefix + off + ' )';
            off += 4;
            alignOff( typesAlign[type] < 4 ? 4 : typesAlign[type] );
            arrOff = offPrefix + off;
        }

        if( !isStruct ) {
            jsStrings.push( tab + parent + '.' + name + ' = ' + commonTypesFunc[type] + 'Array( ' + arrOff + ', ' + arrLen + ' );' );
        } else {
            ++loopLvl;
            offStack.push( off );
            off = 0;
            let iName = 'i' + loopLvl;
            if(isFVVSTA){
                ++versionLvl;
                jsStrings.push(tab + 'version_indicator' + versionLvl + ' = ' + arrVer + ';');
            }
            if( !isDynamicPacked ) {
                jsStrings.push(tab + 'off' + loopLvl + ' = ' + arrOff + ';');
                if( !isNoLengthField ) jsStrings.push(tab + 'len' + loopLvl + ' = ' + arrLen + ';');
            } else {
                jsStrings.push(tab + 'len' + loopLvl + ' = ' + arrLen + ';');
                jsStrings.push(tab + 'off' + loopLvl + ' = ' + arrOff + ';');
            }
            if(isFVVSTA){
                jsStrings.push(tab + 'element_size' + versionLvl + ' = ' + arrElemSize + ';');
            }
            jsStrings.push( tab + 'let ' + name + ' = ' + parent + '.' + name + ' = [];' );
            if( isNoLengthField ) {
                jsStrings.push( tab + 'for( let ' + iName + ' = 0; ' + iName + ' < ' + arrLen + '; ++' + iName + ' ) {' );
            } else {
                jsStrings.push( tab + 'for( let ' + iName + ' = 0; ' + iName + ' < len' + loopLvl + '; ++' + iName + ' ) {' );
            }
            jsStrings.push( tab + '    let ' + name + 'Item = {};' );

            parseStruct( typeNamespace, type, tab + '    ', name + 'Item', true );

            if(isFVVSTA === false){
                jsStrings.push( tab + '    off' + loopLvl + ' += ' + off + ';' );
            } else{
                jsStrings.push( tab + '    off' + loopLvl + ' += element_size' + versionLvl + ';' );
            }
            jsStrings.push( tab + '    ' + name + '.push( ' + name + 'Item );' );
            jsStrings.push( tab + '}' );
            
            if( off !== typesSize[type] ) {
                console.log( type + ' ' + off + ' vs ' + typesSize[type] );
            }
            off = offStack.pop();
            --loopLvl;
            if(isFVVSTA){
                --versionLvl;
            }
        }
        if( !isDynamicAlloc && !isDynamicPacked ) {
            off += arrMaxLen * typesSize[type];
            alignOff( typesAlign[type] < 4 ? 4 : typesAlign[type] );
        }

    }

    if(isExt){
        tab = tab.slice(4);
        jsStrings.push(tab + '}');
        jsStrings.push(tab + 'break;');
    }

    return false;
}

function printUsage(){
    console.log( 'Usage: node ./add_l2l1_from_multi.js <path to 3gpp-interfaces-5g-layer-1 repository> <version>' );
    console.log( 'Example: node ./add_l2l1_from_multi.js ../3gpp-interfaces-5g-layer-1 5G21B_FB2102_074' );
}