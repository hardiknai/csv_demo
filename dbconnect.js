const debug = require('debug')('database');
const mongoose = require("mongoose");
module.exports = (request, response, next) => {
  mongoose.connect("mongodb://localhost:27017/demo" ,
    { useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true }
  );
  debug("Database Connection created.");
  next();
};
mongoose.set('useCreateIndex', true);
