import express from 'express'
import dotenv from 'dotenv'
import authRouters from './routes/auth.route.js'
import messagesRouters from './routes/messages.route.js'

dotenv.config();
const app = express()
const port = process.env.PORT || 3000;
app.use("/api/auth",authRouters)
app.use("/api/messages",messagesRouters)

app.listen(port, () => console.log(`server running on port:${port}`))