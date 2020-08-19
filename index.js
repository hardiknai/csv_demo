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
const dbconnect = require("./dbconnect");
const Employee = require("./model/Employee");
const port = 9000;

app.use("/", dbconnect);
app.use("/upload-csv", router);

router.post("/", upload.single("file"), function (req, res) {
  const fileRows = [];
  csv
    .parseFile(req.file.path)
    .on("data", function (data) {
      fileRows.push(data);
      const { name, salary, efficiency, total_experience } = data;
      const newEmployee = new Employee({
        name,
        salary,
        efficiency,
        total_experience,
      });
      newEmployee.save().then((storedEmployee) => {
        console.log(storedEmployee._id);
      });

      console.log(data); // push each row
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
