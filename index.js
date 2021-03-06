const http = require("http");
const fs = require("fs");

const express = require("express");
const multer = require("multer");
const csv = require("fast-csv");

const Router = express.Router;
const upload = multer({ dest: "tmp/csv/" });
const app = express();
const router = new Router();
const server = http.createServer(app);
const Employee = require("./model/Employee");
const Mongoose = require("mongoose");
const port = 9000;

Mongoose.connect("mongodb://localhost:27017/demo", { useNewUrlParser: true });

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use("/", router);

router.get("/fetchByExperience", function (req, response) {
  Employee.find({}).then((employee) => {
    if (!employee) {
      return response.status(404).json({ error: "There is no data found" });
    }
    response.send(employee);
  });
});
router.get("/fetchByExperience", function (req, response) {
  Employee.find({}).then((employee) => {
    if (!employee) {
      return response.status(404).json({ error: "There is no data found" });
    }
    response.send(employee);
  });
});
router.get("/fetchByEfficiencyRange", function (req, response) {
  Employee.find({}).then((employee) => {
    if (!employee) {
      return response.status(404).json({ error: "There is no data found" });
    }
    response.send(employee);
  });
});

router.post("/upload-csv", upload.single("file"), function (req, res) {
  const fileRows = [];
  csv
    .parseFile(req.file.path)
    .on("data", function (data) {
      fileRows.push(data);

      let image_path = "./images/" + Date.now() + ".jpg";
      const newEmployee = new Employee({
        name: data[0],
        salary: data[1],
        efficiency: data[2],
        total_experience: data[3],
        image: image_path,
      });
      newEmployee.save().then((storedEmployee) => {
        console.log(storedEmployee._id);
      });
    })
    .on("end", function () {
      fs.unlinkSync(req.file.path); // remove temp file
      res.json({ message: "file Uploaded Successflly" });
    });
});

function startServer() {
  server.listen(port, function () {
    console.log("Express server listening on ", port);
  });
}

setImmediate(startServer);
