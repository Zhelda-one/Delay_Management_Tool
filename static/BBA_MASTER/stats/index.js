const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(cors())
app.use(bodyParser.json({ type: 'application/json' }))

const generateStats = require('./public/scripts/generateStats');

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: 'public'});
})

app.get('/data', function (req, res) {
    getData((data) => {res.send(data)}, 'statistics');
})

app.get('/errors', function (req, res) {
    res.sendFile('errors.html', {root: 'public'});
    // getErrors((data) => {res.send(data)});
})
app.get('/getErrors', function (req, res) {
    getErrors((data) => {res.send(parseErrors(data))});
})

app.get('/basicStats', function (req, res) {
    getData((data) => {res.send(generateStats.createBasicStats(data))}, 'statistics');
})

app.get('/extendedStats', function (req, res) {
    getData((data) => {res.send(generateStats.createExtendedStats(data))}, 'statistics');
})

app.get('/usageStats', function (req, res) {
    getData((data) => {res.send(generateStats.createUsageStats(data))}, 'statistics');
})

app.get('/performanceStats', function (req, res) {
    getData((data) => {res.send(generateStats.createPerformanceStats(data))}, 'statistics');
})

app.get('/softwareStats', function (req, res) {
    getData((data) => {res.send(generateStats.createSoftwareStats(data))}, 'statistics');
})
app.get('/tabStats', function (req, res) {
    getData((data) => {res.send(generateStats.createTabStats(data))}, 'statistics');
})

app.get("/telemetryStats", (req, res) => {
    getData(
        (data) => res.send(generateStats.createTelemetryStats(data)),
        "statistics"
    );
});

app.post('/send_error', function (req, res) {
    let allErrors = req.body;
    let errorsToSend = [];
    for(let i = 0; i < allErrors.parameters.length; i++){
        if(allErrors.parameters[i].source.includes("localhost") || allErrors.parameters[i].source.includes("127.0.0.1")) continue;
        allErrors.parameters[i].time = (new Date()).getTime();
        allErrors.parameters[i].browser = parse_user_agent(req.headers['user-agent']).browser.name;

        errorsToSend.push(allErrors.parameters[i]);
    }
    allErrors.parameters = errorsToSend;
    addError(allErrors);


    res.send("{}");
});

const allowedRequestOrigins = [
    "http://bba.ans-tools.devops-fwk.dynamic.nsn-net.net",
    "http://bba.soccloud.dyn.nesc.nokia.net",
];

app.post('/add_data', function (req, res) {
    const requestOrigin = req.get("Origin");
    if (!allowedRequestOrigins.includes(requestOrigin)) {
        res.status(418).send();
        return;
    }

    addDataToCollection(req, res, "statistics");
})

const addDataToCollection = (req, res, collectionName) => {
    let dataToAddToDatabse = {}
    for (const [key, value] of Object.entries(req.body)) {
        dataToAddToDatabse[key] = value;
    }

    if(!req.body.hasOwnProperty("_id")){
        // console.log("New user has connected")
	dataToAddToDatabse.usageStartTime ??= Date.now();
        dataToAddToDatabse.system = parse_user_agent(req.headers['user-agent']);
        dataToAddToDatabse.ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || req.socket.remoteAddress;
        dataToAddToDatabse.sessions = [];

        insertToDB(dataToAddToDatabse, collectionName, (id)=>{
            res.send(JSON.stringify({id: id}))
        })
    }
    else {
        // console.log("Handle existing session")
        updateDB(dataToAddToDatabse, collectionName, ()=>{
            res.send("{}")
        })
    }
}

app.listen(3001)
console.log("app started listening on port 3001")



const { MongoClient, ObjectId } = require('mongodb')
const url = 'mongodb://bba-mongodb-svc.ans-tools.svc.cluster.local:27017';

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

