const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = 3000;
const bodyParser = require('body-parser');

const apiRouterUser = require('./Routes/user')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});



app.use('/signup', apiRouterUser);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;