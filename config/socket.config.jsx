import { io } from "socket.io-client";

let socket;
export const getSocket = (userID) => {
    if (!socket) {
       socket = io('http://localhost:2300', { query: { userId: userID || null }} )
    }
    return socket
}

