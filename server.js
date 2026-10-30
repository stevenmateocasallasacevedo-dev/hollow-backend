const express = require('express');
const app = express();
const server = require('http').createServer(app); 
const io = require('socket.io')(server, {
    cors: {
        origin: "https://gamer.free",
        methods: ["GET", "POST"]
    }
});
let jugadores = {};
io.on('connection', (socket) => {
    console.log('Jugador conectado:', socket.id);
    jugadores[socket.id] = { x: 75, y: 75, hp: 100 };
    socket.on('movimiento', (datos) => { io.emit('actualizarEstado', jugadores); });
    socket.on('disconnect', () => { delete jugadores[socket.id]; io.emit('actualizarEstado', jugadores); });
});
const PUERTO = process.env.PORT || 3000;
server.listen(PUERTO, () => { console.log(`Corriendo en puerto ${PUERTO}`); });
