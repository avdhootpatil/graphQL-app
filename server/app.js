 const express = require('express');
 const graphHTTP = require('express-graphql');
 const schema = require('./schema/schema');
 const mongoose = require('mongoose');
 const cors = require('cors');
 

 const app = express();


app.use(cors());

mongoose.connect('mongodb://avdhoot:root123@ds149960.mlab.com:49960/gq-practise');
mongoose.connection.once('open',() => {
    console.log('connected to database');
});

 app.listen(4000 , () => {
     console.log("listening on port 4000....");
 });



 app.use('/graphql' , graphHTTP({
    schema : schema ,
    graphiql : true
    
 }));