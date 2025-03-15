import React from 'react';
import {FormContainerContextProvider} from "@/contexts/FormContainerContext";
import useFormContainer from "@/lib/hooks/useFormContainer";
import ReactHookFormField from "@/components/ReactHookForm/ReactHookFormField";
import Button from "@/components/Button";

function Step2FormContainer() {
    const {
        form: {
            control,
            handleSubmit,
        }
    } = useFormContainer<{ name: string, address: string }>();

    const onSubmit = (values: { name: string, address: string }) => {
        console.log(values);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ReactHookFormField control={control} name={'name'}/>
            <ReactHookFormField control={control} name={'address'}/>
            <Button buttonText={'Next'} htmlType="submit"/>
        </form>
    );
}

export default function Step2() {
    return (
        <FormContainerContextProvider form={{
            defaultValues: {
                name: '',
                address: ''
            }
        }}>
            <Step2FormContainer/>
        </FormContainerContextProvider>
    );
}