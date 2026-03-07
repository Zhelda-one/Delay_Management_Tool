function ecpri_getPropExtraInfo_message(propName, pkt){
    if(pkt.ecpri.message === ECPRI_MESSAGE.IQ_DATA){
        return ecpri_getPropExtraInfo_message_iqData(pkt);
    }
    else if(pkt.ecpri.message === ECPRI_MESSAGE.FCP){
        return ecpri_getPropExtraInfo_message_FCP(pkt);
    }

    return null;
}

function ecpri_getPropExtraInfo_message_FCP(pkt){

    const maxPrb = config.load.nprb

    if(!pkt.ecpri.sections || pkt.ecpri.sections.length === 0){
        return null;
    }

    const linkedPackets = get_linked_packets(pkt.id);

    if(linkedPackets.linkedIQs === null || linkedPackets.linkedIQs.length === 0){
        return new PropExtraInfo(EXTRA_INFO_STATUS.error, "No linked IQ Data packets found");
    }

    const fcpPrbs = new Array(500).fill(false);
    const iqPrbs = new Array(500).fill(0);

    let message = "";
    let matchingSymbols = 0;

    for(let i = 0; i < pkt.ecpri.sections.length; i++){
        const fcpSection = pkt.ecpri.sections[i];

        const startPrb = fcpSection.startPrb;
        const numPrb = fcpSection.numPrb !== 0 ? fcpSection.numPrb : maxPrb;
        const numSymbol = fcpSection.numSymbol;

        for(let symbol = pkt.ecpri.startSymbolId; symbol < (pkt.ecpri.startSymbolId+numSymbol); ++symbol){
            fcpPrbs.forEach((_, id)=> fcpPrbs[id] =  id >= startPrb && id < (startPrb+numPrb) );
            iqPrbs.fill(0);

            let matchingSections = 0;

            for(const linkedPktId of linkedPackets.linkedIQs){
                const linkedPkt = packets[linkedPktId];
                if(symbol !== linkedPkt.ecpri.startSymbolId)
                    continue;

                for(let j = 0; j < linkedPkt.ecpri.sections.length; ++j){
                    const iqSection = linkedPkt.ecpri.sections[j];

                    if(fcpSection.sectionId !== iqSection.sectionId)
                        continue;

                    ++matchingSections;
                    ++matchingSymbols;

                    const startPrb = iqSection.startPrb;
                    const numPrb = iqSection.numPrb !== 0 ? iqSection.numPrb : maxPrb;

                    for(let prb = startPrb; prb < (startPrb+numPrb); ++prb){
                        ++iqPrbs[prb];
                    }
                }
            }

            // Evaluate
            if(matchingSections === 0){
                message += `@ Symbol ${symbol} SectionId ${fcpSection.sectionId}:\n`;
                message += `No matching SectionIds\n`;
                continue;
            }

            const missingFcpPrbs = [];
            const missingIqPrbs = [];
            const tooManyIqPrbs = [];

            for(let prb = 0; prb < fcpPrbs.length; ++prb){
                if(!fcpPrbs[prb] && iqPrbs[prb] !== 0){
                    missingFcpPrbs.push(prb);
                }
                else if(fcpPrbs[prb] && iqPrbs[prb] === 0){
                    missingIqPrbs.push(prb);
                }
                else if(fcpPrbs[prb] && iqPrbs[prb] > 1){
                    tooManyIqPrbs.push(prb);
                }

            }

            if(missingIqPrbs.length || missingFcpPrbs.length || tooManyIqPrbs.length){
                message += `@ Symbol ${symbol} SectionId ${fcpSection.sectionId}:\n`;
            }
            if(missingIqPrbs.length){
                message += `PRBs missing in linked IQ Data: ${missingIqPrbs.join(", ")}\n`;
            }
            if(missingFcpPrbs.length){
                message += `PRBs found in IQ Data, but missing in FCP: ${missingFcpPrbs.join(", ")}\n`;
            }
            if(tooManyIqPrbs.length){
                message += `Overlapping PRBs in IQ Data: ${tooManyIqPrbs.join(", ")}\n`;
            }
        }
    }

    if(message.length === 0){
        return null;
    }

    return new PropExtraInfo(EXTRA_INFO_STATUS.warning, message);
}

function ecpri_getPropExtraInfo_message_iqData(pkt){
    return null;
}