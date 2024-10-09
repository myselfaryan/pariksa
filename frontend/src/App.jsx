import Home from "./pages/Home";
import Problemset from "./pages/Problemset";
import { Routes, Route } from "react-router-dom";
import Problem from "./pages/Problem.jsx";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import User from "./pages/User.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { LoggedInContext } from "./context/LoggedInContext.jsx";
import Decks from "./pages/Decks.jsx";
import CreateProblem from "./pages/CreateProblem.jsx";

// componenet
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("auth_token") ? true : false,
  );

  return (
    <>
      <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problemset" element={<Problemset />} />
          <Route path="/problemset/:problemid" element={<Problem />} />
          <Route path="/createproblem" element={<CreateProblem />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/decks" element={<Decks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition:Bounce
        />
      </LoggedInContext.Provider>
    </>
  );
}

export default App;
