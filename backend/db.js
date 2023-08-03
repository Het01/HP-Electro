const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

const mongoURI = process.env.Mongo_URI;


const mongoDB = async () => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true, }, async (err, result) => {
    if (err) console.log("---" + err)
    else {
      console.log("connected to mongo");

      const fetched_data = await mongoose.connection.db.collection("data");
      // console.log(fetched_data);
      fetched_data.find({}).toArray(async function (err, data) {

        const foodCategory = await mongoose.connection.db.collection("category");
        foodCategory.find({}).toArray(function (err , catData){
          if (err) console.log("-----" + err);
          else {
            // console.log(data);
            global.food_items = data;
            global.foodCategory = catData;
          }
        })

        // if (err) console.log("-----" + err);
        // else {
        //   // console.log(data);
        //   global.food_items = data;
        // }
      })
    }
  })
};

module.exports = mongoDB;
