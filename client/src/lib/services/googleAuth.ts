
"use client"
import { auth, db } from "@/configs/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";


const provider=new GoogleAuthProvider()
 export  const handleGooleLogin=async()=>{
try {
 await signInWithPopup(auth,provider);
  const user=auth.currentUser

  if(user){
    const userDockRef=doc(db,"users",user.uid);
    const userDockSnapshort=await getDoc(userDockRef)
    if(!userDockSnapshort.exists()){
            await setDoc(userDockRef,{
              userId:user.uid,
              email:user.email
            }) 
    }

    const accessToken=await user.getIdToken()
    return {user,accessToken}

  }


} catch (error) {
  console.log(error);
  
}
  }