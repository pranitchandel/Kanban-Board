const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  assignee: {
    type: String,
  },
  stage: {
    type: Number,
  },
  desc: {
    type: String,
  },
  creationDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
  },
});

module.exports = Task = mongoose.model("task", TaskSchema);
