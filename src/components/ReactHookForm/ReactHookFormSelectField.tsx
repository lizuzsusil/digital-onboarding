'use client';

import {Form, Select, SelectProps} from 'antd';
import React from 'react';
import {Control, Controller, FieldValues, Path, PathValue, RegisterOptions, useFormState} from 'react-hook-form';
import {CSSProperties} from 'react';

export interface ReactHookFormSelectFieldProps<T extends FieldValues> extends SelectProps  {
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
    helperText?: string | undefined;
    tabIndex?: number;
    onChange?: (e: PathValue<T, Path<T>> | React.ChangeEvent<HTMLInputElement> | null) => void;
    hideLabel?: boolean;
}

export default function ReactHookFormSelectField<T extends FieldValues>({
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
                                                                            helperText,
                                                                            tabIndex,
                                                                            onChange,
                                                                            hideLabel,
                                                                            options,
                                                                            ...extra
                                                                        }: ReactHookFormSelectFieldProps<T>) {
    const {isSubmitting} = useFormState<T>({control});

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
                            <Select
                                {...field}
                                onChange={(e) => {
                                    localOnChange(e);
                                    onChange?.(e);
                                }}
                                showSearch
                                style={style}
                                disabled={disabled || isSubmitting}
                                placeholder={placeholder}
                                className={className}
                                // optionFilterProp="label"
                                options={options}
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