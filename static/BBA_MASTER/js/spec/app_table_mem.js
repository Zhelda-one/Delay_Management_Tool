// APP_TABLE_MEM class for eFramer model

class APP_TABLE_MEM{
    constructor(config, src_addr, dst_addr, ingress){
        this.src_addr = src_addr;
        this.dst_addr = dst_addr;
        this.config = config;
        this.ingress = ingress;
        this.mtu_size = config['mtu_size'];
        this.symbols_in_slot = config['symbols_in_slot'];
        this.prb_size = config['mantissa']*3+1;
        this.slots_in_subframe = 2**config['numerology'];
        // init streams
        this.streams = new Map();
        for(const subcell of config['subcells']){
            for(let i = 0; i <  subcell['numCeAxCId']; ++i){
                const eAxC = subcell['ceAxCIdPuschIq'][i];
                this.streams.set(eAxC, new ATMStream(this, eAxC, subcell['subcellId']));
            }
            for(let i = 0; i <  subcell['numCeAxCId']; ++i){
                const eAxC = subcell['ceAxCIdPuschSINR'][i];
                this.streams.set(eAxC, new ATMStream(this, eAxC, subcell['subcellId']));
            }
        }
    }

    toJSON(file){
        //TODO: resolve JSON output
    }


    ethernet_frames(){
        const ecpri_sequence = [];
        for(const stream of this.streams.values()){
            ecpri_sequence.push(...stream.eCPRI_frames()) ;
        }
        return eth_sequence(this.src_addr,
            this.dst_addr,
            this.config['eth_type'],
            ecpri_sequence)
    }


    print(){
        for(const [eAxC, stream] of Object.entries(this.streams)){
            console.log("Stream: ", eAxC);
            if(stream.slot.some(elem=>elem!==undefined) === false){
                console.log("<empty>");
                continue;
            }

            for(const [sid, symbol] of Object.entries(stream.slot)){
                console.log("Symbol: ", sid);
                for(const [i, frame] of Object.entries(symbol)){
                    console.log("--frame_num    ", i);
                    console.log("--FRAME_SECS   ", frame.FRAME_SECS);
                    console.log("--FRAME_SIZE   ", frame.FRAME_SIZE);
                    console.log("--NEXT_FCCW    ", frame.NEXT_FCCW);
                    for(const [sec, section] of Object.entries(frame.sections)){
                        console.log("----section_num ", sec);
                        console.log("----sectionID   ", section.sectionID);
                        console.log("----startPrbu   ", section.startPrbu);
                        console.log("----numPrbu     ", section.numPrbu);
                    }
                }
            }
        }
    }
}



class ATMStream{
    constructor(atm, eAxC, subcellId){
        this.atm = atm;
        this.eAxC = eAxC
        this.subcellId = subcellId;
        this.sequence = new ecpriSequence(1,0,0);

        // counters
        this.symbolNum = 0;
        this.symbolId = 0;
        this.slotNum = 0;
        this.slotId = 0;
        this.subframeNum = 0;
        this.subframeId = 0;
        this.frameNum = 0;
        this.frameId = 0;
        // empty content
        this.slot = Array(this.atm.symbols_in_slot).fill(null).map(_=>Array());
    }

    clear(){
        this.slot = Array(this.atm.symbols_in_slot).fill(null).map(_=>Array());
    }

    inc_counters(){
        // TODO: handling overflow?
        this.symbolNum += 1;
        this.symbolId =     this.symbolNum % this.atm.symbols_in_slot;
        this.slotNum =      Math.floor(this.symbolNum/this.atm.symbols_in_slot);
        this.slotId =       this.slotNum % this.atm.slots_in_subframe;
        this.subframeNum =  Math.floor(this.slotNum/this.atm.slots_in_subframe);
        this.subframeId =   this.subframeNum % 10;
        this.frameNum =     Math.floor(this.subframeNum/10);
        this.frameId =      this.frameNum % 256;  // ORAN-WG4.CUS.0-v02.00, 5.4.4.4
    }


    add_symbol(symbol, sections){
        if(symbol >= this.atm.symbols_in_slot){
            throw new Error("Symbol index out of range.");
        }

        let frame = new ATMFrame();
        let symbol_size = 0
        for(let [sectionId, startPrb, numPrbu] of sections){
            // distribute section to multiple frames, if needed
            while(numPrbu > 0){
                if(this.atm.mtu_size-frame.FRAME_SIZE < 4 + this.atm.prb_size){
                    // remaining frame space smaller than
                    // section header + 1 PRB: close frame
                    symbol_size += frame.FRAME_SIZE;
                    frame.FRAME_SECS = frame.sections.length;
                    frame.NEXT_FCCW = symbol_size;
                    this.slot[symbol].push(frame);
                    // init new frame
                    frame = new ATMFrame();
                }
                // available space (in PRBs)
                const prbSpace = Math.floor((this.atm.mtu_size-frame.FRAME_SIZE-4)
                    / this.atm.prb_size);
                const numPrbcToSave = Math.min(numPrbu, prbSpace);
                // append section to the current frame
                frame.sections.push( new ATMFrameSection(sectionId, startPrb, numPrbcToSave));
                frame.FRAME_SIZE += 4 + this.atm.prb_size*numPrbcToSave;
                // shift PRB pointer and update size
                startPrb += numPrbcToSave;
                numPrbu -= numPrbcToSave;
            }
        }
        if(frame.sections.length > 0){
            frame.FRAME_SECS = frame.sections.length;
            frame.NEXT_FCCW = 0x0;
            this.slot[symbol].push(frame);
        }
    }

    eCPRI_frames(){
        for(const symbol of this.slot){
            for(const atm_frame of symbol){
                this.sequence.add(this.eAxC, atm_frame.get_payload(this));
            }
            this.inc_counters()
        }
        this.clear()

        const frames = this.sequence.frames;
        this.sequence.clean();
        return frames;
    }
}

class ATMFrame{
    constructor( FRAME_SIZE=4,
                 FRAME_SECS=0,
                 NEXT_FCCW=0){
        this.FRAME_SIZE = FRAME_SIZE;
        this.FRAME_SECS = FRAME_SECS;
        this.NEXT_FCCW = NEXT_FCCW;
        this.sections = [];
    }

    get_payload(stream){
        const UplaneMsg = new UserPlane(0, 1, 0, stream.frameId,
            stream.subframeId, stream.slotId, stream.symbolId);

        for(const sec of this.sections){
            const prb_mem = stream.atm.ingress.prb[stream.eAxC][stream.symbolId];
            const IQdata = prb_mem.slice(sec.startPrbu*stream.atm.prb_size,
            (sec.startPrbu+sec.numPrbu)*stream.atm.prb_size);
            UplaneMsg.add_section(
                sec.sectionID,
                sec.startPrbu,
                sec.numPrbu,
                IQdata, 0)  // TODO: 1=skip every second PRB; DM-RS?
        }
        return UplaneMsg
    }
}

class ATMFrameSection{
    constructor(sectionID, startPrbu, numPrbu){
        this.sectionID = sectionID;
        this.startPrbu = startPrbu;
        this.numPrbu = numPrbu;
    }
}