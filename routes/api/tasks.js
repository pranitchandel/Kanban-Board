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
  console.log("Params", req.query);
  try {
    const tasks = await Task.find(req.query).sort({ _id: "desc" });
    res.json(tasks);
  } catch (err) {
    //console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route  DELETE api/tasks/:task_id
// @desc   delete a task
// @access Public
router.delete("/delete/:task_id", async (req, res) => {
  try {
    //res.send(req.params.task_id);
    const foundTask = await Task.findById(req.params.task_id);
    //console.log(foundTask);
    if (!foundTask) {
      console.log("error");
    } else {
      await foundTask.remove();
      res.send(foundTask);
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
    task.stage = req.params.stg;
    await task.save();
    res.send(task);
  } catch (error) {
    console.log(error);
  }
});

// @route  PUT api/tasks/updateTask/:task_id
// @desc   update stage of a task
// @access Public

router.put("/updateTask/:task_id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.task_id, {
    name: req.body.name,
    assignee: req.body.assignee,
    stage: req.body.stage,
    desc: req.body.desc,
    creationDate: req.body.creationDate,
    dueDate: req.body.dueDate,
  });
  res.send(task);
});
module.exports = router;
