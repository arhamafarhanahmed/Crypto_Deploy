"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import "../index.css"

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8005"

const Loginpage = () => {
  const { login } = useAuth()
  const [mode, setMode] = useState("login") // 'login', 'register', 'changePassword'
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    currentPassword: "",
    newPassword: "",
  })
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
    currentPassword: false,
    newPassword: false,
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    setError("")
    setSuccess("")
  }

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      let endpoint = "/login"
      let body = {
        email: formData.email,
        password: formData.password,
      }
      let headers = {
        "Content-Type": "application/json",
      }

      if (mode === "register") {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords don't match")
        }
        endpoint = "/register"
        body = {
          email: formData.email,
          password: formData.password,
        }
      } else if (mode === "changePassword") {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error("New passwords don't match")
        }
        endpoint = "/change-password"
        body = {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        }

        // Get token for change password
        const token = localStorage.getItem("token")
        if (!token) {
          navigate("/login")
          setMode("login")
          setError("Please login first, then try changing password")
          return
        }
        headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }

      console.log("Making request to:", `${BASE_URL}${endpoint}`)
      console.log("Request body:", body)

      const response = await fetch(`${BASE_URL}/api/auth${endpoint}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      })

      const data = await response.json()
      console.log("Server response:", data)

      // Check if response indicates an error
      if (!response.ok || data.status === "error") {
        console.error("Login error details:", { status: response.status, data })
        const errorMessage = data.message || "Operation failed"
        throw new Error(errorMessage)
      }

      if (mode === "changePassword") {
        setSuccess("Password changed successfully! Please login with your new password.")
        setMode("login")
        setFormData({
          ...formData,
          password: "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
        // Clear token after password change to force re-login
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      } else {
        // Get token and user from response
        const token = data.data && data.data.token
        const userData = data.data && data.data.user

        if (!token || !userData) {
          console.error("Invalid response format:", data)
          throw new Error("Authentication failed - Invalid server response")
        }

        console.log("Login successful, user data:", userData)
        console.log("Token received:", token)

        // Use context to store auth data
        login(userData, token)

        // Navigate to dashboard
        navigate("/dashboard", { replace: true })
      }
    } catch (err) {
      console.error("Operation error:", err)
      setError(err.message || "Operation failed")
    } finally {
      setLoading(false)
    }
  }

  const renderPasswordInput = (name, placeholder, value) => (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={showPassword[name] ? "text" : "password"}
        required
        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white bg-white/10 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={loading}
      />
      <button
        type="button"
        onClick={() => togglePasswordVisibility(name)}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 focus:outline-none"
      >
        {showPassword[name] ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  )

  const getTitle = () => {
    switch (mode) {
      case "register":
        return "Create Account"
      case "changePassword":
        return "Change Password"
      default:
        return "Welcome Back"
    }
  }

  const getDescription = () => {
    switch (mode) {
      case "register":
        return "Register to access your crypto wallet"
      case "changePassword":
        return "Change your account password"
      default:
        return "Login to access your crypto wallet"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl">
        <div>
          <h1 className="text-center text-4xl font-bold text-purple-400">XWALLET</h1>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">{getTitle()}</h2>
          <p className="mt-2 text-center text-sm text-gray-300">{getDescription()}</p>
        </div>

        {success && (
          <div className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded relative">
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {mode !== "changePassword" && (
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white bg-white/10 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            )}

            {mode === "changePassword" ? (
              <>
                {renderPasswordInput("currentPassword", "Current Password", formData.currentPassword)}
                {renderPasswordInput("newPassword", "New Password", formData.newPassword)}
                {renderPasswordInput("confirmPassword", "Confirm New Password", formData.confirmPassword)}
              </>
            ) : mode === "register" ? (
              <>
                {renderPasswordInput("password", "Password", formData.password)}
                {renderPasswordInput("confirmPassword", "Confirm Password", formData.confirmPassword)}
              </>
            ) : (
              renderPasswordInput("password", "Password", formData.password)
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "login" ? "changePassword" : "login")
                  setFormData({
                    ...formData,
                    password: "",
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  })
                  setError("")
                  setSuccess("")
                }}
                className="font-medium text-purple-400 hover:text-purple-500"
              >
                {mode === "login" ? "Change Password?" : "Back to Login"}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading
                ? mode === "register"
                  ? "Registering..."
                  : mode === "changePassword"
                    ? "Changing Password..."
                    : "Logging in..."
                : mode === "register"
                  ? "Register"
                  : mode === "changePassword"
                    ? "Change Password"
                    : "Login"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-300">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "register" : "login")
                setFormData({
                  ...formData,
                  password: "",
                  confirmPassword: "",
                })
                setError("")
                setSuccess("")
              }}
              className="font-medium text-purple-400 hover:text-purple-500"
            >
              {mode === "login" ? "Register now" : "Login here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Loginpage
