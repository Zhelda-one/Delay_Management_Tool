function modify_addDegrees(){
    const degrees = parseFloat(getElementById("modify_addDegrees_deg").value);
    if(isNaN(degrees) || !degrees) return;

    const radians  = degrees/360*2*Math.PI;
    const cor_sin= Math.sin( radians );
    const cor_cos= Math.cos( radians );

    for(const u in iqBuffers){
        for(const antId in iqBuffers[u]){
            const buffers = iqBuffers[u][antId];
            for(let i = 0; i < buffers.length; i+=2){
                const _real = buffers[i]*cor_cos - buffers[i+1]*cor_sin;
                const _imag = buffers[i+1]*cor_cos + buffers[i]*cor_sin;
                buffers[i] = _real;
                buffers[i+1] = _imag;
            }
            delete gl_iqBuffers[u][antId];
            delete gl_iqTypeBuffers[u][antId];
            delete gl_iqBuffersLength[u][antId];
        }
    }
    iqTab_loadIqBuffer();
    canvas_isFullRender = true;
}

function modify_multiplyByConstant(){
    const real = parseFloat(getElementById("multiplyByConstant_r").value);
    const imag = parseFloat(getElementById("multiplyByConstant_i").value);

    if(isNaN(real) || isNaN(imag)) return;
    for(const u in iqBuffers){
        for(const antId in iqBuffers[u]){
            const buffers = iqBuffers[u][antId];
            for(let i = 0; i < buffers.length; i+=2){
                const fi = buffers[i]*real - buffers[i+1] *imag;
                const fq = buffers[i]*imag + buffers[i+1] *real;

                let containsInfinityOrNaN = (fq === Infinity || fi === Infinity) || (isNaN(fq) || isNaN(fi));

                buffers[i+1] = !containsInfinityOrNaN ? fq : Infinity;
                buffers[i] = !containsInfinityOrNaN ? fi : Infinity;

            }
            delete gl_iqBuffers[u][antId];
            delete gl_iqTypeBuffers[u][antId];
            delete gl_iqBuffersLength[u][antId];
        }
    }

    iqTab_loadIqBuffer();
    canvas_isFullRender = true;
}

function modify_degSC(){
    const degrees = parseFloat(getElementById("modify_degSC").value);
    const angle  = degrees/360*2*Math.PI;

    const maxPRB = findMaxPRBPerU();

    for(const u in iqBuffers){

        const step_sin= Math.sin( angle );
        const step_cos= Math.cos( angle );
        const num_sc = maxPRB[u]*12;
        const start_sin = Math.sin(-angle*num_sc/2 );
        const start_cos = Math.cos(-angle*num_sc/2 );

        for(const antId in iqBuffers[u]){
            let i = 0;
            const buffer = iqBuffers[u][antId];

            for(let sym in iqNumPrb[u][antId]){
                sym = parseInt(sym);
                if(Number.isNaN(sym)) continue;
                const nprbs = iqNumPrb[u][antId][sym];

                let cor_sin = start_sin;
                let cor_cos = start_cos;

                for(let j = 0; j < nprbs.length; j++){
                    const nprb = nprbs[j];
                    for(let k = 0; k < nprb; k++, i++){
                        const _real = buffer[2*i]*cor_cos - buffer[2*i+1]*cor_sin;
                        const _imag = buffer[2*i+1]*cor_cos + buffer[2*i]*cor_sin;
                        buffer[2*i] = _real;
                        buffer[2*i+1] = _imag;
                        const newCos = step_cos * cor_cos - step_sin * cor_sin;
                        const newSin = step_sin * cor_cos + step_cos * cor_sin;
                        cor_cos = newCos;
                        cor_sin = newSin;
                    }

                }
            }

            delete gl_iqBuffers[u][antId];
            delete gl_iqTypeBuffers[u][antId];
            delete gl_iqBuffersLength[u][antId];

        }
    }

    iqTab_loadIqBuffer();
    canvas_isFullRender = true;
}

function findMaxPRBPerU(){
    const maxPRB = {}
    for(const u in iqBuffers){
        maxPRB[u] = 0;
        for(const antId in iqBuffers[u]){
            for(let sym in iqNumPrb[u][antId]){
                sym = parseInt(sym);
                if(Number.isNaN(sym)) continue;

                const nprbs = iqNumPrb[u][antId][sym];
                for(let j = 0; j < nprbs.length; j++) {
                    const nprb = nprbs[j];
                    if(nprb > maxPRB[u]) maxPRB[u] = nprb;
                }
            }
        }
    }
    return maxPRB;
}

