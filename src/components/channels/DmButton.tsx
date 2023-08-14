interface DmButtonProps {
    icon: any,
    text: string,
    onClick: () => void,
}

export default function DmButton({icon, text, onClick}: DmButtonProps) {
    return (
        <div className="dm-btn" onClick={onClick}>
            <div className="dm-btn-icon">{icon}</div>
            <div className="dm-btn-text">{text}</div>
        </div>
    );
}