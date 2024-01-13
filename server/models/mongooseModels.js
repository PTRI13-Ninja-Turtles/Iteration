const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://moisesgomezr9:L37udLyPOFIfqRtM@scratch-project.j3hrygw.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'scratch project'
  })
    .then(() => console.log('Connected to Mongo DB.'))
    .catch(err => console.log(err));

