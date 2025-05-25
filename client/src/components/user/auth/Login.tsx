"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useLoadingBar } from "react-top-loading-bar";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { loginSchema } from "@/lib/schema/auth.schema";
import { User } from "@/types/type";
import {Label} from "../../ui/label"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/buttons";
import { Spinner } from "@/ui/spinner";
import googleIMG from "../../../Assets/google-icon.svg"
import Image from "next/image";
import { handleGooleLogin } from "@/lib/services/googleAuth";
const Login = () => {
  const router = useRouter();
  const { loginUser,forgotPassword,googleAuthLogin, loading, error } = useAuthStore();
  const { start, complete } = useLoadingBar();
  const [isMounted, setIsMounted] = useState(false);
  const [findFun,setFindFun]=useState("")


const gooleLogin=async()=>{
  setFindFun("google")
  const result=await handleGooleLogin()
    if(result){
      const {accessToken}=result
      const googleResult=await googleAuthLogin(accessToken)
 
      if(googleResult?.success){
     
       router.push("/user/home")
    
      }
    }
  
}
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formik = useFormik <Pick<User,"email"|"password"|"_id"|"repassword" >>({
    initialValues: {
      email: "",
      password: "",
      _id: "",
      repassword: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setFindFun("login")
      start();
      const result = await loginUser({ email: values.email, password: values.password });

      if (result?.success) {
        complete();
        router.push("/user/home");
      } else {
        complete();
      }
    },
  });

  if (!isMounted) return null;
  const handlForgotpassword=async()=>{
    await formik.setTouched({ email: true });
  const errors = await formik.validateForm();

  if (errors.email) return;
  const forgot=await  forgotPassword( formik.values.email )
  if(forgot?.success){
   console.log("forgot",forgot);
   
  }
  }

  return (
    <div className="min-h-screen bg-[#161616] flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        <div className="flex flex-col items-center">
          <h2 className="text-white text-2xl font-semibold">Welcome Back</h2>
          <p className="text-gray-400 mt-1">Log in to continue your journey</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-6 bg-transparent">
     
          <Label  htmlFor="email">
            EMAIL <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your-email@example.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
       
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}

      
          <Label  htmlFor="password">
            PASSWORD <span className="text-red-500">*</span>
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
     
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
          )}

       
          <Button
          variant={"blue"}
          rounded={"md"}
            type="submit"
            disabled={loading}
            className="flex justify-between "
          >
             Log In
           <span > {(loading&&findFun==="login")&&<Spinner/>}</span>
          </Button>
        </form>

        <Button
        onClick={gooleLogin}
          variant={"google"}
          rounded={"md"}
            type="submit"
            disabled={loading}
            className="flex justify-between mt-5 text-white "
          >
            Continue with Google
            <Image  src={googleIMG} width={20} height={20} alt="google"/>
           {/* <span > {loading&&<Spinner/>}</span> */}
          </Button>

      
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <div className=" flex flex-col items-end justify-start">

          <p className="text-center text-gray-300 text-xs mt-2 ">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-blue-400 text-xs hover:underline">
             signup
            </a>
          </p>
          <p className="text-center text-gray-300 text-xs">
            Forgot your password?{" "}
            <a onClick={handlForgotpassword} className="text-blue-400 text-xs hover:underline">
            forgotpassword
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
