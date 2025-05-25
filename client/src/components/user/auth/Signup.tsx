/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { signupSchema } from "@/lib/schema/auth.schema";
import { User } from "@/types/type";
import { useRouter } from "next/navigation";

import { useLoadingBar } from "react-top-loading-bar";
import OtpModal from "@/ui/otp";
import { Label } from "../../ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/buttons";
import { Spinner } from "@/ui/spinner";
import Image from "next/image";
import { handleGooleLogin } from "@/lib/services/googleAuth";
import googleIMG from "../../../Assets/google-icon.svg"
import ReCAPTCHA from "react-google-recaptcha";
import { env } from "@/configs/env";

const Signup = () => {
  const router = useRouter()
  const { registeruser, loading, setLoading, error, registerVerifivcation, googleAuthLogin, resendingOtp } = useAuthStore();
  const { start, complete } = useLoadingBar();
  const [isMounted, setIsMounted] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState<string>("")
  const [timer, setTimer] = useState<number>(60);
  const [captchaStatus,setCaptchaStatus]=useState(false)
  const [captchaToken,setCaptchaToken]=useState("")

  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };

  const gooleLogin = async () => {
    // start()
    const result = await handleGooleLogin()
    if (result) {
      const { accessToken } = result

      const googleResult = await googleAuthLogin(accessToken)
      console.log("outwork", googleResult);
      if (googleResult?.success) {
        console.log("work", googleResult);

        router.push("/user/home")
        // setSpinning(false)
        // complete()
      }
    }

  }

  const handleverifyOtp = async () => {
    start()
    setSpinning(true)
    const verificationResult = await registerVerifivcation(otp, email)
    console.log("verificationResult", verificationResult);

    if (verificationResult?.success) {

      router.push("/user/home")
      setSpinning(false)
      complete()
      setTimer(0)
    } else {
      setSpinning(false)
      complete()
      setTimer(0)
    }

  }
  useEffect(() => {
    if (!open) {
      setLoading(false)
    }
    setIsMounted(true);
  }, [open, setLoading]);


  const resendOtp = async () => {

    console.log("hello");

    const resendotp = await resendingOtp(email)

    console.log("resendotp", resendotp);

    if (resendotp?.success) {
      alert("otp recived")
      setTimer(60)
    }


  }

  

const captchSuccess = (token: string | null) => {
  if (token) {
    setCaptchaToken(token);
    setCaptchaStatus(true);
    formik.setFieldValue("captcha", true);
  } else {
    setCaptchaToken("");
    setCaptchaStatus(false);
    formik.setFieldValue("captcha", false);
  }
};
  const formik = useFormik<User>({
    initialValues: {
      email: "",
      password: "",
      repassword: "",
      _id: "",
      captcha:false
    },
    validationSchema: signupSchema,
    onSubmit: async (values, { resetForm }) => {

   if (!captchaStatus || !captchaToken) {
    formik.setFieldTouched("captcha", true);
    return;
  }
      start()
      const { repassword, ...userData } = values;
      const registration = await registeruser(userData);

      if (registration?.otp) {
        setEmail(registration.email)
        setOpen(true)
        complete()
      } else {
        complete()
      }

      resetForm();
    },
  });
  if (!isMounted) return null;
  return (
    <div className="min-h-screen bg-[#161616] flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        <div className="flex flex-col items-center">
          <h2 className="text-white text-2xl font-semibold">Create new Account</h2>
          <p className="text-gray-400 mt-1">Your journey to better habits starts here</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-6 bg-transparent">

          <Label htmlFor="email">
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


          <Label htmlFor="password">
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


          <Label className="text-sm text-gray-300 block mb-1 mt-4" htmlFor="repassword">
            RE-ENTER PASSWORD <span className="text-red-500">*</span>
          </Label>
          <Input
            id="repassword"
            name="repassword"
            type="password"
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repassword}

          />
          {formik.touched.repassword && formik.errors.repassword && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.repassword}</p>
          )}


          <div style={{ transform: 'scale(0.85)', transformOrigin: '0 0' }} className="mt-3 flex justify-start">
            <ReCAPTCHA
             id="captcha"
            
            
              sitekey={env.CATCHA_SITE_KEY!}
              onChange={captchSuccess}
            />
          

          </div>
            {formik.touched.captcha && formik.errors.captcha && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.captcha}</p>
          )}

          <Button
            type="submit"
            variant={"blue"}
            rounded={"md"}
            disabled={loading}
            className="flex justify-between"
          >
            Sign Up
            <span > {loading && <Spinner />}</span>
          </Button>
        </form>
<div className="flex items-center my-4">
  <hr className="flex-grow border-t border-gray-300" />
  <span className="mx-4 text-gray-500">or</span>
  <hr className="flex-grow border-t border-gray-300" />
</div>
        <Button
          onClick={gooleLogin}
          variant={"google"}
          rounded={"md"}
          type="submit"
          disabled={loading}
          className="flex justify-between mt-5 text-white "
        >
          Continue with Google
          <Image src={googleIMG} width={20} height={20} alt="google" />
          {/* <span > {loading&&<Spinner/>}</span> */}
        </Button>


        {/* Error from store */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}


        <p className="text-center text-gray-300 text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Sign In
          </a>
        </p>

        <p className="text-center text-gray-500 text-xs mt-6">
          By continuing, you agree to our{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
      <OtpModal
        open={open}
        otp={otp}
        spinning={spinning}
        onClose={() => setOpen(false)}
        onChange={handleChange}
        onVerify={handleverifyOtp}
        resendOtp={resendOtp}
        setTimer={setTimer}
        timer={timer}
      />
    </div>
  );
};

export default Signup;
