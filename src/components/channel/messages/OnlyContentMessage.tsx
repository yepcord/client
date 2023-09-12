import "../../../styles/messages.css";
import {Message} from "../../../types/message";
import {format, parseISO} from "date-fns";
import {parse} from "./formatting";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {useContext} from "react";
import {MessageContext} from "./index";

interface OnlyContentMessageProps {
    message: Message,
}

export default function OnlyContentMessage({message}: OnlyContentMessageProps) {
    const me = useSelector((state: RootState) => state.app.me);
    const date = parseISO(message.timestamp);
    const date_str = format(date, "h:mm aa");
    const sent = message.sent === undefined ? false : message.sent;
    const ctx = useContext(MessageContext);

    const isMention = message.mention_everyone || message.mentions?.map(item => {
        return item.id === me?.id;
    }).includes(true);

    return (
        <div className={`message ${ctx.forceHover ? "message-hovered" : ""}`}>
            <div className={`message-container ${isMention ? "message-container-mention" : ""}`}>
                <div className="message-timestamp-left">
                    {date_str}
                </div>
                <div className="message-info-content">
                    <div className={`message-content selectable ${sent ? "message-content-pending" : ""}`}>
                        {parse(message.content ? message.content : "")}
                    </div>
                </div>
            </div>
        </div>
    );
}