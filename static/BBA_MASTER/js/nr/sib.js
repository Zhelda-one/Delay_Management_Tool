//Functions included in this file decode structures from 3gpp 38331 (and rely solely on this 3gpp spec)
//Main function is decode_BCCH_DL_SCH_Message which is meant to be called with string of bits as first argument and offset set to 0 as second argument
//Bits shall represent BCCH_DL_SCH_Message which is included in payload field of PdschPayloadTbSendRequest message type of BIP packets where rnti field is equal 0xFFFF (65535)
//This function will return [result,offset] where result represents decoded message and offset specifies number of interpreted bits

//All functions decode bits representing structures in ASN.1 language with PER encoding (based on T-REC-X.691 specification mentioned in 3gpp 38331 references)
//All functions contain name of structures or fields they decode
//SEQ_PREAMBLE suffix in variable name means that variable holds a preamble for specifying which OPTIONAL or DEFAULT fields are present (string variable)
//Preamble length is set equal to amount of OPTIONAL fields (or DEFAULT fields) in that structure

//EXT_FLAG suffix in variable name means it holds a bit specifying whether particular SEQUENCE or CHOICE element has its extension present (extensions are marked as ...)
//Extension flags are only present in particular structure if it contains "..." symbol inside
//Extension flags occur before preambles and occupy single bit
//Most extensions are not implemented due to Nokia not using them or their absence in (i-20 release of 38331).
//If extension flag === 1,extensions are encoded AFTER the entire non-extension part of SEQUENCE was encoded

function parse_ASN_INTEGER(payload,offset,lowBound,highBound){ //Parse INTEGER(lowBound,highBound) where the range is both-side inclusive
    let fieldSize;
    if(lowBound === highBound) fieldSize = Math.ceil(Math.log2(Math.abs(lowBound)));
    else fieldSize = Math.ceil( Math.log2(Math.abs(highBound - lowBound + 1)) );
    
    let val;
    [val,offset] = parseStringBitsToVal(payload,offset,fieldSize);
    val += lowBound; 

    if(val > highBound){
        console.log("Error: Val in parse_ASN_INTEGER exceeds upper bound")
        console.log("lowBound:",lowBound, "highbound:",highBound,"val:",val, "fieldSize:",fieldSize);
    } 
   
    return [val,offset];
}

function parse_ASN_ENUMERATED(payload,offset,enumArray){
    if(enumArray.length === 1) return [enumArray[0],offset];
    let index;
    [index,offset] = parse_ASN_INTEGER(payload,offset,0,enumArray.length - 1);
    return [enumArray[index],offset];
}

function parse_ASN_SEQUENCE_OF_SIZE(payload,offset,lowSizeBound,highSizeBound,element_decoder){
    let SEQ_SIZE;
    if(lowSizeBound !== highSizeBound) [SEQ_SIZE,offset] = parse_ASN_INTEGER(payload,offset,lowSizeBound,highSizeBound);
    else SEQ_SIZE = lowSizeBound;
    let decoded_SEQUENCE = new Array(SEQ_SIZE);

    for(let i = 0; i < SEQ_SIZE; i++){
        [decoded_SEQUENCE[i],offset] = element_decoder(payload,offset);
    }

    return [decoded_SEQUENCE,offset];
}

function parse_ASN_BITSTRING(payload,offset,lowSizeBound,highSizeBound){
    if(lowSizeBound === highSizeBound) return getStringBits(payload,offset,lowSizeBound);

    let fieldSize = Math.ceil( Math.log2(highSizeBound - lowSizeBound + 1) );
    return getStringBits(payload,offset,fieldSize);
}

function parse_ASN_OCTETSTRING(payload,offset,element_decoder){    
    let OCTETSTRING_LEN,offsetCpy;
    [OCTETSTRING_LEN,offset] = parse_ASN_LEN_DETERMINANT(payload,offset,"UNCONST");
    offsetCpy = offset;

    let result;
    [result,] = element_decoder(payload,offset);
    offset = offsetCpy + OCTETSTRING_LEN;

    return [result,offset];
}

function parse_ASN_OPENFIELD(payload,offset,element_decoder){
    let OPENFIELD_LEN = {},offsetCpy;
    [OPENFIELD_LEN,offset] = parse_ASN_LEN_DETERMINANT(payload,offset,"UNCONST"); //this length is in Bytes!
    offsetCpy = offset;

    let result = {};
    if(element_decoder){
        [result,] = element_decoder(payload,offset);
    }    

    offset = offsetCpy + 8*OPENFIELD_LEN; //Skip padding
    return [result,offset];
}

function skip_ASN_EXTENSIONS(payload,offset){
    let EXT_PREAMBLE;
    [EXT_PREAMBLE,offset] = parse_ASN_EXT_PREAMBLE(payload,offset);

    for(let i = 0; i < EXT_PREAMBLE.length; i++){
        if(EXT_PREAMBLE[i] === "0") continue;
        [,offset] = parse_ASN_OPENFIELD(payload,offset,null);
    }

    return [,offset];
}

function parse_ASN_LEN_DETERMINANT(payload,offset,type){
    let LENGTH;
    if(type === "NS"){ //11.9.3.4 - Normally small length, used only for bitmaps that prefix extension additions!
        let moreThan64;
        [moreThan64,offset] = parseStringBitsToVal(payload,offset,1);
        if(moreThan64){ //unconstrained length determinant
            console.log("Error: More than 64 in len determinant");
            return [-1,offset]; //NOT IMPLEMENTED
        }
        else{ //non-negative-binary-int into 6 bits            
            [LENGTH,offset] = parseStringBitsToVal(payload,offset,6);
            return [LENGTH,offset];
        }
    }
    else if(type === "UNCONST"){ //11.9 (NOTE 2), Unconstrained length, OCTET-ALIGNED
        let moreThan128;
        [moreThan128,offset] = parseStringBitsToVal(payload,offset,1);
        if(moreThan128){
            let moreThan16K;
            [moreThan16K,offset] = parseStringBitsToVal(payload,offset,1);
            [LENGTH,offset] = parseStringBitsToVal(payload,offset,14);
            return [LENGTH,offset];            
        }
        else{
            [LENGTH,offset] = parseStringBitsToVal(payload,offset,7);
            return [LENGTH,offset];
        }
    }
   else{
        console.log("Error: Unsupported len determinant type");
        return [-1,offset]; //NOT SUPPORTED
   }
}

function parse_ASN_NULL(payload,offset){
    return [{},offset]
}

function parse_ASN_CHOICE(payload,offset,choiceList){ //choiceList = [{name1 : decode1}, {name2 : decode2}, ....]
    try{
        let CHOICE_FLAG;
        [CHOICE_FLAG,offset] = parse_ASN_INTEGER(payload,offset,0,choiceList.length - 1);
        let FIELD_NAME = Object.keys(choiceList[CHOICE_FLAG])[0];
        let element_decoder = choiceList[CHOICE_FLAG][FIELD_NAME];
        if(element_decoder === null) return [{"error" : "null"},offset]
        
        let decoded;
        [decoded,offset] = element_decoder(payload,offset);
        return [{[FIELD_NAME] : decoded},offset]
    }
    catch(e){
        // console.log("Error:",e.message);
        return [{"Error" : {}},offset];
    }
}

function parse_ASN_SETREL(payload,offset,element_decoder){
    let SETREL_OPT;
    [SETREL_OPT,offset] = parseStringBitsToVal(payload,offset,1);

    if(SETREL_OPT === 0) return [{},offset] //Release
    else{ //Setup
        return element_decoder(payload,offset);
    } 
}

function parse_ASN_BOOLEAN(payload,offset){
    let val;
    [val,offset] = parseStringBitsToVal(payload,offset,1);
    if(val === 0) return [false,offset];
    return [true,offset]
}

function parse_ASN_EXT_FLAG(payload,offset){
    let flag;
    [flag,offset] = parseStringBitsToVal(payload,offset,1);
    // if(flag) console.log("Warning: EXT_FLAG is present");
    return [flag,offset];
}

function parseStringBitsToVal(payload,offset,size){    
    if(size <= 0) return [-1,offset]; 
    const decoded = parseInt(payload.substr(offset,size),2);
    offset += size;
   
    return [decoded,offset];
}

function getStringBits(payload,offset,size){
    if(size <= 0) return ["",offset];
    const bitsAsStr = payload.substr(offset,size);
    offset += size;
    return [bitsAsStr,offset];
}

function parse_ASN_EXT_PREAMBLE(payload,offset){
    let nrofExtensions;
    [nrofExtensions,offset] = parse_ASN_LEN_DETERMINANT(payload,offset,"NS");
    nrofExtensions+=1;

    let EXT_PREAMBLE;
    [EXT_PREAMBLE,offset] = getStringBits(payload,offset,nrofExtensions);

    return [EXT_PREAMBLE,offset];
}

function parse_ASN_PADDING(payload,offset){ //Moves offset to achieve octet alignment
    if(offset % 8 === 0) return [,offset];
    offset += 8 - (offset % 8);
    return [,offset];
}

function getStringBitsHEX(payload,offset,size){
    if(size <= 0) return ["",offset];
    let bitsAsStr;
    [bitsAsStr,offset] = getStringBits(payload,offset,size);

    let hexString = "";
    for (let i = 0; i < bitsAsStr.length; i += 4) {
        const chunk = bitsAsStr.slice(i, i + 4);
        const hex = parseInt(chunk, 2).toString(16);
        hexString += hex;
    }
    return [hexString,offset]
}

function decode_P_Max(payload,offset){
    return parse_ASN_INTEGER(payload,offset,-30,33);
}

function decode_ControlResourceSetId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,11);
}

function decode_PRB_Id(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,274);
}

function decode_TCI_StateId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,127);
}

function decode_TimeAlignmentTimer(payload,offset){
    return parse_ASN_ENUMERATED(payload,offset,["ms500", "ms750", "ms1280", "ms1920", "ms2560", "ms5120", "ms10240", "infinity"])
}

function decode_RSRP_Range(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,127);
}

function decode_RSRQ_Range(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,127);
}

function decode_SINR_Range(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,127);
}

function decode_Q_RxLevMin(payload,offset){
    return parse_ASN_INTEGER(payload,offset,-70,-22);
}

function decode_Q_QualMin(payload,offset){
    return parse_ASN_INTEGER(payload,offset,-43,-12);
}

function decode_MCC_MNC_Digit(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,9);
}

function decode_MCC(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,3,3,decode_MCC_MNC_Digit);
}

function decode_MNC(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,2,3,decode_MCC_MNC_Digit);
}

function decode_TrackingAreaCode(payload,offset){
    return parse_ASN_BITSTRING(payload,offset,24,24);
}

function decode_RAN_AreaCode(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,255);
}

function decode_CellIdentity(payload,offset){
    return parse_ASN_BITSTRING(payload,offset,36,36);
}

function decode_SearchSpaceId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,39);
}

function decode_ControlResourceSetZero(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,15);
}

function decode_SearchSpaceZero(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,15);
}

function decode_SubcarrierSpacing(payload,offset){ 
    return parse_ASN_ENUMERATED(payload,offset,["kHz15", "kHz30", "kHz60", "kHz120", "kHz240", "kHz480-v1700", "kHz960-v1700", "spare1"]);
}

function decode_FreqBandIndicatorNR(payload,offset){
    return parse_ASN_INTEGER(payload,offset,1,1024);
}

function decode_ARFCN_ValueNR(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,3279165);
}

function decode_AdditionalSpectrumEmission(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,7);
}

function decode_PhysCellId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,1007);
}

function decode_UAC_BarringInfoSetIndex(payload,offset){
    return parse_ASN_INTEGER(payload,offset,1,8);
}

function decode_CellAccessRelatedInfo(payload,offset){ 
    let cellAccessRelatedInfo_EXT_FLAG,cellAccessRelatedInfo_SEQ_PREAMBLE, decoded_CellAccessRelatedInfo = {};
    [cellAccessRelatedInfo_EXT_FLAG, offset] = parse_ASN_EXT_FLAG(payload,offset);
    [cellAccessRelatedInfo_SEQ_PREAMBLE, offset] = getStringBits(payload,offset,1); //BitMask indicating which OPTIONAL fields are present in SEQUENCE element

    [decoded_CellAccessRelatedInfo["plmn-IdentityInfoList"],offset] = decode_PLMN_IdentityInfoList(payload,offset);
    if(cellAccessRelatedInfo_SEQ_PREAMBLE[0] === "1") [decoded_CellAccessRelatedInfo["cellReservedForOtherUse"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);

    if(cellAccessRelatedInfo_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_CellAccessRelatedInfo,offset];
}

function decode_PLMN_IdentityInfoList(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,12,decode_PLMN_IdentityInfo);
}

