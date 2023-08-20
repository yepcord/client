import TextChannelInputPanel from "./TextChannelInputPanel";

export default function TextChannelContent() {


    return (
        <div className="channel-content">
            <div className="channel-messages">
                <p><b>Guild or DM channel content</b></p>
            </div>
            <TextChannelInputPanel/>
        </div>
    );
}
