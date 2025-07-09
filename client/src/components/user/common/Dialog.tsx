/* eslint-disable react-hooks/exhaustive-deps */

"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSpaceStore } from "@/lib/store/useSpaceStore";
import { WorkSpace } from "@/types/type";
import { Spinner } from "@/ui/spinner";

import { useFormik } from "formik";
import { useEffect, useState } from "react";
type DialogProps={
    animationKey?: number;
    toggleIcom:React.ReactNode;
    id:string|null
}
export function DialogDemo({ animationKey=0,toggleIcom,id=null }:DialogProps) {
    const { createSpace,sploading,findWorkSpacesById} = useSpaceStore()
    const [space,setSpace]=useState<Pick<WorkSpace ,"name"|"description">|null>(null)

    

useEffect(()=>{
findSpace()
},[id])
const findSpace=async()=>{
    if(id){
 const spaces= await findWorkSpacesById(id)
 if(spaces?.success){
   setSpace(spaces.workspace)
 }
}
}

const [open, setOpen] = useState(false);
    const formik = useFormik<Pick<WorkSpace ,"name"|"description">>({
        initialValues: {
            name: space?.name||"New Work space",
            description:space?.description|| "",
        },
        validationSchema: "",
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {

            const spaceCreated = await createSpace(values)
            
            if (spaceCreated?.success) {
              resetForm()
              setOpen(false);
            }


        },
    })


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button key={animationKey} className="text-white me-5   cursor-pointer animate__animated animate__headShake">{toggleIcom}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-black">
                <DialogHeader>
                    <DialogTitle> {!id?"Create new space":"Update space"}</DialogTitle>
                    <DialogDescription>
                       Spaces are where you can organize your work. Create a space for a team, project, or anything you like!!
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={formik.handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                // defaultValue="New Workspace"
                                className="col-span-3"

                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                description
                            </Label>
                            <Input
                                id="description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                // defaultValue=""
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex justify-between ">
<div className="bg-blue-900 ">
     <Button className="text-red-900" type="submit">{sploading?<Spinner/>:!id?"Create":"Update"}</Button>
</div>
               <div className="bg-red-900">
                         <DialogClose asChild>
                            <Button className="text-red-900">Cancel</Button>
                        </DialogClose>
                        <Button className="text-green-900" type="submit">{sploading?<Spinner/>:!id?"Create":"Update"}</Button>
               </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
