using EmployeeAdministrator.DataLayer;
using EmployeeAdministrator.Modules.ProjectsModule.Domain;

namespace EmployeeAdministrator.Modules.ProjectsModule.Infrastructure
{
    public class ProjectRepository : IProjectRepository
    {
        public ApplicationDbContext _dbContext;

        public ProjectRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
