import { io } from "socket.io-client";
import { useSelector } from "react-redux";

let socket

export const getSocket = (userID) => {

    const userID = useSelector(state=> state.user.userDetails)
    if (!socket) {
        socket = io('http://localhost:2300', { query: { userId: userID || null }} )
    }
    return socket
}