using EmployeeAdministrator.Modules.ProjectsModule.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAdministrator.Modules.ProjectsModule.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        public IProjectService _projectService { get; }

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }
    }
}
