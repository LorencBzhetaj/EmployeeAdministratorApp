import { useState, useEffect, use } from "react";
import { useSelector } from "react-redux";

export default function Projects({ setSelectedProject }) {
  const [projects, setProjects] = useState([]);
  const userRole = useSelector((state) => state.auth.userRole);
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);

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

      if (userRole != "Admin") {
        const filteredProjects = data.projects.filter((p) =>
          p.assignedUserIds?.includes(userId)
        );

        setProjects(filteredProjects);
      } else {
        setProjects(data.projects);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (projectid) => {
    setSelectedProject(projectid);
  };

  return (
    <>
      <div className="h-150 w-1/2 flex flex-col items-center justify-start gap-4">
        <h1 className="text-3xl font-bold">Projects</h1>

        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white p-4 rounded-lg shadow w-5/6 flex flex-col justify-center items-center"
            onClick={() => handleProjectClick(project.id)}
          >
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
