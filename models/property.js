const mongoose = require("mongoose");
// const multer = require('multer');
const path = require("path");
// const AVATAR_PATH = path.join('/uploads/users/avatars');

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
      required: true,
      enum: ["Kolkata", "Bangalore", "Mumbai", "Delhi", "Chennai"],
    },
    avatar: {
      type: String,
    },
    rent: {
      type: Number,
    },
    price: {
      type: Number,
    },
    beds: {
      type: Number,
      required: true,
    },
    baths: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["rent", "sale"],
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "..", AVATAR_PATH));
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

// static vars
// userSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
//   "avatar"
// );
// userSchema.statics.avatarPath = AVATAR_PATH;

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
