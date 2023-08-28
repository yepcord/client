import React, {CSSProperties, MouseEventHandler, ReactNode} from "react";

export interface BaseButtonProps {
    children?: ReactNode,
    primaryClass?: string,
    className?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    wide?: boolean,
    style?: CSSProperties,
    type?: 'submit' | 'reset' | 'button' | undefined,
    disabled?: boolean,
    selected?: boolean,
    outlined?: boolean,
}

export default function BaseButton({children, primaryClass, className, onClick, wide, style, type, disabled, selected, outlined}: BaseButtonProps) {
    return (
        <button className={`btn ${primaryClass} ${selected ? primaryClass+"-selected" : ""} ${outlined ? primaryClass+"-outline" : ""} ${wide ? "btn-wide" : ""} ${className}`}
                style={style} onClick={onClick} type={type} disabled={disabled}>
            {children}
        </button>
    );
}