import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {useNavigate} from "react-router-dom";
import Guild from "../../types/guild";
import {MEDIA_ENDPOINT} from "../../constants";
import {ChannelType} from "../../types/channel";
import GuildIcon from "./GuildIcon";

export default function GuildList() {
    const state = useSelector((state: RootState) => state.guild.guilds);
    const selectedGuild = useSelector((state: RootState) => state.guild.selectedGuild);
    const navigate = useNavigate();

    const getGuildIconUrl = (guild: Guild) => {
        return guild.icon === null ? "/no-image.png" : `${MEDIA_ENDPOINT}/icons/${guild.id}/${guild.icon}.webp?size=96`;
    }

    const getFirstTextChannel = (guild: Guild) => {
        for (let channel of Object.values(guild.channels!)) {
            if (channel.type === ChannelType.GUILD_TEXT) // TODO: Check permissions
                return channel.id;
        }
        return "0";
    }

    return <>{
        Object.values(state).map(guild => {
            return <GuildIcon title={guild.name} selected={guild.id === selectedGuild?.id}
                              onClick={() => navigate(`/channels/${guild.id}/${getFirstTextChannel(guild)}`)}
                              image_url={getGuildIconUrl(guild)}/>;
        })
    }</>;
}