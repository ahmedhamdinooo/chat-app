import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import authRouters from './routes/auth.route.js';
import messagesRouters from './routes/messages.route.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();
app.use("/api/auth",authRouters);
app.use("/api/messages",messagesRouters);

// make ready for deployment
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../Frontend/dist")))
    app.get('*', (_, res) => {
        res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'))});

}

app.listen(port, () => console.log(`server running on port:${port}`));