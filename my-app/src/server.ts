import express, {Express} from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const httpServer = createServer(app);
const PORT = process.env.PORT;
const io = new Server(httpServer);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

io.on('connection', (socket) => {
  console.log('a user connected');
});
