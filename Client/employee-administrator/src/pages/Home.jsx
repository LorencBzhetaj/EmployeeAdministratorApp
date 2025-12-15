import Projects from "../components/Home/Projects";
import Tasks from "../components/Home/Task/Tasks";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(0);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      var response = await axios.get(
        "https://localhost:44322/api/task/get-tasks"
      );

      setTasks(response.data.tasks);
    };

    fetchTasks();
  }, []);

  return (
    <>
      <div className="flex-1 flex justify-center items-center">
        <Projects setSelectedProject={setSelectedProject}></Projects>
        <Tasks selectedProject={selectedProject} tasks={tasks}></Tasks>
      </div>
    </>
  );
}
