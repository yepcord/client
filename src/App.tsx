import React from 'react';
import ServersList from "./components/channels/NavBar";
import ChannelPanel from "./components/channels/ChannelPanel";
import ChannelContainer from "./components/channels/ChannelContainer";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
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
    return (
        <div className="main-container">
            <ThemeProvider theme={theme}>
                <ServersList/>
                <ChannelPanel/>
                <ChannelContainer/>

                <CssBaseline/>
            </ThemeProvider>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={ <CheckAuthenticated component={AppPage}/> }/>
                <Route path="/app" element={ <CheckAuthenticated component={AppPage}/> }/>

                <Route path="/login" element={ <CheckUnathenticated component={LoginPage}/> }/>
                <Route path="/register" element={ <CheckUnathenticated component={RegisterPage}/> }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
