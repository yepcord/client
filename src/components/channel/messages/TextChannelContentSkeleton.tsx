import {Skeleton} from "@mui/material";
import {RefObject} from "react";

function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

function SkeletonMessageUsername() {
    const w = random(40, 120);
    return <Skeleton animation="wave" variant={"rounded"} sx={{width: w}}/>
}

function SkeletonMessageContent() {
    const w = random(10, 100);
    return <Skeleton animation={false} variant={"text"} sx={{width: w}}/>
}

function SkeletonMessageContentRow() {
    let words = [];
    for(let i = 0; i < random(5, 15); i++) {
        words.push(<SkeletonMessageContent/>);
    }
    return <div className="loader-message-row">{words}</div>;
}

export function SkeletonMessage() {
    let rows = [];
    for(let i = 0; i < random(1, 7); i++) {
        rows.push(<SkeletonMessageContentRow/>);
    }
    return (<>
        <div className="loader-message-container">
            <div className="loader-message-avatar">
                <Skeleton animation="wave" sx={{height: 36, width: 36}} variant="circular"/>
            </div>
            <div className="loader-message-content">
                <SkeletonMessageUsername/>
                {rows}
            </div>
        </div>
    </>);
}

export default function TextChannelContentSkeleton() {
    let messages = [];
    for(let i = 0; i < random(20, 30); i++) {
        messages.push(<SkeletonMessage/>);
    }

    return <div>{messages}</div>;
}