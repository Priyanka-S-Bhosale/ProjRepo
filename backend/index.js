const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const userModel = require("./models");
const User = require('./models');


const app = express();
const port = 3001;

app.use(cors());

mongoose.connect('mongodb+srv://mongouser:mongouser@atlascluster.4tk2ajz.mongodb.net/myfirstdatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/details', async (req, res) => {
    //const user = await userModel.findOne({id: 123});
    
    const doc = await userModel.findOne({id: 234});  
    doc.name = 'Pbhosale';
    await doc.save();
    const user = await userModel.find({});
    // Delete the document so Mongoose won't be able to save changes
await userModel.deleteOne({ name: "Aishu"});
    res.send(user);

// Mongoose sends an `updateOne({ _id: doc._id }, { $set: { name: 'foo' } })`
// to MongoDB.
});
// const userInsert = new userModel({
//     id: 234,
//     name: 'Aishu'
//   });
  
  // Insert the article in our MongoDB database
// userInsert.save();

app.post('/insert', (req, res) => {
    const user_id = req.body.id;
  const name = req.body.name;
  const userInsert = new userModel({
    id: user_id,
    name: name
  });
  
  // Insert the article in our MongoDB database
userInsert.save();
    res.send('Got a POST request')
  })

  app.delete('/remove/:id', async (req, res) => {
      console.log(req.params.id);
    await userModel.deleteOne({ id: parseInt(req.params.id)});
    res.send("DELETE Request Called")
  })

// Mongoose sends an `updateOne({ _id: doc._id }, { $set: { name: 'foo' } })`
// to MongoDB.


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))




