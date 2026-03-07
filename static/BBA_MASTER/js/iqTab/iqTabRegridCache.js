/** @type {Map<number, RegridCacheEntry>} */
let canvas_renderResourceGrid_resArr = new Map(); // [subframe] = RegridCacheEntry

/** @type {Map<number, Map<number, Map<string, FcpAllocation[]>>>} */
let fcp_map = new Map();    // [subframe][u][antId] = [FcpAllocation]

class ResourceAllocation{
    constructor(id, u, antId, symbol) {
        this.id = id;
        this.u = u;
        this.antId = antId;
        this.symbol = symbol;
    }
}

class FcpAllocation{
    constructor(symbol, rb, numSymbols, numRb, packetId, sectionId){
        this.symbol = symbol;
        this.rb = rb;
        this.numSymbols = numSymbols;
        this.numRb = numRb;
        this.packetId = packetId;
        this.sectionId = sectionId;
    }
}

class ReGrid_Resource{
    constructor( re, innerOffsetX, innerOffsetY, innerCount, ch, i, q ) {
        this.re = re;
        this.innerOffsetX = innerOffsetX;
        this.innerOffsetY = innerOffsetY;
        this.innerCount = innerCount;
        this.ch = ch;
        this.i = i;
        this.q = q;
    }
}

class RegridCacheEntry{
    /** @type {Map<number, Map<string, Map<Number, ReGrid_Resource[]>>>}
     * [u][antId][symbol] = [ReGridResource]*/
    uMap = new Map();

    /** @param {number} resolution */
    constructor( resolution ) {
        this.resolution = resolution;
    }
}

function* canvas_renderResourceGrid_getResourcesInView( v, vst, vf ) {
    const transX = Math.round( vst.transX[v.mode] * vst.scaleX[v.mode] );

    const firstSubframe = Math.floor( -transX / vst.subframeSize );
    const firstFinalSubframe = 10 * vst.currentFrame + firstSubframe;
    const maxFinalSubframe = firstFinalSubframe + Math.ceil( v.usedWidth / vst.subframeSize ) + 1;

    for (const [subframe, cacheEntry] of canvas_renderResourceGrid_resArr) {
        if(subframe < firstFinalSubframe || subframe > maxFinalSubframe) continue;

        const resolution = cacheEntry.resolution;

        const finalFrame = Math.floor( subframe / 10 );
        const localSubframe = subframe % 10;   //local meaning within frame
        if( vf.ranges.frame[1] !== -1 && !(vf.ranges.frame[0] <= finalFrame && finalFrame <= vf.ranges.frame[1]) ) continue;

        if(vf.ranges.subframe[0] !== -1){
            if(vf.ranges.subframe[1] < 10 && (localSubframe < vf.ranges.subframe[0] || vf.ranges.subframe[1] < localSubframe)) continue;
            else if(vf.ranges.subframe[1] >= 10 && (subframe < vf.ranges.subframe[0] || vf.ranges.subframe[1] < subframe) ){ //Filtering for select mode
                continue;
            }
        }

        for (const [u, antMap] of cacheEntry.uMap) {
            if(vf.selectedU[u] === false) continue;

            for (const [antId, symMap] of antMap) {
                if(vf.selectedAnt[u][antId] === false) continue;

                const specialFilteringON = vf.ranges.subframe[1] >= 10 || vf.ranges.symbol[1] >= NUM_OF_SYM_IN_SLOT_PER_U[u]; //Filtering for select mode

                for (const [symbol, arr] of symMap) {
                    const localSymbol = Math.floor(symbol%NUM_OF_SYM_IN_SLOT_PER_U[u]);
                    const localSlot = Math.floor(symbol/NUM_OF_SYM_IN_SLOT_PER_U[u]);

                    if( vf.ranges.slot[1] !== -1 && !(vf.ranges.slot[0] <= localSlot && localSlot <= vf.ranges.slot[1]) ) continue;

                    if( vf.ranges.symbol[0] !== -1 ){
						if(!specialFilteringON &&
							(localSymbol < vf.ranges.symbol[0] || vf.ranges.symbol[1] < localSymbol )){
							continue;
						}
						else if(specialFilteringON &&
							((symbol < vf.ranges.symbol[0] && subframe === vf.ranges.subframe[0]) ||
							(vf.ranges.symbol[1] < symbol && subframe === vf.ranges.subframe[1]))){ //Special filtering for select mode (vf.ranges.symbol is finalSymbol not localSymbol)
							continue;
						}
					}

                    for (let idx = 0; idx < arr.length; idx++) {
                        const resource = arr[idx];
                        if(resource.re > 12*v.lastRb[u] || (resource.re + 1) < 12*v.firstRb[u]) continue;
                        if( vf.ranges.RB[1] !== -1 && (!(vf.ranges.RB[0] <= Math.floor(resource.re/12) && Math.floor(resource.re/12) <= vf.ranges.RB[1])) ) continue;

                        yield { subframe, u, antId, symbol, resource, resolution };
                    }
                }
            }
        }
    }
}
function* canvas_renderResourceGrid_getResourcesAll() {
    for (const [subframe, cacheEntry] of canvas_renderResourceGrid_resArr) {
        const resolution = cacheEntry.resolution;

        for (const [u, antMap] of cacheEntry.uMap) {
            for (const [antId, symMap] of antMap) {
                for (const [symbol, arr] of symMap) {
                    for (let idx = 0; idx < arr.length; idx++) {
                        const resource = arr[idx];

                        yield { subframe, u, antId, symbol, resource, resolution };
                    }
                }
            }
        }
    }
}

