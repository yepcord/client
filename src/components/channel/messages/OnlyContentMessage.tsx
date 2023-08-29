import "../../../styles/messages.css";
import {Message} from "../../../types/message";
import {parseISO, format} from "date-fns";
import {parse} from "./formatting";

interface OnlyContentMessageProps {
    message: Message,
}

export default function OnlyContentMessage({message}: OnlyContentMessageProps) {
    const date = parseISO(message.timestamp);
    const date_str = format(date, "h:mm aa");
    const sent = message.sent === undefined ? false : message.sent;

    return (
        <div className="message">
            <div className="message-container">
                <div className="message-timestamp-left">
                    {date_str}
                </div>
                <div className="message-info-content">
                    <div className={`message-content ${sent ? "message-content-pending" : ""}`}>
                        {parse(message.content ? message.content : "")}
                    </div>
                </div>
            </div>
        </div>
    );
}