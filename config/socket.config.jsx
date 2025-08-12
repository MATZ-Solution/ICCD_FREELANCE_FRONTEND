import { io } from "socket.io-client";

let socket;
export const getSocket = (userID) => {
    if (!socket) {
       socket = io('https://iccd.freelanceserver.matzsolutions.com/', { query: { userId: userID || null }} )
    }
    return socket
}

