import TransparentPrimaryButton from "./TransparentPrimaryButton";
import React from "react";

interface TPrimaryButtonProps {
    children?: React.ReactNode,
    onClick?: () => void,
    className?: string,
}

export function TPrimaryButtonIcon({children, onClick, className}: TPrimaryButtonProps) {
    return <TransparentPrimaryButton className={`space-between align-center w-100 ${className}`}
                                     style={{fontSize: "14px"}} onClick={onClick} children={children}/>;
}