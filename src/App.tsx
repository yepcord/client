import React from 'react';
import NavBar from "./components/navbar/NavBar";
import ChannelPanel from "./components/channel_panel/ChannelPanel";
import ChannelContainer from "./components/channel/ChannelContainer";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, Navigate, Route, Routes, useLocation, useParams} from "react-router-dom";
import {LoginPage, MfaPage, RegisterPage} from "./components/auth/AuthPage";
import CheckAuthenticated from "./components/CheckAuthenticated";
import CheckUnauthenticated from "./components/CheckUnauthenticated";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedGuild} from "./states/guilds";
import {selectChannel} from "./utils";
import GatewayWebsocket from "./ws/gateway/GatewayWebsocket";
import SettingsDialog from "./components/dialogs/settings/SettingsDialog";
import {RootState} from "./store";
import Loader from "./components/loader";
import UserProfileDialog from "./components/dialogs/users/UserProfileDialog";

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
    if (location.pathname === "/channel/@me")
        guild = "@me";

    dispatch(setSelectedGuild(guild));
    const channelAction = selectChannel(channel);
    channelAction && dispatch(channelAction);

    return (<>
        <div className="main-container">
            <ThemeProvider theme={theme}>
                <NavBar/>
                <ChannelPanel/>
                <ChannelContainer/>

                <CssBaseline/>
            </ThemeProvider>
            <GatewayWebsocket/>
        </div>
        <SettingsDialog/>
        <UserProfileDialog/>
    </>);
}

function AppLoader() {
    const ready = useSelector((state: RootState) => state.app.websocketReady);

    return (<>
        <GatewayWebsocket/>

        {ready ? <AppPage/> : <Loader/>}
    </>);
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<CheckAuthenticated element={<Navigate to="/channels/@me" replace/>}/>}/>
                <Route path="/app" element={<CheckAuthenticated element={<Navigate to="/channels/@me" replace/>}/>}/>
                <Route path="/channels/@me" element={<CheckAuthenticated component={AppLoader}/>}/>
                <Route path="/channels/:guild/:channel" element={<CheckAuthenticated component={AppLoader}/>}/>

                <Route path="/login" element={<CheckUnauthenticated component={LoginPage}/>}/>
                <Route path="/register" element={<CheckUnauthenticated component={RegisterPage}/>}/>
                <Route path="/mfa" element={<CheckUnauthenticated component={MfaPage}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
