import { io } from "socket.io-client";
import config from "../libs/config";

function initSocket(query) {
	const socket = io(config.socketUrl, {
		transports: ["websocket"],
		reconnection: true,
		reconnectionAttempts: 10,
		reconnectionDelay: 2000,
		query,
	});
	return socket;
}

export default initSocket;
