import { io } from "socket.io-client";

// let socket;

// export const getSocket = (userID) => {
//     if (!socket) {
//        socket = io('http://localhost:2300', { query: { userId: userID || null }} )
//     }
//     return socket
// }

// import { io } from "socket.io-client";

let socket;

export const getSocket = (userID, type = 'notification') => {
    if (type === 'notification') {
        if (socket) {
            socket.disconnect();
            socket = null;
        }
        socket = io("http://localhost:2300", {
            query: { userId: userID || null },
        });
        return socket;
    } else {
        if (!socket) {
            socket = io('http://localhost:2300', { query: { userId: userID || null } })
        }
        return socket
    }
};
