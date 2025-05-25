
"use client"
import React, { useState } from 'react';
import { useFormik } from 'formik';

import { Eye, EyeOff, Check } from 'lucide-react';
import { forgotPasswordSchema } from '@/lib/schema/auth.schema';

const ResetPasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Formik validation schema
  const validationSchema = forgotPasswordSchema;

  // Formik setup
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError('');
      
  
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Password reset:', values);
        // Add your password reset logic here
        setLoading(false);

    }
  });

  const passwordsMatch = formik.values.newPassword === formik.values.confirmPassword && formik.values.confirmPassword.length > 0;

  return (
    <div className="min-h-screen bg-[#161616] flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        <div className="flex flex-col items-center">
          <h2 className="text-white text-2xl font-semibold">Reset Password</h2>
          <p className="text-gray-400 mt-1">Enter your new password</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-6 bg-transparent">
          
          {/* New Password Field */}
          <label htmlFor="newPassword" className="block text-white text-sm font-medium mb-2">
            NEW PASSWORD <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="newPassword"
              name="newPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter new password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              className="w-full px-3 py-3 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</p>
          )}

          {/* Confirm Password Field */}
          <label htmlFor="confirmPassword" className="block text-white text-sm font-medium mb-2 mt-4">
            CONFIRM PASSWORD <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm new password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className="w-full px-3 py-3 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
          )}

          {/* Password Match Indicator */}
          {formik.values.confirmPassword && passwordsMatch && !formik.errors.confirmPassword && (
            <div className="flex items-center text-sm mt-2 text-green-400">
              <Check className="w-4 h-4 mr-2" />
              Passwords match
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-between items-center"
          >
            Reset Password
            <span>
              {loading && (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              )}
            </span>
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <div className="flex flex-col items-end justify-start">
          <p className="text-center text-gray-300 text-xs mt-2">
            Remember your password?{" "}
            <a href="/login" className="text-blue-400 text-xs hover:underline">
              login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordInput;