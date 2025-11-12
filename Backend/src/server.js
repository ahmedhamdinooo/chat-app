import express from 'express';
import {ENV} from './lib/env.js';
import path from 'path';
import authRouters from './routes/auth.route.js';
import messagesRouters from './routes/messages.route.js';
import { ConnectedDB } from './lib/db.js';
const app = express();
const port = ENV.PORT || 3000;
const __dirname = path.resolve();
app.use(express.json())
app.use("/api/auth",authRouters);
app.use("/api/messages",messagesRouters);

// make ready for deployment
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../Frontend/dist")))
    app.get('*', (_, res) => {
        res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'))});

}

app.listen(port, () => {console.log(`server running on port:${port}`);
    ConnectedDB()
});