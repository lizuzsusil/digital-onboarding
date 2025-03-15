// import React from 'react';
//
// function AvailableDetails() {
//     return (
//         <div>Render Available Details</div>
//     );
// }
//
// export default AvailableDetails;


import {useState, useEffect, useRef} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {QRCode} from "antd";
import {nanoid} from "nanoid";
import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";

export default function NagarikAuth() {
    const [qrCodeData, setQrCodeData] = useState(null);
    const [authCode, setAuthCode] = useState(null);
    const [randomString, setRandomString] = useState(null);
    const stompClientRef = useRef(null);

    const fetchRedirectionCode = useMutation({
        mutationFn: async () => {
            const {data} = await axios.get("/api/nagarik-app/fetch-redirection-code");
            return data.payload;
        },
        onSuccess: async (redirectionCode) => {
            const generatedString = nanoid(40);
            setRandomString(generatedString);
            const challengeHash = sha256(generatedString);
            const challengeHashBase64 = Base64.stringify(challengeHash);

            challengeHashCheck(redirectionCode, challengeHashBase64);
        },
    });

    const challengeHashCheck = async (redirectionCode, challengeHashBase64) => {
        try {
            const response = await axios.post(
                "https://webservice.nagarikapp.gov.np/api/web0auth/check",
                {challenge_hash: challengeHashBase64, redirection_code: redirectionCode}
            );
            const tagNumber = response.data.tag_number;
            const qrData = `client-login::${challengeHashBase64}::${tagNumber}`;
            // const qrImage = await QRCode.toDataURL(qrData);
            const qrImage = await QRCode.displayName(qrData);
            setQrCodeData(qrImage);
            initializeSocketListener();
        } catch (error) {
            console.error("Error in challengeHashCheck:", error);
        }
    };

    const initializeSocketListener = () => {
        const socket = new SockJS("https://webservice.nagarikapp.gov.np/nagarik-ws");
        const stompClient = Stomp.over(socket);
        stompClientRef.current = stompClient;

        stompClient.connect({}, () => {
            const subscription = stompClient.subscribe(`/queue/scan/${randomString}`, (message) => {
                const response = JSON.parse(message.body);
                if (response.authorization_code) {
                    setAuthCode(response.authorization_code);
                } else {
                    alert("Cancelled by user");
                }
                subscription.unsubscribe();
                disconnect();
            });
            requestAuthorizationCode(stompClient);
        });
    };

    const requestAuthorizationCode = (stompClient) => {
        stompClient.send(
            "/app/scan-authcode",
            {},
            JSON.stringify({challenge_verifier: randomString})
        );
    };

    const disconnect = () => {
        if (stompClientRef.current) {
            stompClientRef.current.disconnect();
        }
        console.log("Disconnected");
    };

    useEffect(() => {
        fetchRedirectionCode.mutate();
    }, []);

    return (
        <div>
            <h1>Nagarik App Authentication</h1>
            {qrCodeData && <img src={qrCodeData} alt="Scan QR Code"/>}
            {authCode && <p>Authorization Code: {authCode}</p>}
        </div>
    );
}
