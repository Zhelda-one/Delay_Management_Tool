function itoc_8bit_unsigned( v )
{
  return  ((v>> 4)&0xF).toString( 16 )+
          ((v    )&0xF).toString( 16 );
}

function ctoi_16bit_signed( hex )
{
 var v = parseInt("0x"+hex);
 if (v>32767) v=-(65536-v);
 v/=32768;
 return v;
}

function itoc_16bit_signed( v )
{
  v*=32767;
  if (v<0) v=v+65536;
  v=Math.round(v);


  var str=
      ((v>>12)&0xF).toString( 16 )+
      ((v>> 8)&0xF).toString( 16 )+
      ((v>> 4)&0xF).toString( 16 )+
      ((v    )&0xF).toString( 16 );

  return str;
}

//  var ll =0 ;
function ctoi_16bit_signed_brev( hex )
{
 var v = parseInt("0x"+hex);
 var l=0;
 for( var i=0; i<16; i++)
 {
     if ( v&1 ) l|=1;
     v>>=1;
     l<<=1;
 }
 v=l;


 if (v>32767) v=-(65536-v);
 v/=32768;
//if (ll++<100) debug( hex+"=>"+l+"=>"+v+"<BR>");

 return v;
}


function itoi_15bit_signed( v )
{
 if (v>16383) v=-(32768-v);
 v/=16384;
 return v;
}

function itoi_9bit_signed( v )
{
 if (v>256) v=-(512-v);
 v/=256;
 return v;
}

function cpri_loner_value_getter(compression) {
  if (compression)
      return v => ulaw_sample_decompress(Math.trunc((v >= 16384 ? v - 32768 : v) / (2 ** 6))) / 16384
  else
      return itoi_15bit_signed
}

function itoi_32bit_signed( v )
{
    if (v > 2147483647) v=-(4294967296-v);
    v/=2147483648;
    return v;
}

function itoi_16bit_signed( v )
{
 if (v>32767) v=-(65536-v);
 v/=32768;
 return v;
}

function itoi_8bit_signed( v )
{
 if (v>127) v=-(256-v);
 v/=128;
 return v;
}

function itoi_16bit_unsigned( v )
{
 //v=-32768;
 v/=65536;//32767;
 return v;
}

function itoi_4bit_signed( v )
{
 if (v>7) v=-(16-v);
 v/=8;
 return v;
}

function ctoi_12bit_signed( hex )
{
 var v = parseInt("0x"+hex);
 if (v>2047) v=-(4096-v);
 v/=2048;
 return v;
}


function any_to_array( x )
{
  var r = [];
  for( var i=0; i<x.length; i++)
  r[i]=x[i];
  return r;
}

function any_to_string( str )
{
 if ( typeof str == 'string' )
    return str;
 if ( str instanceof ArrayBuffer )
 {
    var retstr="";
    var a = new Uint8Array( str );
    try {
        var len = a.length;
        for( var i=0; i<len; )
        {
            var todo = len-i;
            if (todo>65535) todo=65535;
            retstr+=String.fromCharCode.apply(null, a.subarray(i,i+todo));
            i+=todo;
        }
        return retstr;
    }
    // firefox limits string size to 256MB.
    catch(e) { alert(e + " at "+i+"\n You see this most probably because JS limits string size to 256MB"); return retstr; }
 }

 if ( str instanceof Uint8Array )
 {
     if (isBrowser())
     {
         return new TextDecoder("utf-8").decode(str);
     }
     else
     {
         const { StringDecoder }= require('string_decoder');
         return new StringDecoder("utf-8").write(str) ;
     }
 }

 debug("Any to string: unknown object type ("+(typeof str)+")<BR>");
 return "";
}

function string_to_bytes ( str )
{
if ( typeof str == 'string' )
{
    var re = [];
    for (var i = 0; i < str.length; i++ ) {
        re[i] = str.charCodeAt(i) & 0xFF;
    }

    return re;
 }
 else if ( str instanceof ArrayBuffer )
 {
    return new Uint8Array(str);
 }
 else
     debug( "string_to_bytes: incorrect type "+(typeof str) );
}


