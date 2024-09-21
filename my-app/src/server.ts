import express, {Express} from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import mangaRoutes from './routes/mangaRoutes';

dotenv.config();

const app: Express = express();
const httpServer = createServer(app);
const PORT = process.env.PORT;
const io = new Server(httpServer);

app.use(express.json()); // Middleware to parse JSON request bodies

app.use('/api/manga', mangaRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => {
  res.send('Hi, Y');
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

io.on('connection', (socket) => {
  console.log('a user connected');
});
