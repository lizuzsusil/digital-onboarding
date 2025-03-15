import {useFieldArray, Control, FieldValues, ArrayPath, FieldArray} from "react-hook-form";

interface DynamicFieldArrayProps<T extends FieldValues> {
    control: Control<T>;
    arrayName: ArrayPath<T>;
    defaultFields: FieldArray<T, ArrayPath<T>>;
}

const useDynamicFieldArray = <T extends FieldValues>({control, arrayName, defaultFields}: DynamicFieldArrayProps<T>) => {
    const {fields, append, remove} = useFieldArray({
        control,
        name: arrayName,
    });

    const addItem = () => {
        append(defaultFields);
    };

    const removeItem = (index: number) => {
        remove(index);
    };

    return {fields, addItem, removeItem};
};

export default useDynamicFieldArray;