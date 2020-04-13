var express = require('express');
var router = express.Router();
var fs = require('fs');
var fetch = require('node-fetch');
var crashData = require('../files/crash.json');

var didCrashHappen = false;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/list', (req, res, next) => {
  try {
    console.log('listing video titles');    
    let files = fs.readdirSync('./files');
    res.send(files);  
  } catch (error) {
    res.sendStatus(404);
  }
  
});

router.get('/pollforcrash', (req, res, next) => {
  try {
    res.send({crash: didCrashHappen});
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get('/resetcrash', (req, res, next) => {
  try {
    didCrashHappen = false;
    res.send({didCrashHappen: false});
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get('/crashfrompi', (req, res, next) => {
  try {
    didCrashHappen = true;
    res.send({didCrashHappen: true});
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.post('/crash', (req, res, next) => {
  try {
    // crashData.push({
    //   'name': req.body.name,
    //   'location': req.body.location,
    // })
    crashData.push(req.body);
    fs.writeFileSync('./files/crash.json', JSON.stringify(crashData));
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get('/crash', (req, res, next) => {
  try {
    console.log('listing crash data');    
    res.send(crashData);  
  } catch (error) {
    res.sendStatus(404);
  }
  
});

router.get('/download', (req, res, next) => {
  console.log('downloading a file');
  try {
    let filename = req.query.filename;  
    let filenameFullPath = __dirname + '/../files/' + filename;
    res.download(filenameFullPath);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
  
});

router.get('/startTrip', async (req, res, next) => {
  try {
    console.log('got command to start trip, forwarding to pi');
    await fetch('http://24.131.225.153:3080/start');
    res.sendStatus(200);
  } catch (error) {
     console.log(error);
     res.sendStatus(400);
  }
});

router.get('/endTrip', async (req, res, next) => {
  try {
    console.log('got command to end trip, forwarding to pi');
    await fetch('http://24.131.225.153:3080/end');
    res.sendStatus(200);
  } catch(error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.post('/crash', (req, res, next) => {
  try {
    console.log('crash detected');
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
 
});

module.exports = router;
