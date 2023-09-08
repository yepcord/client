import {Message} from "../types/message";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import User from "../types/user";

export default function useAuthor(message: Message): User {
    const member = useSelector((state: RootState) => message.guild_id ? state.guild.guilds[message.guild_id].members[message.author.id] : null);

    const author = {...message.author};
    if(member) {
        author.username = member.nick || author.username;
        author.avatar = member.avatar || author.avatar;
    }

    return author;
}