function string_to_float32 ( str )
{
if ( typeof str == 'string' )
{
    var ReB = new ArrayBuffer(str.length);
    var re = new Uint8Array(ReB);
    for (var i = 0; i < str.length; i++ ) {
        re[i] = str.charCodeAt(i) & 0xFF;
    }

    return new Float32Array(ReB);
 }
 else if ( str instanceof ArrayBuffer )
 {
    return new Float32Array(str);
 }
 else
     debug( "string_to_bytes: incorrect type "+(typeof str) );
}

function bits_from_bytes(bytes, startBit, bitLength){
    const startByte = Math.floor(startBit / 8);
    const startByteOffset = startBit % 8;

    const endByte = Math.floor((startBit + bitLength) / 8);
    const endByteOffset = (startBit + bitLength) % 8;

    if(startByte === endByte || (endByte - startByte === 1 && endByteOffset === 0) ){
        return (bytes[startByte] >> (endByteOffset === 0 ? 0 : (8-endByteOffset))) & bitMask[bitLength];
    }

    let num = bytes[startByte] & bitMask[8-startByteOffset];
    for(let i = 0; i < endByte-startByte-1; ++i){
        num = num << 8;
        num |= bytes[startByte + i + 1];
    }

    num = num << endByteOffset;
    num |= bytes[endByte] >> (8-endByteOffset);

    return num;
}

function nearest_nice_value( val )
{
  var n;

  for(n=1; val>10; val=Math.floor(val/10), n*=10);
  return n*val;
}

function log2( val )
/* Return position of highest set bit-1, or Math.floor(log2(x)). Example: for 2 returns 1*/
{
  var n;
  for( n=0; val; n++, val>>=1);
  return n>0?n-1:0;
}


function text2bin(text)
{
   var b = [];
   for( var i=0; i<text.length; i++)
   {
       var c = text.charCodeAt(i);
       for( var j=7; j>=0; j--)
           b.push( (c>>j)&1 );
   }
   return b;
}

function text_to_binary_array( text )
{
   var a = [];
   var b = [];
   var ishex = 0;
   for( var i=0; i<text.length; i++)
   {
       var c = text.charAt(i);
       if ( ( ( c<='9' ) && ( c>='0' ) ) ||
            ( ( c<='f' ) && ( c>='a' ) ) ||
            ( ( c<='F' ) && ( c>='A' ) ) )
       {
           a.push(c);
           if ( ( c!='0' ) && (c!='1') ) ishex=1;
       }
   }
   if (!ishex)
       for( var i=0; i<a.length; i++)
           b[i]=parseInt(a[i]);
   else
   {
       for( var i=0; i<a.length; i++)
       {
           var n = parseInt('0x'+a[i]);
           b.push( (n>>3)&1 );
           b.push( (n>>2)&1 );
           b.push( (n>>1)&1 );
           b.push( (n>>0)&1 );
       }
   }
   return b;
}


function v_asHexText(v)
{
var result = "";
var j=0;

if (v==undefined) return undefined;

for( var i=0; i<v.length; i++)
{
    j<<=1; j|= v[i];
    if (i%4==3) { //emit
        result+= j.toString(16);
        j=0;
    }
    if (31==(i&31)) result+=" ";
}
return result;
}

function rnd_snd() {
return (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1);
}

function rnd(mean, stdev) {
return (rnd_snd()*stdev+mean);
}


function round_for_graph( x )
{
var L;
if (Math.log10==undefined )
    L = Math.floor(Math.log(x)*0.434294481);
else
    L = Math.floor(Math.log10( x ));
var root = Math.pow(10, L);
var tmp = x/root;
if ( tmp<5 ) tmp=1; else tmp=5;
tmp *= root;
return Math.round(tmp);
}

function u8_to_bits( v )
{
var r=[];
for( var i=0; i<v.length; i++)
    for( var j=7; j>=0; j--)
        r.push( (v[i]>>j)&1 );
return r;
}

function int_to_bits( v, len )
/* Convert integer to bit array */
{
let r=[];
for( let j=len-1; j>=0; j--)
   r.push( (v>>j)&1 );
return r;
}


