const mongoose = require("mongoose");
// const multer = require('multer');
const path = require("path");
// const AVATAR_PATH = path.join('/uploads/users/avatars');

const sellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    contact: {
      type: Number,
    },
    properties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
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

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
