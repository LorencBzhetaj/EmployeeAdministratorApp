using EmployeeAdministrator.Modules.TasksModule.Application.Interfaces;
using EmployeeAdministrator.Modules.TasksModule.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAdministrator.Modules.TasksModule.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        public ITaskService _taskService { get; }

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet("get-tasks")]
        public async Task<IActionResult> GetTasks()
        {
            try
            {
                var response = await _taskService.GetTask();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create-task")]
        public async Task<IActionResult> CreateTask(CreateTaskRequest request)
        {
            try
            {
                var response = await _taskService.CreateTask(request);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("edit-task")]
        public async Task<IActionResult> EditTask(EditTaskRequest request)
        {
            try
            {
                var response = await _taskService.EditTask(request);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete-task/{taskId}")]
        public async Task<IActionResult> DeleteTask(string taskId)
        {
            try
            {
                var id = Convert.ToInt16(taskId);

                var response = await _taskService.DeleteTask(id);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
