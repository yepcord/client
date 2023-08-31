interface CheckboxOptionProps {
    checked: boolean,
    onClick: () => void,
    title: string,
    description?: string | null,
}

export default function CheckboxOption({checked, onClick, title, description=null}: CheckboxOptionProps) {
    return (
        <div className="checkbox-option-container">
            <div className="checkbox-option">
                <span className="text-main cursor-pointer" onClick={onClick}>{title}</span>
                <label className="switch-checkbox">
                    <input type="checkbox" checked={checked} onClick={onClick}/>
                    <span className="switch-checkbox-slider"></span>
                </label>
            </div>
            {description && <span className="privacy-option-text-desc text-secondary">{description}</span>}
        </div>
    );
}