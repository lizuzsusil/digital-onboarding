'use client';

import {Form, Input, InputNumber} from 'antd';
import React from 'react';
import {Control, Controller, FieldValues, Path, PathValue, RegisterOptions, useFormState} from 'react-hook-form';
import {CSSProperties} from 'react';

export interface ReactHookFormFieldProps<T extends FieldValues> {
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
    placeholder?: string;
    multiline?: boolean;
    rowCount?: number;
    type?: 'password' | 'text' | 'number' | 'textarea';
    helperText?: string | undefined;
    tabIndex?: number;
    onChange?: (e: PathValue<T, Path<T>> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null) => void;
    hideLabel?: boolean;
    selectOnFocus?: boolean;
    step?: number;
}

export default function ReactHookFormField<T extends FieldValues>({
                                                                      name,
                                                                      control,
                                                                      className,
                                                                      disabled,
                                                                      style,
                                                                      fullWidth,
                                                                      label,
                                                                      rules = {},
                                                                      placeholder,
                                                                      layout = 'vertical',
                                                                      type,
                                                                      helperText,
                                                                      tabIndex,
                                                                      onChange,
                                                                      hideLabel,
                                                                      selectOnFocus = true,
                                                                      ...extra
                                                                  }: ReactHookFormFieldProps<T>) {
    const {isSubmitting} = useFormState<T>({control});

    const getInputComponent = () => {
        switch (type) {
            case 'password':
                return Input.Password;
            case 'textarea':
                return Input.TextArea;
            case 'number':
                return InputNumber;
            default:
                return Input;
        }
    }

    const InputComponent = getInputComponent();

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({field: {onChange: localOnChange, ...field}, fieldState}) => {
                const errorMessage = fieldState.error?.message || helperText;
                return (
                    <div style={{width: fullWidth ? '100%' : 'auto'}}>
                        <Form.Item label={label} layout={layout}>
                            <InputComponent
                                {...field}
                                onChange={(e) => {
                                    localOnChange(e);
                                    onChange?.(e);
                                }}
                                style={style}
                                disabled={disabled || isSubmitting}
                                placeholder={placeholder}
                                className={className}
                                status={errorMessage ? 'error' : undefined}
                                autoComplete="off"
                                tabIndex={tabIndex}
                                {...extra}
                                onFocus={(e) => {
                                    if (selectOnFocus) e.target.select();
                                }}
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