import React, {useState} from 'react';
import NavBar from "./components/channels/NavBar";
import ChannelPanel from "./components/channels/ChannelPanel";
import ChannelContainer from "./components/channels/ChannelContainer";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, Navigate, Route, Routes, useLocation, useParams} from "react-router-dom";
import {LoginPage, RegisterPage} from "./components/auth/AuthPage";
import CheckAuthenticated from "./components/CheckAuthenticated";
import CheckUnauthenticated from "./components/CheckUnauthenticated";
import {useDispatch} from "react-redux";
import {setSelectedGuild} from "./states/guilds";
import {selectChannel} from "./utils";
import GatewayWebsocket from "./ws/GatewayWebsocket";
import SettingsDialog from "./components/channels/SettingsDialog";

const theme = createTheme({
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: '1em'
                }
            }
        }
    }
});

function AppPage() {
    const location = useLocation();
    const params = useParams();
    const dispatch = useDispatch();
    let guild = params.guild ? params.guild : null;
    let channel = params.channel ? params.channel : null;
    if (location.pathname === "/channels/@me")
        guild = "@me";

    dispatch(setSelectedGuild(guild));
    const channelAction = selectChannel(channel);
    channelAction && dispatch(channelAction);

    return (<>
        <SettingsDialog/>
        <div className="main-container">
            <ThemeProvider theme={theme}>
                <NavBar/>
                <ChannelPanel/>
                <ChannelContainer/>

                <CssBaseline/>
            </ThemeProvider>
            <GatewayWebsocket/>
        </div>
    </>);
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<CheckAuthenticated element={<Navigate to="/channels/@me" replace/>}/>}/>
                <Route path="/app" element={<CheckAuthenticated element={<Navigate to="/channels/@me" replace/>}/>}/>
                <Route path="/channels/@me" element={<CheckAuthenticated component={AppPage}/>}/>
                <Route path="/channels/:guild/:channel" element={<CheckAuthenticated component={AppPage}/>}/>

                <Route path="/login" element={<CheckUnauthenticated component={LoginPage}/>}/>
                <Route path="/register" element={<CheckUnauthenticated component={RegisterPage}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
