import '../../styles/servers.css';
import ServerIcon from "./ServerIcon";
import {Divider} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {useEffect} from "react";
import {addServers} from "../../states/servers";
import AddIcon from '@mui/icons-material/Add';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {useNavigate} from "react-router-dom";

interface NavBarProps {
    guild: string
}

function ServerList({guild}: NavBarProps) {
    const state = useSelector((state: RootState) => state.server.servers);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://127.0.0.1:8989/guilds")
            .then(resp => resp.json())
            .then(json => {
                dispatch(addServers(json));
            })
    }, [dispatch]);

    return <>{
        Object.values(state).map(item => {
            return <ServerIcon title={item.name} selected={item.id === guild} onClick={() => navigate(`/channels/${item.id}/0`)}
                               image_url={`https://127.0.0.1:8000/media/icons/202461713512075264/${item.icon}.webp?size=96`}/>;
        })
    }</>;
}

export default function NavBar({guild}: NavBarProps) {
    const navigate = useNavigate();
    const serversState = useSelector((state: RootState) => state.server.servers);

    return (
        <div className="servers-list">
            <div/>

            <ServerIcon title="Direct Messages" image_url="/logo192.png" selected={guild === "@me"} onClick={() => navigate("/channels/@me")}/>

            <Divider className={"icons-divider"}/>

            <ServerList guild={guild}/>

            {Object.keys(serversState).length > 0 && <Divider className={"icons-divider"}/>}

            <ServerIcon title="Add a Server" button={true} svg={<AddIcon/>}/>
            <ServerIcon title="Explore public servers" button={true} svg={<ExploreOutlinedIcon/>}/>

            <Divider className={"icons-divider"}/>

            <ServerIcon title="Download Apps" button={true} svg={<FileDownloadOutlinedIcon/>}/>

            <div/>
        </div>
    );
}