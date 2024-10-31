var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require("multer")

var app = express();

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if(!req.file) {
    res.json({error: "No file provided"})
  }

  const fileInfo = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  }

  res.json(fileInfo)
})


const port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
