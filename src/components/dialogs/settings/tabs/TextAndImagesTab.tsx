import CheckboxOption from "../../../ui/CheckboxOption";
import {Divider} from "@mui/material";
import {INSTANCE_NAME} from "../../../../constants";
import RadioOption from "../../../ui/RadioOption";
import ToDo from "../../../ui/ToDo";
import useSettings from "../../../../hooks/use_settings";

export default function TextAndImagesTab() {
    const {settings, patchSettings, toggleSettings} = useSettings();

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

        <CheckboxOption checked={settings.view_image_descriptions} onClick={() => toggleSettings("view_image_descriptions")}
                        title="With image descriptions"
                        description="Images descriptions are used to describe images for screenreaders."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <span className="card-text-secondary">EMBEDS AND LINK PREVIEWS</span>

        <CheckboxOption checked={settings.render_embeds}
                        onClick={() => toggleSettings("render_embeds")}
                        title="Show embeds and preview website links pasted into chat"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <span className="card-text-secondary">EMOJI</span>

        <CheckboxOption checked={settings.render_reactions} onClick={() => toggleSettings("render_reactions")}
                        title="Show emoji reactions on messages"/>

        <CheckboxOption checked={settings.convert_emoticons} onClick={() => toggleSettings("convert_emoticons")}
                        title="Automatically convert emoticons in your message to emoji"
                        description={`For example, then you type :-) ${INSTANCE_NAME} will convert it to 🙂.`}/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <span className="card-text-secondary">STICKERS</span>

        <CheckboxOption checked={settings.expression_suggestions_enabled} onClick={() => toggleSettings("expression_suggestions_enabled")}
                        title="Sticker Suggestions"
                        description="Allow sticker suggestions to appear when typing messages."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <span className="card-text-secondary">TEXT BOX</span>

        <CheckboxOption checked={settings.use_rich_chat_input} onClick={() => toggleSettings("use_rich_chat_input")}
                        title="Preview emojis, mentions, and markdown syntax as you type"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <span className="card-text-secondary">THREADS</span>

        <CheckboxOption checked={settings.use_thread_sidebar} onClick={() => toggleSettings("use_thread_sidebar")}
                        title="Open threads in split view"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <span className="card-text-secondary">SHOW SPOILER CONTENT</span>

        <RadioOption checked={settings.render_spoilers === "ON_CLICK"}
                     onClick={() => patchSettings({render_spoilers: "ON_CLICK"})}
                     title="On Click"/>
        <RadioOption checked={settings.render_spoilers === "IF_MODERATOR"}
                     onClick={() => patchSettings({render_spoilers: "IF_MODERATOR"})}
                     title="On guilds I moderate"/>
        <RadioOption checked={settings.render_spoilers === "ALWAYS"}
                     onClick={() => patchSettings({render_spoilers: "ALWAYS"})}
                     title="Always"/>

        <ToDo text='Add "Chat font scaling" section'/>
    </>);
}