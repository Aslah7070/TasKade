import type { Response,Request } from "express";
import { Task } from "../models/task.modal";
import { HttpStatus } from "../constans/status.constant";
import Workspace from "../models/workspace.model";

export const createTask = async (req: Request, res: Response) => {
  const { name, description, dueDate, priority, assignedTo } = req.body;
  console.log("req.body",req.body);
  
  const { spaceId } = req.params;

  const task = new Task({
    spaceId,
    name,
    description,
    dueDate,
    priority, 
    assignedTo,
  });
 
  await task.save();  


      res.standardResponse(HttpStatus.CREATED,{success:true,message:"task created successfully"})
          return
};

export const getTaskById = async (req: Request, res: Response) => {
  const { taskId } = req.params;

  const task = await Task.findById(taskId);

  if (!task) {
         res.standardResponse(HttpStatus.NOT_FOUND,{success:true,message:"Task not found"})
          return

  }

      res.standardResponse(HttpStatus.OK,{success:true,message:"ask retrieved succesfully",task})
          return
 
};
// export const getAllTask = async (req: Request, res: Response) => {
//   const { spaceId } = req.params;

//   const tasks = await Task.find({spaceId:spaceId});

//   if (!tasks) {
//          res.standardResponse(HttpStatus.NOT_FOUND,{success:true,message:"Task not found"})
//           return

//   }

//       res.standardResponse(HttpStatus.OK,{success:true,message:"all task retrieved succesfully",tasks})
//           return
 
// };


export const getAllTask = async (req: Request, res: Response) => {
  const { workspaceId } = req.params;

  try {
    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      return res.standardResponse(HttpStatus.NOT_FOUND, {
        success: false,
        message: "Workspace not found",
      });
    }

    const spaceIds = workspace.spaces; 
    console.log("spaceIds",spaceIds);
    

    // Fetch tasks for each space using Promise.all
    const tasksArray = await Promise.all(
      spaceIds.map((spaceId) => Task.find({ spaceId }))
    );

    // Flatten the array of task arrays into a single array
    const allTasks = tasksArray.flat();

    if (allTasks.length === 0) {
      return res.standardResponse(HttpStatus.NOT_FOUND, {
        success: false,
        message: "No tasks found for this workspace",
      });
    }
 console.log("allTasks",allTasks);
    return res.standardResponse(HttpStatus.OK, {
      success: true,
      message: "All tasks retrieved successfully",
      tasks: allTasks,
    });

   
    
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.standardResponse(HttpStatus.INTERNAL_SERVER_ERROR, {
      success: false,
      message: "An error occurred while fetching tasks",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { title, description, dueDate, priority, assignedTo, listId } =
    req.body;

  const task = await Task.findByIdAndUpdate(
    taskId,
    { title, description, dueDate, priority, assignedTo, listId },
    { new: true }
  );
  if (!task) {
         res.standardResponse(HttpStatus.NOT_FOUND,{success:true,message:"Task not found"})
          return

  }

   res.standardResponse(HttpStatus.OK,{success:true,message:"Task updated successfully",task})
          return
 
};

export const deleteTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;

  const task = await Task.findByIdAndDelete(taskId);

   if (!task) {
         res.standardResponse(HttpStatus.NOT_FOUND,{success:true,message:"Task not found"})
          return

  }
   res.standardResponse(HttpStatus.OK,{success:true,message:"Task deleted successfully"})
          return


};

export const moveTask = async (req: Request, res: Response) => {
  const { taskId,spaceId } = req.params;
  // const { targetSpaceId } = req.body;
  console.log("taskId",taskId);
  console.log("spaceId",spaceId);
  
if(!taskId||!spaceId){
  res.standardResponse(HttpStatus.NOT_FOUND,{success:false,message:"id not found"})
  return 
}
  const task = await Task.findByIdAndUpdate(
    taskId,
    { spaceId: spaceId },
    { new: true }
  );
  if (!task) {
         res.standardResponse(HttpStatus.NOT_FOUND,{success:true,message:"Task not found"})
          return

  }
   res.standardResponse(HttpStatus.OK,{success:true,message:"Task moved successfully",task})
          return

};
