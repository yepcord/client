interface DmButtonProps {
    icon: any,
    text: string,
}

export default function DmButton({icon, text}: DmButtonProps) {
    return (
        <div className="dm-btn">
            <div className="dm-btn-icon">{icon}</div>
            <div className="dm-btn-text">{text}</div>
        </div>
    );
}