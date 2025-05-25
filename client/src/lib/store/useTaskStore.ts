import { create } from "zustand";
import handleAsync from "../utils/handlingError";
import axiosInstance from "../services/api";
import { Column, Task, TaskFormValues, WorkSpaceResponse } from "@/types/type";
import { UniqueIdentifier } from "@dnd-kit/core";

interface TaskState {
  isSuccess: boolean;
  taskLoading: boolean;
  error: string | null;
  tasks: Task[];
  list:Column[]

  createTasks: (spaceId:string|null,values:TaskFormValues,workspaceId:string) => Promise<WorkSpaceResponse|null>;
  getAllTask: (spaceId:string) => Promise<WorkSpaceResponse|null>;
  createList: (spaceId:string,listData:Pick<Column ,"name">) => Promise<WorkSpaceResponse|null>;
    swapTasks: ( activeId: UniqueIdentifier, overId: UniqueIdentifier ) => Promise<WorkSpaceResponse|null>;
  moveTaskToColumn: ( activeId: UniqueIdentifier ,overId: UniqueIdentifier ) => void;
}

export const useTaskeStore = create<TaskState>((set,get) => ({
  isSuccess: false,
  taskLoading: false,
  error: null,
  tasks: [],
  list:[],

  createTasks: async (spaceId:string|null,values:TaskFormValues,workspaceId:string) => {
    set({ taskLoading: true, error: null });


    const result = await handleAsync(async () => {
      const response = await axiosInstance.post(`/task/create/${spaceId}`,values);
      return response.data;
    });

    if (result) {
          set({ taskLoading: false, error: null });
      const get = await handleAsync(async () => {
        const response = await axiosInstance.get(`/task/${workspaceId}`);
        return response.data;
      });
      
     
      if (get) {

        
        set({ tasks: get.data.tasks || [], isSuccess: true });
        return get.data
      }
       return result.data
    }
    set({ taskLoading: false });
       return null
    
  },

  getAllTask:(async(spaceId:string)=>{
          set({ taskLoading: false, error: null });
      const get = await handleAsync(async () => {
        const response = await axiosInstance.get(`/task/${spaceId}`);
        return response.data;
      });
      
     
      if (get) {
 
        
        set({  taskLoading: false,tasks: get.data.tasks || [], isSuccess: true });
        return get.data
      }
      set({ taskLoading: false, tasks: get.data.tasks || [],  });
      return null

  }),
  createList:async(spaceId:string,listData:Pick<Column,"name">)=>{
     set({ taskLoading: true, error: null });
    const lists=await handleAsync(async()=>{
      const response=await axiosInstance.post(`/list/${spaceId}`,listData)
      return response.data
    })
    if(lists){
     
      set({list:lists.data, taskLoading: false, error: null });
      return lists.data
    }
    set({ taskLoading: false, error: null });
    return null
  },
  swapTasks: async( activeId:UniqueIdentifier, overId:UniqueIdentifier ) => {
     set({ taskLoading: true, error: null });
     console.log("activeId",activeId);
     console.log("overId",overId);
     

     const result=await handleAsync(async()=>{
      const response=await axiosInstance.patch(`/task/${activeId}/${overId}`)
      return response.data.data
     })
     if(result){
          set({  taskLoading: false, isSuccess: true });
          return result
     }
      set({  taskLoading: false, error:null});
      return null

  },

  moveTaskToColumn: ( activeId:UniqueIdentifier, overId:UniqueIdentifier ) => {
    const updatedTasks = get().tasks.map((task) =>
      task._id === activeId ? { ...task, columnId: overId } : task
    );
    set({ tasks: updatedTasks });
  }



}));