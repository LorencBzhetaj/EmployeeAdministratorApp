import { useState, useEffect } from "react";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = Array.from({ length: 20 }).map((_, i) => ({
        name: `Project ${i + 1}`,
        description: `Description for project ${i + 1}`,
        isCompleted: i % 2 === 0,
        dueDate: "2025-12-13T16:10:05.023Z",
        assignedUserIds: [`user${i + 1}`],
        projectTasks: [`Task ${i + 1}`],
      }));
      setProjects(data);
    };

    fetchProjects();
  }, []);

  const handleEdit = (index) => {
    const project = projects[index];
    console.log("Edit project:", project);
  };

  const handleDelete = (index) => {
    const project = projects[index];
    console.log("Delete project:", project);
    setProjects((prev) => prev.filter((_, i) => i !== index));
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
                    {project.projectTasks.join(", ")}
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
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
