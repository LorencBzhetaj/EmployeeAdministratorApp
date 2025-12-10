using EmployeeAdministrator.DataLayer;
using EmployeeAdministrator.Modules.TasksModule.Domain;

namespace EmployeeAdministrator.Modules.TasksModule.Infrastructure
{
    public class TaskRepository : ITaskRepository
    {
        public ApplicationDbContext _dbContext;

        public TaskRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