function decode_PLMN_IdentityInfo(payload,offset){
    let PLMN_IdentityInfo_EXT_FLAG,PLMN_IdentityInfo_SEQ_PREAMBLE, decoded_PLMN_IdentityInfo = {};

    [PLMN_IdentityInfo_EXT_FLAG, offset] = parse_ASN_EXT_FLAG(payload,offset);
    [PLMN_IdentityInfo_SEQ_PREAMBLE, offset] = getStringBits(payload, offset, 2);

    [decoded_PLMN_IdentityInfo["plmn-IdentityList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,12,decode_PLMN_Identity);
    if( PLMN_IdentityInfo_SEQ_PREAMBLE[0] === "1" ) [decoded_PLMN_IdentityInfo["trackingAreaCode"], offset] = decode_TrackingAreaCode(payload,offset);
    if( PLMN_IdentityInfo_SEQ_PREAMBLE[1] === "1" ) [decoded_PLMN_IdentityInfo["ranac"], offset] = decode_RAN_AreaCode(payload,offset);
    [decoded_PLMN_IdentityInfo["cellIdentity"], offset] = decode_CellIdentity(payload,offset);
    [decoded_PLMN_IdentityInfo["cellReservedForOperatorUse"], offset] = parse_ASN_ENUMERATED(payload,offset,["reserved","notReserved"])  
    
    if(PLMN_IdentityInfo_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_PLMN_IdentityInfo,offset];
}

function decode_PLMN_Identity(payload,offset){
    let PLMN_Identity_SEQ_PREAMBLE, decoded_PLMN_Identity = {};
    [PLMN_Identity_SEQ_PREAMBLE, offset] = getStringBits(payload,offset,1);

    if(PLMN_Identity_SEQ_PREAMBLE[0] === "1") [decoded_PLMN_Identity["mcc"],offset] = decode_MCC(payload,offset);
    [decoded_PLMN_Identity["mnc"],offset] = decode_MNC(payload,offset);

    return [decoded_PLMN_Identity,offset];
}

function decode_ConnEstFailureControl(payload,offset){ 
    let connEstFailureControl_SEQ_PREAMBLE, decoded_ConnEstFailureControl = {};
    [connEstFailureControl_SEQ_PREAMBLE, offset] = getStringBits(payload,offset,1);

    [decoded_ConnEstFailureControl["connEstFailCount"],offset] = parse_ASN_ENUMERATED(payload,offset,["n1","n2","n3","n4"]);
    [decoded_ConnEstFailureControl["connEstFailOffsetValidity"],offset] = parse_ASN_ENUMERATED(payload,offset,["s30","s60", "s120", "s240", "s300", "s420","s600","s900"]);
    if(connEstFailureControl_SEQ_PREAMBLE[0] === "1") [decoded_ConnEstFailureControl["connEstFailOffset"],offset] = parse_ASN_INTEGER(payload,offset,0,15);

    return [decoded_ConnEstFailureControl,offset]
}

function decode_SIB_Mapping(payload,offset){ 
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,32,decode_SIB_TypeInfo);
}

function decode_SIB_TypeInfo(payload,offset){
    let SIB_TypeInfo_SEQ_PREAMBLE, decoded_SIB_TypeInfo = {};
    [SIB_TypeInfo_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    let type_EXT_FLAG; //Enum ends with ..., this flag indicated if the enumerated value is part of the ... extension
    [type_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

    [decoded_SIB_TypeInfo["type"], offset] = parse_ASN_ENUMERATED(payload,offset,["sibTyp2","sibTyp3","sibTyp4","sibTyp5","sibTyp6","sibTyp7","sibTyp8","sibTyp9","sibTyp10","sibTyp11","sibTyp12","sibTyp13","sibTyp14","spare3","spare2","spare1"]);
    if(SIB_TypeInfo_SEQ_PREAMBLE[0]==="1") [ decoded_SIB_TypeInfo["valueTag"],offset] = parse_ASN_INTEGER(payload,offset,0,31);
    if(SIB_TypeInfo_SEQ_PREAMBLE[1]==="1") [decoded_SIB_TypeInfo["areaScope"],offset] = parse_ASN_ENUMERATED(payload,offset, ["true"]);
        
    return [decoded_SIB_TypeInfo,offset];
}

function decode_RACH_ConfigGeneric(payload,offset){ 
    let RACH_ConfigGeneric_EXT_FLAG, decoded_RACH_ConfigGeneric = {};

    [RACH_ConfigGeneric_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
 
    [decoded_RACH_ConfigGeneric["prach-ConfigurationIndex"],offset] = parse_ASN_INTEGER(payload,offset,0,255);
    [decoded_RACH_ConfigGeneric["msg1-FDM"],offset] = parse_ASN_ENUMERATED(payload,offset,["one", "two", "four", "eight"]);
    [decoded_RACH_ConfigGeneric["msg1-FrequencyStart"],offset] = parse_ASN_INTEGER(payload,offset,0,274);
    [decoded_RACH_ConfigGeneric["zeroCorrelationZoneConfig"],offset] = parse_ASN_INTEGER(payload,offset,0,15);
    [decoded_RACH_ConfigGeneric["preambleReceivedTargetPower"],offset] = parse_ASN_INTEGER(payload,offset,-202,-60);
    [decoded_RACH_ConfigGeneric["preambleTransMax"],offset] = parse_ASN_ENUMERATED(payload,offset,["n3", "n4", "n5", "n6", "n7", "n8", "n10", "n20", "n50", "n100", "n200"]);
    [decoded_RACH_ConfigGeneric["powerRampingStep"],offset] = parse_ASN_ENUMERATED(payload,offset,["dB0", "dB2", "dB4", "dB6"]);
    [decoded_RACH_ConfigGeneric["ra-ResponseWindow"],offset] = parse_ASN_ENUMERATED(payload,offset,["sl1", "sl2", "sl4", "sl8", "sl10", "sl20", "sl40", "sl80"]);

    if(RACH_ConfigGeneric_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_RACH_ConfigGeneric,offset];
}

function decode_SI_RequestConfig(payload,offset){ 
    let SI_RequestConfig_SEQ_PREAMBLE, decoded_SI_RequestConfig = {};
    [SI_RequestConfig_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    if(SI_RequestConfig_SEQ_PREAMBLE[0] === "1"){ //rach-OccasionsSI 
        let decoded_rach_OccasionsSI = {};
        [decoded_rach_OccasionsSI["rach-ConfigSI"],offset] = decode_RACH_ConfigGeneric(payload,offset);
        [decoded_rach_OccasionsSI["ssb-perRACH-Occasion"],offset] = parse_ASN_ENUMERATED(payload,offset,["oneEighth", "oneFourth", "oneHalf", "one", "two", "four", "eight", "sixteen"]);

        decoded_SI_RequestConfig["rach-OccasionsSI"] = decoded_rach_OccasionsSI;
    }
    if(SI_RequestConfig_SEQ_PREAMBLE[1] === "1") [decoded_SI_RequestConfig["si-RequestPeriod"],offset] = parse_ASN_ENUMERATED(payload,offset,["one", "two", "four", "six", "eight", "ten", "twelve", "sixteen"]);
    [decoded_SI_RequestConfig["si-RequestResources"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,32,decode_SI_RequestResources);
   
    return [decoded_SI_RequestConfig,offset];
}

function decode_SI_RequestResources(payload,offset){
    let SI_RequestResources_SEQ_PREAMBLE, decoded_SI_RequestResources = {};
    [SI_RequestResources_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    [decoded_SI_RequestResources["ra-PreambleStartIndex"],offset] = parse_ASN_INTEGER(payload,offset,0,63);
    if(SI_RequestResources_SEQ_PREAMBLE[0] === "1") [decoded_SI_RequestResources["ra-AssociationPeriodIndex"],offset] = parse_ASN_INTEGER(payload,offset,0,15);    
    if(SI_RequestResources_SEQ_PREAMBLE[1] === "1") [decoded_SI_RequestResources["ra-ssb-OccasionMaskIndex "],offset] = parse_ASN_INTEGER(payload,offset,0,15);
    
    return [decoded_SI_RequestResources,offset];
}

function decode_SI_SchedulingInfo(payload,offset){ 
    let SI_SchedulingInfo_EXT_FLAG,SI_SchedulingInfo_SEQ_PREAMBLE, decoded_SI_SchedulingInfo = {};

    [SI_SchedulingInfo_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [SI_SchedulingInfo_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);

    [decoded_SI_SchedulingInfo["schedulingInfoList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,32,decode_SchedulingInfo);
    [decoded_SI_SchedulingInfo["si-WindowLength"],offset] = parse_ASN_ENUMERATED(payload,offset,["s5", "s10", "s20", "s40", "s80", "s160", "s320", "s640", "s1280", "s2560-v1710", "s5120-v1710"]); 
    if( SI_SchedulingInfo_SEQ_PREAMBLE[0] === "1" ) [decoded_SI_SchedulingInfo["si-RequestConfig"],offset] = decode_SI_RequestConfig(payload,offset);
    if( SI_SchedulingInfo_SEQ_PREAMBLE[1] === "1" ) [decoded_SI_SchedulingInfo["si-RequestConfigSUL"],offset] = decode_SI_RequestConfig(payload,offset);        
    if( SI_SchedulingInfo_SEQ_PREAMBLE[2] === "1")  [decoded_SI_SchedulingInfo["systemInformationAreaID"],offset] = parse_ASN_BITSTRING(payload,offset,24,24);        

    if(SI_SchedulingInfo_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_SI_SchedulingInfo,offset];
}

function decode_SchedulingInfo(payload,offset){
    let decoded_SchedulingInfo = {};
    [decoded_SchedulingInfo["si-BroadCastStatus"],offset] = parse_ASN_ENUMERATED(payload,offset,["broadcasting","notBroadcasting"]);
    [decoded_SchedulingInfo["si-Periodicity"],offset] = parse_ASN_ENUMERATED(payload,offset,["rf8", "rf16", "rf32", "rf64", "rf128", "rf256", "rf512"]);
    [decoded_SchedulingInfo["sib-MappingInfo"], offset] = decode_SIB_Mapping(payload,offset);

    return [decoded_SchedulingInfo,offset];
}

function decode_ControlResourceSet(payload,offset){
    let ControlResourceSet_EXT_FLAG,ControlResourceSet_SEQ_PREAMBLE,decoded_ControlResourceSet = {};

    [ControlResourceSet_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [ControlResourceSet_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,4);

    [decoded_ControlResourceSet["controlResourceSetId"],offset] = decode_ControlResourceSetId(payload,offset);
    [decoded_ControlResourceSet["frequencyDomainResources"],offset] = parse_ASN_BITSTRING(payload,offset,45,45);
    [decoded_ControlResourceSet["duration"],offset] = parse_ASN_INTEGER(payload,offset,1,3);

    function decode_interleaved(payload,offset){
        let interleaved_SEQ_PREAMBLE,decoded_interleaved = {};
        [interleaved_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

        [decoded_interleaved["reg-BundleSize"],offset] = parse_ASN_ENUMERATED(payload,offset,["n2", "n3", "n6"]);
        [decoded_interleaved["interleaverSize"],offset] = parse_ASN_ENUMERATED(payload,offset,["n2", "n3", "n6"]);
        if(interleaved_SEQ_PREAMBLE[0] === "1")  [decoded_interleaved["shiftIndex"],offset] = parse_ASN_INTEGER(payload,offset,0,274);          
        
        return [decoded_interleaved,offset];
    }
    function decode_nonInterleaved(payload,offset){
        return [null,offset]
    }
    [decoded_ControlResourceSet["cce-REG-MappingType"],offset] = parse_ASN_CHOICE(payload,offset,[{"interleaved" : decode_interleaved},{"nonInterleaved" : decode_nonInterleaved}]);

    [decoded_ControlResourceSet["precoderGranularity"],offset] = parse_ASN_ENUMERATED(payload,offset,["sameAsREG-bundle", "allContiguousRBs"]);
    if(ControlResourceSet_SEQ_PREAMBLE[0] === "1") [decoded_ControlResourceSet["tci-StatesPDCCH-ToAddList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,64,decode_TCI_StateId);    
    if(ControlResourceSet_SEQ_PREAMBLE[1] === "1") [decoded_ControlResourceSet["tci-StatesPDCCH-ToReleaseList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,64,decode_TCI_StateId);
    if(ControlResourceSet_SEQ_PREAMBLE[2] === "1") [decoded_ControlResourceSet["tci-PresentInDCI"],offset] = parse_ASN_ENUMERATED(payload,offset,["enabled"]);
    if(ControlResourceSet_SEQ_PREAMBLE[3] === "1") [decoded_ControlResourceSet["pdcch-DMRS-ScramblingID"],offset] = parse_ASN_INTEGER(payload,offset,0,65535);
    
    if(ControlResourceSet_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_ControlResourceSet,offset];
}

function decode_SearchSpace(payload,offset){
    let searchSpace_SEQ_PREAMBLE,decoded_SearchSpace = {};

    [searchSpace_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,6);

    [decoded_SearchSpace["searchSpaceId"],offset] = decode_SearchSpaceId(payload,offset);
    if(searchSpace_SEQ_PREAMBLE[0] === "1") [decoded_SearchSpace["controlResourceSetId"],offset] = decode_ControlResourceSetId(payload,offset);

    let monitoringSlotPeriodicityAndOffset_CHOICE_LIST = [
        {"sl1" : function decode_sl1(payload,offset){return [null,offset];} },
        {"sl2" : function decode_sl2(payload,offset){return parse_ASN_INTEGER(payload,offset,0,1);} },
        {"sl4" : function decode_sl4(payload,offset){return parse_ASN_INTEGER(payload,offset,0,3);} },
        {"sl5" : function decode_sl5(payload,offset){return parse_ASN_INTEGER(payload,offset,0,4);} },
        {"sl8" : function decode_sl8(payload,offset){return parse_ASN_INTEGER(payload,offset,0,7);} },
        {"sl10" : function decode_sl10(payload,offset){return parse_ASN_INTEGER(payload,offset,0,9);} },
        {"sl16" : function decode_sl16(payload,offset){return parse_ASN_INTEGER(payload,offset,0,15);} },
        {"sl20" : function decode_sl20(payload,offset){return parse_ASN_INTEGER(payload,offset,0,19);} },
        {"sl40" : function decode_sl40(payload,offset){return parse_ASN_INTEGER(payload,offset,0,39);} },
        {"sl80" : function decode_sl80(payload,offset){return parse_ASN_INTEGER(payload,offset,0,79);} },
        {"sl160" : function decode_sl160(payload,offset){return parse_ASN_INTEGER(payload,offset,0,159);} },
        {"sl320" : function decode_sl320(payload,offset){return parse_ASN_INTEGER(payload,offset,0,319);} },
        {"sl640" : function decode_sl640(payload,offset){return parse_ASN_INTEGER(payload,offset,0,639);} },
        {"sl1280" : function decode_sl1280(payload,offset){return parse_ASN_INTEGER(payload,offset,0,1279);} },
        {"sl2560" : function decode_sl2560(payload,offset){return parse_ASN_INTEGER(payload,offset,0,2559);} }
    ];
    [decoded_SearchSpace["monitoringSlotPeriodicityAndOffset"],offset] = parse_ASN_CHOICE(payload,offset,monitoringSlotPeriodicityAndOffset_CHOICE_LIST);

    if(searchSpace_SEQ_PREAMBLE[2] === "1") [decoded_SearchSpace["duration"],offset] = parse_ASN_INTEGER(payload,offset,2,2559);
    if(searchSpace_SEQ_PREAMBLE[3] === "1") [decoded_SearchSpace["monitoringSymbolsWithinSlot"],offset] = parse_ASN_BITSTRING(payload,offset,14,14);

    if(searchSpace_SEQ_PREAMBLE[4] === "1"){ //nrOfCandidates
        let decoded_nrofCandidates = {};
        [decoded_nrofCandidates["aggregationLevel1"],offset] = parse_ASN_ENUMERATED(payload,offset,["n0", "n1", "n2", "n3", "n4", "n5", "n6", "n8"]);
        [decoded_nrofCandidates["aggregationLevel2"],offset] = parse_ASN_ENUMERATED(payload,offset,["n0", "n1", "n2", "n3", "n4", "n5", "n6", "n8"]);
        [decoded_nrofCandidates["aggregationLevel4"],offset] = parse_ASN_ENUMERATED(payload,offset,["n0", "n1", "n2", "n3", "n4", "n5", "n6", "n8"]);
        [decoded_nrofCandidates["aggregationLevel8"],offset] = parse_ASN_ENUMERATED(payload,offset,["n0", "n1", "n2", "n3", "n4", "n5", "n6", "n8"]);
        [decoded_nrofCandidates["aggregationLevel16"],offset] = parse_ASN_ENUMERATED(payload,offset,["n0", "n1", "n2", "n3", "n4", "n5", "n6", "n8"]);

        decoded_SearchSpace["nrofCandidates"] = decoded_nrofCandidates;
    }

    if(searchSpace_SEQ_PREAMBLE[5] === "1"){ //searchSpaceType (TODO)
        let searchSpaceType_CHOICE_FLAG, decoded_searchSpaceType = {};

        [searchSpaceType_CHOICE_FLAG,offset] = parseStringBitsToVal(payload,offset,1);
        if(searchSpaceType_CHOICE_FLAG === 0){ //Common
            let common_SEQ_PREAMBLE, decoded_common = {};
            [common_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,5);

            if(common_SEQ_PREAMBLE[0] === "1"){ //dci_Format0_0_AndFormat1_0
                decoded_common["dci_Format0_0_AndFormat1_0"] = {};
                let dci_Format0_0_AndFormat1_0_EXT_FLAG;
                [dci_Format0_0_AndFormat1_0_EXT_FLAG, offset] = parse_ASN_EXT_FLAG(payload,offset);
            }
            
            if(common_SEQ_PREAMBLE[1] === "1"){ //dci_Format2_0
                decoded_common["dci_Format2_0"] = {};
                let dci_Format2_0_EXT_FLAG;
                [dci_Format2_0_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

                let nrofCandidates_SFI_SEQ_PREAMBLE, decoded_nrofCandidates_SFI = {};
                const enum_nrOfCandidatesSFI = ["n1", "n2"];
                [nrofCandidates_SFI_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,5);
                if(nrofCandidates_SFI_SEQ_PREAMBLE[0] === "1"){
                    [decoded_nrofCandidates_SFI["aggLvl1"],offset] = parseStringBitsToVal(payload,offset,1);
                    decoded_nrofCandidates_SFI["aggLvl1"] = enum_nrOfCandidatesSFI[ decoded_nrofCandidates_SFI["aggLvl1"] ];
                }
                if(nrofCandidates_SFI_SEQ_PREAMBLE[1] === "1"){
                    [decoded_nrofCandidates_SFI["aggLvl2"],offset] = parseStringBitsToVal(payload,offset,1);
                    decoded_nrofCandidates_SFI["aggLvl2"] = enum_nrOfCandidatesSFI[ decoded_nrofCandidates_SFI["aggLvl2"] ];
                }
                if(nrofCandidates_SFI_SEQ_PREAMBLE[2] === "1"){
                    [decoded_nrofCandidates_SFI["aggLvl4"],offset] = parseStringBitsToVal(payload,offset,1);
                    decoded_nrofCandidates_SFI["aggLvl4"] = enum_nrOfCandidatesSFI[ decoded_nrofCandidates_SFI["aggLvl4"] ];
                }
                if(nrofCandidates_SFI_SEQ_PREAMBLE[3] === "1"){
                    [decoded_nrofCandidates_SFI["aggLvl8"],offset] = parseStringBitsToVal(payload,offset,1);
                    decoded_nrofCandidates_SFI["aggLvl8"] = enum_nrOfCandidatesSFI[ decoded_nrofCandidates_SFI["aggLvl8"] ];
                }
                if(nrofCandidates_SFI_SEQ_PREAMBLE[4] === "1"){
                    [decoded_nrofCandidates_SFI["aggLvl16"],offset] = parseStringBitsToVal(payload,offset,1);
                    decoded_nrofCandidates_SFI["aggLvl16"] = enum_nrOfCandidatesSFI[ decoded_nrofCandidates_SFI["aggLvl16"] ];
                }
                decoded_common["dci_Format2_0"]["nrofCandidates-SFI"] = decoded_nrofCandidates_SFI;
            }
            if(common_SEQ_PREAMBLE[2] === "1"){  //dci-Format2-1
                decoded_common["dci_Format2_1"] = {};
                let dci_Format2_1_EXT_FLAG;
                [dci_Format2_1_EXT_FLAG, offset] = parse_ASN_EXT_FLAG(payload,offset);
            }
            if(common_SEQ_PREAMBLE[3] === "1"){  //dci-Format2-2
                decoded_common["dci_Format2_2"] = {};
                let dci_Format2_2_EXT_FLAG;
                [dci_Format2_2_EXT_FLAG, offset] = parse_ASN_EXT_FLAG(payload,offset);
            }
            if(common_SEQ_PREAMBLE[4] === "1"){  //dci-Format2-3
                decoded_common["dci_Format2_3"] = {};
                let dci_Format2_3_EXT_FLAG, dci_Format2_3_SEQ_PREAMBLE;
                [dci_Format2_3_EXT_FLAG, offset] = parse_ASN_EXT_FLAG(payload,offset);

                [dci_Format2_3_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);
                if(dci_Format2_3_SEQ_PREAMBLE[0] === "1"){                    
                    [decoded_common["dci_Format2_3"]["dummy1"],offset] = parseStringBitsToVal(payload,offset,3);

                    const enum_dummy1 = ["sl1", "sl2", "sl4", "sl5", "sl8", "sl10", "sl16", "sl20"];
                    decoded_common["dci_Format2_3"]["dummy1"] = enum_dummy1[ decoded_common["dci_Format2_3"]["dummy1"] ];
                }
                
                [decoded_common["dci_Format2_3"]["dummy2"],offset] = parseStringBitsToVal(payload,offset,1);
                const enum_dummy2 = ["n1", "n2"];
                decoded_common["dci_Format2_3"]["dummy2"] = enum_dummy2[ decoded_common["dci_Format2_3"]["dummy2"] ];
            }
            decoded_searchSpaceType["common"] = decoded_common;
        }
        else{ //UE Specific
            let ue_Specific_EXT_FLAG, decoded_ue_Specific = {};

            [ue_Specific_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
            
            [decoded_ue_Specific["dci_Formats"],offset] = parseStringBitsToVal(payload,offset,1);
            const enum_dciFormat = ["formats0-0-And-1-0", "formats0-1-And-1-1"];
            decoded_ue_Specific["dci_Formats"] = enum_dciFormat[ decoded_ue_Specific["dci_Formats"] ];

            if(ue_Specific_EXT_FLAG === 1){
                [,offset] = skip_ASN_EXTENSIONS(payload,offset);
            }

            decoded_searchSpaceType["ue-Specific"] = decoded_ue_Specific;
        }
        decoded_SearchSpace["searchSpaceType"] = decoded_searchSpaceType;
    }
    return [decoded_SearchSpace,offset];
}

function decode_PDCCH_ConfigCommon(payload,offset){ 
    let PDCCH_ConfigCommon_SEQ_PREAMBLE,PDCCH_ConfigCommon_EXT_FLAG,decoded_PDCCH_ConfigCommon = {};

    [PDCCH_ConfigCommon_EXT_FLAG, offset] = parse_ASN_EXT_FLAG(payload,offset);
    [PDCCH_ConfigCommon_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,8);

    if(PDCCH_ConfigCommon_SEQ_PREAMBLE[0] === "1") [decoded_PDCCH_ConfigCommon["controlResourceSetZero"],offset] = decode_ControlResourceSetZero(payload,offset);
    if(PDCCH_ConfigCommon_SEQ_PREAMBLE[1] === "1") [decoded_PDCCH_ConfigCommon["commonControlResourceSet"],offset] = decode_ControlResourceSet(payload,offset);
    if(PDCCH_ConfigCommon_SEQ_PREAMBLE[2] === "1") [decoded_PDCCH_ConfigCommon["searchSpaceZero"],offset] = decode_SearchSpaceZero(payload,offset);
    if(PDCCH_ConfigCommon_SEQ_PREAMBLE[3] === "1") [decoded_PDCCH_ConfigCommon["commonSearchSpaceList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,decode_SearchSpace);
    if(PDCCH_ConfigCommon_SEQ_PREAMBLE[4] === "1") [decoded_PDCCH_ConfigCommon["searchSpaceSIB1"],offset] = decode_SearchSpaceId(payload,offset);
    if(PDCCH_ConfigCommon_SEQ_PREAMBLE[5] === "1") [decoded_PDCCH_ConfigCommon["searchSpaceOSI"],offset] = decode_SearchSpaceId(payload,offset);
    if(PDCCH_ConfigCommon_SEQ_PREAMBLE[6] === "1") [decoded_PDCCH_ConfigCommon["pagingSearchSpace"],offset] = decode_SearchSpaceId(payload,offset);
    if(PDCCH_ConfigCommon_SEQ_PREAMBLE[7] === "1") [decoded_PDCCH_ConfigCommon["ra-SearchSpace"],offset] = decode_SearchSpaceId(payload,offset);

    if(PDCCH_ConfigCommon_EXT_FLAG === 1){ //TODO!
        // console.log("EXT_FLAG2 captured");
        let PDCCH_ConfigCommon_EXT_PREAMBLE;
        [PDCCH_ConfigCommon_EXT_PREAMBLE,offset] = parse_ASN_EXT_PREAMBLE(payload,offset);

        if(PDCCH_ConfigCommon_EXT_PREAMBLE.length > 0 && PDCCH_ConfigCommon_EXT_PREAMBLE[0] === "1"){
            let EXT_ADDITION_LENGTH,EXT_ADDITION_SEQ_PREAMBLE, offset_copy;
            [EXT_ADDITION_LENGTH,offset] = parseStringBitsToVal(payload,offset,8);
            offset_copy = offset;
            [EXT_ADDITION_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);
            offset += 1;
            // console.log("EXT_ADDITION_SEQ_PREM",EXT_ADDITION_SEQ_PREAMBLE);
            // console.log("EXT_ADD_LEN:",EXT_ADDITION_LENGTH);
            if(EXT_ADDITION_SEQ_PREAMBLE[0] === "1"){
                [decoded_PDCCH_ConfigCommon["firstPDCCH-MonitoringOccasionOfPO"],offset] = parse_ASN_CHOICE(payload,offset,[
                    {"sCS15KHZoneT" : (payload,offset)=>{return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,(payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,139);});}},
                    {"sCS30KHZoneT-SCS15KHZhalfT" : (payload,offset)=>{return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,(payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,279);});}},
                    {"sCS60KHZoneT-SCS30KHZhalfT-SCS15KHZquarterT" : (payload,offset)=>{return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,(payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,559);});}},
                    {"sCS120KHZoneT-SCS60KHZhalfT-SCS30KHZquarterT-SCS15KHZoneEighthT" : (payload,offset)=>{return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,(payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,1119);});}},
                    {"sCS120KHZhalfT-SCS60KHZquarterT-SCS30KHZoneEighthT-SCS15KHZoneSixteenthT" : (payload,offset)=>{return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,(payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,2239);});}},
                    {"sCS120KHZquarterT-SCS60KHZoneEighthT-SCS30KHZoneSixteenthT" : (payload,offset)=>{return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,(payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,4479);});}},
                    {"sCS120KHZoneEighthT-SCS60KHZoneSixteenthT" : (payload,offset)=>{return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,(payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,8959);});}},
                    {"sCS120KHZoneSixteenthT" : (payload,offset)=>{return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,(payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,17919);});}}
                ]);
            } 
            offset = offset_copy + EXT_ADDITION_LENGTH*8;
        }
    }

    return [decoded_PDCCH_ConfigCommon,offset];
}

function decode_PDSCH_ConfigCommon(payload,offset){ 
    let PDSCH_ConfigCommon_EXT_FLAG, PDSCH_ConfigCommon_SEQ_PREAMBLE, decoded_PDSCH_ConfigCommon = {};

    [PDSCH_ConfigCommon_EXT_FLAG, offset] = parse_ASN_EXT_FLAG(payload,offset);
    [PDSCH_ConfigCommon_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    if(PDSCH_ConfigCommon_SEQ_PREAMBLE[0] === "1") [decoded_PDSCH_ConfigCommon["pdsch-TimeDomainAllocationList t"],offset] = decode_PDSCH_TimeDomainResourceAllocationList(payload,offset);
    
    if(PDSCH_ConfigCommon_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_PDSCH_ConfigCommon,offset];
}

function decode_PDSCH_TimeDomainResourceAllocationList(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,decode_PDSCH_TimeDomainResourceAllocation);
}

function decode_PDSCH_TimeDomainResourceAllocation(payload,offset){
    let PDSCH_TimeDomainResourceAllocation_SEQ_PREAMBLE, decoded_PDSCH_TimeDomainResourceAllocation = {};
    [PDSCH_TimeDomainResourceAllocation_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    if(PDSCH_TimeDomainResourceAllocation_SEQ_PREAMBLE[0] === "1") [decoded_PDSCH_TimeDomainResourceAllocation["k0"],offset] = parse_ASN_INTEGER(payload,offset,0,32);
    [decoded_PDSCH_TimeDomainResourceAllocation["mappingType"], offset] = parse_ASN_ENUMERATED(payload,offset,["typeA", "typeB"]);
    [decoded_PDSCH_TimeDomainResourceAllocation["startSymbolAndLength"], offset] = parse_ASN_INTEGER(payload,offset,0,127);

    return [decoded_PDSCH_TimeDomainResourceAllocation,offset];
}

function decode_RACH_ConfigCommon(payload,offset){
    let RACH_ConfigCommon_EXT_FLAG,RACH_ConfigCommon_SEQ_PREAMBLE,decoded_RACH_ConfigCommon = {};

    [RACH_ConfigCommon_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [RACH_ConfigCommon_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,7);

    [decoded_RACH_ConfigCommon["rach-ConfigGeneric"],offset] = decode_RACH_ConfigGeneric(payload,offset);
    if(RACH_ConfigCommon_SEQ_PREAMBLE[0] === "1") [decoded_RACH_ConfigCommon["totalNumberOfRA-Preambles"],offset] = parse_ASN_INTEGER(payload,offset,1,63);
    if(RACH_ConfigCommon_SEQ_PREAMBLE[1] === "1"){ //ssb_perRACH_OccasionAndCB_PreamblesPerSSB
        let ssb_perRACH_enum1 = ["n4","n8","n12","n16","n20","n24","n28","n32","n36","n40","n44","n48","n52","n56","n60","n64"];
        let ssb_perRACH_enum2 = ["n4","n8","n12","n16","n20","n24","n28","n32"];
        let ssb_perRACH_CHOICE_LIST = [
            {"oneEighth" : function decode_oneEighth(payload,offset){ return parse_ASN_ENUMERATED(payload,offset,ssb_perRACH_enum1);}},
            {"oneFourth" : function decode_oneEighth(payload,offset){ return parse_ASN_ENUMERATED(payload,offset,ssb_perRACH_enum1);}},
            {"oneHalf" : function decode_oneEighth(payload,offset){ return parse_ASN_ENUMERATED(payload,offset,ssb_perRACH_enum1);}},
            {"one" : function decode_oneEighth(payload,offset){ return parse_ASN_ENUMERATED(payload,offset,ssb_perRACH_enum1);}},
            {"two" : function decode_oneEighth(payload,offset){ return parse_ASN_ENUMERATED(payload,offset,ssb_perRACH_enum2);}},
            {"four" : function decode_oneEighth(payload,offset){ return parse_ASN_INTEGER(payload,offset,1,16);}},
            {"eight" : function decode_oneEighth(payload,offset){ return parse_ASN_INTEGER(payload,offset,1,8);}},
            {"sixteen" : function decode_oneEighth(payload,offset){ return parse_ASN_INTEGER(payload,offset,1,4);}},            
        ];
        [decoded_RACH_ConfigCommon["ssb_perRACH_OccasionAndCB_PreamblesPerSSB"],offset] = parse_ASN_CHOICE(payload,offset,ssb_perRACH_CHOICE_LIST);
    }
    if(RACH_ConfigCommon_SEQ_PREAMBLE[2] === "1"){ //groupBconfigured
        let decoded_groupBconfigured = {};
        [decoded_groupBconfigured["ra-Msg3SizeGroupA"],offset] = parse_ASN_ENUMERATED(payload,offset,["b56", "b144", "b208", "b256", "b282", "b480", "b640", "b800", "b1000", "b72", "spare6", "spare5","spare4", "spare3", "spare2", "spare1"]);
        [decoded_groupBconfigured["messagePowerOffsetGroupB"],offset] = parse_ASN_ENUMERATED(payload,offset,["minusinfinity", "dB0", "dB5", "dB8", "dB10", "dB12", "dB15", "dB18"]);
        [decoded_groupBconfigured["numberOfRA-PreamblesGroupA"],offset] = parse_ASN_INTEGER(payload,offset,1,64);
        
        decoded_RACH_ConfigCommon["groupBconfigured"] = decoded_groupBconfigured;
    }
    [decoded_RACH_ConfigCommon["ra-ContentionResolutionTimer"],offset] = parse_ASN_ENUMERATED(payload,offset, ["sf8", "sf16", "sf24", "sf32", "sf40", "sf48", "sf56", "sf64"]);
    if(RACH_ConfigCommon_SEQ_PREAMBLE[3] === "1") [decoded_RACH_ConfigCommon["rsrp-ThresholdSSB"],offset] = decode_RSRP_Range(payload,offset);
    if(RACH_ConfigCommon_SEQ_PREAMBLE[4] === "1") [decoded_RACH_ConfigCommon["rsrp-ThresholdSSB-SUL"],offset] = decode_RSRP_Range(payload,offset);
    
    let prach_RootSequenceIndex_CHOICE_LIST = [
        {"l839" : function decodel839(payload,offset){ return parse_ASN_INTEGER(payload,offset,0,837);}},
        {"l139" : function decodel839(payload,offset){ return parse_ASN_INTEGER(payload,offset,0,137);}},
    ];
    [decoded_RACH_ConfigCommon["prach-RootSequenceIndex"],offset] = parse_ASN_CHOICE(payload,offset,prach_RootSequenceIndex_CHOICE_LIST);

    if(RACH_ConfigCommon_SEQ_PREAMBLE[5] === "1") [decoded_RACH_ConfigCommon["msg1-SubcarrierSpacing"],offset] = decode_SubcarrierSpacing(payload,offset);
    [decoded_RACH_ConfigCommon["restrictedSetConfig"],offset] = parse_ASN_ENUMERATED(payload,offset,["unrestrictedSet", "restrictedSetTypeA", "restrictedSetTypeB"]);
    if(RACH_ConfigCommon_SEQ_PREAMBLE[6] === "1") [decoded_RACH_ConfigCommon["msg3-transformPrecoder"],offset] = parse_ASN_ENUMERATED(payload,offset,["enabled"]);
       
    if(RACH_ConfigCommon_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_RACH_ConfigCommon,offset];
}

function decode_PUSCH_ConfigCommon(payload,offset){ 
    let PUSCH_ConfigCommon_EXT_FLAG,PUSCH_ConfigCommon_SEQ_PREAMBLE,decoded_PUSCH_ConfigCommon = {};

    [PUSCH_ConfigCommon_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [PUSCH_ConfigCommon_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,4);

    if(PUSCH_ConfigCommon_SEQ_PREAMBLE[0] === "1") [decoded_PUSCH_ConfigCommon["groupHoppingEnabledTransformPrecoding"],offset] = parse_ASN_ENUMERATED(payload,offset,["enabled"]);
    if(PUSCH_ConfigCommon_SEQ_PREAMBLE[1] === "1") [decoded_PUSCH_ConfigCommon["pusch-TimeDomainAllocationList"],offset] = decode_PUSCH_TimeDomainResourceAllocationList(payload,offset);
    if(PUSCH_ConfigCommon_SEQ_PREAMBLE[2] === "1") [decoded_PUSCH_ConfigCommon["msg3-DeltaPreamble"],offset] =  parse_ASN_INTEGER(payload,offset,-1,6);
    if(PUSCH_ConfigCommon_SEQ_PREAMBLE[3] === "1") [decoded_PUSCH_ConfigCommon["p0-NominalWithGrant"],offset] = parse_ASN_INTEGER(payload,offset,-202,24);
    
    if(PUSCH_ConfigCommon_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_PUSCH_ConfigCommon,offset]
}

function decode_PUSCH_TimeDomainResourceAllocationList(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,decode_PUSCH_TimeDomainResourceAllocation);
}

function decode_PUSCH_TimeDomainResourceAllocation(payload,offset){
    let PUSCH_TimeDomainResourceAllocation_SEQ_PREAMBLE, decoded_PUSCH_TimeDomainResourceAllocation = {};

    [PUSCH_TimeDomainResourceAllocation_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    if(PUSCH_TimeDomainResourceAllocation_SEQ_PREAMBLE[0] === "1") [decoded_PUSCH_TimeDomainResourceAllocation["k2"],offset] = parse_ASN_INTEGER(payload,offset,0,32);
    [decoded_PUSCH_TimeDomainResourceAllocation["mappingType"],offset] = parse_ASN_ENUMERATED(payload,offset,["typeA","typeB"]);
    [decoded_PUSCH_TimeDomainResourceAllocation["startSymbolAndLength"],offset] = parse_ASN_INTEGER(payload,offset,0,127);

    return [decoded_PUSCH_TimeDomainResourceAllocation,offset];
}

function decode_PUCCH_ConfigCommon(payload,offset){
    let PUCCH_ConfigCommon_SEQ_PREAMBLE,PUCCH_ConfigCommon_EXT_FLAG, decoded_PUCCH_ConfigCommon = {};

    [PUCCH_ConfigCommon_EXT_FLAG, offset] = parse_ASN_EXT_FLAG(payload,offset);
    [PUCCH_ConfigCommon_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);

    if(PUCCH_ConfigCommon_SEQ_PREAMBLE[0] === "1") [decoded_PUCCH_ConfigCommon["pucch-ResourceCommon"],offset] = parse_ASN_INTEGER(payload,offset,0,15);
    [decoded_PUCCH_ConfigCommon["pucch-GroupHopping"],offset] = parse_ASN_ENUMERATED(payload,offset,["neither", "enable", "disable"]);    
    if(PUCCH_ConfigCommon_SEQ_PREAMBLE[1] === "1") [decoded_PUCCH_ConfigCommon["hoppingId"],offset] = parse_ASN_INTEGER(payload,offset,0,1023);
    if(PUCCH_ConfigCommon_SEQ_PREAMBLE[2] === "1") [decoded_PUCCH_ConfigCommon["p0-nominal"],offset] = parse_ASN_INTEGER(payload,offset,-202,24);
   
    if(PUCCH_ConfigCommon_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_PUCCH_ConfigCommon,offset];
}

function decode_MultiFrequencyBandListNR_SIB(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,8, decode_NR_MultiBandInfo);
} 

function decode_NR_MultiBandInfo(payload,offset){
    let NR_MultiBandInfo_SEQ_PREAMBLE, decoded_NR_MultiBandInfo = {};
    [NR_MultiBandInfo_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    if(NR_MultiBandInfo_SEQ_PREAMBLE[0] === "1") [decoded_NR_MultiBandInfo["freqBandIndicatorNR"],offset] = decode_FreqBandIndicatorNR(payload,offset);
    if(NR_MultiBandInfo_SEQ_PREAMBLE[1] === "1") [decoded_NR_MultiBandInfo["NR-NS-PmaxList"],offset] = decode_NR_NS_PmaxList(payload,offset);
    
    return [decoded_NR_MultiBandInfo,offset];
}

function decode_NR_NS_PmaxList(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,8,decode_NR_NS_PmaxValue);
}

function decode_NR_NS_PmaxValue(payload,offset){
    let NR_NS_PmaxValue_SEQ_PREAMBLE,decoded_NR_NS_PmaxValue = {};
    [NR_NS_PmaxValue_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    if(NR_NS_PmaxValue_SEQ_PREAMBLE[0] === "1") [decoded_NR_NS_PmaxValue["additionalPmax"], offset] = decode_P_Max(payload,offset); 
    [decoded_NR_NS_PmaxValue["additionalSpectrumEmission"],offset] = decode_AdditionalSpectrumEmission(payload,offset);

    return [decoded_NR_NS_PmaxValue,offset];
}

function decode_SCS_SpecificCarrier(payload,offset){
    let SCS_SpecificCarrier_EXT_FLAG, decoded_SCS_SpecificCarrier = {};

    [SCS_SpecificCarrier_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

    [decoded_SCS_SpecificCarrier["offsetToCarrier"],offset] = parse_ASN_INTEGER(payload,offset,0,2199);
    [decoded_SCS_SpecificCarrier["subcarrierSpacing"],offset] = decode_SubcarrierSpacing(payload,offset);
    [decoded_SCS_SpecificCarrier["carrierBandwidth"],offset] = parse_ASN_INTEGER(payload,offset,1,275);
   
    if(SCS_SpecificCarrier_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_SCS_SpecificCarrier,offset];
}

function decode_BWP(payload,offset){ 
    let BWP_SEQ_PREAMBLE,decoded_BWP = {};

    [BWP_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    [decoded_BWP["locationAndBandwidth"],offset] = parse_ASN_INTEGER(payload,offset,0,37949);
    [decoded_BWP["SubcarrierSpacing"],offset] = decode_SubcarrierSpacing(payload,offset);
    if(BWP_SEQ_PREAMBLE[0] === "1") [decoded_BWP["cyclicPrefix"],offset] = parse_ASN_ENUMERATED(payload,offset,["extended"]);
    
    return [decoded_BWP,offset];
}

function decode_UplinkConfigCommonSIB(payload,offset){
    let decoded_ULConfigCommonSIB = {};

    [decoded_ULConfigCommonSIB["frequencyInfoUL"],offset] = decode_FrequencyInfoUL_SIB(payload,offset);
    [decoded_ULConfigCommonSIB["initialUplinkBWP"],offset] = decode_BWP_UplinkCommon(payload,offset);
    [decoded_ULConfigCommonSIB["timeAlignmentTimerCommon"],offset] = decode_TimeAlignmentTimer(payload,offset);

    return [decoded_ULConfigCommonSIB,offset];
}

function decode_FrequencyInfoUL_SIB(payload,offset){
    let FrequencyInfoUL_SIB_EXT_FLAG,FrequencyInfoUL_SIB_SEQ_PREAMBLE,decoded_FrequencyInfoUL_SIB = {};

    [FrequencyInfoUL_SIB_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [FrequencyInfoUL_SIB_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,4);

    if(FrequencyInfoUL_SIB_SEQ_PREAMBLE[0] === "1") [decoded_FrequencyInfoUL_SIB["frequencyBandList"],offset] = decode_MultiFrequencyBandListNR_SIB(payload,offset); 
    if(FrequencyInfoUL_SIB_SEQ_PREAMBLE[1] === "1") [decoded_FrequencyInfoUL_SIB["absoluteFrequencyPointA"],offset] = decode_ARFCN_ValueNR(payload,offset);
    [decoded_FrequencyInfoUL_SIB["scs-SpecificCarrierList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,5,decode_SCS_SpecificCarrier)
    if(FrequencyInfoUL_SIB_SEQ_PREAMBLE[2] === "1") [decoded_FrequencyInfoUL_SIB["p-Max"],offset] = decode_P_Max(payload,offset);
    if(FrequencyInfoUL_SIB_SEQ_PREAMBLE[3] === "1") [decoded_FrequencyInfoUL_SIB["frequencyShift7p5khz"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);
    
    if(FrequencyInfoUL_SIB_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_FrequencyInfoUL_SIB,offset];
}

function decode_BWP_UplinkCommon(payload,offset){
    let BWP_UplinkCommon_EXT_FLAG, BWP_UplinkCommon_SEQ_PREAMBLE,decoded_BWP_UplinkCommon = {};

    [BWP_UplinkCommon_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [BWP_UplinkCommon_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);

    [decoded_BWP_UplinkCommon["genericParameters"],offset] = decode_BWP(payload,offset);
    if(BWP_UplinkCommon_SEQ_PREAMBLE[0] === "1") [decoded_BWP_UplinkCommon["rach-ConfigCommon"],offset] = parse_ASN_SETREL(payload,offset,decode_RACH_ConfigCommon);
    if(BWP_UplinkCommon_SEQ_PREAMBLE[1] === "1") [decoded_BWP_UplinkCommon["pusch-ConfigCommon"],offset] = parse_ASN_SETREL(payload,offset,decode_PUSCH_ConfigCommon);
    if(BWP_UplinkCommon_SEQ_PREAMBLE[2] === "1") [decoded_BWP_UplinkCommon["pucch-ConfigCommon"],offset] = parse_ASN_SETREL(payload,offset,decode_PUCCH_ConfigCommon);
    
    if(BWP_UplinkCommon_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_BWP_UplinkCommon,offset];
}

function decode_TDD_UL_DL_Pattern(payload,offset){ 
    let TDD_UL_DL_Pattern_EXT_FLAG, decoded_TDD_UL_DL_Pattern = {};

    [TDD_UL_DL_Pattern_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

    [decoded_TDD_UL_DL_Pattern["dl-UL-TransmissionPeriodicity"],offset] = parse_ASN_ENUMERATED(payload,offset,[ "ms0p5", "ms0p625", "ms1", "ms1p25", "ms2", "ms2p5", "ms5", "ms10"]);
    [decoded_TDD_UL_DL_Pattern["nrofDownlinkSlots"],offset] = parse_ASN_INTEGER(payload,offset,0,320);
    [decoded_TDD_UL_DL_Pattern["nrofDownlinkSymbols"],offset] = parse_ASN_INTEGER(payload,offset,0,13);
    [decoded_TDD_UL_DL_Pattern["nrofUplinkSlots"],offset] = parse_ASN_INTEGER(payload,offset,0,320);
    [decoded_TDD_UL_DL_Pattern["nrofUplinkSymbols"],offset] = parse_ASN_INTEGER(payload,offset,0,13);

    if(TDD_UL_DL_Pattern_EXT_FLAG === 1){
        // console.log("Captured EXT");
        
        let TDD_UL_DL_Pattern_EXT_PREAMBLE;
        [TDD_UL_DL_Pattern_EXT_PREAMBLE,offset] = parse_ASN_EXT_PREAMBLE(payload,offset);

        if(TDD_UL_DL_Pattern_EXT_PREAMBLE.length > 0 && TDD_UL_DL_Pattern_EXT_PREAMBLE[0] === "1"){
            function decode_extensionGroup1(payload,offset){
                let EXT_GROUP_SEQ_PREAMBLE,decoded_extensionGroup1 = {};
                [EXT_GROUP_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);
                if(EXT_GROUP_SEQ_PREAMBLE[0]) [decoded_extensionGroup1["dl-UL-TransmissionPeriodicity-v1530"],offset] = parse_ASN_ENUMERATED(payload,offset,["ms3", "ms4"]);
                return [decoded_extensionGroup1,offset];
            }   
            
            let decoded_extensionGroup1 = {};
            [decoded_extensionGroup1,offset] = parse_ASN_OPENFIELD(payload,offset,decode_extensionGroup1);
            decoded_TDD_UL_DL_Pattern = {...decoded_TDD_UL_DL_Pattern,...decoded_extensionGroup1};
        }
    }

    return [decoded_TDD_UL_DL_Pattern,offset];
}

function decode_BWP_DownlinkCommon(payload,offset){
    let BWP_DownlinkCommon_SEQ_PREAMBLE,BWP_DownlinkCommon_EXT_FLAG, decoded_BWP_DownlinkCommon = {};

    [BWP_DownlinkCommon_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [BWP_DownlinkCommon_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2); 
      
    [decoded_BWP_DownlinkCommon["genericParameters"],offset] = decode_BWP(payload,offset);    
    if(BWP_DownlinkCommon_SEQ_PREAMBLE[0] === "1") [decoded_BWP_DownlinkCommon["pdcch-ConfigCommon"],offset] = parse_ASN_SETREL(payload,offset,decode_PDCCH_ConfigCommon);
    if(BWP_DownlinkCommon_SEQ_PREAMBLE[1] === "1") [decoded_BWP_DownlinkCommon["pdsch-ConfigCommon"],offset] = parse_ASN_SETREL(payload,offset,decode_PDSCH_ConfigCommon);

    if(BWP_DownlinkCommon_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_BWP_DownlinkCommon,offset];
}


function decode_DownlinkConfigCommonSIB(payload,offset){
    let DownlinkConfigCommonSIB_EXT_FLAG,decoded_DownlinkConfigCommonSIB = {};
    [DownlinkConfigCommonSIB_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

    [decoded_DownlinkConfigCommonSIB["frequencyInfoDL"],offset] = decode_FrequencyInfoDL_SIB(payload,offset);
    [decoded_DownlinkConfigCommonSIB["initialDownlinkBWP"],offset] = decode_BWP_DownlinkCommon(payload,offset);
    [decoded_DownlinkConfigCommonSIB["bcch-Config"],offset] = decode_BCCH_Config(payload,offset);
    [decoded_DownlinkConfigCommonSIB["pcch-Config"],offset] = decode_PCCH_Config(payload,offset);

    if(DownlinkConfigCommonSIB_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_DownlinkConfigCommonSIB,offset];
}

function decode_FrequencyInfoDL_SIB(payload,offset){
    let decoded_FrequencyInfoDL = {};

    [decoded_FrequencyInfoDL["frequencyBandList"],offset] = decode_MultiFrequencyBandListNR_SIB(payload,offset);   
    [decoded_FrequencyInfoDL["offsetToPointA"],offset] = parse_ASN_INTEGER(payload,offset,0,2199);
    [decoded_FrequencyInfoDL["scs-SpecificCarrierList"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,5,decode_SCS_SpecificCarrier);

    return [decoded_FrequencyInfoDL,offset];
}

function decode_BCCH_Config(payload,offset){
    let BCCH_Config_EXT_FLAG,decoded_BCCH_Config = {};
    [BCCH_Config_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

    [decoded_BCCH_Config["modificationPeriodCoeff"],offset] = parse_ASN_ENUMERATED(payload,offset,["n2", "n4", "n8", "n16"]);

    if(BCCH_Config_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_BCCH_Config,offset];
}

function decode_PCCH_Config(payload,offset){
    let PCCH_Config_EXT_FLAG,PCCH_Config_SEQ_PREAMBLE, decoded_PCCH_Config = {};

    [PCCH_Config_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [PCCH_Config_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    [decoded_PCCH_Config["defaultPagingCycle"],offset] = parse_ASN_ENUMERATED(payload,offset,["rf32", "rf64", "rf128", "rf256"]);
    
    let nAndPagingFrameOffset_CHOICE_LIST = [
        {"oneT" : function decode_oneT(payload,offset){return [null,offset];}},
        {"halfT" : function decode_halfT(payload,offset){return parse_ASN_INTEGER(payload,offset,0,1);}},
        {"quarterT" : function decode_quarterT(payload,offset){return parse_ASN_INTEGER(payload,offset,0,3);}},
        {"oneEighthT" : function decode_oneEighthT(payload,offset){return parse_ASN_INTEGER(payload,offset,0,7);}},
        {"oneSixteenthT" : function decode_oneSixteenthT(payload,offset){return parse_ASN_INTEGER(payload,offset,0,15);}}
    ];
    [decoded_PCCH_Config["nAndPagingFrameOffset"],offset] = parse_ASN_CHOICE(payload,offset,nAndPagingFrameOffset_CHOICE_LIST);

    [decoded_PCCH_Config["ns"],offset] = parse_ASN_ENUMERATED(payload,offset,["four","two","one"]);
    if(PCCH_Config_SEQ_PREAMBLE[0] === "1"){
        let firstPDCCH_MonitoringOccasionOfPO_CHOICE_LIST = [
            {"sCS15KHZoneT" :                                                           (payload,offset)=>parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,  (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,139);}  )},
            {"sCS30KHZoneT-SCS15KHZhalfT" :                                             (payload,offset)=>parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,  (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,279);}  )},
            {"sCS60KHZoneT-SCS30KHZhalfT-SCS15KHZquarterT" :                            (payload,offset)=>parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,  (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,559);}  )},
            {"sCS120KHZoneT-SCS60KHZhalfT-SCS30KHZquarterT-SCS15KHZoneEighthT" :        (payload,offset)=>parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,  (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,1119);}  )},
            {"sCS120KHZhalfT-SCS60KHZquarterT-SCS30KHZoneEighthT-SCS15KHZoneSixteenthT" : (payload,offset)=>parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,  (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,2239);}  )},
            {"sCS480KHZoneT-SCS120KHZquarterT-SCS60KHZoneEighthT-SCS30KHZoneSixteenthT" : (payload,offset)=>parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,  (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,4479);}  )},
            {"sCS480KHZhalfT-SCS120KHZoneEighthT-SCS60KHZoneSixteenthT" :               (payload,offset)=>parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,  (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,8959);}  )},
            {"sCS480KHZquarterT-SCS120KHZoneSixteenthT" :                               (payload,offset)=>parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,4,  (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,17919);}  )},
        ];
        [decoded_PCCH_Config["firstPDCCH-MonitoringOccasionOfPO"],offset] = parse_ASN_CHOICE(payload,offset,firstPDCCH_MonitoringOccasionOfPO_CHOICE_LIST);
    }

    if(PCCH_Config_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_PCCH_Config,offset];
}

function decode_ServingCellConfigCommonSIB(payload,offset){ 
    let ServingCellCC_EXT_FLAG, ServingCellCC_SEQ_PREAMBLE,decoded_ServingCellCC = {};

    [ServingCellCC_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [ServingCellCC_SEQ_PREAMBLE, offset] = getStringBits(payload,offset,4);

    [decoded_ServingCellCC["downlinkConfigCommon"],offset] = decode_DownlinkConfigCommonSIB(payload,offset);    
    if(ServingCellCC_SEQ_PREAMBLE[0] === "1") [decoded_ServingCellCC["uplinkConfigCommon"],offset] = decode_UplinkConfigCommonSIB(payload,offset);
    if(ServingCellCC_SEQ_PREAMBLE[1] === "1") [decoded_ServingCellCC["supplementaryUplink"],offset] = decode_UplinkConfigCommonSIB(payload,offset);
    if(ServingCellCC_SEQ_PREAMBLE[2] === "1") [decoded_ServingCellCC["n-TimingAdvanceOffset"],offset] = parse_ASN_ENUMERATED(payload,offset,["n0", "n25600", "n39936"]);
    
    //begin ssb_PositionsInBurst
        let ssb_PositionsInBurst_SEQ_PREAMBLE, decoded_ssb_PositionsInBurst = {};
        [ssb_PositionsInBurst_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

        [decoded_ssb_PositionsInBurst["inOneGroup"],offset] = parse_ASN_BITSTRING(payload,offset,8,8);
        if( ssb_PositionsInBurst_SEQ_PREAMBLE[0] === "1" ) [decoded_ssb_PositionsInBurst["groupPresence"],offset] = parse_ASN_BITSTRING(payload,offset,8,8);
        
        decoded_ServingCellCC["ssb_PositionsInBurst"] = decoded_ssb_PositionsInBurst;
    //end ssb_PositionsInBurst

    [decoded_ServingCellCC["ssb-PeriodicityServingCell"],offset] = parse_ASN_ENUMERATED(payload,offset,["ms5", "ms10", "ms20", "ms40", "ms80", "ms160"]);
    if(ServingCellCC_SEQ_PREAMBLE[3] === "1") [decoded_ServingCellCC["tdd-UL-DL-ConfigurationCommon"],offset] = decode_TDD_UL_DL_ConfigCommon(payload,offset);  
    [decoded_ServingCellCC["ss-PBCH-BlockPower"],offset] = parse_ASN_INTEGER(payload,offset,-60,50);
   
    if(ServingCellCC_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_ServingCellCC,offset]
}

function decode_TDD_UL_DL_ConfigCommon(payload,offset){
    let TDD_UL_DL_ConfigCommon_EXT_FLAG, TDD_UL_DL_ConfigCommon_SEQ_PREAMBLE,decoded_TDD_UL_DL_ConfigCommon = {};

    [TDD_UL_DL_ConfigCommon_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [TDD_UL_DL_ConfigCommon_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    [decoded_TDD_UL_DL_ConfigCommon["referenceSubcarrierSpacing"],offset] = decode_SubcarrierSpacing(payload,offset);
    [decoded_TDD_UL_DL_ConfigCommon["pattern1"],offset] = decode_TDD_UL_DL_Pattern(payload,offset);
    if(TDD_UL_DL_ConfigCommon_SEQ_PREAMBLE[0] === "1") [decoded_TDD_UL_DL_ConfigCommon["pattern2"],offset] = decode_TDD_UL_DL_Pattern(payload,offset);
    
    if(TDD_UL_DL_ConfigCommon_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_TDD_UL_DL_ConfigCommon,offset];
}

function decode_UE_TimersAndConstants(payload,offset){ 
    let UE_TimersAndConstants_EXT_FLAG, decoded_UE_TimersAndConstants = {};

    [UE_TimersAndConstants_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

    [decoded_UE_TimersAndConstants["t300"],offset] = parse_ASN_ENUMERATED(payload,offset,["ms100", "ms200", "ms300", "ms400", "ms600", "ms1000", "ms1500", "ms2000"]);
    [decoded_UE_TimersAndConstants["t301"],offset] = parse_ASN_ENUMERATED(payload,offset,["ms100", "ms200", "ms300", "ms400", "ms600", "ms1000", "ms1500", "ms2000"]);
    [decoded_UE_TimersAndConstants["t310"],offset] = parse_ASN_ENUMERATED(payload,offset,["ms0", "ms50", "ms100", "ms200", "ms500", "ms1000", "ms2000"]);
    [decoded_UE_TimersAndConstants["n310"],offset] = parse_ASN_ENUMERATED(payload,offset,["n1", "n2", "n3", "n4", "n6", "n8", "n10", "n20"]);
    [decoded_UE_TimersAndConstants["t311"],offset] = parse_ASN_ENUMERATED(payload,offset,["ms1000", "ms3000", "ms5000", "ms10000", "ms15000", "ms20000", "ms30000"]);
    [decoded_UE_TimersAndConstants["n311"],offset] = parse_ASN_ENUMERATED(payload,offset,["n1", "n2", "n3", "n4", "n5", "n6", "n8", "n10"]);
    [decoded_UE_TimersAndConstants["t319"],offset] = parse_ASN_ENUMERATED(payload,offset,["ms100", "ms200", "ms300", "ms400", "ms600", "ms1000", "ms1500", "ms2000"]);
    
    if(UE_TimersAndConstants_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_UE_TimersAndConstants,offset]
}

function decode_UAC_BarringPerCat(payload,offset){
    let decoded_UAC_BarringPerCat = {};
    [decoded_UAC_BarringPerCat["accessCategory"],offset] = parse_ASN_INTEGER(payload,offset,1,63);
    [decoded_UAC_BarringPerCat["uac-barringInfoSetIndex"],offset] = decode_UAC_BarringInfoSetIndex(payload,offset);

    return [decoded_UAC_BarringPerCat,offset];
}

function decode_UAC_BarringPerCatList(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,63,decode_UAC_BarringPerCat);
}

function decode_UAC_BarringPerPLMN_List(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,12,decode_UAC_BarringPerPLMN);
}

function decode_UAC_BarringPerPLMN(payload,offset){
    let UAC_BarringPerPLMN_SEQ_PREAMBLE, decoded_UAC_BarringPerPLMN = {};
    [UAC_BarringPerPLMN_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    [decoded_UAC_BarringPerPLMN["plmn-IdentityIndex"],offset] = parse_ASN_INTEGER(payload,offset,1,12);
    if(UAC_BarringInfo_SEQ_PREAMBLE[0] === "1"){ //uac-ACBarringListType 
        let uac_ACBarringListType_CHOICE_LIST = [
            { "uac-ImplicitACBarringList" : (payload,offset)=>{return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,63, (payload,offset)=>{return decode_UAC_BarringInfoSetIndex(payload,offset);})}},
            { "uac-ExplicitACBarringList" : decode_UAC_BarringPerCatList(payload,offset)}
        ];
        [decoded_UAC_BarringPerPLMN["uac-ACBarringListType"],offset] = parse_ASN_CHOICE(payload,offset,uac_ACBarringListType_CHOICE_LIST);
    }

    return [decoded_UAC_BarringPerPLMN,offset]
}

function decode_UAC_BarringInfoSetList(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,8,decode_UAC_BarringInfoSet);
}

function decode_UAC_BarringInfoSet(payload,offset){
    let decoded_uac_BarringInfoSet = {};
    [decoded_uac_BarringInfoSet["uac-BarringFactor"],offset] = parse_ASN_ENUMERATED(payload,offset,["p00", "p05", "p10", "p15", "p20", "p25", "p30", "p40","p50", "p60", "p70", "p75", "p80", "p85", "p90", "p95"]);
    [decoded_uac_BarringInfoSet["uac-BarringTime"],offset] = parse_ASN_ENUMERATED(payload,offset,["s4", "s8", "s16", "s32", "s64", "s128", "s256", "s512"]);
    [decoded_uac_BarringInfoSet["uac-BarringForAccessIdentity"],offset] = parse_ASN_BITSTRING(payload,offset,7,7);

   return [decoded_uac_BarringInfoSet,offset];
}

function decode_UAC_AccessCategory1_SelectionAssistanceInfo(payload,offset){
    return parse_ASN_ENUMERATED(payload,offset,["a","b","c"]);
}

function decode_uac_BarringInfo(payload,offset){ //TODO
    let UAC_BarringInfo_SEQ_PREAMBLE, decoded_UAC_BarringInfo = {};

    [UAC_BarringInfo_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);

    if(UAC_BarringInfo_SEQ_PREAMBLE[0] === "1") [decoded_UAC_BarringInfo["uac-BarringForCommon"],offset] = decode_UAC_BarringPerCatList(payload,offset);
    if(UAC_BarringInfo_SEQ_PREAMBLE[1] === "1") [decoded_UAC_BarringInfo["uac-BarringPerPLMN-List"],offset] = decode_UAC_BarringPerPLMN_List(payload,offset);       
    [decoded_UAC_BarringInfo["uac-BarringInfoSetList"],offset] = decode_UAC_BarringInfoSetList(payload,offset);

    let uac_AccessCategory1_SelectionAssistanceInfo_CHOICE_LIST = [
        {"plmnCommon" : decode_UAC_AccessCategory1_SelectionAssistanceInfo},
        {"individualPLMNList" : (payload,offset)=>{return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,2,12,decode_UAC_AccessCategory1_SelectionAssistanceInfo)}}
    ];
    [decoded_UAC_BarringInfo["uac-AccessCategory1-SelectionAssistanceInfo"],offset] = parse_ASN_CHOICE(payload,offset,uac_AccessCategory1_SelectionAssistanceInfo_CHOICE_LIST);

    return [decoded_UAC_BarringInfo,offset];
}

function decode_SpeedStateScaleFactors(payload,offset){
    let decoded_SpeedStateScaleFactors = {};

    [decoded_SpeedStateScaleFactors["sf-Medium"],offset] = parse_ASN_ENUMERATED(payload,offset,["oDot25", "oDot5", "oDot75", "lDot0"]);
    [decoded_SpeedStateScaleFactors["sf-High"],offset] = parse_ASN_ENUMERATED(payload,offset,["oDot25", "oDot5", "oDot75", "lDot0"]);

    return [decoded_SpeedStateScaleFactors,offset]
}

function decode_Q_OffsetRange(payload,offset){
    let decoded_Q_OffsetRange = {};

    [decoded_Q_OffsetRange,offset] = parse_ASN_ENUMERATED(payload,offset,["dB-24", "dB-22", "dB-20", "dB-18", "dB-16", "dB-14", "dB-12", "dB-10", "dB-8","dB-6", "dB-5",
        "dB-4", "dB-3", "dB-2", "dB-1", "dB0", "dB1", "dB2", "dB3", "dB4", "dB5", "dB6", "dB8", "dB10", "dB12", "dB14", "dB16", "dB18","dB20", "dB22", "dB24"]);

    return [decoded_Q_OffsetRange,offset]
}

function decode_PCI_Range(payload,offset){
    let PCI_Range_SEQ_PREAMBLE,decoded_PCI_Range = {};
    [PCI_Range_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    [decoded_PCI_Range["start"],offset] = decode_PhysCellId(payload,offset);
    if(PCI_Range_SEQ_PREAMBLE[0] === "1") [decoded_PCI_Range["range"],offset] = parse_ASN_ENUMERATED(payload,offset,["n4", "n8", "n12", "n16", "n24", "n32", "n48", "n64", "n84", "n96", "n128", "n168", "n252", "n504", "n1008", "spare1"]);
    
    return [decoded_PCI_Range,offset];
}

function decode_ThresholdNR(payload,offset){
    let ThresholdNR_SEQ_PREAMBLE,decoded_ThresholdNR = {};

    [ThresholdNR_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);

    if(ThresholdNR_SEQ_PREAMBLE[0] === "1") [decoded_ThresholdNR["thresholdRSRP"],offset] = decode_RSRP_Range(payload,offset);
    if(ThresholdNR_SEQ_PREAMBLE[1] === "1") [decoded_ThresholdNR["thresholdRSRQ"],offset] = decode_RSRQ_Range(payload,offset);
    if(ThresholdNR_SEQ_PREAMBLE[2] === "1") [decoded_ThresholdNR["thresholdSINR"],offset] = decode_SINR_Range(payload,offset);

    return [decoded_ThresholdNR,offset];
}

function decode_SSB_MTC(payload,offset){
    let decoded_SSB_MTC = {};

    let SSB_MTC_CHOICE_LIST = [
        {"sf5" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,4);}},
        {"sf10" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,9);}},
        {"sf20" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,19);}},
        {"sf40" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,39);}},
        {"sf80" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,79);}},
        {"sf160" : (payload,offset)=>{return parse_ASN_INTEGER(payload,offset,0,159);}},
    ];
    [decoded_SSB_MTC["periodicityAndOffset"],offset] = parse_ASN_CHOICE(payload,offset,SSB_MTC_CHOICE_LIST);

    [decoded_SSB_MTC["duration"],offset] = parse_ASN_ENUMERATED(payload,offset,["sf1", "sf2", "sf3", "sf4", "sf5"]);

    return [decoded_SSB_MTC,offset]
}

