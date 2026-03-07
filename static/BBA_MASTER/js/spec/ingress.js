// Extraction of PRB from eCPRI User Plane frames into PRB memory.

const MAX_PRB_COUNT = 273
const SAMPLES_IN_PRB = 12

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//TODO: use ecog's implementation
function getNormalBM() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return getNormalBM() // resample between 0 and 1
    return num
}

class Ingress{

    constructor(config){
        this.symbols_in_slot = config['symbols_in_slot'];
        this.prb = {};
        this.prb_size = config['mantissa']*3+1;
        this.config = config;
    }

    random_fill(seed= undefined, max_prb_count= MAX_PRB_COUNT,
                    order= 2, exponent= 2, noise= 3.0){
        if(seed !== undefined){
            //vanilla js random cannot use a seed
        }
        const eAxCs = [];
        for(const subcell of this.config['subcells']){
            for(let i = 0; i < subcell['numCeAxCId']; ++i){
                eAxCs.push(subcell['ceAxCIdPuschIq'][i]);
            }
            for(let i = 0; i < subcell['numCeAxCId']; ++i){
                eAxCs.push(subcell['ceAxCIdPuschSINR'][i]);
            }
        }
        this.prb = {};
        if(order === undefined){
            for(const eAxC of eAxCs){
                this.prb[eAxC] = Array(this.symbols_in_slot).fill(0).map(()=>
                    Array(max_prb_count*this.prb_size).fill(0).map(()=>getRandomInt(0, 256)));
            }
        }
        else{
            for(const eAxC of eAxCs){
                this.prb[eAxC] = Array(this.symbols_in_slot).fill(null).map(_=>Array());
                for(let symbol = 0; symbol < this.symbols_in_slot; ++symbol){
                    for(let i = 0; i < max_prb_count; ++i){
                        this.prb[eAxC][symbol].push(...this.random_prb(order, exponent, noise));
                    }
                }
            }
        }
    }

    process_ecpri(frame){
        // Copies PRB data from eCPRI User Plane frames with provided logical
        // structure to PRB memory
        if(frame instanceof ethernetFrame){
            // extract eCPRI frame from Ethernet frame payload
            frame = frame['payload'];
        }

        const eAxC = frame['ecpriPcid'];
        const symbol = frame['payload']['symbolId'] % this.symbols_in_slot;
        if(!(eAxC in this.prb)){
            // create new entries in PRB memory
            this.prb[eAxC] = Array(this.symbols_in_slot).fill(null).map(_=>Array());
        }

        for(const section of frame['payload']['sections']){
            const length = this.prb[eAxC][symbol].length;
            const start = section['startPrbu'] * this.prb_size;
            const stop = start + section['numPrbu'] * this.prb_size;
            const padding = stop - length;
            if(padding > 0){
                this.prb[eAxC][symbol].push(...Array(padding).fill(0)); //TODO: is padding before or after data?
            }
            //this.prb[eAxC][symbol][start:stop] = section['IQdata'];
            for(let i = start; i < stop && i - start < section['IQdata'].length; ++i){
                this.prb[eAxC][symbol][i] = section['IQdata'][i-start];
            }
        }
    }

    random_prb(order= 2, exponent= 2, noise= 3.0){
        // Creates block floating-point compressed PRB
        const bitwidth = this.config['mantissa'];

        // get zero-mean uniform random integers in range specified by 'order'
        //let samples = rng.integers(order, size = 2 * SAMPLES_IN_PRB, dtype = int)*2-order+1;
        let samples = Array(2*SAMPLES_IN_PRB).fill(0).map(()=>getRandomInt(0, order) * 2-order+1);

        // Normalize to use available dynamic range
        //samples *= (2**(bitwidth-1))//(order+1)
        samples = samples.map(elem=>Math.floor(elem * 2**(bitwidth-1))/(order+1));

        // Add white Gaussian noise
        //samples += rng.normal(scale=noise, size=2*SAMPLES_IN_PRB).astype(int);
        samples = samples.map(elem=>elem+getNormalBM()*noise);
        samples = samples.map(elem=>Math.floor(elem));

        // Compress samples using string as placeholder for bits
        let prb_string = '';
        for(let i = 0; i < 2*SAMPLES_IN_PRB; ++i){
            if(samples[i] < 0){
                samples[i] += 2**bitwidth;
            }
            prb_string += samples[i].toString(2).padStart(bitwidth, '0');
        }

        // Convert bit stream to bytes
        //const prb = [exponent] + [int(prb_string[8*i:8*i+8], 2) for i in range(3*bitwidth)];
        const prb = [exponent];
        for(let i = 0; i < 3*bitwidth; ++i){    //TODO: refactor
            prb.push(parseInt(prb_string.substr(8*i, 8), 2));
        }

        return prb;
    }
}