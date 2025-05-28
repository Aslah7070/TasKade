

export interface User {
    _id: string;
    username?: string;
    email: string;
    password: string;
    repassword?:string;
    profilePicture?:string,
    captcha?:boolean
 
  }
  export type Task = {
  spaceId: string;
  _id: string;
  error:null
  taskLoading:boolean
  name: string;
  tasks:string[]
  description: string;
  assignedTo: string[];
  dueDate?: string;
  priority?: string;
  listId: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  color?:{
    bg:string
    text:string
  }
  status?: string;
};
export interface Column{
  description:string
lists:string[];
name:string;
workspaceId:string;
  color?:{
    bg:string
    text:string
  }
_id:string


}
export type TaskFormValues = {
  name?: string;
  description?: string;
  assignedTo?: string[];
  dueDate?: string;
  priority?: string;
  listId?: string;
  status?:string
};


  export interface Registerresponse{
    otp:boolean
    success:boolean
    user:User
    email:string
  }
    export interface  WorkSpace{
   _id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: User;
  members: string[];
  pendingMembers: string[];
  spaces: string[];
  visibility: 'private' | 'public';
 
  }
    export interface WorkSpaceResponse{
    name: string;
    workspace:WorkSpace
    success:boolean
    activeWorkspaces:WorkSpace[]
    pendingWorkspaces:string[]
    newSpace:WorkSpace
    space:Pick<TaskFormValues,"name">[];

  }


export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
