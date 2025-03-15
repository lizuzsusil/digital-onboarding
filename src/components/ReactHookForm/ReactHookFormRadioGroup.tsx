'use client';

import {Form, Radio, RadioGroupProps} from 'antd';
import React from 'react';
import {Control, Controller, FieldValues, Path, RegisterOptions, useFormState} from 'react-hook-form';
import {CSSProperties} from 'react';

export interface ReactHookFormRadioGroupProps<T extends FieldValues> extends RadioGroupProps{
    control: Control<T, unknown>;
    name: Path<T>;
    label?: string;
    rules?: Omit<
        RegisterOptions<T, Path<T>>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >;
    style?: CSSProperties;
    layout?: 'vertical' | 'horizontal';
    fullWidth?: boolean;
    disabled?: boolean;
    className?: string;
    helperText?: string | undefined;
    options: { label: string; value: string | number; disabled?: boolean }[];
    optionType?: 'default' | 'button';
    buttonStyle?: 'outline' | 'solid';
    size?: 'large' | 'middle' | 'small';
    onChange?: (value: any) => void;
    hideLabel?: boolean;
}

export default function ReactHookFormRadioGroup<T extends FieldValues>({
                                                                           name,
                                                                           control,
                                                                           className,
                                                                           disabled,
                                                                           style,
                                                                           fullWidth,
                                                                           label,
                                                                           rules = {},
                                                                           layout = 'vertical',
                                                                           helperText,
                                                                           options,
                                                                           optionType = 'default',
                                                                           buttonStyle = 'outline',
                                                                           size = 'middle',
                                                                           onChange,
                                                                           hideLabel,
                                                                           ...extra
                                                                       }: ReactHookFormRadioGroupProps<T>) {
    const {isSubmitting} = useFormState<T>({control});

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({field: {onChange: localOnChange, value, ...field}, fieldState}) => {
                const errorMessage = fieldState.error?.message || helperText;

                return (
                    <div style={{width: fullWidth ? '100%' : 'auto'}}>
                        <Form.Item
                            label={!hideLabel ? label : undefined}
                            layout={layout}
                        >
                            <Radio.Group
                                {...field}
                                value={value}
                                onChange={(e) => {
                                    localOnChange(e.target.value);
                                    onChange?.(e.target.value);
                                }}
                                style={style}
                                disabled={disabled || isSubmitting}
                                className={className}
                                options={options}
                                optionType={optionType}
                                buttonStyle={buttonStyle}
                                size={size}
                                {...extra}
                            />
                            {errorMessage && (
                                <div style={{color: '#ff4d4f', fontSize: '12px', marginTop: 4}}>
                                    {errorMessage}
                                </div>
                            )}
                        </Form.Item>
                    </div>
                );
            }}
        />
    );
}