import io from "socket.io-client";
import React from "react";
export const socket = io('ws://localhost:9000/', {transports:['websocket', 'polling']});
// export const socket = io('https://floating-ocean-39302.herokuapp.com/');
export const SocketContext = React.createContext();
