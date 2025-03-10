import { Client } from "@stomp/stompjs"
import SockJS from "sockjs-client"
import {apiNagarikWsURI} from "@/services/endpoints";
import {StompClientResponse} from "@/types/models/stompClient";

export const createStompClient = (
    fortyRandomString: string,
    onMessage: (response: StompClientResponse) => void,
    onConnect: (client: Client) => void,
) => {
    const socket = new SockJS(apiNagarikWsURI)

    const client = new Client({
        webSocketFactory: () => socket,
        onConnect: () => {
            client.subscribe(`/queue/scan/${fortyRandomString}`, (message) => {
                const responseBody = JSON.parse(message.body)
                onMessage(responseBody)
                client.deactivate()
            })

            onConnect(client)
        },
        onStompError: (frame) => {
            console.error("Broker reported error: " + frame.headers["message"])
            console.error("Additional details: " + frame.body)
        },
    })

    client.activate()
    return client
}

export const requestAuthorizationCode = (client: Client, randStr: string) => {
    client.publish({
        destination: "/app/scan-authcode",
        body: JSON.stringify({ challenge_verifier: randStr }),
    })
}

