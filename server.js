const express = require('express');
const cors = require('cors');
const req = require('express/lib/request');
require('dotenv').config()

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  req.file.filename =  req.file.originalname;
  console.log(req.file ,  req.body);
  res.json({
    name: req.file.originalname,
    type : req.file.mimetype,
    size : req.file.size
  });
  res.status(200);
  res.end();
})




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
