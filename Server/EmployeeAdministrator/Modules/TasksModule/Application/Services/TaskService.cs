using EmployeeAdministrator.Modules.TasksModule.Application.Interfaces;
using EmployeeAdministrator.Modules.TasksModule.Domain;

namespace EmployeeAdministrator.Modules.TasksModule.Application.Services
{
    public class TaskService : ITaskService
    {
        public ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }
    }
}
