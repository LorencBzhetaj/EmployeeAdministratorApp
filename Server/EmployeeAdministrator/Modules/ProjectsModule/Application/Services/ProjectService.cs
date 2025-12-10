using EmployeeAdministrator.DataLayer;
using EmployeeAdministrator.Modules.ProjectsModule.Application.Interfaces;
using EmployeeAdministrator.Modules.ProjectsModule.Domain;

namespace EmployeeAdministrator.Modules.ProjectsModule.Application.Services
{
    public class ProjectService : IProjectService
    {
        public IProjectRepository _projectRepository { get; }

        public ProjectService(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

    }
}