function* canvas_renderResourceGrid_getFcpInView( v, vst, vf ) {
    const transX = Math.round( vst.transX[v.mode] * vst.scaleX[v.mode] );

    const firstSubframe = Math.floor( -transX / vst.subframeSize );
    const firstFinalSubframe = 10 * vst.currentFrame + firstSubframe;
    const maxFinalSubframe = firstFinalSubframe + Math.ceil( v.usedWidth / vst.subframeSize ) + 1;

    for (const [subframe, uMap] of fcp_map) {
        if (subframe < firstFinalSubframe || subframe > maxFinalSubframe) continue;

        const finalFrame = Math.floor(subframe / 10);
        const localSubframe = subframe % 10;   //local meaning within frame
        if (vf.ranges.frame[1] !== -1 && !(vf.ranges.frame[0] <= finalFrame && finalFrame <= vf.ranges.frame[1])) continue;
        // if (vf.ranges.subframe[1] !== -1 && !(vf.ranges.subframe[0] <= localSubframe && localSubframe <= vf.ranges.subframe[1])) continue;

        if(vf.ranges.subframe[0] !== -1){
            if(vf.ranges.subframe[1] < 10 && (localSubframe < vf.ranges.subframe[0] || vf.ranges.subframe[1] < localSubframe)) continue;
            else if(vf.ranges.subframe[1] >= 10 && (subframe < vf.ranges.subframe[0] || vf.ranges.subframe[1] < subframe) ){ //Filtering for select mode
                continue;
            }
        }

        for (const [u, antMap] of uMap) {
            if (vf.selectedU[u] === false) continue;

            for (const [antId, allocations] of antMap) {
                if (vf.selectedAnt[u][antId] === false) continue;

                const specialFilteringON = vf.ranges.subframe[1] >= 10 || vf.ranges.symbol[1] >= NUM_OF_SYM_IN_SLOT_PER_U[u]; //Filtering for select mode

                for (let idx = 0; idx < allocations.length; idx++) {
                    const fcp = allocations[idx];
                    const symbol = fcp.symbol;

                    if (fcp.rb > v.lastRb[u] || (fcp.rb + fcp.numRb) < v.firstRb[u]) continue;
                    if( vf.ranges.RB[1] !== -1 && (!(vf.ranges.RB[0] <= fcp.rb && fcp.rb <= vf.ranges.RB[1])) ) continue;

                    const localSymbol = Math.floor(symbol % NUM_OF_SYM_IN_SLOT_PER_U[u]);
                    const localSlot = Math.floor(symbol / NUM_OF_SYM_IN_SLOT_PER_U[u])
                    // if (vf.ranges.symbol[1] !== -1 && !(vf.ranges.symbol[0] <= localSymbol && localSymbol <= vf.ranges.symbol[1])) continue;
                    if (vf.ranges.slot[1] !== -1 && !(vf.ranges.slot[0] <= localSlot && localSlot <= vf.ranges.slot[1])) continue;

                     if( vf.ranges.symbol[0] !== -1 ){
						if(!specialFilteringON &&
							(localSymbol < vf.ranges.symbol[0] || vf.ranges.symbol[1] < localSymbol )){
							continue;
						}
						else if(specialFilteringON &&
							((symbol < vf.ranges.symbol[0] && subframe === vf.ranges.subframe[0]) ||
							(vf.ranges.symbol[1] < symbol && subframe === vf.ranges.subframe[1]))){ //Special filtering for select mode (vf.ranges.symbol is finalSymbol not localSymbol)
							continue;
						}
					}

                    yield { subframe, u, antId, fcp };
                }
            }
        }
    }
}

