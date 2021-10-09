import socketio from "socket.io-client";
import React from "react";
export const socket = socketio.connect('https://emo-g-backend.herokuapp.com/');
export const SocketContext = React.createContext();
