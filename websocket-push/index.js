const http = require("http");
const webSocketServer = require("websocket").server;
let connections = [];

const httpServer = http.createServer();
httpServer.listen(8080, () => {
  console.log("Server listening on port 8080...");
});

const webSocket = new webSocketServer({ httpServer: httpServer });

webSocket.on("request", (request) => {
  //accepting all connections for now
  const connection = request.accept(null, request.origin);

  //someone sent a message, tell everyone
  connection.on("message", (message) => {
    connections.forEach((c) =>
      c.send(`User ${connection.socket.remotePort} says: ${message.utf8Data}`)
    );
  });

  connection.on("close", () => {
    //someone disconnected, remove user from connections array and tell everyone
    connections.filter((c) => c !== connection);
    connections.forEach((c) => {
      c.send(`User ${connection.socket.remotePort} disconnected`);
    });
  });

  //someone new connected, add to connections array and tell everyone
  connections.push(connection);
  connections.forEach((c) =>
    c.send(`User ${connection.socket.remotePort} just connected`)
  );
});

//client code
//let ws = new WebSocket("ws://localhost:8080");
//ws.onmessage = message => console.log(`Received: ${message.data}`);
//ws.send("Hello! I'm client")
