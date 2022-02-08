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
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
  },
});

module.exports = Task = mongoose.model("task", TaskSchema);
