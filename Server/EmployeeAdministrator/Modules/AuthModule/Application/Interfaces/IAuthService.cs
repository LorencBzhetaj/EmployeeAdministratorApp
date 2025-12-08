using Microsoft.AspNetCore.Identity;

namespace EmployeeAdministrator.Modules.AuthModule.Application.Interfaces
{
    public interface IAuthService
    {
        public string GenerateJwtToken(IdentityUser user);
    }
}
