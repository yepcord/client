import '../../styles/servers.css';
import GuildIcon from "./GuildIcon";
import {Divider} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import AddIcon from '@mui/icons-material/Add';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {useNavigate} from "react-router-dom";
import {MEDIA_ENDPOINT} from "../../constants";
import Guild from "../../types/guild";

function GuildList() {
    const state = useSelector((state: RootState) => state.guild.guilds);
    const selectedGuild = useSelector((state: RootState) => state.guild.selectedGuild);
    const navigate = useNavigate();

    const getGuildIconUrl = (guild: Guild) => {
        return guild.icon === null ? "/empty-guild-icon.png" : `${MEDIA_ENDPOINT}/icons/${guild.id}/${guild.icon}.webp?size=96`;
    }

    return <>{
        Object.values(state).map(item => {
            return <GuildIcon title={item.name} selected={item.id === selectedGuild?.id} onClick={() => navigate(`/channels/${item.id}/0`)}
                               image_url={getGuildIconUrl(item)}/>;
        })
    }</>;
}

export default function NavBar() {
    const navigate = useNavigate();
    const guildsState = useSelector((state: RootState) => state.guild.guilds);
    const selectedGuild = useSelector((state: RootState) => state.guild.selectedGuild);

    return (
        <div className="servers-list">
            <div/>

            <GuildIcon title="Direct Messages" image_url="/logo192.png" selected={selectedGuild === null} onClick={() => navigate("/channels/@me")}/>

            <Divider className={"icons-divider"}/>

            <GuildList/>

            {Object.keys(guildsState).length > 0 && <Divider className={"icons-divider"}/>}

            <GuildIcon title="Add a Guild" button={true} svg={<AddIcon/>}/>
            <GuildIcon title="Explore public guilds" button={true} svg={<ExploreOutlinedIcon/>}/>

            <Divider className={"icons-divider"}/>

            <GuildIcon title="Download Apps" button={true} svg={<FileDownloadOutlinedIcon/>}/>

            <div/>
        </div>
    );
}