function is_letter( code )
{
return ( ((code >= 65) && (code <= 90)) || ((code >= 97) && (code <= 122)) );
}


function v_to_hex( x )
{
var r="";
for( var i=0; i<x.length; i++)
{
    if ( i%20==0 )  r+="\n";
    r+="0x"+x[i].toString(16);
    if ( i<x.length-1 )  r+=", ";

}
return r;
}


function genspaces( n )
{
var r = "";
while( n-- ) r+=" ";
return r;
}

function tojs( o, indent )
/* Save (downloads to user) first parameter. */
{
var str = "";
var type;

if (isBrowser()) type = jQuery.type(o); else type = typeof(o);

switch(type)
{
    case 'number': return o+"";
    case 'array':
        str = genspaces(indent) + "[";
        for( var i=0; i<o.length; i++)
            str+=tojs(o[i],indent+2)+(i<o.length-1?",":"" );
        return str + "]";
    break;
    case 'object':
        var np = 0;
        for(var propertyName in o) np++;
        str = genspaces(indent) + "{ \r\n";
        for(var propertyName in o)
        {
            var rs = tojs(o[propertyName], indent+2);
            if (rs != "")
                str+=genspaces(indent) + '"'+propertyName+'":'+rs+((--np)?",\r\n":"\r\n");
        }
        return str + genspaces(indent) + "}\r\n";
    break;
    case 'string':
        return genspaces(indent) + "'"+o+"'";
    case 'function':
        return "";
    default:
       debug("unkown type: "+type	);
}
return "";
}


function save( o, filename )
/* Save (downloads to user) first parameter. */
{
var name = filename;
if (arguments.length<2) name = jQuery.type(o)+".txt";

download( name, tojs(o,0) );
}


function i2hex( int, len )
{
var iplus = Math.abs(int)|0;
var s ;
if (int>=0)
{
    s = iplus.toString(16);
    while (s.length<len) s="0"+s;
}
else
{
    s = ( (1<<(len*4))-iplus).toString(16);
    while (s.length<len) s="f"+s;
}
return s;
}

function bytes2hex( bytes )
{
var str="";
for( var i=0; i<bytes.length; i++)
{
    str+="0x"+((bytes[i]/16)|0).toString(16)+""+(bytes[i]%16).toString(16);
    if (i<bytes.length-1) str+=",";
    if (i%16==15) str+="\n";
}
return str;
}

function bytes2mac( bytes, start_offset )
{
var str="";
for( var i=0; i<6; i++)
{
    str+=((bytes[i+start_offset]/16)|0).toString(16)+""+(bytes[i+start_offset]%16).toString(16);
    if (i<5) str+=":";
    if (i%16==15) str+="\n";
}
return str;
}

function mac2bytes( mac )
{
let bytes = [];
for(let i = 0; i < mac.length; i+=3){
    bytes.push(parseInt(mac.substr(i, 2), 16));
}
return bytes;
}

function hexToBytes(hex) {
for (var bytes = [], c = 0; c < hex.length; c += 2)
  bytes.push(parseInt(hex.substr(c, 2), 16));
return bytes;
}

function bytes2ip( bytes, start_offset )
{
var str="";
for( var i=0; i<4; i++)
{
    str+=bytes[i+start_offset]|0;
    if (i<3) str+=".";
    if (i%16==15) str+="\n";
}
return str;
}

function uint32_to_float( i )
{
var view = new DataView(new ArrayBuffer(4));
view.setUint32(0, i);
return view.getFloat32(0);
}

function uint16_to_int16( i )
{
return (i&32768)?i-65536:i;
}

function uint32_to_float_bswap( i )
{
var view = new DataView(new ArrayBuffer(4));
view.setUint32(0,
((i>>24)&0xFF) |
((i>> 8)&0xFF00) |
((i<< 8)&0xFF0000) |
((i<<24)&0xFF000000)
);
return view.getFloat32(0);
}

function byte2hex( i )
{
return ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'][(i/16)|0] +
       ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'][(i%16)|0] ;
}

