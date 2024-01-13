const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = 3000;
const bodyParser = require('body-parser');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});
















app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;