export default function Projects({setSelectedProject}) {

  const projects = [
    { id: 1, title: "Car Rental App", description: "A platform to rent cars online." },
    { id: 2, title: "Marketing Website", description: "Create business landing pages easily." },
    { id: 3, title: "E-Commerce Shop", description: "Online shop with React + .NET backend." },
  ];

  const handleProjectClick = (projectid) => {
    setSelectedProject(projectid);
  }

    return (<>
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
    </>);
}