import express from 'express';
import mongodb from 'mongodb';

const dbUrl = 'mongodb://localhost/crudwithredux';

const Port = process.env.PORT || 8080;
const app = express();


mongodb.MongoClient.connect(dbUrl, function(err, cb){
    
    app.get('/api/games', function(req, res){
       db.collection('games')
       .find({})
       .toArray(function(err, games){
           res.json({games});
       }) 
    });
    
    app.listen(Port, () => console.log("listening on port "+ Port));
    
});