function canvas_renderResourceGrid_addRes( sym, re, innerOffsetX, innerOffsetY, innerCount, ch, i, q, subframe, u, antId ) {
    canvas_renderResourceGrid_resArr.get(subframe).uMap.get(u).get(antId).get(sym).push( new ReGrid_Resource( re, innerOffsetX, innerOffsetY, innerCount, ch, i, q ) );
}

// TODO: check where this function is called
function reGrid_invalidateCache(){
    canvas_renderResourceGrid_resArr.clear();
    fcp_map.clear();
}

function canvas_resourceGrid_gatherResources(v, vst, vf, transX, targetResolution){

    const firstSubframe = Math.floor( -transX / vst.subframeSize );
    const firstFinalSubframe = 10 * vst.currentFrame + firstSubframe;
    const maxFinalSubframe = firstFinalSubframe + Math.ceil( v.usedWidth / vst.subframeSize ) + 1;

    const activeAntIds = getActiveAntIdsFromViewports(v);

    for( let finalSubframe = firstFinalSubframe; finalSubframe < maxFinalSubframe; ++finalSubframe ) {
        if(canvas_renderResourceGrid_resArr.has(finalSubframe)){
            if( canvas_renderResourceGrid_resArr.get(finalSubframe).resolution > targetResolution ) {
                canvas_renderResourceGrid_resArr.delete(finalSubframe);
            } else{
                continue;
            }
        }

        /** @type {Object<string, Array<ResourceAllocation>>} */
        const allocations = {};

        const resArrSf = new RegridCacheEntry(targetResolution);
        canvas_renderResourceGrid_resArr.set(finalSubframe, resArrSf);

        for(let {u, antId} of activeAntIds){
            if(resArrSf.uMap.has(u) === false){
                resArrSf.uMap.set(u, new Map());
            }
            const resArrSfU = resArrSf.uMap.get(u);
            const resArrSfUAntId = new Map();
            resArrSfU.set(antId, resArrSfUAntId);

            const iqBuf = iqBuffers[u][antId].buffer;
            const iqTypeBuf = iqTypeBuffers[u][antId].buffer;
            const iqOffsets_sf = iqOffsets[u][antId];
            const iqNumPrb_sf = iqNumPrb[u][antId];
            const iqStartPrb_sf = iqStartPrb[u][antId];

            if(finalSubframe >= iqNumPrb_sf.length ) break;
            if( iqNumPrb_sf[finalSubframe] === 0) continue;

            const iqOffsets_sym = iqOffsets_sf[finalSubframe];
            const iqNumPrb_sym = iqNumPrb_sf[finalSubframe];
            if(iqNumPrb_sym === undefined) continue;

            const iqStartPrb_sym = iqStartPrb_sf[finalSubframe];

            for( let sym = 0; sym < NUM_OF_SYM_IN_SF_PER_U[u]; ++sym ) {
                if(resArrSfUAntId.has(sym) === false){
                    resArrSfUAntId.set(sym, []);
                }
                const resArrSfUAntId_sym = resArrSfUAntId.get(sym);

                const numPrb = iqNumPrb_sym[sym];
                if( !numPrb ) continue;
                const startPrb = iqStartPrb_sym[sym];

                const iq = new Float32Array( iqBuf, iqOffsets_sym[sym] * 4, numPrb * 24 );
                const iqType = new Uint8Array( iqTypeBuf, iqOffsets_sym[sym]/2, iqOffsets_sym[sym]/2+numPrb*12<iqTypeBuffers[u][antId].length ? numPrb*12 : iqTypeBuffers[u][antId].length-iqOffsets_sym[sym]/2 );

                const packets_in_place = packet_places[u][antId][finalSubframe+":"+sym];
                const active_packets = [];

                if(iqTabFiltersDialog_usePacketFilter.checked && filteredPacketsIds.length !== packets.length){
                    for(let j = 0; j < packets_in_place.length; j++){
                        if(filteredPacketsIds_set.has(packets_in_place[j])) {
                            active_packets.push(packets_in_place[j]);
                        }
                    }
                    if(active_packets.length === 0) continue;
                }
                if ( filteredPacketsIds.length !== packets.length &&
                    (iqTabFiltersDialog_frameFilterCheckbox.checked ||
                        iqTabFiltersDialog_subframeFilterCheckbox.checked ||
                        iqTabFiltersDialog_slotFilterCheckbox.checked ||
                        iqTabFiltersDialog_symbolFilterCheckbox.checked) ) {
                    if(vf.filteredPackets.size !== undefined && vf.filteredPackets.size !== 0){
                        for(let j = 0; j < packets_in_place.length; j++){
                            if(vf.filteredPackets.has(packets_in_place[j])) {
                                active_packets.push(packets_in_place[j]);
                            }
                        }
                        if(active_packets.length === 0) continue;
                    }
                }

                for( let curPrb = startPrb; curPrb < startPrb+numPrb; ++curPrb ) {
                    if( !shouldPacketBeRendered(active_packets, curPrb)) continue;

                    const isPrbDecoded = ( iq[24 * (curPrb-startPrb)] !== Infinity );
                    if( isPrbDecoded ) {
                        let firstFinalRe = 12 * curPrb;
                        const maxFinalRe = firstFinalRe + 12;
                        // Aggregate based on target resolution
                        for (let groupStart = firstFinalRe; groupStart < maxFinalRe; groupStart += targetResolution) {
                            const channels = [];
                            const i = [];
                            const q = [];
                            // Calculate averages for the group
                            for (let finalRe = groupStart; finalRe < groupStart + targetResolution; ++finalRe) {
                                channels.push(iqType[finalRe - 12*startPrb]);
                                const iqIdx = (finalRe-12*startPrb) << 1;
                                i.push(iq[iqIdx]);
                                q.push(iq[iqIdx + 1]);
                            }

                            const symbolPlace = (sym * 32 / NUM_OF_SLOTS_PER_U[u]) + ":" + (groupStart * NUM_OF_SLOTS_PER_U[u]);
                            if (!allocations[symbolPlace]) allocations[symbolPlace] = [];
                            allocations[symbolPlace].push( new ResourceAllocation(resArrSfUAntId_sym.length, u, antId, sym) );

                            canvas_renderResourceGrid_addRes( sym, groupStart,1, 1,0,
                                channels, i, q,
                                finalSubframe, u, antId
                            );
                        }
                    }
                }
            }

            if (!isDeepRx) {
                const fcp_packets = fcp_places[u][antId][finalSubframe];
                if(fcp_map.has(finalSubframe) === false) fcp_map.set(finalSubframe, new Map());
                if(fcp_map.get(finalSubframe).has(u) === false) fcp_map.get(finalSubframe).set(u, new Map());
                if(fcp_map.get(finalSubframe).get(u).has(antId) === false) fcp_map.get(finalSubframe).get(u).set(antId, []);
                const fcpArray = fcp_map.get(finalSubframe).get(u).get(antId);

                if(fcpArray.length === 0 ){
                    for(let i = 0; fcp_packets && i < fcp_packets.length; i++){
                        const packetPlace = fcp_packets[i];
                        const packetId = packetPlace.packet;
                        if(iqTabFiltersDialog_usePacketFilter.checked){
                            if(!filteredPacketsIds_set.has(packetId)) continue; //check filters
                        }

                        const finalSymbol = packetPlace.x0;
                        if (finalSymbol >= NUM_OF_SYM_IN_SF_PER_U[u]) continue;

                        fcpArray.push( new FcpAllocation(
                            Math.floor(finalSymbol),
                            Math.floor(packetPlace.y0),
                            Math.floor(packetPlace.x1 - packetPlace.x0),
                            Math.floor(packetPlace.y1 - packetPlace.y0),
                            packetPlace.packet,
                            packetPlace.sect) );
                    }
                }
            }
        }

        // Check if resource blocks are overlapping and make them fit
        const resArr = canvas_renderResourceGrid_resArr.get(finalSubframe).uMap;
        for(let i in allocations) {
            const len = allocations[i].length;
            if(len < 2) continue;

            const num = Math.ceil(Math.sqrt(len));
            let xNumb = num;
            let yNumb = num;
            if((xNumb-1) * yNumb >= len){
                --yNumb;
            }

            for(let j = 0; j < len; j++){
                const alloc = allocations[i][j];
                const res = resArr.get(alloc.u).get(alloc.antId).get(alloc.symbol)[alloc.id];
                res.innerCount = j; //Count of packets in the same slot
                res.innerOffsetX = xNumb; //Offset of packet in the same slot
                res.innerOffsetY = yNumb;
            }
        }
    }
}

