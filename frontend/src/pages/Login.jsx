import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import { LoggedInContext } from "@/context/LoggedInContext";

function SignIn() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoggedInContext);

  useEffect(() => {
    if (isLoggedIn) {
      toast.info("Already logged in, redirecting...");
      setTimeout(() => {
        navigate("/user");
      }, 1000);
    }
  }, [isLoggedIn]);

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post(import.meta.env.VITE_API_URL + "/login", data)
      .then((response) => {
        if (response.data?.token) {
          localStorage.setItem("auth_token", response.data?.token);
          setIsLoggedIn(true);
          toast.success("Login Successful");
          navigate("/user");
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.response.data.message);
      });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Don&pos;t have an account?{" "}
            <a href="/signup" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
export default function Login() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <SignIn />
    </div>
  );
}