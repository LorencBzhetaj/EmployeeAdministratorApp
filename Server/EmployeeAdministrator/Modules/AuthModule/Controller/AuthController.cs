using EmployeeAdministrator.Modules.AuthModule.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAdministrator.Modules.AuthModule.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IAuthService _authService;

        public AuthController(UserManager<IdentityUser> userManager, IAuthService authService)
        {
            _userManager = userManager;
            _authService = authService;
        }


        [HttpPost("create-user")]
        public async Task<IActionResult> CreateUser()
        {
            throw new NotImplementedException();
        }

    }
}
