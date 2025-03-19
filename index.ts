import { IClient, PeerServer } from "peer";
import fs from "node:fs";

const SSL_FILES_PATH = process.env["SSL_FILES_PATH"];
console.log(SSL_FILES_PATH)

const hostname = "0.0.0.0";
const peerServerPort = 41361;
const peerServer = PeerServer({
  host: hostname,
  port: peerServerPort,
  path: "/",
  allow_discovery: true,
  corsOptions: {
    origin: true,
  },
  ssl: SSL_FILES_PATH
    ? {
        key: fs.readFileSync(`${SSL_FILES_PATH}/privkey.pem`, "utf8"),
        cert: fs.readFileSync(`${SSL_FILES_PATH}/fullchain.pem`, "utf8"),
      }
    : undefined,
});
console.log(`Peer Server running at http://${hostname}:${peerServerPort}/`);

const currentClients: IClient[] = [];

peerServer.on("connection", (client) => {
  console.log("New client connection received:", `Id ${client.getId()}`);
  currentClients.push(client);
});

peerServer.on("error", (error) => {
  console.log(error);
});

peerServer.on("message", (client, message) => {
  console.log(`${client.getId()} says`, message);
});

peerServer.on("disconnect", (client) => {
  console.log(`${client.getId()} disconnected`);
});

