import User from "../../types/user";
import {useState} from "react";
import {MEDIA_ENDPOINT} from "../../constants";
import { average } from 'color.js';
import {useSelector} from "react-redux";
import {RootState} from "../../store";

interface BannerProps {
    user: User,
    height?: number,
}

export default function Banner({user, height=100}: BannerProps) {
    const storedUser: User | null = useSelector((state: RootState) => state.users.users[user.id]);
    const [bg, setBg] = useState("var(--theme-3)");

    const fullUser: User = {...user, ...storedUser};
    console.log(fullUser)

    const bgProp = {
        height: bg.startsWith("#") ? height : undefined,
        maxHeight: height * 1.75,
        backgroundColor: bg,
        backgroundImage: bg.startsWith("#") ? undefined : `url("${bg}")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    };

    let b;
    if(fullUser?.banner) {
        b = `${MEDIA_ENDPOINT}/banners/${fullUser.id}/${fullUser.banner}.png`;
        b !== bg && setBg(b);
    } else if (typeof fullUser?.accent_color === "number") {
        b = fullUser?.accent_color.toString(16);
        b = b.length < 6 ? b.padStart(6, "0") : b;
        b = `#${b}`;
        b !== bg && setBg(b);
    } else if (fullUser?.avatar) {
        average(`${MEDIA_ENDPOINT}/avatars/${fullUser.id}/${fullUser.avatar}.png?size=32`, {format: "hex"}).then(color => {
            b = color as string;
            b !== bg && setBg(b);
        });
    }

    return (
        <div className="user-banner" style={{...bgProp}}>
            {!bg.startsWith("#") && <img src={bg} style={{visibility: "hidden", width: "100%"}} alt="Banner"/>}
        </div>
    );
}