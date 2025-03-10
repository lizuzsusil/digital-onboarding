'use client';

import { Input } from 'antd';
import React, { RefObject, useState } from 'react';
import { Control, Controller, FieldValues, Path, RegisterOptions, useFormState } from 'react-hook-form';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
// import useValidation from '../../hooks/form/useValidation.tsx';
import { CSSProperties } from 'react';

export interface ReactHookFormFieldProps<T extends FieldValues> {
    control: Control<T, unknown>;
    name: Path<T>;
    label?: string;
    rules?: Omit<
        RegisterOptions<T, Path<T>>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >;
    style?: CSSProperties;
    fullWidth?: boolean;
    disabled?: boolean;
    className?: string;
    placeholder?: string;
    inputRef?: RefObject<HTMLInputElement> | null;
    multiline?: boolean;
    rowCount?: number;
    type?: 'password' | 'text' | 'number' | 'textArea';
    helperText?: string | undefined;
    tabIndex?: number;
    addonAfter?: React.ReactNode;
    addonBefore?: React.ReactNode;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    hideLabel?: boolean;
    selectOnFocus?: boolean;
    step?: number;
}

export default function ReactHookFormField<T extends FieldValues>({
                                                                      name,
                                                                      control,
                                                                      className,
                                                                      disabled,
                                                                      inputRef,
                                                                      style,
                                                                      multiline,
                                                                      fullWidth,
                                                                      label,
                                                                      rules = {},
                                                                      placeholder,
                                                                      rowCount,
                                                                      type,
                                                                      helperText,
                                                                      tabIndex,
                                                                      addonAfter,
                                                                      addonBefore,
                                                                      onChange,
                                                                      hideLabel,
                                                                      selectOnFocus = true,
                                                                      ...extra
                                                                  }: ReactHookFormFieldProps<T>) {
    // const { validationMessage } = useValidation();
    const [showPassword, setShowPassword] = useState(false);
    const { isSubmitting } = useFormState<T>({ control });

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    const passwordSuffix = type === 'password' ? (
        <span onClick={handleClickShowPassword} style={{ cursor: 'pointer' }}>
      {showPassword && !isSubmitting ? <EyeOutlined /> : <EyeInvisibleOutlined />}
    </span>
    ) : null;


    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange: localOnChange, ...field }, fieldState }) => {
                const errorMessage = fieldState.error?.message || helperText;

                return (
                    <div style={{ width: fullWidth ? '100%' : 'auto' }}>
                        {!hideLabel && label && (
                            <label style={{ display: 'block', marginBottom: 4 }}>
                                {`${label}${rules?.required ? ' *' : ''}`}
                            </label>
                        )}
                        {multiline ? (
                            <Input.TextArea
                                {...field}
                                onChange={(e) => {
                                    localOnChange(e);
                                    onChange?.(e);
                                }}
                                style={style}
                                ref={inputRef}
                                disabled={disabled || isSubmitting}
                                placeholder={placeholder}
                                rows={rowCount || 4}
                                className={className}
                                status={errorMessage ? 'error' : undefined}
                                autoComplete="off"
                                tabIndex={tabIndex}
                                {...extra}
                                onFocus={(e) => {
                                    if (selectOnFocus) e.target.select();
                                }}
                            />
                        ) : (
                            <Input
                                {...field}
                                onChange={(e) => {
                                    localOnChange(e);
                                    onChange?.(e);
                                }}
                                style={style}
                                // ref={inputRef}inputRef
                                disabled={disabled || isSubmitting}
                                placeholder={placeholder}
                                className={className}
                                type={type === 'password' && showPassword && !isSubmitting ? 'text' : type}
                                suffix={passwordSuffix || addonAfter}
                                prefix={addonBefore}
                                status={errorMessage ? 'error' : undefined}
                                autoComplete="off"
                                tabIndex={tabIndex}
                                {...extra}
                                onFocus={(e) => {
                                    if (selectOnFocus) e.target.select();
                                }}
                            />
                        )}
                        {errorMessage && (
                            <div style={{ color: '#ff4d4f', fontSize: '12px', marginTop: 4 }}>
                                {errorMessage}
                            </div>
                        )}
                    </div>
                );
            }}
        />
    );
}