function decode_SS_RSSI_Measurement(payload,offset){
    let measurementSlots_FIELD_SIZE,decoded_SS_RSSI_Measurement = {}; 
    [measurementSlots_FIELD_SIZE,offset] = parseStringBitsToVal(payload,offset,7);
    measurementSlots_FIELD_SIZE+=1;

    [decoded_SS_RSSI_Measurement["measurementSlots"],offset] = parse_ASN_BITSTRING(payload,offset,1,80);
    [decoded_SS_RSSI_Measurement["endSymbol"],offset] = parse_ASN_INTEGER(payload,offset,0,3);

    return [decoded_SS_RSSI_Measurement,offset];
}

function decode_SSB_ToMeasure(payload,offset){
    let SSB_ToMeasure_CHOICE_LIST = [
        {"shortBitmap" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,4,4);}},
        {"mediumBitmap" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,8,8);}},
        {"longBitmap" : (payload,offset)=>{return parse_ASN_BITSTRING(payload,offset,64,64);}}
    ];
      
    return parse_ASN_CHOICE(payload,offset,SSB_ToMeasure_CHOICE_LIST);
}

function decode_RangeToBestCell(payload,offset){
    return decode_Q_OffsetRange(payload,offset);
}

function decode_MobilityStateParameters(payload,offset){
    let decoded_MobilityStateParameters = {};

    [decoded_MobilityStateParameters["t-Evaluation"],offset] = parse_ASN_ENUMERATED(payload,offset,["s30", "s60", "s120", "s180", "s240", "spare3", "spare2", "spare1"]);
    [decoded_MobilityStateParameters["t-HystNormal"],offset] = parse_ASN_ENUMERATED(payload,offset,["s30", "s60", "s120", "s180", "s240", "spare3", "spare2", "spare1"]);
    [decoded_MobilityStateParameters["n-CellChangeMedium"],offset] = parse_ASN_INTEGER(payload,offset,1,16);
    [decoded_MobilityStateParameters["n-CellChangeHigh"],offset] = parse_ASN_INTEGER(payload,offset,1,16);

    return [decoded_MobilityStateParameters,offset];
}

