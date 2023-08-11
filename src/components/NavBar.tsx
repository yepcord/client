import '../styles/servers.css';
import ServerIcon from "./ServerIcon";
import {Divider} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {useEffect} from "react";
import {addServers} from "../reducers/serverSlice";
import AddIcon from '@mui/icons-material/Add';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

function ServerList() {
    const state = useSelector((state: RootState) => state.server.servers);
    const dispatch = useDispatch();

    /*useEffect(() => {
        fetch("http://127.0.0.1:8989/guilds")
            .then(resp => resp.json())
            .then(json => {
                dispatch(addServers(json));
            })
    }, []);*/

    return <>{
        Object.values(state).map(item => {
            return <ServerIcon title={item.name}
                               image_url={`https://127.0.0.1:8000/media/icons/202461713512075264/${item.icon}.webp?size=96`}/>;
        })
    }</>;
}

export default function NavBar() {
    const serversState = useSelector((state: RootState) => state.server.servers);

    return (
        <div className="servers-list">
            <div/>

            <ServerIcon title="Direct Messages" image_url="/logo192.png"></ServerIcon>

            <Divider className={"icons-divider"}/>

            <ServerList/>

            {Object.keys(serversState).length > 0 && <Divider className={"icons-divider"}/>}

            <ServerIcon title="Add a Server" button={true} svg={<AddIcon/>}/>
            <ServerIcon title="Explore public servers" button={true} svg={<ExploreOutlinedIcon/>}/>

            <Divider className={"icons-divider"}/>

            <ServerIcon title="Download Apps" button={true} svg={<FileDownloadOutlinedIcon/>}/>

            <div/>
        </div>
    );
}