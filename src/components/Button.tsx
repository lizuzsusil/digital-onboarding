import React from 'react';
import {Button as ButtonAntd, ButtonProps} from 'antd';
import type {ButtonType} from "antd/lib/button/buttonHelpers";

interface iButtonProps extends ButtonProps {
    styleClass?: string;
    onClick?: () => void;
    iconPosition?: 'start' | 'end';
    type?: ButtonType
}

function Button({
                    children,
                    styleClass,
                    onClick,
                    iconPosition = 'end',
                    type = 'primary',
                    ...restProps
                }: iButtonProps) {
    return (
        <ButtonAntd
            onClick={onClick}
            className={`${styleClass}`}
            iconPosition={iconPosition}
            type={type}
            {...restProps}
        >
            {children}
        </ButtonAntd>
    );
}

export default Button;