import { useState, useEffect } from "react";
import axios from "axios";
import CreateTask from "../Home/Task/CreateTask";
import { useSelector } from "react-redux";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [taskProjectId, setTaskProjectId] = useState(null);

  const userId = useSelector((state) => state.auth.userId);
  const userRole = useSelector((state) => state.auth.userRole);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44322/api/task/get-tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let tasksData = response.data.tasks;

        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [newTask, projects]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        "https://localhost:44322/api/project/get-projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setProjects(data.projects);
    };
    fetchProjects();
  }, []);

  const handleEdit = (index) => {
    const project = projects[index];
    setSelectedProject({
      ...project,
      assignedUserIdsStr: project.assignedUserIds.join(", "),
      projectTasksStr: project.projectTasks.join(", "),
    });
    setIsProjectModalOpen(true);
  };

  const handleDelete = async (index) => {
    try {
      const project = projects[index];
      const response = await fetch(
        `https://localhost:44322/api/project/delete-project/${project.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete project");

      setProjects((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleProjectModalClose = () => {
    setIsProjectModalOpen(false);
    setSelectedProject(null);
  };

  const handleSaveProject = async () => {
    try {
      const projectToSave = {
        ...selectedProject,
        assignedUserIds: selectedProject.assignedUserIdsStr
          .split(",")
          .map((s) => s.trim()),
        projectTasks: selectedProject.projectTasksStr
          .split(",")
          .map((s) => s.trim()),
      };

      const response = await fetch(
        `https://localhost:44322/api/project/edit-project`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(projectToSave),
        }
      );

      if (!response.ok) throw new Error("Failed to update project");

      const updatedProject = await response.json();

      setProjects((prev) =>
        prev.map((proj) =>
          proj.id === updatedProject.id ? updatedProject : proj
        )
      );

      handleProjectModalClose();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleAddTaskClick = (projectId) => {
    setTaskProjectId(projectId);
    setNewTask("");
    setIsTaskModalOpen(true);
  };

  const handleTaskModalClose = () => {
    setIsTaskModalOpen(false);
    setTaskProjectId(null);
    setNewTask("");
  };

  const handleSaveTask = async () => {
    try {
      const project = projects.find((p) => p.id === taskProjectId);
      const updatedTasks = [...project.projectTasks, newTask];

      const response = await fetch(
        `https://localhost:44322/api/project/edit-project`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...project, projectTasks: updatedTasks }),
        }
      );

      if (!response.ok) throw new Error("Failed to add task");

      const updatedProject = await response.json();

      setProjects((prev) =>
        prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
      );

      handleTaskModalClose();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <>
      <div className="w-3/4 h-full flex items-center justify-center">
        <div className="w-full max-h-[70vh] overflow-y-auto space-y-4">
          {projects.length === 0 ? (
            <p className="text-gray-500">No projects available.</p>
          ) : (
            projects.map((project, index) => (
              <div
                key={index}
                className="p-4 bg-white border rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      project.isCompleted
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {project.isCompleted ? "Completed" : "Pending"}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-2">
                  {project.description}
                </p>

                <div className="text-sm text-gray-700 space-y-1 mb-4">
                  <p>
                    <strong>Due Date:</strong>{" "}
                    {new Date(project.dueDate).toLocaleString()}
                  </p>
                  <p>
                    <strong>Assigned Users:</strong>{" "}
                    {project.assignedUserIds.join(", ")}
                  </p>
                  <p>
                    <strong>Project Tasks:</strong>{" "}
                    {tasks
                      .filter((task) => task.projectId === project.id)
                      .map((task) => task.title)
                      .join(", ")}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleAddTaskClick(project.id)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Add Task
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isProjectModalOpen && selectedProject && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleProjectModalClose}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProject}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {isTaskModalOpen && (
        <CreateTask selectedProject={taskProjectId}></CreateTask>
      )}
    </>
  );
}
