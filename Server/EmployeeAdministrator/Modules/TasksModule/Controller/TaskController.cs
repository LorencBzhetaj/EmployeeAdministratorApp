using EmployeeAdministrator.Modules.TasksModule.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAdministrator.Modules.TasksModule.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        public ITaskService _taskService { get; }

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }
    }
}
