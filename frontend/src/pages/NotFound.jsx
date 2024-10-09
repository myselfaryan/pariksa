import React from "react";
import Navbar from "../components/Navbar/Navbar";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center font-bold bg-body-bg h-dvh">
        404 NOT FOUND
      </div>
    </div>
  );
}
