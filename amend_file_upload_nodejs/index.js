const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const app = express();
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
app.use(cors());
mongoose
  .connect("mongodb://localhost:27017/amend")
  .then((res) => {
    console.log("Successfully connected to mongoDb");
  })
  .catch((err) => {
    console.log("Couldn't able to connect");
  });
const ImageModel = mongoose.model(
  "image-model",
  mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  })
);
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});
//image is the key that we passed from form
const singleUpload = upload.single("image");
const singleUploadCtrl = (req, res, next) => {
  singleUpload(req, res, (err) => {
    if (err) {
      res.status(422).json({ message: "Image upload failed" });
    }
    next();
  });
};
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/image-upload", singleUploadCtrl, (req, res) => {
  if (!req.file) {
    res.status(422).json({ message: "Failed to upload image" });
  }
  console.log(req.body.name);

  MongoClient.connect(url, async function (err, db) {
    if (err) throw err;
    var dbo = db.db("amend");
    var collection;
    if (req.body.name.endsWith("U")) collection = dbo.collection("user");
    else collection = dbo.collection("emp");
    const query = { email: req.body.name.substring(0,req.body.name.length - 1) };
    const update = {
      $set: {
        image: { data: req.file.buffer, contentType: req.file.mimetype },
      },
    };
    const result = await collection.updateOne(query, update);
    console.log(result);
    return res.status(200).json({ message: "Updated the profile pic" });
  });

  // const newImage = new ImageModel({
  //   name:req.body.name,
  //   image: {
  //     data: req.file.buffer,
  //     contentType: req.file.mimetype,
  //   },
  // });
  // newImage.save();
  // console.log(req.file);
});
app.get("/", (req, res) => {
  ImageModel.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      console.log("REsponse sent");
      res.status(200).json({ items: items });
    }
  });
});

const uploadPDF = multer({
  storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});
//image is the key that we passed from form
const singleUploadPDF = upload.single("pdf");
const singleUploadPDFCtrl = (req, res, next) => {
  singleUploadPDF(req, res, (err) => {
    if (err) {
      res.status(422).json({ message: "pdf upload failed" });
    }
    next();
  });
};
app.post("/pdf-upload", singleUploadPDFCtrl, (req, res) => {
  if (!req.file) {
    res.status(422).json({ message: "Failed to upload pdf" });
  }

  const options = { upsert: true };
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("amend");
    var collection = dbo.collection("emp");
    console.log(req.body);
    const query = { email: req.body.name.substring(0,req.body.name.length - 3) };
    const update = {
      $set: {
        serviceName:req.body.serviceName,
        pdf: { data: req.file.buffer, contentType: req.file.mimetype },
      },
    };
    collection.updateOne(query, update, options);
    return res.status(200).json({ message: "Updated the profile pic" });
  });
});

app.listen(3001, (req, res) => {
  console.log("Listening to port 3001");
});
