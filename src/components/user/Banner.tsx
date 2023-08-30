import User from "../../types/user";
import {useState} from "react";
import {MEDIA_ENDPOINT} from "../../constants";
import { average } from 'color.js';

interface BannerProps {
    user: User,
    height?: number,
}

export default function Banner({user, height=100}: BannerProps) {
    const [bg, setBg] = useState("var(--theme-3)");

    console.log("banner render??")

    let b;
    if(user?.banner) {
        b = `url("${MEDIA_ENDPOINT}/banners/${user.id}/${user.banner}.png") no-repeat`;
        b !== bg && setBg(b);
    } else if (user?.avatar) {
        average(`${MEDIA_ENDPOINT}/avatars/${user.id}/${user.avatar}.png?size=32`, {format: "hex"}).then(color => {
            b = color as string;
            b !== bg && setBg(b);
        });
    }

    return (
        <div className="user-banner" style={{height: height, background: bg, backgroundSize: "cover"}}>
        </div>
    );
}