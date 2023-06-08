import { Button } from "@gear-js/ui";
import { GearApi, getProgramMetadata, GearKeyring } from "@gear-js/api";
import { useAlert } from "@gear-js/react-hooks";

function MessageQueued() {
  const alert = useAlert();

  const Messagequeued = async () => {
    const gearApi = await GearApi.create({
      providerAddress: "wss://rpc-node.gear-tech.io",
    });

    const codeId =
      "0x109ffa89f6886b0ff2a8dad5c62ef45a838c78e063f998f85e0cd069b20f49dd";
    const programId =
      "0x4d47b38aa8a9b1f896283445328a43802d95f2fb413017aa90d1f668809b24d1";

    const somePayload = "0x676574"; // get "0x676574" inc: '0x696E63'
    const meta: any = getProgramMetadata(programId);
    const keyring = await GearKeyring.fromSuri("//Alice");

    const message: any = {
      destination: programId, // programId
      payload: somePayload,
      gasLimit: 899819245,
      value: 1000,
    };

    const extrinsic: any = gearApi.message.send(message, meta);
    await extrinsic.signAndSend(keyring, (event: any) => {
      console.log(event.toHuman());
      alert.success(Object.keys(event.toHuman().status));
    });

    // MessageQueued subscribtion
    const unsub = gearApi.gearEvents.subscribeToGearEvent(
      "MessageQueued",
      ({ data: { id, source, destination, entry } }) => {
        console.log({
          messageId: id.toHex(),
          programId: destination.toHex(),
          userId: source.toHex(),
          entry: entry.isInit
            ? entry.asInit
            : entry.isHandle
            ? entry.asHandle
            : entry.asReply,
        });
      }
    );
  };

  return (
    <div className="container">
      <h1>Message Queued Event</h1>
      <p className="mnemonic">Subscriptions: </p>
      <Button text="MessageQueued" onClick={Messagequeued} />
    </div>
  );
}

export { MessageQueued };