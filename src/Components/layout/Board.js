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
  const [isNameEmpty, setIsNameEmpty] = useState(true);
  const handleSubmit = () => {
    if (name === "") {
      setIsNameEmpty(true);
    }
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
      <h2>Kanban board</h2>
      <div>
        <button
          className="newTaskButton"
          onClick={() => setModalShow(!modalShow)}
        >
          Add new task
        </button>
        <Modal
          isOpen={modalShow}
          style={customStyles}
          onRequestClose={closeModal}
        >
          <h3>Add a new task</h3>
          <form name="myForm">
            <div className="modalContents">
              <div>
                <div className="modalLabel">
                  <label>
                    <h5>Project</h5>
                  </label>
                </div>
                <div className="modalInput">
                  <p>
                    {" "}
                    <input
                      type="text"
                      placeholder="Project"
                      autoFocus="autofocus"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </p>
                </div>
              </div>
              <div>
                <div className="modalLabel">
                  <label>
                    <h5>Description</h5>
                  </label>
                </div>
                <div className="modalInput">
                  <input
                    type="text"
                    placeholder="Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                value="Add"
                className="btn btn-primary btn-block modalAddButton"
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>
          </form>
        </Modal>
        <div className="board">
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
                  <div className="taskNameContent">{task.name}</div>
                  <div className="taskDescContent">{task.desc}</div>
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
