'use client'
import React, {useState} from 'react';
import {FormContainerContextProvider} from "@/contexts/FormContainerContext";
import {Steps} from "antd";
import AvailableDetails from "@/app/online-account/availableDetails";
import Step2 from "@/app/online-account/Step2";

const {Step} = Steps;

function OnlineAccount() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentStep, setCurrentStep] = useState<number>(1);


    const renderStep = (step: number) => {
        switch (step) {
            case 0:
                return <AvailableDetails />;
            case 1:
                return <Step2 />;
            case 2:
                return <h1>Step 3</h1>;
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto">
            <Steps current={currentStep}>
                <Step title={"Fill in your details"}/>
                <Step title={"Address details"}/>
                <Step title={"Review and Save"}/>
            </Steps>
            <main>
                {renderStep(currentStep)}
            </main>
        </div>
    )
}

export default function Page() {
    return (
        <FormContainerContextProvider form={{
            defaultValues: {
                name: '',
                address: ''
            }
        }}>
            <OnlineAccount/>
        </FormContainerContextProvider>
    );
}