function bytes2desc( pkt, maxlen )
{
var hexes = "", bytes="";
var len = arguments.length>1?maxlen:pkt.length;
var nb  = 0;

while (len>=(16<<nb)) nb++;

for( var i=0; i<len; i++)
{
    var p = pkt[i];
    if (!(i&15)) {
        var addr = i.toString(16);
        addr = "00000000".substr( (8-nb)+addr.length )+addr;
        hexes+=" "+bytes+"<BR>0x"+addr+": "; bytes ="";

    }
    hexes += ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'][(p/16)|0] +
             ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'][(p%16)|0] + " ";
    bytes += (p==60)?"&lt;":
             ((p==62)?"&gt;":
             ((p==32)?"&nbsp;":
             (((p>31) && (p<128))?String.fromCharCode(p):"&nbsp;")));
}
return hexes;
}


function bytes2bin(x,n)
{
var r=[];
for( var i=0; i<n; i++)
    r.push( (x[i>>3]>>(7-(i&7)))&1 );
return r;
}

function decompress_barray_to_iq( data, mantissa, num_samples)
{
var x=0, bpos=0, v_i=[], v_q=[];
var bitlength = mantissa, scale = 2/(1<<mantissa);

for( var i=0; i<2*num_samples; i++)
{
    var k = (data[x]<<16) | (data[x+1]<<8) | data[x+2];
    k = ((k<<bpos)&0xffffff)>>(24-bitlength);
    if (k>>(bitlength-1)) { k = k-(1<<bitlength);  }
    k*=scale;
    if ((i&1)==0) v_i.push(k); else v_q.push(k);
    bpos += bitlength;
    while (bpos>7) { bpos-=8; x++; }
}

return new M(v_i, v_q);
}

function identity(arg) {
return arg
}

Array.prototype.transpose = function () {
if ((this.length === 0) || (this[0].length === undefined)) return this
return this[0].map((_, idx) => this.map(elem => elem[idx]))
}

Array.prototype.groupBy = function (keys) {
    const ret = {};
    for (let i = 0; i < this.length; ++i) {
        let key = "";
        for (let j = 0; j < keys.length - 1; ++j) {
            const column = keys[j];
            key += getPacketValue(this[i], column).toString();
            key += ",";
        }
        key += getPacketValue(this[i], keys.at(-1));

        if(ret[key] === undefined) ret[key] = [];
        ret[key].push(this[i]);
    }
    return ret;
}

Array.prototype.countBy = function (keys, vals) {
    let ret = {}
    for (let i = 0; i < this.length; i += 1) {
        let key = keys.map(column => this[i][column]).join()
        let val = vals.map(column => this[i][column]).join()
        ret[key] = (ret[key] || new Set()).add(val)
    }
    return ret
}

Array.prototype.min = function() {
    let len = this.length;
    let min = Infinity;
    while(len--){
        if(this[len] < min){
            min = this[len];
        }
    }
    return min;
}

Array.prototype.max = function() {
    let len = this.length;
    let max = -Infinity;
    while(len--){
        if(this[len] > max){
            max = this[len];
        }
    }
    return max;
}

function range(arg1, arg2, arg3) {
let [start, limit] = arguments.length < 2 ? [0, arg1] : [arg1, arg2]
let step = arguments.length < 3 ? 1 : arg3
let ret = []
for (let idx = start; idx*Math.sign(step) < limit*Math.sign(step); idx += step)
    ret.push(idx)
return ret
}

function getUserId() {
let uid = localStorage.getItem('bba_user_id')
if (!uid) {
    uid = Math.floor(Math.random() * (2**(20+20))).toString(16)
    localStorage.setItem('bba_user_id', uid)
}
return uid
}

function benchmark(fn, iters) {
let t0 = performance.now()
for (let iter = 0; iter < iters; iter += 1)
    fn.call()
return performance.now() - t0
}

function calculate_median(values) {

    if (values.length === 0) {
        throw new Error('Input array is empty');
    }

    // Sorting values, preventing original array
    // from being mutated.
    values = [...values].sort((a, b) => a - b);

    const half = Math.floor(values.length / 2);

    return (values.length % 2
            ? values[half]
            : (values[half - 1] + values[half]) / 2
    );

}

function toFixed(val, digits){
    return parseFloat(val.toFixed(digits));

}
