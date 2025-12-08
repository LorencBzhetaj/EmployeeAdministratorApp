using EmployeeAdministrator.Modules.AuthModule.DTOs;
using Microsoft.AspNetCore.Identity;

namespace EmployeeAdministrator.Modules.AuthModule.Application.Interfaces
{
    public interface IAuthService
    {
        public Task<string> GenerateJwtToken(IdentityUser user);

        public Task<CreateUserResponse> CreateUser(CreateUserRequest createUserRequest);

        public Task<LoginResponse> Login(LoginRequest loginRequest);
    }
}
