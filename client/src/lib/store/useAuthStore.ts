/* eslint-disable @typescript-eslint/no-unused-vars */


import axiosInstance from "../services/api";
import { create } from "zustand";
import Cookies from "js-cookie";
import { Registerresponse, User } from "@/types/type";
import handleAsync from "../utils/handlingError";
import { promises } from "dns";
import { ParamValue } from "next/dist/server/request/params";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isSucces: boolean;
  registerVerifivcation: (otp: string, email: string) => Promise<Registerresponse | null>
  registeruser: (newuser: User) => Promise<Registerresponse | null>;
  loginUser: (credentials: {
    email: string;
    password: string;
  }) => Promise<Registerresponse | null>;
  logoutUser: () => Promise<Registerresponse | null>;
  forgotPassword: (value: string) => Promise<Registerresponse | null>;
  setLoading: (value: boolean) => void
  resendingOtp: (value: string) => Promise<Registerresponse | null>
  googleAuthLogin: (value: string) => Promise<Registerresponse | null>
  setUser: (user: User | null) => void;
  resetpassword:(password:string,token:string|null)=>Promise<Registerresponse|null>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  isSucces: false,
  setUser: (user: User | null) => set({ user }),



  registeruser: async (newuser: User) => {
    set({ loading: true, error: null });

    const result = await handleAsync(async () => {
      const response = await axiosInstance.post('/auth/signup', newuser);
      return response.data;

    });
    if (result) {

      return result
    } else {
      set({ error: "Registration failed", loading: false, isSucces: false });
      return null
    }

  },
  setLoading: (loading: boolean) => set({ loading }),

  registerVerifivcation: async (otp: string, email: string) => {
    console.log("otp", otp);

    set({ loading: true, error: null });
    const result = await handleAsync(async () => {
      const response = await axiosInstance.post("/auth/otpverification", { otp, email })
      return response.data;

    });
    if (result) {
      const { user, token, refreshtoken } = result;
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("refreshtoken", refreshtoken, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });
      set({ user, loading: false, isSucces: true });
      return result
    } else {
      set({ error: "Registration failed", loading: false, isSucces: false });
      return null
    }

  },


  loginUser: async ({ email, password }) => {
    set({ loading: true, error: null });

    try {
      const result = await handleAsync(async () => {
        const response = await axiosInstance.post("/auth/login", {
          email,
          password,
        });
        return response.data

      });
      if (result) {

        const { user, token, refreshtoken } = result;

        console.log("user/", user);


        localStorage.setItem("user", JSON.stringify(user))

        Cookies.set("token", token, { expires: 7 });
        Cookies.set("refreshtoken", refreshtoken, { expires: 7 });
        Cookies.set("user", JSON.stringify(user), { expires: 7 });
        set({ user, loading: false, isSucces: true });
        const as = Cookies.get("user") ? JSON.parse(Cookies.get("user") || "null") : null
        console.log("as", as);

        return result
      } else {
        set({ error: "login failed", loading: false, isSucces: false });
        return null
      }

    } catch (error) {
      console.error("Error logging in:", error);
      set({
        error: "Login failed. Please check your credentials.",
        loading: false,
        isSucces: false,
      });
    }
  },
  logoutUser: async () => {
    set({ loading: true, error: null });
    const result = await handleAsync(async () => {
      const response = await axiosInstance.post("/auth/logout")
      return response.data;

    });
    if (result) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      Cookies.remove("user");
      Cookies.remove("token");
      Cookies.remove("refreshtoken");
      set({ user: null, loading: false, isSucces: true });
      return result
    } else {
      set({ error: "Registration failed", loading: false, isSucces: false });
      return null
    }

  },

  forgotPassword: async (email: string) => {
    set({ loading: true, error: null });
    const result = await handleAsync(async () => {
      const response = await axiosInstance.post("/auth/forgotpassword", { email: email })
      return response.data;

    });
    if (result) {


      set({ loading: false, isSucces: true });
      return result
    } else {
      set({ error: "Registration failed", loading: false, isSucces: false });
      return null
    }

  },
  resetpassword: async (password: string, token: string|null) => {
    set({ loading: true, error: null });
    const result = await handleAsync(async () => {
      console.log("d",token);
      
      const result = await axiosInstance.post(`/auth/resetpassword?token=${token}`, {newPassword:password, token:token })
      return result.data
    });
    if (result) {

      set({ loading: false, isSucces: true });
      return result
    } else {
      set({ error: "Registration failed", loading: false, isSucces: false });
      return null
    }
  },

  resendingOtp: async (email: string) => {
    set({ loading: true, error: null })
    const result = await handleAsync(async () => {
      const response = await axiosInstance.post("/auth/resendotp", { email: email })
      return response.data
    })

    if (result) {
      set({ loading: false, isSucces: true })
      return result
    } else {
      set({ error: "Registration failed", loading: false, isSucces: false })
      return null
    }
  },
  googleAuthLogin: async (accessToken: string) => {
    set({ loading: true, error: null });

    const result = await handleAsync(async () => {
      const response = await axiosInstance.post("/auth/googlelogin", {
        token: accessToken,
      });
      return response.data;
    });

    if (result) {
      const { user, token, refreshtoken } = result;
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("refreshtoken", refreshtoken, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });
      set({ user, loading: false, isSucces: true });
      return result;
    } else {
      console.log("erros");

      set({ error: "Google login failed", loading: false, isSucces: false });
      return null;
    }
  },



}))














