import "../../../styles/messages.css";
import {Message} from "../../../types/message";
import Avatar from "../../user/Avatar";
import {parseISO, format} from "date-fns";

interface BaseMessageProps {
    message: Message,
    previous_message: Message | null,
}

export default function BaseMessage({message, previous_message}: BaseMessageProps) {
    const date = parseISO(message.timestamp);
    const date_str = format(date, "dd.MM.yyyy h:mm aa");
    const sameAuthor = previous_message?.author.id === message.author.id;
    const sent = message.sent === undefined ? false : message.sent;

    return (
        <div className="message">
            <div className={`message-container ${!sameAuthor ? "message-bigger-margin" : ""}`}>
                <Avatar user={message.author} withBadge={false} size={36} divClassName={sameAuthor ? "vis-hidden h-0" : ""}/>
                <div className="message-info-content">
                    <div className={`message-info ${sameAuthor ? "d-none" : ""}`}>
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