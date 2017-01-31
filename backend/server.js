import express from 'express';
import mongodb from 'mongodb';

const Uri = process.env.IP;

const dbUrl = 'mongodb://'+ Uri +'/crudwithredux';

const Port = process.env.PORT || 8080;
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use((req,res,next) => {
    res.status(404).json({
        errors: {
            global: 'Something went wrong.'
        }
    });
});

mongodb.MongoClient.connect(dbUrl, function(err, db){
    
    var collection = db.collection('games');
    
    app.get('/api/games', function(req, res){
        console.log('games api called');
       collection
       .find({})
       .toArray(function(err, games){
           console.log({games});
           res.json({games});
           db.close();
       });
    });
    
    app.listen(Port, () => console.log("listening on port "+ Port));
    
});

