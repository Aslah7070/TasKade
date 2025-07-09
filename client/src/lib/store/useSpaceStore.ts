import { create } from "zustand";
import axiosInstance from "../services/api";
import handleAsync from "../utils/handlingError";
import { Column, WorkSpace, WorkSpaceResponse } from "@/types/type";
import { colors } from "@/components/task-form/column-listing";

interface SpaceState {
    isSucces: boolean
    sploading: boolean,
    error: string | null,
    workSpace: WorkSpace[],
    space:WorkSpace|null,
    column:Column[],
    createSpace:(values:Pick<WorkSpace,"name"|"description">)=>Promise<WorkSpaceResponse|null>
    createColumn:(values:string,options:{name:string,color:{bg:string,text:string}})=>Promise<WorkSpaceResponse|null>
    findSpaceColumns:(value:string)=>Promise<WorkSpaceResponse|null>
    editColumn:(spaceId: string, color: colors)=>Promise<WorkSpaceResponse|null>
    deleteSpace:(value:string)=>Promise<WorkSpaceResponse|null>
    deleteWorkSpace:(value:string)=>Promise<WorkSpaceResponse|null>
    findWorkSpaces:()=>Promise<WorkSpaceResponse|null>
    findWorkSpacesById:(value:string)=>Promise<WorkSpaceResponse|null>
    getColumnById:(value:string|null)=>Promise<WorkSpaceResponse|null>
    sendInviteLink:(spaceId:string,email:string)=>Promise<WorkSpaceResponse|null>
}

export const useSpaceStore = create<SpaceState>((set) => ({
    isSucces: false,
    sploading: false,
    error: null,
    workSpace: [],
    space:null,
    column:[],



    createSpace: async (values) => {

        set({ sploading: true, error: null, })
        const result = await handleAsync(async () => {
            const response = await axiosInstance.post("/workspace/create",values)
            return response.data
        })

        if (result) {
            const spaces = await handleAsync(async () => {
                const response = await axiosInstance.get("/workspace/")
                return response.data
            })
            if (spaces) {
               
               const data= spaces.data.activeWorkspaces
                set({ workSpace:data, sploading: false, error: null })
                return spaces.data
            } else {
                set({ error: "space created failed", sploading: false, isSucces: false });
                return null
            }

        } else {
            set({ error: "space created failed", sploading: false, isSucces: false });
            return null
        }


    },
    findWorkSpaces:async()=>{  

        set({sploading:true,error:null})
        const result =await handleAsync(async()=>{
            const response=await axiosInstance.get("/workspace/")  
            return response.data.data
        })
        if(result){     
            set({workSpace:result.activeWorkspaces,sploading:false,error:null})
            return result
        }else{
              set({error:"space finding failed", sploading:false,isSucces: false})
              return null
        }
    },



     findWorkSpacesById:async(id:string)=>{  

        set({sploading:true,error:null})
        const result =await handleAsync(async()=>{
            const response=await axiosInstance.get(`/workspace/${id}`)  
            return response.data.data
        })
        if(result){     
            
            set({ space:result.workspace,sploading:false,error:null})
            return result
        }else{
              set({error:"space finding failed", sploading:false,isSucces: false})
              return null
        }
    },
    getColumnById:(async(spaceId:string|null)=>{
         set({sploading:true,error:null})
        const result=await handleAsync(async()=>{
            const response=await axiosInstance.get(`/space/${spaceId}`)
                    return response.data.data
        })
        if(result){

             set({sploading:false,error:null,isSucces:true})
            const  data= result
             return data
        }
         set({sploading:false,error:"space find failed"})
         return null
    }),


    createColumn:async(workspaceId:string,options?: { name?: string; color?:{bg:string,text:string} })=>{

         set({sploading:true,error:null})
         const result=await handleAsync(async()=>{
            const response=await axiosInstance.post(`/space/create?workspaceId=${workspaceId}`,options)
            return response.data
         })   
         if(result){
            console.log("result",result);
            
            const space=await handleAsync(async()=>{
                const response=await axiosInstance.get(`/space?workspaceId=${workspaceId}`)
                return response.data
            })
            if(space){
             
                const data=space.data.spaces
                
                 set({column:data, sploading:false,error:null})
             return result.data
            }
             set({ sploading:false,error:null})
             return null
         }      
    },

      findSpaceColumns:async(workspaceId:string)=>{
       set({sploading:true,error:null})
        const result =await handleAsync(async()=>{
            const columns=await axiosInstance.get(`/space/?workspaceId=${workspaceId}`)
            const data=columns.data
            
            return data
        })

        if(result){

            const data=result.data.spaces
               set({column:data, sploading:false,error:null})
            return data

        }
   set({ sploading:false,error:null})
             return result
      },

      deleteSpace:async(spaceId:string)=>{
        set({sploading:true,error:null})
          const space=await handleAsync(async()=>{
            const response=await axiosInstance.delete(`/space/${spaceId}`)
             return response.data
          })
          if(space){
            
            
               set({sploading:false,error:null})
               return space.data
          }
           set({sploading:false,error:null})
           return null
      },
      
      deleteWorkSpace:async(workSpaceId:string)=>{
        set({sploading:true,error:null})
          const space=await handleAsync(async()=>{
            const response=await axiosInstance.delete(`/workspace/${workSpaceId}`)
             return response.data
          })
          if(space){
            
            
               set({sploading:false,error:null})
               return space.data
          }
           set({sploading:false,error:null})
           return null
      },

      editColumn:async(spaceId:string,color:colors)=>{
         set({sploading:true,error:null})
        const edited=await handleAsync(async()=>{
            const response=await axiosInstance.patch(`/space/${spaceId}`,{color})
            return response.data
        })
       
        
            if(edited){
         set({sploading:false,error:null})
               return edited.data
            }
            return null
      },

       sendInviteLink:async(spaceId:string,email:string)=>{
         set({sploading:true,error:null})
        const result=await handleAsync(async()=>{
             const response=await axiosInstance.post(`/list/sentinvintlink`,{spaceId,email})
             return response.data

        })
        if(result){
set({sploading:false,error:null})
return result.data
        }else{
            return null
        }
  

       } 
     


}))