var express = require('express');
var router = express.Router();
var fs = require('fs');
var fetch = require('node-fetch');


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
