import { IClient, PeerServer } from "peer";
import http from "node:http";

const hostname = "127.0.0.1";
const peerServerPort = 41361;
const peerServer = PeerServer({
  host: hostname,
  port: peerServerPort,
  path: '/',
  allow_discovery: true
});
console.log(`Peer Server running at http://${hostname}:${peerServerPort}/`);

const currentClients: IClient[] = [];

peerServer.on("connection", (client) => {
  console.log("New client connection received:", `Id ${client.getId()}`);
  currentClients.push(client);
});

// const connectedClientIdServerPort = 41362;

// const server = http.createServer((req, res) => {
//   // Allow localhost with any port during development
//   const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];
//   const origin = req.headers.origin ?? "";

//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }

//   res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
//   res.setHeader("Access-Control-Max-Age", 2592000); // 30 days
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "application/json");
//   const currentClientIdsStringified = JSON.stringify({
//     currentClientIds: currentClients.map((c) => c.getId()),
//   });

//   res.end(currentClientIdsStringified);
// });

// server.listen(connectedClientIdServerPort, hostname, () => {
//   console.log(
//     `Connected Client Id Server running at http://${hostname}:${connectedClientIdServerPort}/`
//   );
// });
