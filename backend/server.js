const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes'); 
const postRoutes = require('./routes/postRoutes')
require('dotenv').config();
const connectDb = require('./config/db')
connectDb();
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.send('api is running')
})


app.use('/api/users', authRoutes); 
app.use('/api/',postRoutes)

const port = 8000;
app.listen(port, () => {
    console.log(`Connected on port ${port}`);
});
