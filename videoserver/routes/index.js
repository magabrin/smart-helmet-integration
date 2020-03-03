var express = require('express');
var router = express.Router();
var fs = require('fs');



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

module.exports = router;
