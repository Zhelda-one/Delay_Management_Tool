class L1unit{
    constructor(config, src_addr, dst_addr){
        this.ingress = new Ingress(config);
        // init APP_TABLE_MEM
        this.atm = new APP_TABLE_MEM(config,
            src_addr,
            dst_addr,
            this.ingress);
        // init L2L1 processing block
        this.L2L1proc = new L2L1process(this.atm,
            config,
            src_addr,
            dst_addr)
    }


    process_L2L1(uprr){
        // fill ATM with content from UlData_PuschReceiveReq
        this.skipped = this.L2L1proc.fill_ATM(uprr);
        return this.atm.ethernet_frames();
    }
}