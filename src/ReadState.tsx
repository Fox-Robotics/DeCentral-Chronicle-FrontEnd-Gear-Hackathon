import { getProgramMetadata } from "@gear-js/api";
import { Button } from "@gear-js/ui";
import { useState } from "react";
import { useApi, useAlert } from "@gear-js/react-hooks";
import { AnyJson } from "@polkadot/types/types";

function ReadState() {
  const { api } = useApi();

  const alert = useAlert();

  const [fullState, setFullState] = useState<AnyJson>();

  // Add your codeID
  const codeId =
    "0x0c1e31b6048f6d042cdc1169bc1dfb66e078961a650fb70fa4906ffcbb1a5dbd";

  // Add your programID
  const programId =
    "0xad2b03db9a0ba444a205f022d1ea4e75b6f243048b3b0fe881f05dbac0981d4c";
 
  // Add your meta.txt
  const meta =
    "00000100000000010100000000000000000103000000c1031c0008346368726f6e69636c65735f696f28506f7374416374696f6e00010828437265617465506f73740400040118537472696e6700000038446f6e617465546f506f73746572040008010c753332000100000400000502000800000505000c08346368726f6e69636c65735f696f18496f506f73740000080120636f6e74656e7473040118537472696e6700014c646f6e6174696f6e735f726563697069656e7410011c4163746f72496400001010106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001401205b75383b2033325d000014000003200000001800180000050300";

  const getState = () => {
    const metadata = getProgramMetadata(`0x${meta}`);

    api.programState
      .read({ programId: programId }, metadata)
      .then((result) => {
        setFullState(result.toJSON());
        alert.success("Successful state");
      })
      .catch(({ message }: Error) => alert.error(message));
  };

  return (
    <div className="container">
      <center>Full State</center>
      <center className="state">
        State
        <p className="text"> {JSON.stringify(fullState)}</p>
      </center>
      <Button text="Get Full State" onClick={getState} />
    </div>
  );
}

export { ReadState };
