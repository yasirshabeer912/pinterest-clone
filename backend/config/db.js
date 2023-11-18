const mongoose = require('mongoose')

const connectDb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database Connected: ${conn.connection.host}`);
      } catch (error) {
        console.error(`Error Connecting to Database: ${error.message}`);
        process.exit(1);
      }
}

module.exports = connectDb  