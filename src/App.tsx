import React from 'react';
import NavBar from "./components/channels/NavBar";
import ChannelPanel from "./components/channels/ChannelPanel";
import ChannelContainer from "./components/channels/ChannelContainer";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, Navigate, Route, Routes, useLocation, useParams} from "react-router-dom";
import {LoginPage, RegisterPage} from "./components/auth/AuthPage";
import CheckAuthenticated from "./components/CheckAuthenticated";
import CheckUnathenticated from "./components/CheckUnauthenticated";

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
    let guild = params.guild ? params.guild : null;
    let channel = params.channel ? params.channel : null;
    if(location.pathname === "/channels/@me")
        guild = "@me";

    return (
        <div className="main-container">
            <ThemeProvider theme={theme}>
                <NavBar guild={guild!}/>
                <ChannelPanel guild={guild!} channel={channel}/>
                <ChannelContainer guild={guild!} channel={channel}/>

                <CssBaseline/>
            </ThemeProvider>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={ <CheckAuthenticated element={ <Navigate to="/channels/@me" replace /> }/> }/>
                <Route path="/app" element={ <CheckAuthenticated element={ <Navigate to="/channels/@me" replace /> }/> }/>
                <Route path="/channels/@me" element={ <CheckAuthenticated component={AppPage}/> }/>
                <Route path="/channels/:guild/:channel" element={ <CheckAuthenticated component={AppPage}/> }/>

                <Route path="/login" element={ <CheckUnathenticated component={LoginPage}/> }/>
                <Route path="/register" element={ <CheckUnathenticated component={RegisterPage}/> }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