const addError = (data) => {
    MongoClient.connect(url, {
        auth: {
            user: username,
            password: password
        }
    }, function (err, client) {
        const db = client.db();
        const collection = db.collection('errors');
        collection.insertMany([data], function (err, result) {
            client.close();
        });
    });
}
const getErrors = (callback) => {
    MongoClient.connect(url, {
        auth: {
            user: username,
            password: password
        }
    }, function (err, client) {
        const db = client.db();
        const collection = db.collection('errors');
        collection.find({}).toArray(function (err, docs) {
            callback(docs);
            client.close();
        });
    });
}

const insertToDB = (data, collectionName, callback) => {
    MongoClient.connect(url, {
        auth: {
            user: username,
            password: password
        }
    }, function (err, client) {
        if (err) {
            console.error('Error connecting to MongoDB:', err);
            callback(null, err); // Pass error to the callback
            return;
        }

        const db = client.db();
        const collection = db.collection(collectionName);

        collection.insertMany([data], function (err, result) {
            if (err) {
                console.error('Error inserting data into MongoDB:', err);
                callback(null, err); // Pass error to the callback
                return;
            }
            if (!result || !result.insertedIds || result.insertedIds.length === 0) {
                console.error('No insertedIds found in result:', result);
                callback(null, 'No insertedIds found'); // Pass error to the callback
                return;
            }
            callback(result.insertedIds[0].toString(), null); // Pass insertedId to the callback
            // callback(result.insertedIds[0].toString());
            client.close();
        });
    });
}

const updateDB = (data, collectionName, callback) => {
    MongoClient.connect(url, {
        auth: {
            user: username,
            password: password
        }
    }, function (err, client) {
        const db = client.db();
        const collection = db.collection(collectionName);
        collection.findOneAndUpdate({_id: ObjectId(data._id)}, {"$push": {sessions: data}}, function (err, result) {
            callback();
            client.close();
        });
    });
}

const parse_user_agent = (userAgent) => {
    const parser = require('ua-parser-js');
    return parser(userAgent)

}

const getData = (callback, collectionName) => {
    MongoClient.connect(url, {
        auth: {
            user: username,
            password: password
        }
    }, function (err, client) {
        if (err) {
            console.error("Could not connect to mongodb: %s", err);
            callback(null, err);
            return;
        }
        
        const db = client.db();
        const collection = db.collection(collectionName);
        collection.find({}).toArray(function (err, docs) {
            callback(docs);
            client.close();
        });
    });
}

const parseErrors = (data)=>{
    let summary = {};
    for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data[i].parameters.length; j++){
            const error = data[i].parameters[j];
            const errorHash = error.source + ' ' + error.message;
            if(!summary[errorHash]) {
                summary[errorHash] = {message: error.message, line: new Set([error.lineno]), userId: new Set([error.userId]),
                    source: error.source, count: 1, browser: {}, time: error.time};
                summary[errorHash].browser[error.browser] = 1;
            }
            else{
                summary[errorHash].line.add(error.lineno);
                summary[errorHash].userId.add(error.userId);
                summary[errorHash].count++;
                if(summary[errorHash].browser[error.browser]) summary[errorHash].browser[error.browser]++;
                else summary[errorHash].browser[error.browser] = 1;

                if(summary[errorHash].time < error.time) summary[errorHash].time = error.time;
            }
        }
    }
    summary = Object.keys(summary).map((key) => summary[key]);
    summary.sort((a,b) => (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0));
    summary.forEach(((obj) => obj.line=Array.from(obj.line).toString()));

    summary.forEach(((obj) => obj.userId=obj.userId.size));

    summary.forEach(((obj) => obj.time = (new Date(obj.time)).toLocaleDateString()));

    for(let i = 0; i < summary.length; i++){
        summary[i].browserStr = ""
        Object.keys(summary[i].browser).forEach((key) => (summary[i].browserStr += key+":"+summary[i].browser[key]+" "));
        delete summary[i].browser;
    }

    return summary;

}
