import React from 'react';
import {Button as ButtonAntd, ButtonProps} from 'antd';
import type {ButtonType} from "antd/lib/button/buttonHelpers";

interface iButtonProps extends ButtonProps {
    buttonText: string;
    styleClass?: string;
    onClick?: () => void;
    iconPosition?: 'start' | 'end';
    type?: ButtonType
}

function Button({
                    buttonText,
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
            {buttonText}
        </ButtonAntd>
    );
}

export default Button;