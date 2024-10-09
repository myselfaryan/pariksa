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
      .post(import.meta.env.VITE_API_URL + "/signup", data)
      .then((response) => {
        // if (response.data?.token)
        {
          // localStorage.setItem("auth_token", response.data?.token);
          // setIsLoggedIn(true);
          toast.success("SignUp Successful");
          navigate("/login");
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
          <CardTitle>Sign Up</CardTitle>
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
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Don&pos;t have an account?{" "}
            <a href="/login" className="text-primary hover:underline">
              Sign In
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
export default function Signup() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <SignIn />
    </div>
  );
}

/*
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoggedInContext } from "../context/LoggedInContext";
import Navbar from "../components/Navbar/Navbar";

export default function Signup() {
  const { isLoggedIn } = useContext(LoggedInContext);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmpwd, setConfirmPwd] = useState("");
  const [passwordMatches, setPasswordMatches] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      toast.info("Already logged in redirecting...");
      setTimeout(() => {
        navigate("/user");
      }, 1000);
      return;
    }

    confirmpwd === data.password && data.password != ""
      ? setPasswordMatches(true)
      : setPasswordMatches(false);
  }, [data.password, confirmpwd]);

  async function handleSignup(e) {
    e.preventDefault();

    // Now sending the data to backend via axios
    try {
      console.log(data);
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/signup",
        data,
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="flex justify-center">
        <div className="text-center mt-20 bg-navbar-boder pb-36 px-10 rounded-md">
          <h1 className="text-4xl my-16">Sign Up</h1>
          <form
            className="flex flex-col gap-y-6 items-center"
            onSubmit={handleSignup}
          >
            <input
              autoComplete="off"
              type="text"
              placeholder="Username"
              className="resize-none placeholder:main-dark border-2 border-main-dark rounded-md w-80 h-10 px-6"
              value={data.username}
              onChange={(e) => {
                setData({ ...data, username: e.target.value });
              }}
              required={true}
            />

            <input
              autoComplete="off"
              type="email"
              placeholder="E-mail address"
              className="resize-none placeholder:main-dark border-2 border-main-dark rounded-md w-80 h-10 px-6"
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
              required={true}
            />

            <input
              autoComplete="off"
              type="password"
              placeholder="Password"
              className="resize-none placeholder:main-dark border-2 border-main-dark rounded-md w-80 h-10 px-6"
              value={data.password}
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
              required={true}
            />

            <div className="relative w-full">
              <input
                id="confirmPassword"
                autoComplete="off"
                type="password"
                placeholder="Confirm password"
                className="resize-none placeholder:main-dark border-2 border-main-dark rounded-md h-10 px-6 w-full"
                value={confirmpwd}
                onChange={(e) => {
                  setConfirmPwd(e.target.value);
                }}
              />
              <label
                htmlFor="confirmPassword"
                className={
                  "absolute top-2 ml-2" + (passwordMatches ? " hidden" : "")
                }
              >
                <span>
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="text-red-400"
                  />
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={passwordMatches ? false : true}
              className={
                "bg-main-dark w-4/12 py-2 rounded-sm mt-20  border-1 border-main-dark " +
                (passwordMatches
                  ? "opacity-100 hover:border-white"
                  : "opacity-75")
              }
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

*/