import "../styles/loader.css";
import {CircularProgress, createTheme, Divider, LinearProgress, Skeleton, ThemeProvider} from "@mui/material";
import {Tag} from "@mui/icons-material";
import TagIcon from "@mui/icons-material/Tag";

const theme = createTheme({
    components: {
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgba(0, 0, 0, .4)",
                }
            }
        }
    }
});

function DmChannelSkeleton() {
    return (
        <div className="loader-dm-channel">
            <Skeleton animation="wave" variant="circular" width={48} height={48}/>
            <Skeleton animation="wave" sx={{height: 20, flexGrow: 1}} variant="rounded"/>
        </div>
    );
}

export default function Loader() {
    return (
        <ThemeProvider theme={theme}>
            <div className="loader-root">
                <div className="loader-navbar">
                    <div/>
                    <Skeleton animation="wave" variant="circular" width={48} height={48}/>
                    <Skeleton animation="wave" variant="circular" width={48} height={48}/>
                    <Skeleton animation="wave" variant="circular" width={48} height={48}/>
                    <Skeleton animation="wave" variant="circular" width={48} height={48}/>
                    <Skeleton animation="wave" variant="circular" width={48} height={48}/>
                    <Skeleton animation="wave" variant="circular" width={48} height={48}/>
                    <Skeleton animation="wave" variant="circular" width={48} height={48}/>
                    <Skeleton animation="wave" variant="circular" width={48} height={48}/>
                    <Skeleton animation="wave" variant="circular" width={48} height={48}/>
                    <Skeleton animation="wave" variant="circular" width={48} height={48}/>

                </div>
                <div className="loader-panel-container">
                    <div className="loader-panel">
                        <Skeleton animation="wave" sx={{height: 25}} variant="rounded"/>
                        <Skeleton animation="wave" sx={{height: 50}} variant="rounded"/>
                        <LinearProgress color="inherit" />

                        <DmChannelSkeleton/>
                        <DmChannelSkeleton/>
                        <DmChannelSkeleton/>
                        <DmChannelSkeleton/>
                        <DmChannelSkeleton/>
                    </div>
                </div>
                <div className="loader-channel-container">
                    <div className="loader-channel-titlebar">
                        <div className="loader-channel-titlebar-content">
                            <TagIcon/>
                            <Skeleton animation="wave" sx={{height: 20, width: 150}} variant="rounded"/>
                        </div>
                    </div>
                    <LinearProgress color="inherit" />
                    <div className="loader-channel-content">
                        <CircularProgress color="inherit" sx={{ width: 100, height: 100 }} />
                        Loading
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}