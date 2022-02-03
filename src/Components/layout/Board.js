import React, { useState } from "react";
import Modal from "react-modal";

const Board = () => {
  const stages = [
    "Requirement Analysis",
    "Ready to start",
    "Development",
    "Testing",
    "Deployment",
    "Done",
  ];
  const [taskArray, setTaskArray] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const handleSubmit = () => {
    setModalShow(!modalShow);
    setTaskArray([...taskArray, { name, desc, stage: 0 }]);
    setName("");
    setDesc("");
  };

  const handleBackward = (tsk, index) => {
    const newState = [...taskArray];
    newState[index].stage = tsk.stage - 1;
    setTaskArray(newState);
  };
  const handleForward = (tsk, index) => {
    const newState = [...taskArray];
    newState[index].stage = tsk.stage + 1;
    setTaskArray(newState);
  };
  const deleteTask = (tsk, index) => {
    const newState = [...taskArray];
    newState.splice(index, 1);
    setTaskArray(newState);
  };
  const style = (stage) => {
    var value = (100 / 6) * stage;
    const marginLeft = value;
    return marginLeft + "%";
  };
  const closeModal = () => {
    setModalShow(!modalShow);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  Modal.setAppElement(document.getElementById("test"));
  return (
    <div id="test">
      <h2>this is Kanban board</h2>
      <div>
        <button onClick={() => setModalShow(!modalShow)}>Add new task</button>
        <Modal
          isOpen={modalShow}
          style={customStyles}
          contentLabel="New Task"
          onRequestClose={closeModal}
        >
          <form name="myForm">
            <div>
              <div className="modalLabel">
                <label>Project</label>
              </div>
              <div className="modalInput">
                <p>
                  {" "}
                  <input
                    type="text"
                    placeholder="project"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <span className="error" id="errorname"></span>
                </p>
              </div>
            </div>
            <div>
              <div className="modalLabel">
                <label>Description</label>
              </div>
              <div className="modalInput">
                <input
                  type="text"
                  placeholder="description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
            </div>
            <input type="submit" value="Add" onClick={handleSubmit} />
          </form>
        </Modal>
        <div>
          <h3>Stages of project</h3>
          <div className="stages">
            {stages.map((stage, key) => (
              <div className="stagesOfProjects" key={key}>
                {stage}
              </div>
            ))}
          </div>
          <div className="taskArray">
            {taskArray.map((task, key) => (
              <div
                className="task"
                style={{ marginLeft: style(task.stage) }}
                key={key}
              >
                <div className="taskButons">
                  <button
                    className="taskButton"
                    type="submit"
                    disabled={task.stage === 0}
                    onClick={() => {
                      handleBackward(task, key);
                    }}
                  >
                    <i class="fas fa-chevron-left"></i>
                  </button>
                  <button
                    className="taskButton"
                    type="submit"
                    disabled={task.stage === 5}
                    onClick={() => {
                      handleForward(task, key);
                    }}
                  >
                    <i class="fas fa-chevron-right"></i>{" "}
                  </button>
                  <button
                    className="taskButtonDelete"
                    type="submit"
                    onClick={() => deleteTask(task, key)}
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <div className="taskName">
                  <div className="taskNameContent">name : {task.name}</div>
                  <div className="taskDescContent">desc : {task.desc}</div>
                  <div>stage : {task.stage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
