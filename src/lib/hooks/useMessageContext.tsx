import {useContext} from 'react'
import {MessageContext, MessageContextValue} from "@/contexts/MessageContext";

export default function useMessageContext() {
    const context = useContext<MessageContextValue | undefined>(MessageContext)
    if (!context) {
        throw new Error("MessageContext must be used within a MessageContextProvider");
    }
    return context
}