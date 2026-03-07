protocol L1
  message PingPongReq:             PingPongReq_t             id:0x0001 end
  message EchoReq:                 EchoReq_t                 id:0x0002 end
  message EchoResp:                EchoResp_t                id:0x0003 end
  message LoopReq:                 LoopReq_t                 id:0x0004 end
  message UlMeasReq:               UlMeasReq_t               id:0x0005 end
  message WakeupReq:               WakeupReq_t               id:0x0006 end
  message StartupLoopReq:          StartupLoopReq_t          id:0x0007 end
  message SnapshotFileCreationReq: SnapshotFileCreationReq_t id:0x0008 end
  message LatencyEventReq:         LatencyEventReq_t         id:0x0009 end
  message DmaEndInd:               DmaEndInd_t               id:0x000A end
  message LaWakeupReq:             LaWakeupReq_t             id:0x000B end
  message DmaStartTestReq:         DmaStartTestReq_t         id:0x000C end
end