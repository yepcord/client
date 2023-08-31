import CheckboxOption from "../../../ui/CheckboxOption";
import {Divider} from "@mui/material";
import {useState} from "react";
import {INSTANCE_NAME} from "../../../../constants";
import RadioOption from "../../../ui/RadioOption";
import ToDo from "../../../ui/ToDo";

export default function TextAndImagesTab() {
    const [spoiler, setSpoiler] = useState("on_click" as ("on_click" | "moderate" | "always"));
    const [checkboxes, setCheckboxes] = useState({
        as_links: false,
        uploaded: false,
        with_desc: false,
        show_emb_links: false,
        show_reactions: false,
        convert_emoticons: false,
        sticker_suggestions: false,
        preview_as_type: false,
        threads_split_view: false,
    });

    const toggleCheckbox = (name: "as_links" | "uploaded" | "with_desc" | "show_emb_links" | "show_reactions"
        | "convert_emoticons" | "sticker_suggestions" | "preview_as_type" | "threads_split_view") => {
        setCheckboxes({
            ...checkboxes,
            [name]: !checkboxes[name]
        })
    }

    return (<>
        <h2>Text & Images</h2>

        <span className="card-text-secondary">DISPLAY IMAGES AND VIDEOS</span>

        <CheckboxOption checked={checkboxes.as_links} onClick={() => toggleCheckbox("as_links")}
                        title="When posted as links to chat"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <CheckboxOption checked={checkboxes.uploaded} onClick={() => toggleCheckbox("uploaded")}
                        title={`When uploaded directly to ${INSTANCE_NAME}`}
                        description="Images larger than 10 MB will not be previewed."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <CheckboxOption checked={checkboxes.with_desc} onClick={() => toggleCheckbox("with_desc")}
                        title="With image descriptions"
                        description="Images descriptions are used to describe images for screenreaders."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <span className="card-text-secondary">EMBEDS AND LINK PREVIEWS</span>

        <CheckboxOption checked={checkboxes.show_emb_links} onClick={() => toggleCheckbox("show_emb_links")}
                        title="Show embeds and preview website links pasted into chat"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <span className="card-text-secondary">EMOJI</span>

        <CheckboxOption checked={checkboxes.show_reactions} onClick={() => toggleCheckbox("show_reactions")}
                        title="Show emoji reactions on messages"/>

        <CheckboxOption checked={checkboxes.convert_emoticons} onClick={() => toggleCheckbox("convert_emoticons")}
                        title="Automatically convert emoticons in your message to emoji"
                        description={`For example, then you type :-) ${INSTANCE_NAME} will convert it to 🙂.`}/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <span className="card-text-secondary">STICKERS</span>

        <CheckboxOption checked={checkboxes.sticker_suggestions} onClick={() => toggleCheckbox("sticker_suggestions")}
                        title="Sticker Suggestions"
                        description="Allow sticker suggestions to appear when typing messages."/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <span className="card-text-secondary">TEXT BOX</span>

        <CheckboxOption checked={checkboxes.preview_as_type} onClick={() => toggleCheckbox("preview_as_type")}
                        title="Preview emojis, mentions, and markdown syntax as you type"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <span className="card-text-secondary">THREADS</span>

        <CheckboxOption checked={checkboxes.threads_split_view} onClick={() => toggleCheckbox("threads_split_view")}
                        title="Open threacs in split view"/>

        <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

        <span className="card-text-secondary">SHOW SPOILER CONTENT</span>

        <RadioOption checked={spoiler === "on_click"} onClick={() => setSpoiler("on_click")} title="On Click"/>
        <RadioOption checked={spoiler === "moderate"} onClick={() => setSpoiler("moderate")} title="On guilds I moderate"/>
        <RadioOption checked={spoiler === "always"} onClick={() => setSpoiler("always")} title="Always"/>

        <ToDo text='Add "Chat font scaling" section'/>
    </>);
}