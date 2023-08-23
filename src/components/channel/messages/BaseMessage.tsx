import "../../../styles/messages.css";
import {Message} from "../../../types/message";
import Avatar from "../../user/Avatar";
import {parseISO, format} from "date-fns";

interface BaseMessageProps {
    message: Message,
}

export default function BaseMessage({message}: BaseMessageProps) {
    const date = parseISO(message.timestamp);
    const date_str = format(date, "dd.MM.yyyy h:mm aa");
    const sent = message.sent === undefined ? false : message.sent;

    return (
        <div className="message">
            <div className="message-container message-bigger-margin">
                <Avatar user={message.author} withBadge={false} size={36}/>
                <div className="message-info-content">
                    <div className="message-info">
                        <span className="message-username">{message.author.username}</span>
                        <span className="message-timestamp">{date_str}</span>
                    </div>
                    <div className={`message-content ${sent ? "message-content-pending" : ""}`}>
                        {message.content}
                    </div>
                </div>
            </div>
        </div>
    );
}