import CheckboxOption from "../../../ui/CheckboxOption";
import {Divider} from "@mui/material";
import {INSTANCE_NAME} from "../../../../constants";
import RadioOption from "../../../ui/RadioOption";
import ToDo from "../../../ui/ToDo";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {setSettings} from "../../../../states/app";

export default function TextAndImagesTab() {
    const settings = useSelector((state: RootState) => state.app.settings);
    const dispatch = useDispatch();

    return (<>
        <h2>Text & Images</h2>

        <span className="card-text-secondary">DISPLAY IMAGES AND VIDEOS</span>

        <CheckboxOption checked={false} onClick={() => {}}
                        title="When posted as links to chat"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <CheckboxOption checked={false} onClick={() => {}}
                        title={`When uploaded directly to ${INSTANCE_NAME}`}
                        description="Images larger than 10 MB will not be previewed."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <CheckboxOption checked={false} onClick={() => {}}
                        title="With image descriptions"
                        description="Images descriptions are used to describe images for screenreaders."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <span className="card-text-secondary">EMBEDS AND LINK PREVIEWS</span>

        <CheckboxOption checked={settings.render_embeds}
                        onClick={() => dispatch(setSettings({render_embeds: !settings.render_embeds}))}
                        title="Show embeds and preview website links pasted into chat"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <span className="card-text-secondary">EMOJI</span>

        <CheckboxOption checked={false} onClick={() => {}}
                        title="Show emoji reactions on messages"/>

        <CheckboxOption checked={false} onClick={() => {}}
                        title="Automatically convert emoticons in your message to emoji"
                        description={`For example, then you type :-) ${INSTANCE_NAME} will convert it to 🙂.`}/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <span className="card-text-secondary">STICKERS</span>

        <CheckboxOption checked={false} onClick={() => {}}
                        title="Sticker Suggestions"
                        description="Allow sticker suggestions to appear when typing messages."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <span className="card-text-secondary">TEXT BOX</span>

        <CheckboxOption checked={false} onClick={() => {}}
                        title="Preview emojis, mentions, and markdown syntax as you type"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <span className="card-text-secondary">THREADS</span>

        <CheckboxOption checked={false} onClick={() => {}}
                        title="Open threads in split view"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <span className="card-text-secondary">SHOW SPOILER CONTENT</span>

        <RadioOption checked={settings.render_spoilers === "ON_CLICK"}
                     onClick={() => dispatch(setSettings({render_spoilers: "ON_CLICK"}))} title="On Click"/>
        <RadioOption checked={settings.render_spoilers === "IF_MODERATOR"}
                     onClick={() => dispatch(setSettings({render_spoilers: "IF_MODERATOR"}))}
                     title="On guilds I moderate"/>
        <RadioOption checked={settings.render_spoilers === "ALWAYS"}
                     onClick={() => dispatch(setSettings({render_spoilers: "ALWAYS"}))} title="Always"/>

        <ToDo text='Add "Chat font scaling" section'/>
    </>);
}