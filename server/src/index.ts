import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import chatRouter from './routes/chat';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/chat', chatRouter);

app.listen(port, () => {
  console.log(`🚀 Backend listening on http://localhost:${port}`);
});