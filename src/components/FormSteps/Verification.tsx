import React from 'react';
import useFormContainer from "@/lib/hooks/useFormContainer";
import {FormPayloadData} from "@/types/models/formData";
import ReactHookFormCheckBox from "@/components/ReactHookForm/ReactHookFormCheckbox";
import {Typography} from "antd";
import {yesNoOptions} from "@/lib/utility/dropdown";
import ReactHookFormRadioGroup from "@/components/ReactHookForm/ReactHookFormRadioGroup";

const {Title} = Typography

function Verification() {

    const {
        form: {
            watch,
            reset,
            control,
            getValues,
        }
    } = useFormContainer<FormPayloadData>()

    return (
        <div className={"self-declaration"}>
            <ReactHookFormCheckBox single={true} control={control} name={"verification.financial_link"} label={"I am having a link to financial institution! *"}/>
            <div>
                <Title level={3}>Declaration of Convicted/Non Convicted for any crime in Past</Title>
                <ReactHookFormRadioGroup control={control} name={"verification.criminal_activity"} options={yesNoOptions} />
            </div>
            <div>
                <Title level={3}>Are you Politician or relative of Politician?</Title>
                <ReactHookFormRadioGroup control={control} name={"verification.politician"} options={yesNoOptions} />
            </div>
            <div>
                <Title level={3}>Do you hold residential permit of foreign country?</Title>
                <ReactHookFormRadioGroup control={control} name={"verification.foreign_country"} options={yesNoOptions} />
            </div>
            <div>
                <Title level={3}>Terms and Conditions</Title>
            </div>
            <div>
                <Title level={3}>I/We Agree with the terms & Conditions for GIBL</Title>
                <ReactHookFormRadioGroup control={control} name={"verification.agree_conditions"} options={yesNoOptions} />
            </div>
        </div>
    );
}

export default Verification;