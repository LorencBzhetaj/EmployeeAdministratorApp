import { useState } from "react";
import CreateTask from "./CreateTask";


export default function Tasks({selectedProject}) {

    const [isCreatingTask, setIsCreatingTask] = useState(false);

    return (<>
      <div className="h-150 w-1/2 flex flex-col items-center justify-start gap-4">
        <h1 className="text-3xl font-bold">Tasks</h1>

        <div className="bg-white p-4 rounded-lg shadow w-5/6 mt-4 mb-4">
          <h2 className="text-xl font-semibold">Selected Project ID: {selectedProject}</h2>
        </div>

        <div className="bg-white p-4 flex rounded-lg shadow w-5/6 mt-4 mb-4">
          <div className="h-20 w-1/2 flex justify-center items-center">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setIsCreatingTask(!isCreatingTask)}
            >
              {isCreatingTask ? "Cancel" : "Create New Task"}
            </button>
          </div>
          <div className="w-1/2 flex justify-center items-center">Here Will Be The Task Filter</div>
        </div>
          

        <div className="bg-white p-4 rounded-lg shadow w-5/6 mt-4">

          {isCreatingTask ? (
            <CreateTask />
          ) : (<>
          {selectedProject === 0 && <p>Please select a project to view its tasks.</p>}
          {selectedProject === 1 && (
            <>
                <h2 className="text-xl font-semibold">Car Rental App Tasks</h2>
                <ul className="list-disc list-inside">
                    <li>Design database schema</li>
                    <li>Implement user authentication</li>
                    <li>Develop car listing feature</li>
                    <li>Set up payment gateway</li>
                </ul>
            </>
          )}
          {selectedProject === 2 && (
            <>
                <h2 className="text-xl font-semibold">Marketing Website Tasks</h2>
                <ul className="list-disc list-inside">
                    <li>Create wireframes for landing pages</li>
                    <li>Develop responsive design</li>
                    <li>Integrate SEO best practices</li>
                    <li>Set up analytics tracking</li>
                </ul>
            </>
            )}  
            {selectedProject === 3 && (

            <>  
                <h2 className="text-xl font-semibold">E-Commerce Shop Tasks</h2>
                <ul className="list-disc list-inside">
                    <li>Design product catalog</li> 
                    <li>Implement shopping cart functionality</li>
                    <li>Set up user reviews and ratings</li>
                    <li>Integrate with .NET backend</li>
                </ul>
            </>
            )}
              </>)}
        </div>
      </div>
    </>
    );
}