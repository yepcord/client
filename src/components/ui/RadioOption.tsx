interface RadioOptionProps {
    checked: boolean,
    onClick: () => void,
    title: string,
    description?: string | null,
    color?: "green" | "orange" | "red" | null;
}

export default function RadioOption({checked, onClick, title, description=null, color=null}: RadioOptionProps) {
    return (
        <div className={`privacy-radio-container ${color ? `privacy-radio-container-${color}` : ""}
        ${checked ? "privacy-radio-container-selected" : ""}`}
            onClick={onClick}>
            <input type="radio" className="privacy-radio-input" checked={checked}/>
            <div className="privacy-option-text">
                <span className="privacy-option-text-title">{title}</span>
                {description && <span className="privacy-option-text-desc">{description}</span>}
            </div>
        </div>
    );
}