import { getProgramMetadata } from "@gear-js/api";
import { Button } from "@gear-js/ui";
import { useState } from "react";
import { useApi, useAlert } from "@gear-js/react-hooks";
import { AnyJson } from "@polkadot/types/types";

function GetJsonState(){
    const { api } = useApi();
    const fs = require('fs');
    const alert = useAlert();
    const [fullState, setFullState] = useState<AnyJson>();
    const programId =
        "0xb70082697355059f567e5f90dd948246798eb66846ba27957105f228c9236d0f";
    const meta =
        "000001000000000103000000000000000001030000002104200008346368726f6e69636c65735f696f28506f7374416374696f6e00010828437265617465506f73740800040118537472696e670000040118537472696e6700000038446f6e617465546f506f73746572040008010c753332000100000400000502000800000505000c00000210001008346368726f6e69636c65735f696f18496f506f737400000c01147469746c65040118537472696e67000110626f6479040118537472696e67000134706f737465725f77616c6c657414011c4163746f72496400001410106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001801205b75383b2033325d000018000003200000001c001c0000050300";
        
        const metadata = getProgramMetadata("0x" + meta);
        api.programState.read({ programId: programId }, metadata).then((result) => {
            setFullState(result.toJSON());
            alert.success("Successful state");
          })
          .catch(({ message }: Error) => alert.error(message));
          return(JSON.stringify(fullState));
          
}
// function ReadState() {
//   const { api } = useApi();

//   const alert = useAlert();

//   const [fullState, setFullState] = useState<AnyJson>();

//   const programId =
//     "0xb70082697355059f567e5f90dd948246798eb66846ba27957105f228c9236d0f";

//   const meta =
//     "000001000000000103000000000000000001030000002104200008346368726f6e69636c65735f696f28506f7374416374696f6e00010828437265617465506f73740800040118537472696e670000040118537472696e6700000038446f6e617465546f506f73746572040008010c753332000100000400000502000800000505000c00000210001008346368726f6e69636c65735f696f18496f506f737400000c01147469746c65040118537472696e67000110626f6479040118537472696e67000134706f737465725f77616c6c657414011c4163746f72496400001410106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001801205b75383b2033325d000018000003200000001c001c0000050300";

//     const getState = () => {
//         const metadata = getProgramMetadata("0x" + meta);
    
//         api.programState
//           .read({ programId: programId }, metadata)
//           .then((result) => {
//             setFullState(result.toJSON());
//             alert.success("Successful state");
//           })
//           .catch(({ message }: Error) => alert.error(message));
//       };
    
//       return (
//         <div className="container">
//           <center>Full State</center>
//           <center className="state">
//             State
//             <p className="text"> {JSON.stringify(fullState)}</p>
//           </center>
//           <Button text="Get Full State" onClick={getState} />
//         </div>
//       );
//     }
    
    export { GetJsonState };    