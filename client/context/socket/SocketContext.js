import socketio from "socket.io-client";
import React from "react";
export const socket = socketio.connect('https://floating-ocean-39302.herokuapp.com/');
export const SocketContext = React.createContext();
