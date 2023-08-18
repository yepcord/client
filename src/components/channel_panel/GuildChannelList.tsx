import {useSelector} from "react-redux";
import {RootState} from "../../store";
import Channel, {ChannelType} from "../../types/channel";
import {ChannelsH, ChannelsHValues} from "./ChannelsH";
import CategoryChannel from "./CategoryChannel";

export default function GuildChannelList() {
    const guild_channels = useSelector((state: RootState) => state.guild.selectedGuild?.channels);

    const buildChannelsHierarchy = (guild_channels: { [key: string]: Channel }): ChannelsHValues[] => { // TODO: Check permissions
        let channels: ChannelsH = {};
        for (let channel of Object.values(guild_channels!) as Channel[]) {
            if (channel.type === ChannelType.GUILD_CATEGORY)
                channels[channel.id] = {channel: channel, channels: []};
        }
        for (let channel of Object.values(guild_channels!) as Channel[]) {
            if (channel.parent_id && channel.parent_id in channels)
                channels[channel.parent_id].channels.push(channel);
            else
                channels[channel.id] = {channel: channel, channels: []};
        }
        let result = Object.values(channels) as ChannelsHValues[];
        result.sort((a, b) => (a.channel.position ? a.channel.position : 0) - (b.channel.position ? b.channel.position : 0));
        return result;
    }

    return (
        <div className="guild-channel-list">
            {buildChannelsHierarchy(guild_channels!).map(item => {
                return <CategoryChannel {...item}/>
            })}
        </div>
    );
}