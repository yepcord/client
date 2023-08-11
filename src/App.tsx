import React from 'react';
import ServersList from "./components/NavBar";
import ChannelPanel from "./components/ChannelPanel";
import ChannelContainer from "./components/ChannelContainer";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

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

function App() {
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

export default App;
