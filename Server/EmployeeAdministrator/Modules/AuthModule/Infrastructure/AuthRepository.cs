using EmployeeAdministrator.DataLayer;
using EmployeeAdministrator.Migrations;
using EmployeeAdministrator.Modules.AuthModule.Domain;
using EmployeeAdministrator.Modules.AuthModule.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Customer = EmployeeAdministrator.Modules.AuthModule.DTOs.Customer;

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

        public async Task<EditUserResponse> EditUser(EditUserRequest request)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(request.userId);
                if (user == null)
                {
                    return new EditUserResponse
                    {
                        Success = false,
                        Message = "User not found."
                    };
                }
                if (!string.IsNullOrEmpty(request.UserName))
                    user.UserName = request.UserName;

                if (!string.IsNullOrEmpty(request.Email))
                    user.Email = request.Email;

                if (!string.IsNullOrEmpty(request.PhoneNumber))
                    user.PhoneNumber = request.PhoneNumber;

                if (!string.IsNullOrEmpty(request.Password))
                {
                    var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                    var result = await _userManager.ResetPasswordAsync(user, token, request.Password);
                    if (!result.Succeeded)
                    {
                        return new EditUserResponse
                        {
                            Success = false,
                            Message = "Failed to update password: " + string.Join(", ", result.Errors.Select(e => e.Description))
                        };
                    }
                }
                var customer = await _dbContext.Customers.FirstOrDefaultAsync(c => c.UserId == request.userId);
                if (customer == null)
                {
                    customer = new Customer
                    {
                        UserId = request.userId,
                        FullName = request.FullName ?? user.UserName
                    };

                    if (request.Photo != null && request.Photo.Length > 0)
                    {
                        using var ms = new MemoryStream();
                        await request.Photo.CopyToAsync(ms);
                        customer.Photo = ms.ToArray();
                        customer.PhotoContentType = request.Photo.ContentType;
                    }

                    _dbContext.Customers.Add(customer);
                }
                else
                {
     
                    customer.FullName = request.FullName ?? customer.FullName;

                    if (request.Photo != null && request.Photo.Length > 0)
                    {
                        using var ms = new MemoryStream();
                        await request.Photo.CopyToAsync(ms);
                        customer.Photo = ms.ToArray();
                        customer.PhotoContentType = request.Photo.ContentType;
                    }
                }

                await _dbContext.SaveChangesAsync();
                var updateResult = await _userManager.UpdateAsync(user);
                if (!updateResult.Succeeded)
                {
                    return new EditUserResponse
                    {
                        Success = false,
                        Message = "Failed to update user: " + string.Join(", ", updateResult.Errors.Select(e => e.Description))
                    };
                }

                return new EditUserResponse
                {
                    Success = true,
                    Message = "User updated successfully."
                };
            }
            catch (Exception ex)
            {
                return new EditUserResponse
                {
                    Success = false,
                    Message = "Repository Error: " + ex.Message
                };
            }
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

        public async Task<byte[]> GetUserPhoto(string userId)
        {
            var user = await _dbContext.Customers.FirstOrDefaultAsync(x => x.UserId == userId);
            return user?.Photo;
        }

        public async Task<string> GetUserPhotoType(string userId)
        {
            var user = await _dbContext.Customers.FirstOrDefaultAsync(x => x.UserId == userId);
            return user?.PhotoContentType;
        }
    }
}
