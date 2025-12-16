namespace EmployeeAdministrator.Modules.AuthModule.DTOs
{
    public class EditUserRequest
    {
        public string userId { get; set; }

        public string FullName { get; set; }

        public IFormFile Photo { get; set; }
    }
}
