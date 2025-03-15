'use client';

import {DatePicker, DatePickerProps, Form} from 'antd';
import React from 'react';
import {Control, Controller, FieldValues, Path, RegisterOptions, useFormState} from 'react-hook-form';
import {CSSProperties} from 'react';
import dayjs, {Dayjs} from "dayjs";

export interface ReactHookFormDatePickerProps<T extends FieldValues> extends DatePickerProps {
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
    onChange?: (value: Dayjs | null) => void;
    hideLabel?: boolean;
    format?: string;
    picker?: 'date' | 'week' | 'month' | 'quarter' | 'year';
    showTime?: boolean;
}

export default function ReactHookFormDatePicker<T extends FieldValues>({
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
                                                                           onChange,
                                                                           hideLabel,
                                                                           format = 'YYYY-MM-DD',
                                                                           picker = 'date',
                                                                           showTime = false,
                                                                           ...extra
                                                                       }: ReactHookFormDatePickerProps<T>) {
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
                            <DatePicker
                                {...field}
                                value={value ? dayjs(value) : null}
                                onChange={(date: Dayjs) => {
                                    localOnChange(date ? date.toISOString() : null);
                                    onChange?.(date);
                                }}
                                style={{
                                    ...style,
                                    width: fullWidth ? '100%' : 'auto'
                                }}
                                disabled={disabled || isSubmitting}
                                className={className}
                                format={format}
                                picker={picker}
                                showTime={showTime}
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