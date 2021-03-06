import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
import corser from 'corser';

const app = express();
const Uri = process.env.IP;
const dbUrl = 'mongodb://' + Uri + '/crudwithredux';
const Port = process.env.PORT || 8080;

var corserRequestListener;

corserRequestListener = corser.create({
    endPreflightRequests: false
});

app.use(corserRequestListener);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
};

app.use(allowCrossDomain);

function validate(data) {
    let errors = {};
    if (data.title === '') errors.title = "Can't be empty";
    if (data.cover === '') errors.cover = "Can't be empty";
    const isValid = Object.keys(errors).length === 0;
    return {
        errors,
        isValid
    };
}

mongodb.MongoClient.connect(dbUrl, function(err, db) {
    
    let gameDB = db.collection('games');

    app.get('/api/games', (req, res) => {
        gameDB.find({}).toArray((err, games) => {
            res.json({
                games
            });
        });
    });

    app.post('/api/games', (req, res) => {
        corserRequestListener(req, res, function() {
            if (req.method === "OPTIONS") {
                // End CORS preflight request.
                res.writeHead(204);
                res.end();
            }
        });

        const {
            errors,
            isValid
        } = validate(req.body);
        if (isValid) {
            const {
                title,
                cover
            } = req.body;
            gameDB.insert({
                title,
                cover
            }, (err, result) => {
                if (err) {
                    res.status(500).json({
                        errors: {
                            global: "Something went wrong"
                        }
                    });
                }
                else {
                    res.json({
                        game: result.ops[0]
                    });
                }
            });
        }
        else {
            res.status(400).json({
                errors
            });
        }
    });

    app.get('/api/games/:_id', (req, res) => {
        gameDB.findOne({
            _id: new mongodb.ObjectId(req.params._id)
        }, (err, game) => {
            res.json({
                game
            });
        })
    });

    app.put('/api/games/:_id', (req, res) => {
        const {
            errors,
            isValid
        } = validate(req.body);

        if (isValid) {
            const {
                title,
                cover
            } = req.body;
            gameDB.findOneAndUpdate({
                    _id: new mongodb.ObjectId(req.params._id)
                }, {
                    $set: {
                        title,
                        cover
                    }
                }, {
                    returnOriginal: false
                },
                (err, result) => {
                    if (err) {
                        res.status(500).json({
                            errors: {
                                global: errors
                            }
                        });
                        return;
                    }
                    res.json({
                        game: result.value
                    });
                }

            )
        }
        else {
            res.status(400).json({
                errors
            });
        }
    })

    app.delete('/api/games/:_id', (req, res) => {
        gameDB.deleteOne({
                _id: new mongodb.ObjectId(req.params._id)
            },
            (err, r) => {
                if (err) {
                    res.status(500).json({
                        errors: {
                            global: errors
                        }
                    });
                    return;
                }
                res.json({});
            })
    })

    app.use((req, res) => {
        res.status(404).json({
            errors: {
                global: "Still working on it. Please try again later when we implement it"
            }
        });
    });

    app.listen(Port, () => console.log("listening on port " + Port));

});
