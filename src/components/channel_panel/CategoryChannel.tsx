import {ChannelsHValues} from "./ChannelsH";
import {useState} from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import {ChannelType} from "../../types/channel";
import TextChannel from "./TextChannel";
import VoiceChannel from "./VoiceChannel";
import CreateGuildChannelDialog from "../dialogs/channels/CreateGuildChannelDialog";

export default function CategoryChannel(props: ChannelsHValues) {
    const [open, setOpen] = useState(true);
    const [createOpen, setCreateOpen] = useState(false);
    props.channels.sort((a, b) => (a.position ? a.position : 0) - (b.position ? b.position : 0));

    const handleCreateChannel = (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        setCreateOpen(true);
    }

    return (
        <div>
            <div className="category-channel" onClick={() => setOpen(!open)}>
                <span>{open ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}{props.channel.name!.toUpperCase()}</span>
                <Tooltip title="Create channel">
                    <AddIcon onClick={handleCreateChannel}/>
                </Tooltip>
            </div>
            <div className={`channel-panel-guild-items ${!open && "d-none"}`}>
                {props.channels.map(channel => {
                    return channel.type === ChannelType.GUILD_VOICE
                        ? <VoiceChannel channel={channel}/>
                        : <TextChannel channel={channel}/>;
                })}
            </div>
            <CreateGuildChannelDialog guild_id={props.channel.guild_id!} parent={props.channel} open={createOpen}
                                      close={() => setCreateOpen(false)}/>
        </div>
    );
}