function modify_degSymbol(){
    const degrees = parseFloat(getElementById("modify_degSymbol").value);
    const angle  = degrees/360*2*Math.PI;


    for(const u in iqBuffers){

        for(const antId in iqBuffers[u]){
            let i = 0;
            const buffer = iqBuffers[u][antId];

            for(let sym in iqNumPrb[u][antId]){
                sym = parseInt(sym);
                if(Number.isNaN(sym)) continue;
                const nprbs = iqNumPrb[u][antId][sym];

                const cor_sin= Math.sin( sym*angle );
                const cor_cos= Math.cos( sym*angle );

                for(let j = 0; j < nprbs.length; j++){
                    const nprb = nprbs[j];
                    for(let k = 0; k < nprb; k++, i++){
                        const _real = buffer[2*i]*cor_cos - buffer[2*i+1]*cor_sin;
                        const _imag = buffer[2*i+1]*cor_cos + buffer[2*i]*cor_sin;
                        buffer[2*i] = _real;
                        buffer[2*i+1] = _imag;
                    }

                }
            }

            delete gl_iqBuffers[u][antId];
            delete gl_iqTypeBuffers[u][antId];
            delete gl_iqBuffersLength[u][antId];

        }
    }

    iqTab_loadIqBuffer();
    canvas_isFullRender = true;
}

function modify_degSymbolSC(){
    const degrees = parseFloat(getElementById("modify_degSymbolSC").value);
    const angle  = degrees/360*2*Math.PI;

    const maxPRB = findMaxPRBPerU();

    for(const u in iqBuffers){
        const num_sc = maxPRB[u]*12/2;
        // const start_sin = Math.sin(-angle*num_sc/2 );
        // const start_cos = Math.cos(-angle*num_sc/2 );

        for(const antId in iqBuffers[u]){
            let i = 0;
            const buffer = iqBuffers[u][antId];

            for(let sym in iqNumPrb[u][antId]){
                sym = parseInt(sym);
                if(Number.isNaN(sym)) continue;
                const nprbs = iqNumPrb[u][antId][sym];

                let si = Math.cos( sym*angle );
                let sq = Math.sin( sym*angle );

                let pi=1;
                let pq=0;

                for(let j = 0; j < nprbs.length; j++){
                    const nprb = nprbs[j];
                    for(let k = 0; k < nprb; k++, i++){
                        let _real = buffer[2*i]*pi - buffer[2*i+1]*pq;
                        let _imag = buffer[2*i]*pq + buffer[2*i+1]*pi;
                        buffer[2*i] = _real;
                        buffer[2*i+1] = _imag;
                        _real = pi*si - pq*sq;
                        _imag = pi*sq + pq*si;
                        pi = _real;
                        pq = _imag;
                        if (j === num_sc)
                        {
                            _real = pi*si - pq*sq;
                            _imag = pi*sq + pq*si;
                            pi = _real;
                            pq = _imag;
                        }
                    }
                }
            }

            delete gl_iqBuffers[u][antId];
            delete gl_iqTypeBuffers[u][antId];
            delete gl_iqBuffersLength[u][antId];

        }
    }

    iqTab_loadIqBuffer();
    canvas_isFullRender = true;
}

function swapIq(){
    for(const u in iqBuffers){
        for(const antId in iqBuffers[u]){
            const buffers = iqBuffers[u][antId];
            for(let i = 0; i < buffers.length; i+=2){
                const _real = buffers[i];
                const _imag = buffers[i+1];
                buffers[i] = _imag;
                buffers[i+1] = _real;
            }
            delete gl_iqBuffers[u][antId];
            delete gl_iqTypeBuffers[u][antId];
            delete gl_iqBuffersLength[u][antId];
        }
    }
    iqTab_loadIqBuffer();
    canvas_isFullRender = true;
}

function modify_sampleShift(){
    config.load.shift_samples = parseInt(getElementById('modify_sampleShift').value);
    getElementById('loadDialog_shift_samples').value = getElementById('modify_sampleShift').value;
    canvas_isFullRender = true;
}
