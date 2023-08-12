import React from 'react';
import ServersList from "./components/channels/NavBar";
import ChannelPanel from "./components/channels/ChannelPanel";
import ChannelContainer from "./components/channels/ChannelContainer";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthPage from "./components/auth/AuthPage";

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
                <Route index path="/" element={<AppPage/>}/>
                <Route path="/app" element={<AppPage/>}/>

                <Route path="/login" element={<AuthPage page="login"/>}/>
                <Route path="/register" element={<AuthPage page="register"/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
