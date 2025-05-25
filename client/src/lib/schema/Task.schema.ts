import * as Yup from "yup";

export const taskSchema=Yup.object({
    name:Yup.string()
   .required("name is required"),
   status:Yup.string()
   .required("status is required")
})