function decode_ReselectionThreshold(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,31);
}

function decode_ReselectionThresholdQ(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,31);
}

function decode_CellReselectionPriority(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,7);
}

function decode_CellReselectionSubPriority(payload,offset){
    return parse_ASN_ENUMERATED(payload,offset,["oDot2", "oDot4", "oDot6", "oDot8"]);
}

function decode_T_Reselection(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,7);
}

function decode_SIB1(payload,offset){ 
    let decoded_SIB1 = {}, SIB1_SEQ_PREAMBLE;

    [SIB1_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,11);
    
    if(SIB1_SEQ_PREAMBLE[0] === "1"){
        let cellSelectionInfo_SEQ_PREAMBLE, decoded_cellSelectionInfo = {}; //Preamble specifies which OPTIONAL fields are present

        [cellSelectionInfo_SEQ_PREAMBLE, offset] = getStringBits(payload,offset,4);
        
        [decoded_cellSelectionInfo["q-RxLevMin"],offset] = decode_Q_RxLevMin(payload,offset);
        if(cellSelectionInfo_SEQ_PREAMBLE[0] === "1") [decoded_cellSelectionInfo["q-RxLevMinOffset"],offset] = parse_ASN_INTEGER(payload,offset,1,8);
        if(cellSelectionInfo_SEQ_PREAMBLE[1] === "1") [decoded_cellSelectionInfo["q-RxLevMinSUL"],offset] = decode_Q_RxLevMin(payload,offset);    
        if(cellSelectionInfo_SEQ_PREAMBLE[2] === "1") [decoded_cellSelectionInfo["q-QualMin"],offset] = decode_Q_QualMin(payload,offset);
        if(cellSelectionInfo_SEQ_PREAMBLE[3] === "1") [decoded_cellSelectionInfo["q-QualMinOffset"],offset] = parse_ASN_INTEGER(payload,offset,1,8);
        
        decoded_SIB1["cellSelectionInfo"] = decoded_cellSelectionInfo;
    } 
    
    [decoded_SIB1["cellAccessRelatedInfo"], offset] = decode_CellAccessRelatedInfo(payload,offset);  
    if(SIB1_SEQ_PREAMBLE[1] === "1") [decoded_SIB1["connEstFailureControl"], offset] = decode_ConnEstFailureControl(payload,offset);    
    if(SIB1_SEQ_PREAMBLE[2] === "1") [decoded_SIB1["si-SchedulingInfo"],offset] = decode_SI_SchedulingInfo(payload,offset);
    if(SIB1_SEQ_PREAMBLE[3] === "1") [decoded_SIB1["servingCellConfigCommon"],offset] = decode_ServingCellConfigCommonSIB(payload,offset);   
    if(SIB1_SEQ_PREAMBLE[4] === "1") [decoded_SIB1["ims-EmergencySupport"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);
    if(SIB1_SEQ_PREAMBLE[5] === "1") [decoded_SIB1["eCallOverIMS-Support"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);
    if(SIB1_SEQ_PREAMBLE[6] === "1") [decoded_SIB1["ue-TimersAndConstants"],offset] = decode_UE_TimersAndConstants(payload,offset);
    if(SIB1_SEQ_PREAMBLE[7] === "1") [decoded_SIB1["uac-BarringInfo"],offset] = decode_uac_BarringInfo(payload,offset); 
    if(SIB1_SEQ_PREAMBLE[8] === "1") [decoded_SIB1["useFullResumeID"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"])
    if(SIB1_SEQ_PREAMBLE[9] === "1") [decoded_SIB1["lateNonCriticalExtension"],offset] = parse_ASN_OCTETSTRING(payload,offset);
    if(SIB1_SEQ_PREAMBLE[10] === "1") [decoded_SIB1["nonCriticalExtension"],offset] = decode_SIB1_v1610_IEs(payload,offset);

    return [decoded_SIB1,offset];
}

function decode_SIB1_v1610_IEs(payload,offset){
    let SIB1_v1610_IEs_SEQ_PREAMBLE, decoded_SIB1_v1610_IEs = {};

    [SIB1_v1610_IEs_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,4);

    if(SIB1_v1610_IEs_SEQ_PREAMBLE[0] === "1") [decoded_SIB1_v1610_IEs["idleModeMeasurementsEUTRA-r16"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);
    if(SIB1_v1610_IEs_SEQ_PREAMBLE[1] === "1") [decoded_SIB1_v1610_IEs["idleModeMeasurementsNR-r16"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);
    if(SIB1_v1610_IEs_SEQ_PREAMBLE[2] === "1") {console.log("Error: posSI-SchedulingInfo-r16 is not implemented");}
    if(SIB1_v1610_IEs_SEQ_PREAMBLE[3] === "1") {console.log("Error: nonCriticalExtension1 is not implemented");}
    
    return [decoded_SIB1_v1610_IEs,offset];
}

function decode_SIB2(payload,offset){
    let SIB2_EXT_FLAG, decoded_SIB2 = {};

    [SIB2_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

    //cellReselectionInfoCommon 
        let cellReselectionInfoCommon_SEQ_PREAMBLE,cellReselectionInfoCommon_EXT_FLAG,decoded_cellReselectionInfoCommon = {};

        [cellReselectionInfoCommon_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
        [cellReselectionInfoCommon_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,4);

        if(cellReselectionInfoCommon_SEQ_PREAMBLE[0] === "1") [decoded_cellReselectionInfoCommon["nrofSS-BlocksToAverage"],offset] = parse_ASN_INTEGER(payload,offset,2,16);
        if(cellReselectionInfoCommon_SEQ_PREAMBLE[1] === "1") [decoded_cellReselectionInfoCommon["absThreshSS-BlocksConsolidation"],offset] = decode_ThresholdNR(payload,offset);
        if(cellReselectionInfoCommon_SEQ_PREAMBLE[2] === "1") [decoded_cellReselectionInfoCommon["rangeToBestCell"],offset] = decode_RangeToBestCell(payload,offset); 
        [decoded_cellReselectionInfoCommon["q-Hyst"],offset] = parse_ASN_ENUMERATED(payload,offset,["dB0", "dB1", "dB2", "dB3", "dB4", "dB5", "dB6", "dB8", "dB10", "dB12", "dB14", "dB16", "dB18", "dB20", "dB22", "dB24"]);
        if(cellReselectionInfoCommon_SEQ_PREAMBLE[3] === "1"){
            let decoded_speedStateReselectionPars = {};

            [decoded_speedStateReselectionPars["mobilityStateParameters"],offset] = decode_MobilityStateParameters(payload,offset);
            //q-HystSF
                let decoded_q_HystSF = {};
                [decoded_q_HystSF["sf-Medium"],offset] = parse_ASN_ENUMERATED(payload,offset,["dB-6", "dB-4", "dB-2", "dB0"]);
                [decoded_q_HystSF["sf-High"],offset] = parse_ASN_ENUMERATED(payload,offset,["dB-6", "dB-4", "dB-2", "dB0"]);
                decoded_speedStateReselectionPars["q-HystSF"] = decoded_q_HystSF;
            //end q-HystSF

            decoded_cellReselectionInfoCommon["speedStateReselectionPars"] = decoded_speedStateReselectionPars;
        }

        if(cellReselectionInfoCommon_EXT_FLAG === 1){
            [,offset] = skip_ASN_EXTENSIONS(payload,offset);
        }

        decoded_SIB2["cellReselectionInfoCommon"] = decoded_cellReselectionInfoCommon;
    //end cellReselectionInfoCommon 

    //cellReselectionServingFreqInfo
        let cellReselectionServingFreqInfo_SEQ_PREAMBLE,cellReselectionServingFreqInfo_EXT_FLAG,decoded_cellReselectionServingFreqInfo = {};

        [cellReselectionServingFreqInfo_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
        [cellReselectionServingFreqInfo_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,4);

        if(cellReselectionServingFreqInfo_SEQ_PREAMBLE[0] === "1") [decoded_cellReselectionServingFreqInfo["s-NonIntraSearchP"],offset] = decode_ReselectionThreshold(payload,offset);
        if(cellReselectionServingFreqInfo_SEQ_PREAMBLE[1] === "1") [decoded_cellReselectionServingFreqInfo["s-NonIntraSearchQ"],offset] = decode_ReselectionThresholdQ(payload,offset);
        [decoded_cellReselectionServingFreqInfo["threshServingLowP"],offset] = decode_ReselectionThreshold(payload,offset);
        if(cellReselectionServingFreqInfo_SEQ_PREAMBLE[2] === "1") [decoded_cellReselectionServingFreqInfo["threshServingLowQ"],offset] = decode_ReselectionThresholdQ(payload,offset);
        [decoded_cellReselectionServingFreqInfo["cellReselectionPriority"],offset] = decode_CellReselectionPriority(payload,offset);
        if(cellReselectionServingFreqInfo_SEQ_PREAMBLE[3] === "1") [decoded_cellReselectionServingFreqInfo["cellReselectionSubPriority"],offset] = decode_CellReselectionSubPriority(payload,offset);

        if(cellReselectionServingFreqInfo_EXT_FLAG === 1){
            [,offset] = skip_ASN_EXTENSIONS(payload,offset);
        }

        decoded_SIB2["cellReselectionServingFreqInfo"] = decoded_cellReselectionServingFreqInfo;
    //end cellReselectionServingFreqInfo

    //intraFreqCellReselectionInfo
    let intraFreqCellReselectionInfo_SEQ_PREAMBLE,intraFreqCellReselectionInfo_EXT_FLAG,decoded_intraFreqCellReselectionInfo = {};

    [intraFreqCellReselectionInfo_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [intraFreqCellReselectionInfo_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,9);

    [decoded_intraFreqCellReselectionInfo["q-RxLevMin"],offset] = decode_Q_RxLevMin(payload,offset);
    if(intraFreqCellReselectionInfo_SEQ_PREAMBLE[0] === "1") [decoded_intraFreqCellReselectionInfo["q-RxLevMinSUL"],offset] = decode_Q_RxLevMin(payload,offset);
    if(intraFreqCellReselectionInfo_SEQ_PREAMBLE[1] === "1") [decoded_intraFreqCellReselectionInfo["q-QualMin"],offset] = decode_Q_QualMin(payload,offset);
    [decoded_intraFreqCellReselectionInfo["s-IntraSearchP"],offset] = decode_ReselectionThreshold(payload,offset);
    if(intraFreqCellReselectionInfo_SEQ_PREAMBLE[2] === "1") [decoded_intraFreqCellReselectionInfo["s-IntraSearchQ"],offset] = decode_ReselectionThresholdQ(payload,offset);
    [decoded_intraFreqCellReselectionInfo["t-ReselectionNR"],offset] = decode_T_Reselection(payload,offset);
    if(intraFreqCellReselectionInfo_SEQ_PREAMBLE[3] === "1"){
        [decoded_intraFreqCellReselectionInfo["frequencyBandList"],offset] = decode_MultiFrequencyBandListNR_SIB(payload,offset);
    }
    if(intraFreqCellReselectionInfo_SEQ_PREAMBLE[4] === "1"){
        [decoded_intraFreqCellReselectionInfo["frequencyBandListSUL"],offset] = decode_MultiFrequencyBandListNR_SIB(payload,offset);
    }
    if(intraFreqCellReselectionInfo_SEQ_PREAMBLE[5] === "1"){
        [decoded_intraFreqCellReselectionInfo["p-Max"],offset] = decode_P_Max(payload,offset);
    }
    if(intraFreqCellReselectionInfo_SEQ_PREAMBLE[6] === "1"){
        [decoded_intraFreqCellReselectionInfo["smtc"],offset] = decode_SSB_MTC(payload,offset);
    }
    if(intraFreqCellReselectionInfo_SEQ_PREAMBLE[7] === "1"){
        [decoded_intraFreqCellReselectionInfo["ss-RSSI-Measurement"],offset] = decode_SS_RSSI_Measurement(payload,offset);
    }
    if(intraFreqCellReselectionInfo_SEQ_PREAMBLE[8] === "1") [decoded_intraFreqCellReselectionInfo["ssb-ToMeasure"],offset] = decode_SSB_ToMeasure(payload,offset);
    [decoded_intraFreqCellReselectionInfo["deriveSSB-IndexFromCell"],offset] = parse_ASN_BOOLEAN(payload,offset);

    if(intraFreqCellReselectionInfo_EXT_FLAG === 1){
        let InterFreqCarrierFreqInfo_EXT_PREAMBLE;
        [InterFreqCarrierFreqInfo_EXT_PREAMBLE,offset] = parse_ASN_EXT_PREAMBLE(payload,offset);

        if(InterFreqCarrierFreqInfo_EXT_PREAMBLE.length > 0 && InterFreqCarrierFreqInfo_EXT_PREAMBLE[0] === "1"){
            function decode_extensionGroup(payload,offset){
                let extensionGroup_SEQ_PREAMBLE,decoded_extensionGroup = {};
                [extensionGroup_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);
                if(extensionGroup_SEQ_PREAMBLE[0] === "1") [decoded_extensionGroup["t-ReselectionNR-SF"],offset] = decode_SpeedStateScaleFactors(payload,offset);
                return [decoded_extensionGroup,offset];
            }

            let decoded_extensionGroup;
            [decoded_extensionGroup,offset] = parse_ASN_OPENFIELD(payload,offset,decode_extensionGroup);
            decoded_intraFreqCellReselectionInfo = {...decoded_intraFreqCellReselectionInfo,...decoded_extensionGroup};
        }
    }

    if(intraFreqCellReselectionInfo_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }
    
    decoded_SIB2["intraFreqCellReselectionInfo"] = decoded_intraFreqCellReselectionInfo;
    //end intraFreqCellReselectionInfo 

    if(SIB2_EXT_FLAG === 1){
        // console.log("Ext flag captured");
        let SIB2_EXT_PREAMBLE;
        [SIB2_EXT_PREAMBLE,offset] = parse_ASN_EXT_PREAMBLE(payload,offset);       

        if(SIB2_EXT_PREAMBLE.length > 0 && SIB2_EXT_PREAMBLE[0] === "1"){
            function decode_extensionGroup(payload,offset){
                let EXT_GROUP_SEQ_PREAMBLE, decoded_extensionGroup = {};
                [EXT_GROUP_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

                function decode_relaxedMeasurement_r16(payload,offset){    
                    let relaxedMeasurement_r16_SEQ_PREAMBLE, decoded_relaxedMeasurement_r16 = {};
                    [relaxedMeasurement_r16_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,4);

                    function decode_lowMobilityEvaluation_r16(payload,offset){
                        let decoded_lowMobilityEvaluation_r16 = {};
                        [decoded_lowMobilityEvaluation_r16["s-SearchDeltaP-r16"],offset] = parse_ASN_ENUMERATED(payload,offset,["dB3", "dB6", "dB9", "dB12", "dB15", "spare3", "spare2", "spare1"]);
                        [decoded_lowMobilityEvaluation_r16["t-SearchDeltaP-r16"],offset] = parse_ASN_ENUMERATED(payload,offset,["s5", "s10", "s20", "s30", "s60", "s120", "s180", "s240", "s300", "spare7", "spare6", "spare5", "spare4", "spare3", "spare2", "spare1"]);
                        return [decoded_lowMobilityEvaluation_r16,offset];
                    }
                    function decode_cellEdgeEvaluation_r16(payload,offset){
                        let cellEdgeEvaluation_r16_SEQ_PREAMBLE,decoded_cellEdgeEvaluation_r16 = {};
                        [cellEdgeEvaluation_r16_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);
                        [decoded_cellEdgeEvaluation_r16["s-SearchThresholdP-r16"],offset] = decode_ReselectionThreshold(payload,offset);
                        if(cellEdgeEvaluation_r16_SEQ_PREAMBLE[0]==="1") [decoded_cellEdgeEvaluation_r16["s-SearchThresholdQ-r16"],offset] = decode_ReselectionThresholdQ(payload,offset);
                        return [decoded_cellEdgeEvaluation_r16,offset];
                    }
    
                    if(relaxedMeasurement_r16_SEQ_PREAMBLE[0]==="1") [decoded_relaxedMeasurement_r16["lowMobilityEvaluation-r16"],offset] = decode_lowMobilityEvaluation_r16(payload,offset);
                    if(relaxedMeasurement_r16_SEQ_PREAMBLE[1] === "1") [decoded_relaxedMeasurement_r16["cellEdgeEvaluation-r16"],offset] = decode_cellEdgeEvaluation_r16(payload,offset);
                    if(relaxedMeasurement_r16_SEQ_PREAMBLE[2] === "1") [decoded_relaxedMeasurement_r16["combineRelaxedMeasCondition-r16"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);
                    if(relaxedMeasurement_r16_SEQ_PREAMBLE[3] === "1") [decoded_relaxedMeasurement_r16["highPriorityMeasRelax-r16"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);
                    return [decoded_relaxedMeasurement_r16,offset];
                }

                if(EXT_GROUP_SEQ_PREAMBLE[0] === "1") [decoded_extensionGroup["relaxedMeasurement-r16"],offset] = decode_relaxedMeasurement_r16(payload,offset);

                return [decoded_extensionGroup,offset];
            }            

            let decoded_extensionGroup = {};
            [decoded_extensionGroup,offset] = parse_ASN_OPENFIELD(payload,offset,decode_extensionGroup);
            decoded_SIB2 = {...decoded_SIB2,...decoded_extensionGroup};
        }

        if(SIB2_EXT_PREAMBLE.length > 1 && SIB2_EXT_PREAMBLE[1] === "1"){
            function decode_extensionGroup2(payload,offset){
                let EXT_GROUP_SEQ_PREAMBLE, decoded_extensionGroup = {};
                [EXT_GROUP_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

                function decode_relaxedMeasurement_r17(payload,offset){
                    let relaxedMeasurement_r17_SEQ_PREAMBLE,decoded_relaxedMeasurement_r17 = {};
                    [relaxedMeasurement_r17_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

                    function decode_stationaryMobilityEvaluation_r17(payload,offset){
                        let decoded_stationaryMobilityEvaluation_r17 = {};
                        [decoded_stationaryMobilityEvaluation_r17["s-SearchDeltaP-Stationary-r17"],offset] = parse_ASN_ENUMERATED(payload,offset,["dB2", "dB3", "dB6", "dB9", "dB12", "dB15", "spare2", "spare1"]);
                        [decoded_stationaryMobilityEvaluation_r17["t-SearchDeltaP-Stationary-r17"],offset] = parse_ASN_ENUMERATED(payload,offset,["s5", "s10", "s20", "s30", "s60", "s120",
                             "s180", "s240", "s300", "spare7", "spare6", "spare5", "spare4", "spare3", "spare2", "spare1"]);
                        return [decoded_stationaryMobilityEvaluation_r17,offset];
                    }                   
                    function decode_cellEdgeEvaluationWhileStationary_r17(payload,offset){
                        let cellEdgeEvaluationWhileStationary_r17_SEQ_PREAMBLE,decoded_cellEdgeEvaluationWhileStationary_r17 = {};
                        [cellEdgeEvaluationWhileStationary_r17_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);
                        [decoded_cellEdgeEvaluationWhileStationary_r17["s-SearchThresholdP2-r17"],offset] = decode_ReselectionThreshold(payload,offset);
                        [decoded_cellEdgeEvaluationWhileStationary_r17["s-SearchThresholdQ2-r17"],offset] = decode_ReselectionThresholdQ(payload,offset);
                        return [decoded_cellEdgeEvaluationWhileStationary_r17,offset];
                    } 

                    [decoded_relaxedMeasurement_r17["stationaryMobilityEvaluation_r17"],offset] = decode_stationaryMobilityEvaluation_r17(payload,offset);
                    if(relaxedMeasurement_r17_SEQ_PREAMBLE[0] === "1") [decoded_relaxedMeasurement_r17["cellEdgeEvaluationWhileStationary_r17"],offset] = decode_cellEdgeEvaluationWhileStationary_r17(payload,offset);
                    if(relaxedMeasurement_r17_SEQ_PREAMBLE[1] === "1") [decoded_relaxedMeasurement_r17["combineRelaxedMeasCondition2-r17"],offset] = parse_ASN_ENUMERATED(payload,offset,["true"]);
                        
                    return [decoded_relaxedMeasurement_r17,offset];
                }

                if(EXT_GROUP_SEQ_PREAMBLE[0] === "1") [decoded_extensionGroup["cellEquivalentSize-r17"],offset] = parse_ASN_INTEGER(payload,offset,2,16);
                if(EXT_GROUP_SEQ_PREAMBLE[1] === "1") [decoded_extensionGroup["relaxedMeasurement-r17"],offset] = decode_relaxedMeasurement_r17(payload,offset);
                return [decoded_extensionGroup,offset];
            }

            let decoded_extensionGroup;
            [decoded_extensionGroup,offset] = parse_ASN_OPENFIELD(payload,offset,decode_extensionGroup2);
            decoded_SIB2 = {...decoded_SIB2,...decoded_extensionGroup};
        }
    }

    return [decoded_SIB2,offset];
}

function decode_IntraFreqNeighCellInfo(payload,offset){
    let IntraFreqNeighCellInfo_EXT_FLAG,IntraFreqNeighCellInfo_SEQ_PREAMBLE, decoded_IntraFreqNeighCellInfo = {};

    [IntraFreqNeighCellInfo_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [IntraFreqNeighCellInfo_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);
    
    [decoded_IntraFreqNeighCellInfo["physCellId"],offset] = decode_PhysCellId(payload,offset);
    [decoded_IntraFreqNeighCellInfo["q-OffsetCell"],offset] = decode_Q_OffsetRange(payload,offset);
    if(IntraFreqNeighCellInfo_SEQ_PREAMBLE[0] === "1") [decoded_IntraFreqNeighCellInfo["q-RxLevMinOffsetCell"],offset] = parse_ASN_INTEGER(payload,offset,1,8);
    if(IntraFreqNeighCellInfo_SEQ_PREAMBLE[1] === "1") [decoded_IntraFreqNeighCellInfo["q-RxLevMinOffsetCellSUL"],offset] = parse_ASN_INTEGER(payload,offset,1,8);
    if(IntraFreqNeighCellInfo_SEQ_PREAMBLE[2] === "1") [decoded_IntraFreqNeighCellInfo["q-QualMinOffsetCell"],offset] = parse_ASN_INTEGER(payload,offset,1,8);

    if(IntraFreqNeighCellInfo_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return decoded_IntraFreqNeighCellInfo;
}

function decode_IntraFreqNeighCellList(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,decode_IntraFreqNeighCellInfo);
}

function decode_IntraFreqExcludedCellList(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,decode_PCI_Range);
}

function decode_SIB3(payload,offset){
    let SIB3_EXT_FLAG,SIB3_SEQ_PREAMBLE, decoded_SIB3 = {};

    [SIB3_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

    [SIB3_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);
    if(SIB3_SEQ_PREAMBLE[0] === "1") [decoded_SIB3["intraFreqNeighCellList"],offset] = decode_IntraFreqNeighCellList(payload,offset);
    if(SIB3_SEQ_PREAMBLE[1] === "1") [decoded_SIB3["intraFreqExcludedCellList"],offset] = decode_IntraFreqExcludedCellList(payload,offset);
    if(SIB3_SEQ_PREAMBLE[2] === "1") console.log("Error: lateNonCriticalExtension is not implemented");
    
    if(SIB3_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_SIB3,offset];
}

function decode_InterFreqNeighCellInfo(payload,offset){
    let InterFreqNeighCellInfo_SEQ_PREAMBLE,InterFreqNeighCellInfo_EXT_FLAG,decoded_InterFreqNeighCellInfo = {};

    [InterFreqNeighCellInfo_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [InterFreqNeighCellInfo_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);

    [decoded_InterFreqNeighCellInfo["physCellId"],offset] = decode_PhysCellId(payload,offset);
    [decoded_InterFreqNeighCellInfo["q-OffsetCell"],offset] = decode_Q_OffsetRange(payload,offset);
    if(InterFreqNeighCellInfo_SEQ_PREAMBLE[0] === "1") [decoded_InterFreqNeighCellInfo["q-RxLevMinOffsetCell"],offset] = parse_ASN_INTEGER(payload,offset,1,8);
    if(InterFreqNeighCellInfo_SEQ_PREAMBLE[1] === "1") [decoded_InterFreqNeighCellInfo["q-RxLevMinOffsetCellSUL"],offset] = parse_ASN_INTEGER(payload,offset,1,8);
    if(InterFreqNeighCellInfo_SEQ_PREAMBLE[2] === "2") [decoded_InterFreqNeighCellInfo["q-QualMinOffsetCell"],offset] = parse_ASN_INTEGER(payload,offset,1,8);

    if(InterFreqNeighCellInfo_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_InterFreqNeighCellInfo,offset]
}

function decode_InterFreqNeighCellList(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,decode_InterFreqNeighCellInfo);
}

function decode_InterFreqExcludedCellList(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,decode_PCI_Range);
}

function decode_InterFreqCarrierFreqInfo(payload,offset){
    let InterFreqCarrierFreqInfo_EXT_FLAG,InterFreqCarrierFreqInfo_SEQ_PREAMBLE,decoded_InterFreqCarrierFreqInfo = {};
        
    [InterFreqCarrierFreqInfo_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [InterFreqCarrierFreqInfo_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,17);

    [decoded_InterFreqCarrierFreqInfo["dl-CarrierFreq"],offset] = decode_ARFCN_ValueNR(payload,offset);
    if(InterFreqCarrierFreqInfo_SEQ_PREAMBLE[0] === "1") [decoded_InterFreqCarrierFreqInfo["frequencyBandList"],offset] = decode_MultiFrequencyBandListNR_SIB(payload,offset);
    if(InterFreqCarrierFreqInfo_SEQ_PREAMBLE[1] === "1") [decoded_InterFreqCarrierFreqInfo["frequencyBandListSUL"],offset] = decode_MultiFrequencyBandListNR_SIB(payload,offset);
    if(InterFreqCarrierFreqInfo_SEQ_PREAMBLE[2] === "1") [decoded_InterFreqCarrierFreqInfo["nrofSS-BlocksToAverage"],offset] = parse_ASN_INTEGER(payload,offset,2,16);
    if(InterFreqCarrierFreqInfo_SEQ_PREAMBLE[3] === "1") [decoded_InterFreqCarrierFreqInfo["absThreshSS-BlocksConsolidation"],offset] = decode_ThresholdNR(payload,offset);
    if(InterFreqCarrierFreqInfo_SEQ_PREAMBLE[4] === "1") [decoded_InterFreqCarrierFreqInfo["smtc"],offset] = decode_SSB_MTC(payload,offset);
    [decoded_InterFreqCarrierFreqInfo["ssbSubcarrierSpacing"],offset] = decode_SubcarrierSpacing(payload,offset);
    if(InterFreqCarrierFreqInfo_SEQ_PREAMBLE[5] === "1") [decoded_InterFreqCarrierFreqInfo["ssb_ToMeasure"],offset] = decode_SSB_ToMeasure(payload,offset);  
    [decoded_InterFreqCarrierFreqInfo["deriveSSB-IndexFromCell"],offset] = parse_ASN_BOOLEAN(payload,offset);
    if(InterFreqCarrierFreqInfo_SEQ_PREAMBLE[6] === "1") [decoded_InterFreqCarrierFreqInfo["ss-RSSI-Measurement"],offset] = decode_SS_RSSI_Measurement(payload,offset);
    [decoded_InterFreqCarrierFreqInfo["q-RxLevMin"],offset] = decode_Q_RxLevMin(payload,offset);    
    if(InterFreqCarrierFreqInfo_SEQ_PREAMBLE[7] === "1") [decoded_InterFreqCarrierFreqInfo["q-RxLevMinSUL"],offset] = decode_Q_RxLevMin(payload,offset);
    if(InterFreqCarrierFreqInfo_SEQ_PREAMBLE[8] === "1") [decoded_InterFreqCarrierFreqInfo["q-QualMin"],offset] = decode_Q_QualMin(payload,offset);
    if(InterFreqCarrierFreqInfo_SEQ_PREAMBLE[9] === "1") [decoded_InterFreqCarrierFreqInfo["p-Max"],offset] = decode_P_Max(payload,offset);
    [decoded_InterFreqCarrierFreqInfo["t-ReselectionNR"],offset] = decode_T_Reselection(payload,offset);
    if(InterFreqCarrierFreqInfo_SEQ_PREAMBLE[10] === "1") [decoded_InterFreqCarrierFreqInfo["t-ReselectionNR-SF"],offset] = decode_SpeedStateScaleFactors(payload,offset);
    [decoded_InterFreqCarrierFreqInfo["threshX-HighP"],offset] = decode_ReselectionThreshold(payload,offset);
    [decoded_InterFreqCarrierFreqInfo["threshX-LowP"],offset] = decode_ReselectionThreshold(payload,offset);
    if(InterFreqCarrierFreqInfo_SEQ_PREAMBLE[11] === "1"){
        let decoded_threshX_Q = {};

        [decoded_threshX_Q["threshX-HighQ"],offset] = decode_ReselectionThresholdQ(payload,offset);
        [decoded_threshX_Q["threshX-LowQ"],offset] = decode_ReselectionThresholdQ(payload,offset);

        decoded_InterFreqCarrierFreqInfo["threshX-Q"] = decoded_threshX_Q;
    }
    if(InterFreqCarrierFreqInfo_SEQ_PREAMBLE[12] === "1") [decoded_InterFreqCarrierFreqInfo["cellReselectionPriority"],offset] = decode_CellReselectionPriority(payload,offset);
    if(InterFreqCarrierFreqInfo_SEQ_PREAMBLE[13] === "1") [decoded_InterFreqCarrierFreqInfo["cellReselectionSubPriority"],offset] = decode_CellReselectionSubPriority(payload,offset);
    if(InterFreqCarrierFreqInfo_SEQ_PREAMBLE[14] === "1") [decoded_InterFreqCarrierFreqInfo["q-OffsetFreq"],offset] = decode_Q_OffsetRange(payload,offset);
    if(InterFreqCarrierFreqInfo_SEQ_PREAMBLE[15] === "1") [decoded_InterFreqCarrierFreqInfo["interFreqNeighCellList"],offset] = decode_InterFreqNeighCellList(payload,offset);
    if(InterFreqCarrierFreqInfo_SEQ_PREAMBLE[16] === "1") [decoded_InterFreqCarrierFreqInfo["interFreqExcludedCellList"],offset] = decode_InterFreqExcludedCellList(payload,offset);

    if(InterFreqCarrierFreqInfo_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_InterFreqCarrierFreqInfo,offset];
}

function decode_InterFreqCarrierFreqList(payload,offset){
   return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,8,decode_InterFreqCarrierFreqInfo)
}

function decode_SIB4(payload,offset){
    let SIB4_SEQ_PREAMBLE,SIB4_EXT_FLAG, decoded_SIB4 = {};

    [SIB4_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [SIB4_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    [decoded_SIB4["interFreqCarrierFreqList"],offset] = decode_InterFreqCarrierFreqList(payload,offset);
    if(SIB4_SEQ_PREAMBLE[0] === "1") console.log("Error: lateNonCriticalExtension is not implemented");

    if(SIB4_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_SIB4,offset];
}

function decode_EUTRA_NS_PmaxValue(payload,offset){
    let EUTRA_NS_PmaxValue_SEQ_PREAMBLE,decoded_EUTRA_NS_PmaxValue = {};

    if(EUTRA_NS_PmaxValue_SEQ_PREAMBLE[0] === "1") [decoded_EUTRA_NS_PmaxValue["additionalPmax"],offset] = parse_ASN_INTEGER(payload,offset,-30,33);
    if(EUTRA_NS_PmaxValue_SEQ_PREAMBLE[1] === "1") [decoded_EUTRA_NS_PmaxValue["additionalSpectrumEmission"],offset] = parse_ASN_INTEGER(payload,offset,1,288);

    return [decoded_EUTRA_NS_PmaxValue,offset];
}

function decode_EUTRA_NS_PmaxList(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,8,decode_EUTRA_NS_PmaxValue);
}

function decode_FreqBandIndicatorEUTRA(payload,offset){
    return parse_ASN_INTEGER(payload,offset,1,256);
}

function decode_EUTRA_MultiBandInfo(payload,offset){
    let EUTRA_MultiBandInfo_SEQ_PREAMBLE,decoded_EUTRA_MultiBandInfo = {};

    [decoded_EUTRA_MultiBandInfo["eutra-FreqBandIndicator"],offset] = decode_FreqBandIndicatorEUTRA(payload,offset);
    if(EUTRA_MultiBandInfo_SEQ_PREAMBLE[0] === "1") [decoded_EUTRA_MultiBandInfo["eutra-NS-PmaxList"],offset] = decode_EUTRA_NS_PmaxList(payload,offset);

    return [decoded_EUTRA_MultiBandInfo,offset]
}

function decode_EUTRA_MultiBandInfoList(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,8,decode_EUTRA_MultiBandInfo);
}

function decode_EUTRA_PhysCellId(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,503);
}

function decode_EUTRA_Q_OffsetRange(payload,offset){
    return parse_ASN_ENUMERATED(payload,offset,["dB-24", "dB-22", "dB-20", "dB-18", "dB-16", "dB-14", "dB-12", "dB-10", "dB-8", "dB-6", "dB-5", "dB-4", "dB-3",
        "dB-2", "dB-1", "dB0", "dB1", "dB2", "dB3", "dB4", "dB5", "dB6", "dB8", "dB10", "dB12", "dB14", "dB16", "dB18", "dB20", "dB22", "dB24"]);
}

function decode_EUTRA_FreqNeighCellInfo(payload,offset){
    let EUTRA_FreqNeighCellInfo_SEQ_PREAMBLE,decoded_EUTRA_FreqNeighCellInfo = {};

    [EUTRA_FreqNeighCellInfo_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2);

    [decoded_EUTRA_FreqNeighCellInfo["physCellId"],offset] = decode_EUTRA_PhysCellId(payload,offset);
    [decoded_EUTRA_FreqNeighCellInfo["dummy"],offset] = decode_EUTRA_Q_OffsetRange(payload,offset);
    if(EUTRA_FreqNeighCellInfo_SEQ_PREAMBLE[0] === 1) [decoded_EUTRA_FreqNeighCellInfo["q-RxLevMinOffsetCell"],offset] = parse_ASN_INTEGER(payload,offset,1,8);
    if(EUTRA_FreqNeighCellInfo_SEQ_PREAMBLE[1] === 1) [decoded_EUTRA_FreqNeighCellInfo["q-QualMinOffsetCell"],offset] = parse_ASN_INTEGER(payload,offset,1,8);

    return [decoded_EUTRA_FreqNeighCellInfo,offset];
}

function decode_EUTRA_FreqNeighCellList(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,8,decode_EUTRA_FreqNeighCellInfo);
}

function decode_EUTRA_PhysCellIdRange(payload,offset){
    let EUTRA_PhysCellIdRange_SEQ_PREAMBLE,decoded_EUTRA_PhysCellIdRange = {};

    [EUTRA_PhysCellIdRange_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,1);

    [decoded_EUTRA_PhysCellIdRange["start"],offset] = decode_EUTRA_PhysCellId(payload,offset);
    if(EUTRA_PhysCellIdRange_SEQ_PREAMBLE[0] === 1){
        [decoded_EUTRA_PhysCellIdRange["range"],offset] = parse_ASN_ENUMERATED(payload,offset,["n4", "n8", "n12", "n16", "n24", "n32", "n48", "n64", "n84", "n96", "n128", "n168", "n252", "n504", "spare2", "spare1"]);
    }

    return [decoded_EUTRA_PhysCellIdRange,offset];
}

function decode_EUTRA_FreqExcludedCellList(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,16,decode_EUTRA_PhysCellIdRange)
}

function decode_EUTRA_AllowedMeasBandwidth(payload,offset){
    return parse_ASN_ENUMERATED(payload,offset,["mbw6", "mbw15", "mbw25", "mbw50", "mbw75", "mbw100"]);
}

function decode_EUTRA_PresenceAntennaPort1(payload,offset){
    return parse_ASN_BOOLEAN(payload,offset);
}

function decode_ARFCN_ValueEUTRA(payload,offset){
    return parse_ASN_INTEGER(payload,offset,0,262143);
}

function decode_CarrierFreqEUTRA(payload,offset){
    let CarrierFreqEUTRA_SEQ_PREAMBLE,decoded_CarrierFreqEUTRA = {};        
            
    [CarrierFreqEUTRA_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,6);

    [decoded_CarrierFreqEUTRA["carrierFreq"],offset] = decode_ARFCN_ValueEUTRA(payload,offset);
    if(CarrierFreqEUTRA_SEQ_PREAMBLE[0] === "1") [decoded_CarrierFreqEUTRA["eutra_MultiBandInfoList"],offset] = decode_EUTRA_MultiBandInfoList(payload,offset);
    if(CarrierFreqEUTRA_SEQ_PREAMBLE[1] === "1") [decoded_CarrierFreqEUTRA["eutra-FreqNeighCellList"],offset] = decode_EUTRA_FreqNeighCellList(payload,offset);     
    if(CarrierFreqEUTRA_SEQ_PREAMBLE[2] === "1") [decoded_CarrierFreqEUTRA["eutra-ExcludedCellList"],offset] = decode_EUTRA_FreqExcludedCellList(payload,offset);    
    [decoded_CarrierFreqEUTRA["allowedMeasBandwidth"],offset] = decode_EUTRA_AllowedMeasBandwidth(payload,offset);   
    [decoded_CarrierFreqEUTRA["presenceAntennaPort1"],offset] = decode_EUTRA_PresenceAntennaPort1(payload,offset);
    if(CarrierFreqEUTRA_SEQ_PREAMBLE[3] === "1") [decoded_CarrierFreqEUTRA["cellReselectionPriority"],offset] = decode_CellReselectionPriority(payload,offset);
    if(CarrierFreqEUTRA_SEQ_PREAMBLE[4] === "1") [decoded_CarrierFreqEUTRA["cellReselectionSubPriority"],offset] = decode_CellReselectionSubPriority(payload,offset);
    [decoded_CarrierFreqEUTRA["threshX-High"],offset] = decode_ReselectionThreshold(payload,offset);
    [decoded_CarrierFreqEUTRA["threshX-Low"],offset] = decode_ReselectionThreshold(payload,offset);
    [decoded_CarrierFreqEUTRA['q-RxLevMin'],offset] = parse_ASN_INTEGER(payload,offset,-70,-22);
    [decoded_CarrierFreqEUTRA["q-QualMin"],offset] = parse_ASN_INTEGER(payload,offset,-34,-3);
    [decoded_CarrierFreqEUTRA["p-MaxEUTRA"],offset] = parse_ASN_INTEGER(payload,offset,-30,33);
    if(CarrierFreqEUTRA_SEQ_PREAMBLE[5] === "1"){
        let decoded_threshX_Q = {};
        [decoded_threshX_Q["threshX-HighQ"],offset] = decode_ReselectionThresholdQ(payload,offset);
        [decoded_threshX_Q["threshX-LowQ"],offset] = decode_ReselectionThresholdQ(payload,offset);

        decoded_CarrierFreqEUTRA["threshX-Q"] = decoded_threshX_Q;
    }

    return [decoded_CarrierFreqEUTRA,offset];
}

function decode_CarrierFreqListEUTRA(payload,offset){
    return parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,8,decode_CarrierFreqEUTRA);
}

function decode_SIB5(payload,offset){
    let SIB5_EXT_FLAG,SIB5_SEQ_PREAMBLE,decoded_SIB5 = {};

    [SIB5_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);
    [SIB5_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,3);

    if(SIB5_SEQ_PREAMBLE[0] === "1") [decoded_SIB5["carrierFreqListEUTRA"],offset] = decode_CarrierFreqListEUTRA(payload,offset);
    [decoded_SIB5["t-ReselectionEUTRA"],offset] = decode_T_Reselection(payload,offset);
    if(SIB5_SEQ_PREAMBLE[1] === "1") [decoded_SIB5["t-ReselectionEUTRA-SF"],offset] = decode_SpeedStateScaleFactors(payload,offset);
    if(SIB5_SEQ_PREAMBLE[2] === "1")  console.log("Error: SIB5 lateNonCriticalExtension is not implemented")

    if(SIB5_EXT_FLAG === 1){
        [,offset] = skip_ASN_EXTENSIONS(payload,offset);
    }

    return [decoded_SIB5,offset];
}

function decode_SystemInformation_IEs(payload,offset){
    let SystemInformation_IEs_SEQ_PREAMBLE, decoded_SystemInformation_IEs = {};

    [SystemInformation_IEs_SEQ_PREAMBLE,offset] = getStringBits(payload,offset,2); //Those arent supported yet

    function decode_sib_TypeAndInfoChoice(payload,offset){
        let sib_TypeAndInfo_CHOICE_EXT_FLAG;
        [sib_TypeAndInfo_CHOICE_EXT_FLAG,offset] = parse_ASN_EXT_FLAG(payload,offset);

        let sib_TypeAndInfo_CHOICE_LIST = [{"sib2" : decode_SIB2}, {"sib3" : decode_SIB3}, {"sib4" : decode_SIB4}, {"sib5" : decode_SIB5}, {"sib6" : null}, 
            {"sib7" : null}, {"sib8" : null}, {"sib9" : null} ];

        return parse_ASN_CHOICE(payload,offset,sib_TypeAndInfo_CHOICE_LIST);
    }

    [decoded_SystemInformation_IEs["sib-TypeAndInfo"],offset] = parse_ASN_SEQUENCE_OF_SIZE(payload,offset,1,32,decode_sib_TypeAndInfoChoice);

    return [decoded_SystemInformation_IEs,offset];
}

function decode_SystemInformation(payload,offset){
    let decoded_SystemInformation = {};

    let criticalExtensions_CHOICE_LIST = [{"systemInformation" : decode_SystemInformation_IEs}, {"criticalExtensionsFuture-r16" : null}];
    [decoded_SystemInformation["criticalExtensions"],offset] = parse_ASN_CHOICE(payload,offset,criticalExtensions_CHOICE_LIST);

    return [decoded_SystemInformation,offset];
}

function decode_BCCH_DL_SCH_MessageType(payload,offset){
    
    function decode_c1(payload,offset){
        const c1_CHOICE_LIST = [{"systemInformation" : decode_SystemInformation},{"systemInformationBlockType1" : decode_SIB1}];
        return parse_ASN_CHOICE(payload,offset,c1_CHOICE_LIST);  
    }

    const MessageType_CHOICE_LIST = [{"c1" : decode_c1}, {"messageClassExtension" : (payload,offset) => {return [{},offset]}}];
    return parse_ASN_CHOICE(payload,offset,MessageType_CHOICE_LIST);
}

function decode_BCCH_DL_SCH_Message(payload,offset){
    let decoded_BCCH_DL_SCH_Message = {};

    [decoded_BCCH_DL_SCH_Message["message"],offset] = decode_BCCH_DL_SCH_MessageType(payload,offset);

    return [decoded_BCCH_DL_SCH_Message,offset];
}
