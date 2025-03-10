'use client';

import React, {createContext} from 'react'
import {FieldValues, useForm, UseFormProps, UseFormReturn} from 'react-hook-form'

export const FormContainerContext = createContext<FormContainerContextInterface<any, any> | undefined>(undefined)

export interface FormContainerContextProviderInterface<T extends FieldValues> {
    children: React.ReactNode;
    form?: UseFormProps<T, unknown>
}

export interface FormContainerContextInterface<T extends FieldValues, Transformed extends FieldValues> {
    form: UseFormReturn<T, unknown, Transformed>
}

export function FormContainerContextProvider<T extends FieldValues, Transformed extends FieldValues>({
                                                                                                         children,
                                                                                                         form: formProps
                                                                                                     }: FormContainerContextProviderInterface<T>): React.ReactNode {

    const form = useForm<T, unknown, Transformed>({
        mode: 'onSubmit',
        reValidateMode: 'onBlur', ...(formProps ?? {}),
        resetOptions: {keepErrors: false, ...(formProps?.resetOptions ?? {})}
    })

    return (
        <FormContainerContext.Provider value={{form}}>
            {children}
        </FormContainerContext.Provider>
    )
}