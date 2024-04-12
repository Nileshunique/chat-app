import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectToMongoDB from './db/connectToMongoDB.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import userRoutes from './routes/user.route.js';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // helps to extracts the body part from the request.body
app.use(cookieParser()); // helps to extract the the cookie part from the request.
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.send("Hello, world!!");
})

app.listen(PORT, () => {
  connectToMongoDB();
  console.log('listening on port: ' + PORT)
});