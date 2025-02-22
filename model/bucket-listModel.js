const mongoose = require("mongoose");

const bucketListSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

const BucketList = mongoose.model("bucketlist", bucketListSchema);

module.exports = BucketList;