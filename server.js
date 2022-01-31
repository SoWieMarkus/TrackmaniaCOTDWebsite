const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, './dist/trackmania-cotdwebsite/')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/trackmania-cotdwebsite/index.html'));
});

app.listen(1337, () => {
  console.log('Listening to port 1337');

});
