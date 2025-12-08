using EmployeeAdministrator.Modules.AuthModule.Application.Interfaces;
using EmployeeAdministrator.Modules.AuthModule.Domain;
using EmployeeAdministrator.Modules.AuthModule.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EmployeeAdministrator.Modules.AuthModule.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly IAuthRepository _authRepository;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public AuthService(IConfiguration configuration, IAuthRepository authRepository,UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _configuration = configuration;
            _authRepository = authRepository;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<CreateUserResponse> CreateUser(CreateUserRequest createUserRequest)
        {
            try
            {
                var newUser = new IdentityUser
                {
                    UserName = createUserRequest.UserName,
                    Email = createUserRequest.Email,
                };

                var result = await _userManager.CreateAsync(newUser, createUserRequest.Password);

                if(!result.Succeeded)
                {
                    return new CreateUserResponse
                    {
                        IsSuccess = false,
                        Message = "Failed To Create User!"
                    };
                }

                if (await _roleManager.RoleExistsAsync("Employee"))
                {

                    var roleResult =await _userManager.AddToRoleAsync(newUser, "Employee");

                    if(!roleResult.Succeeded)
                    {
                        return new CreateUserResponse
                        {
                            IsSuccess = false,
                            Message = "Failed To Add Role To The User!"
                        };
                    }
                }
                else
                {
                    return new CreateUserResponse
                    {
                        IsSuccess = false,
                        Message = "Employee Role Doesnt Exist!"
                    };
                }


                return new CreateUserResponse
                {
                    IsSuccess = true,
                    Message = "User Was Created Successfully!"
                };

            }catch (Exception ex)
            {
                return new CreateUserResponse
                {
                    IsSuccess = false,
                    Message = "Unexpected Error : " + ex.Message
                };
            }
        }

        public string GenerateJwtToken(IdentityUser user)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Name, user.UserName)
        };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(double.Parse(jwtSettings["DurationInMinutes"])),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
