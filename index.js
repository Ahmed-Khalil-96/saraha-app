import express from 'express'
import connection from './DB/connectionDB.js'
import userRouter from './src/modules/user/user.routes.js'
import msgRouter from './src/modules/message/message.routes.js'
const app = express()
const port = 3000
app.use(express.json())


app.use("/user", userRouter)
app.use("/msg", msgRouter)

connection()

app.use('*', (req, res) => res.status(404).json({msg:'404 page is not found'}))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))