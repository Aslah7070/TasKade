/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/buttons"
import OutsideClickHandler from 'react-outside-click-handler';
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textArea"
import { useFormik } from "formik"
import { SelectDropdown } from "../user/common/Select"
import SearchDropdown from "./SearchDropDown"
import { Check, ChevronsUpDown } from "lucide-react"
import DueDatePicker from "./date-picker";
import { useTaskeStore } from "@/lib/store/useTaskStore";
import { TaskFormValues } from "@/types/type";
import StatusSelector from "./status-selector";
import { taskSchema } from "@/lib/schema/Task.schema";
import { Spinner } from "@/ui/spinner";
type DialogProps={
    animationKey?: number;
    toggleIcom:React.ReactNode;
    id:string|null,
    workspaceId:string
}
const options = [
  {
    label: "Low",
    value: "low",
    color: { bg: "bg-green-500", text: "text-green-500" },
  },
  {
    label: "Medium",
    value: "medium",
    color: { bg: "bg-yellow-500", text: "text-yellow-500" },
  },
  {
    label: "High",
    value: "high",
    color: { bg: "bg-red-500", text: "text-red-500" },
  },
];



export const CreateTask=({ animationKey=0,toggleIcom,id,workspaceId }:DialogProps)=>{
  const spaceId=id
   const [open, setOpen] = useState(false);
  const [opens,selectOpen]=useState(false)
  const {createTasks,taskLoading}=useTaskeStore()
  const [selectedPriority, setSelectedPriority] = useState("medium");
const [status,setStatus]=useState("")
const [dueDate,setDueDate]=useState(new Date())

  const handleSelect=useCallback((value:string)=>{
setStatus(value)
selectOpen(false)

},[])
  const handlePriorityChange = useCallback((value: string) => {
 
    setSelectedPriority(value);
  },[])



    const formik =useFormik<TaskFormValues>({
        initialValues:{
            name:"",
            description:"",
            status:"",
            dueDate:"",
           
        },
        validationSchema:taskSchema,
        onSubmit:async(values)=>{
          await new Promise((resolve)=>setTimeout(resolve,2000))
     const task=await createTasks(spaceId,values,workspaceId)

       if (task) {
        setOpen(false); 
        formik.resetForm()
      }
        }
    })
return (
    <Dialog  open={open} onOpenChange={setOpen} >
          <DialogTrigger asChild>
                <span key={animationKey}  className="text-white cursor-pointer animate__headShake">{toggleIcom}</span>
            </DialogTrigger>

            <DialogContent 
   
            className="bg-black h-[80vh] ">
             
                <DialogHeader className="  ">
   <DialogTitle>Create new Task</DialogTitle>
          <DialogDescription>
            Create a new Task in the selected space and list
          </DialogDescription>
                </DialogHeader>
       
        <form
          onSubmit={formik.handleSubmit}
          className="grid gap-4 py-12   relative max-h-[calc(100vh-20rem)]"
          id="create_task_form">
          <div className="grid sm:grid-cols-5 items-center sm:gap-2">
            <Label htmlFor="title" className="sm:text-right">
              Name
            </Label>
            <Input
              id="name"  
              name="name"
              placeholder="Task title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="col-span-4"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 col-start-2 col-span-3 text-xs">
                {formik.errors.name}
              </div>
            )}
          </div>

          <div className="grid sm:grid-cols-5 items-center sm:gap-2">
            <Label htmlFor="description" className="sm:text-right">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Task description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className="col-span-4"
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 col-start-2 col-span-3 text-xs">
                {formik.errors.description}
              </div>
            )}
          </div>
 
  <OutsideClickHandler 
   onOutsideClick={() => {
       selectOpen(false)
      }}
  >
    {
  opens&& <SearchDropdown handleSelect={handleSelect}/>
  }
  </OutsideClickHandler>

            
           
          <div className="flex justify-between items-center  gap-2">
            <div>
              <DueDatePicker
                dueDate={formik.values.dueDate}
                setDueDate={(date: string) =>
                  formik.handleChange({ target: { name: "dueDate", value: date } })
                }
              />
              {formik.touched.dueDate && formik.errors.dueDate && (
                <div className="text-red-500 col-start-2 col-span-3 text-xs">
                  {formik.errors.dueDate}
                </div>
              )}
            </div>
            <div>
              <p >Priority</p>
              
              <SelectDropdown options={options}   onChange={handlePriorityChange} value={selectedPriority} />
            </div>
            <div className="">
              <p>Status</p>
             <StatusSelector
                workspaceId={workspaceId}
                status={formik.values.status}
                setStatus={(status) =>
                  formik.handleChange({ target: { name: "status", value: status } })
                }
              />
              {/* <Button onClick={()=>selectOpen(!open)} className="rounded-sm w-32 flex justify-end  text-end " variant={"outline"}>{status} <ChevronsUpDown/></Button> */}
            
          
            </div>
          </div>
        
        </form>

        <DialogFooter>
          
          {formik.touched.status && formik.errors.status && (
            <p className="text-sm text-left text-red-500">{formik.errors.status}</p>
          )}
          <DialogClose asChild>
            <Button
            className="text-red-500"
            variant="ghost" >
              Cancel
            </Button>
          </DialogClose>
          <Button
          className="text-green-500"
            form="create_task_form"
            type="submit"
          >
            { !taskLoading?"Create Task":<Spinner/>}
          </Button>
        </DialogFooter>

            </DialogContent>
    </Dialog>
)
}