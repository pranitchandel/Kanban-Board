const express = require("express");
const router = express.Router();
const Task = require("../../models/Task");

// @route  GET api/task/health
// @desc   Tests task route
// @access Public
router.get("/health", (req, res) => {
  res.json({ msg: "task api is working" });
});

// @route  POST api/tasks/addTask
// @desc   post a task
// @access Public
router.post("/addTask", async (req, res) => {
  const newtask = new Task({
    name: req.body.name,
    assignee: req.body.assignee,
    stage: req.body.stage,
    desc: req.body.desc,
    creationDate: req.body.creationDate,
    dueDate: req.body.dueDate,
  });
  const task = await newtask.save();
  return res.json(task);
});

// @route  GET api/tasks/all
// @desc   get all tasks
// @access Public
router.get("/all", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route  DELETE api/tasks/:task_id
// @desc   delete a task
// @access Public
router.delete("/delete/:task_id", async (req, res) => {
  try {
    res.send(req.params.task_id);
    const foundTask = await Task.findById(req.params.task_id);
    console.log(foundTask);
    if (!foundTask) {
      console.log("error");
    } else {
      await foundTask.remove();
    }
  } catch (error) {
    console.log(error);
  }
});

// @route  PUT api/tasks/updateStage/:task_id/:stg
// @desc   update stage of a task
// @access Public
router.put("/updateStage/:task_id/:stg", async (req, res) => {
  try {
    const task = await Task.findById(req.params.task_id);
    console.log(task);
    console.log(req.params.stg);
    task.stage = req.params.stg;
    await task.save();
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
