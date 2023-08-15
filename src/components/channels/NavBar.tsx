import '../../styles/servers.css';
import GuildIcon from "./GuildIcon";
import {Divider} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {useEffect} from "react";
import {addGuilds} from "../../states/guilds";
import AddIcon from '@mui/icons-material/Add';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {useNavigate} from "react-router-dom";

function GuildList() {
    const state = useSelector((state: RootState) => state.guild.guilds);
    const selectedGuild = useSelector((state: RootState) => state.guild.selectedGuild);
    const navigate = useNavigate();

    return <>{
        Object.values(state).map(item => {
            return <GuildIcon title={item.name} selected={item.id === selectedGuild?.id} onClick={() => navigate(`/channels/${item.id}/0`)}
                               image_url={`https://127.0.0.1:8000/media/icons/202461713512075264/${item.icon}.webp?size=96`}/>;
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