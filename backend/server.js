const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes'); 
const postRoutes = require('./routes/postRoutes')
const path = require('path')
require('dotenv').config();
const connectDb = require('./config/db')
connectDb();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())
app.get('/',(req,res)=>{
    res.send('api is running')
})
app.use('/', express.static('D:/nodejs/pinterest-clone/backend/uploads'));
app.use('/api/users', authRoutes); 
app.use('/api/',postRoutes)

const port = 8000;
app.listen(port, () => {
    console.log(`Connected on port ${port}`);
});
