import { UseQueryResult, UseMutationResult } from '@tanstack/react-query';

// Define types for the API response (adjust based on your actual API structure)
interface ValidationError {
    loc: string[];
    msg: string;
}

interface APIResponse {
    message?: string;
    payload?: ValidationError[];
}

type APIStateTypes = 'validation' | 'failure' | 'success';

// Hook accepts a query or mutation result
export default function useValidation<TData, TError extends { response?: { data?: APIResponse } }>(
    result: UseQueryResult<TData, TError> | UseMutationResult<TData, TError, unknown, unknown>
) {
    // Determine if there's an error and its type
    const isError = result.isError;
    const error = result.error;

    // Check if the error is a validation error (adjust logic based on your API)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const isValidationError = isError && error?.response?.data?.payload?.length > 0;
    const validation = isValidationError ? error?.response?.data : undefined;
    const failureMessage = isError && !isValidationError ? error?.response?.data?.message : undefined;
    const successMessage = result.isSuccess ? (result.data as any)?.message : undefined;

    // Validation message for a specific key
    const validationMessage = (key: string): string | undefined => {
        if (!isValidationError || !validation?.payload) return undefined;
        return validation.payload.find((a) => a.loc.join('.').replace('body.', '') === key)?.msg;
    };

    // Generic validation message (e.g., for 'body')
    const genericMessage = (): string | undefined => {
        if (!isValidationError || !validation?.payload) return undefined;
        return validation.payload.find((a) => a.loc.join('.') === 'body')?.msg;
    };

    // Last message based on the current state
    const lastMessage = (currentType?: APIStateTypes): string | undefined => {
        switch (currentType) {
            case 'failure':
                return failureMessage;
            case 'validation':
                return validation?.message;
            case 'success':
                return successMessage;
            default:
                if (isValidationError) return validation?.message;
                if (isError) return failureMessage;
                if (result.isSuccess) return successMessage;
                return undefined;
        }
    };

    return {
        isValidationError,
        validation,
        validationMessage,
        lastMessage,
        genericMessage,
    };
}