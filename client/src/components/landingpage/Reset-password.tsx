
// "use client"
// import React, { useState } from 'react';
// import { Mail, Lock, Eye, EyeOff, Check } from 'lucide-react';

// const ResetPassword = () => {
//   const [email, setEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [step, setStep] = useState('email');

//   const passwordRequirements = [
//     { text: 'At least 8 characters', met: newPassword.length >= 8 },
//     { text: 'One uppercase letter', met: /[A-Z]/.test(newPassword) },
//     { text: 'One lowercase letter', met: /[a-z]/.test(newPassword) },
//     { text: 'One number', met: /\d/.test(newPassword) },
//     { text: 'One special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) }
//   ];

//   const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;
//   const allRequirementsMet = passwordRequirements.every(req => req.met);

//   const handleEmailSubmit = async () => {
//     if (!email) return;
//     setIsLoading(true);
//     await new Promise(resolve => setTimeout(resolve, 1500));
//     setIsLoading(false);
//     setStep('password');
//   };

//   const handlePasswordReset = async () => {
//     if (!allRequirementsMet || !passwordsMatch) return;
    
//     setIsLoading(true);
//     await new Promise(resolve => setTimeout(resolve, 2000));
//     setIsLoading(false);
//     alert('Password reset successfully!');
//   };

//   const handleKeyPress = (e, action) => {
//     if (e.key === 'Enter') {
//       action();
//     }
//   };

//   if (step === 'email') {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
//         <div className="w-full max-w-md">
//           <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
//             <div className="text-center mb-8">
//               <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Lock className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
//               <p className="text-gray-600">Enter your email address to receive reset instructions</p>
//             </div>

//             <div className="space-y-6">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   onKeyPress={(e) => handleKeyPress(e, handleEmailSubmit)}
//                   placeholder="Enter your email address"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
//                 />
//               </div>

//               <button
//                 type="button"
//                 onClick={handleEmailSubmit}
//                 disabled={isLoading || !email}
//                 className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
//               >
//                 {isLoading ? (
//                   <div className="flex items-center justify-center">
//                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
//                     Sending...
//                   </div>
//                 ) : (
//                   'Send Reset Link'
//                 )}
//               </button>
//             </div>

//             <div className="mt-6 text-center">
//               <p className="text-sm text-gray-600">
//                 Remember your password?{' '}
//                 <button className="text-indigo-600 hover:text-indigo-500 font-semibold transition-colors">
//                   Sign in
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
//           <div className="text-center mb-8">
//             <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Check className="w-8 h-8 text-white" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Password</h2>
//             <p className="text-gray-600">Enter your new password below</p>
//           </div>

//           <div className="space-y-6">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 placeholder="New password"
//                 className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
//                 ) : (
//                   <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
//                 )}
//               </button>
//             </div>

//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 onKeyPress={(e) => handleKeyPress(e, handlePasswordReset)}
//                 placeholder="Confirm new password"
//                 className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//               >
//                 {showConfirmPassword ? (
//                   <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
//                 ) : (
//                   <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
//                 )}
//               </button>
//             </div>

//             {newPassword && (
//               <div className="bg-gray-50 rounded-xl p-4">
//                 <h4 className="text-sm font-semibold text-gray-700 mb-3">Password Requirements:</h4>
//                 <div className="space-y-2">
//                   {passwordRequirements.map((req, index) => (
//                     <div key={index} className="flex items-center text-sm">
//                       <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
//                         req.met ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'
//                       }`}>
//                         {req.met && <Check className="w-3 h-3" />}
//                       </div>
//                       <span className={req.met ? 'text-green-600' : 'text-gray-500'}>
//                         {req.text}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {confirmPassword && (
//               <div className={`text-sm ${passwordsMatch ? 'text-green-600' : 'text-red-500'}`}>
//                 {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
//               </div>
//             )}

//             <button
//               type="button"
//               onClick={handlePasswordReset}
//               disabled={isLoading || !allRequirementsMet || !passwordsMatch}
//               className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center">
//                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
//                   Resetting Password...
//                 </div>
//               ) : (
//                 'Reset Password'
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;