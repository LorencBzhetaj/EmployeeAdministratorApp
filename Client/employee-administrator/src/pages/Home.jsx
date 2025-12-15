import Projects from "../components/Home/Projects";
import Tasks from "../components/Home/Task/Tasks";
import { useState, useEffect } from "react";
import axios from "axios";
import ViewTask from "../components/Home/Task/ViewTask";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [isViewingTask, setIsViewingTask] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      var response = await axios.get(
        "https://localhost:44322/api/task/get-tasks"
      );

      setTasks(response.data.tasks);
    };

    fetchTasks();
  }, [isViewingTask]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex-1 flex justify-center items-center">
        <Projects setSelectedProject={setSelectedProject}></Projects>
        <Tasks
          openModal={openModal}
          selectedProject={selectedProject}
          tasks={tasks}
          setIsViewingTask={setIsViewingTask}
        ></Tasks>
      </div>

      {isModalOpen && (
        <ViewTask
          setIsViewingTask={setIsViewingTask}
          closeModal={closeModal}
          task={isViewingTask}
        ></ViewTask>
      )}
    </>
  );
}