function canvas_renderResourceGrid_trimCache() {
    const usedSubframes = new Set();
    const subframeMinResolutions = new Map();

    for( let vIdx = 0; vIdx < canvas_numOfActiveViewports; ++vIdx ) {
        const v = canvas_viewports[vIdx];
        const vst = config.iqTab.unitedScaleAndMove ? canvas_viewports[0] : canvas_viewports[vIdx];
        const prbResolution = canvas_renderResourceGrid_getViewResolution(vst);

        const transX = Math.round( vst.transX[v.mode] * vst.scaleX[v.mode] );
        const firstSubframe = 10 * vst.currentFrame + Math.floor( -transX / vst.subframeSize );
        const lastSubframe = firstSubframe + Math.ceil( v.usedWidth / vst.subframeSize ) + 1 ;

        for (const subframe of canvas_renderResourceGrid_resArr.keys()) {
            if (subframe >= firstSubframe && subframe < lastSubframe) {
                usedSubframes.add(subframe);
                const currentMinResolution = subframeMinResolutions.get(subframe) || Infinity;
                subframeMinResolutions.set(subframe, Math.min(currentMinResolution, prbResolution));
            }
        }
    }

    // Remove subframes that are not used in any viewport
    for (const subframe of canvas_renderResourceGrid_resArr.keys()) {
        if (!usedSubframes.has(subframe)) {
            canvas_renderResourceGrid_resArr.delete(subframe);
            fcp_map.delete(subframe);
        }
    }

    // Remove subframes with cached resolution lower than the minimum resolution of all views
    for (const [subframe, cacheEntry] of canvas_renderResourceGrid_resArr.entries()) {
        const minResolution = subframeMinResolutions.get(subframe);
        if (minResolution !== undefined && cacheEntry.resolution < minResolution) {
            canvas_renderResourceGrid_resArr.delete(subframe);
            fcp_map.delete(subframe);
        }
    }
}
