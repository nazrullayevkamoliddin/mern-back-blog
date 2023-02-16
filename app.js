process.env.NODE_ENV!=='production'? require('dotenv').config({path: '.env'}):null;
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();  
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_DB_CONNECTION).then(() => {console.log('MongoDB Connected')});
                                       
app.use(express.json()); 
app.use(cors());        
app.use(require('./router'));
app.listen(process.env.APP_PORT, () => {    
  console.log(`SERVER RUN ON ${process.env.APP_PORT}`);    
});  
 