import { Checkbox, CheckboxProps, Form } from 'antd';
import React from 'react';
import { Control, Controller, FieldValues, Path, RegisterOptions, useFormState } from 'react-hook-form';
import { CSSProperties } from 'react';

interface BaseCheckBoxProps<T extends FieldValues> extends CheckboxProps {
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
    onChange?: (value: any) => void;
    hideLabel?: boolean;
}

interface SingleCheckBoxProps<T extends FieldValues> extends BaseCheckBoxProps<T> {
    single: true;
    options?: { label: string; value: string | number; disabled?: boolean }[];
}

interface GroupCheckBoxProps<T extends FieldValues> extends BaseCheckBoxProps<T> {
    single?: false;
    options: { label: string; value: string | number; disabled?: boolean }[];
}

export type ReactHookFormCheckBoxProps<T extends FieldValues> =
    | SingleCheckBoxProps<T>
    | GroupCheckBoxProps<T>;

export default function ReactHookFormCheckBox<T extends FieldValues>({
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
                                                                         single = false,
                                                                         onChange,
                                                                         hideLabel,
                                                                         ...extra
                                                                     }: ReactHookFormCheckBoxProps<T>) {
    const { isSubmitting } = useFormState<T>({ control });
    const hasOptions = options && options.length > 0;

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange: localOnChange, value, ...field }, fieldState }) => {
                const errorMessage = fieldState.error?.message || helperText;
                const shouldRenderSingle = single || !hasOptions;

                return (
                    <div style={{ width: fullWidth ? '100%' : 'auto' }}>
                        <Form.Item
                            label={!hideLabel ? label : undefined}
                            layout={layout}
                        >
                            {shouldRenderSingle ? (
                                <Checkbox
                                    {...field}
                                    checked={value}
                                    onChange={(e) => {
                                        localOnChange(e.target.checked);
                                        onChange?.(e.target.checked);
                                    }}
                                    style={style}
                                    disabled={disabled || isSubmitting}
                                    className={className}
                                    {...extra}
                                >
                                    {label && hideLabel ? label : undefined}
                                </Checkbox>
                            ) : (
                                <Checkbox.Group
                                    {...field}
                                    value={value}
                                    onChange={(checkedValues) => {
                                        localOnChange(checkedValues);
                                        onChange?.(checkedValues);
                                    }}
                                    style={style}
                                    disabled={disabled || isSubmitting}
                                    className={className}
                                    options={options}
                                    {...extra}
                                />
                            )}
                            {errorMessage && (
                                <div style={{ color: '#ff4d4f', fontSize: '12px', marginTop: 4 }}>
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