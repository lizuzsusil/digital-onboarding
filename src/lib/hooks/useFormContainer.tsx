import { useContext } from 'react'
import { FieldValues } from 'react-hook-form'
import {FormContainerContext, FormContainerContextInterface} from "@/contexts/FormContainerContext";


export default function useFormContainer<T extends FieldValues = FieldValues, Transformed extends FieldValues = any>() {
    const context = useContext<FormContainerContextInterface<T, Transformed> | undefined>(FormContainerContext)
    if (!context) {
        throw new Error('Form Container Context  must be used within a FormContainerContextProvider')
    }
    return context
}
