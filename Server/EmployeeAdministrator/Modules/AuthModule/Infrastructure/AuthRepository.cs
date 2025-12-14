using EmployeeAdministrator.DataLayer;
using EmployeeAdministrator.Modules.AuthModule.Domain;
using EmployeeAdministrator.Modules.AuthModule.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAdministrator.Modules.AuthModule.Infrastructure
{
    public class AuthRepository : IAuthRepository
    {
        public ApplicationDbContext _dbContext;
        private readonly UserManager<IdentityUser> _userManager;
        public AuthRepository(ApplicationDbContext dbContext , UserManager<IdentityUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        public async Task<GetUserProfileResponse> GetUserProfile(string userId)
        {
            try
            {
                
                var user = await _userManager.FindByIdAsync(userId);

                if (user != null)
                {
                    var roles = await _userManager.GetRolesAsync(user);

                    var response = new GetUserProfileResponse
                    {
                        Success = true,
                        Message = "User Profile Returned Successfully!",
                        User = user,
                        UserRoles = (List<string>)roles ?? new List<string>()
                    };

                    return response;
                }

                return new GetUserProfileResponse
                {
                    Success = false,
                    Message = "User Profile Was Not Found"
                };

            }catch (Exception ex)
            {
                return new GetUserProfileResponse
                {
                    Success = false,
                    Message ="Repository Error :"+ ex.Message,
                };
            }
        }

        public async Task<GetUsersResponse> GetUsers()
        {
            try
            {
                var userList = new List<UserDTO>();

                var users = await _dbContext.Users.ToListAsync();

                if (users.Any())
                {
                    foreach (var user in users)
                    {
                        var userRoles = await _userManager.GetRolesAsync(user);

                        var singleUser = new UserDTO
                        {
                            User = user,
                            UserRoles = (List<string>)userRoles
                        };

                        userList.Add(singleUser);
                    }

                    return new GetUsersResponse
                    {
                        Success = true,
                        Message = "User List Returned Successfully",
                        Users = userList
                    };
                }

                return new GetUsersResponse
                {
                    Success = false,
                    Message = "No Users Were Found!"
                };

            }catch ( Exception ex)
            {
                return new GetUsersResponse
                {
                    Success = false,
                    Message = "Repository Error!" + ex.Message,
                };
            }
        }

        public Task<EditUserResponse> EditUser(EditUserRequest request)
        {
            throw new NotImplementedException();
        }

        public async Task<DeleteUserResponse> DeleteUser(string userId)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId);

                if (user != null)
                {
                    var deletionResult = await _userManager.DeleteAsync(user);

                    if (!deletionResult.Succeeded)
                    {
                        return new DeleteUserResponse
                        {
                            Success = false,
                            Message = "Cannot Delete User: " + deletionResult.Errors.ToString(),
                        };
                    }

                    return new DeleteUserResponse
                    {
                        Success = true,
                        Message = "User Deleted Successfully!"
                    };
                }

                return new DeleteUserResponse
                {
                    Success = false,
                    Message = "User Was Not Found!"
                };

            }
            catch ( Exception ex )
            {
                return new DeleteUserResponse
                {
                    Success = false,
                    Message = "Repository Error : "+ ex.Message,
                };
            }
        }
    }
}
