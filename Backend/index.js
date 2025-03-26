const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const UserRouter = require('./routers/userRouter')


dotenv.config()
app.use(express.json())

// cors setuping to make api connection secure
const corsOptions = {
  origin: 'https://deep-net-soft-x21o.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Data base connection
mongoose.connect(process.env.MongoUrl).then(() => {
    console.log("Database is connected");
}).catch((err) => {
    console.log('Error from connecting to database', err);
})

app.use('/user', UserRouter)


// server creation
app.listen(8000, () => {
    console.log('server created');

})
