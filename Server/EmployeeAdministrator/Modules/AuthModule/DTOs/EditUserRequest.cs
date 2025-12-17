namespace EmployeeAdministrator.Modules.AuthModule.DTOs
{
    public class EditUserRequest
    {
        public string userId { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }
        public string FullName { get; set; }

        public IFormFile Photo { get; set; }
    }
}
