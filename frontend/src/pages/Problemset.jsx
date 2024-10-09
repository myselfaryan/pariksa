import { useState, useEffect } from "react";
import ProblemsTable from "../components/Problemset/ProblemsTable";
import Navbar from "../components/Navbar/Navbar";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import "react-day-picker/style.css";
import axios from "axios";

export default function Problemset() {
  const [problems, setproblems] = useState([]);
  const [selected, setSelected] = useState(new Date());
  const defaultClassNames = getDefaultClassNames();

  useEffect(() => {
    async function fetchProblems() {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/problemset");
      const json = await res.data;
      // console.log(
      //   "axios get url: " + import.meta.env.VITE_API_URL + "/problemset",
      // );
      // console.log("axios got: ", res.data);
      setproblems(json.problems);
    }

    fetchProblems();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-body-bg overflow-hidden">
      <Navbar />
      <main className="w-screen h-screen flex lg:flex-row md:flex-row flex-col text-sm text-main-text-color lg:justify-center md:justify-center lg:my-12 md:my-12">
        <div className="flex flex-col items-center md:mx-4 my-10 lg:my-0 md:my-0 lg:w-auto md:w-1/2">
          <div className="w-full bg-secondary-body-bg px-8 py-2.5 my-6 rounded-lg flex flex-shrink justify-between items-center">
            <input
              placeholder="Search"
              className="py-0.5 px-4 rounded-sm bg-main-text-color font-bold text-black w-80 placeholder:text-black md:w-1/2"
            />
            <button className="flex justify-center items-center gap-2 font-bold lg:mx-0 md:mx-0 mx-4">
              <FontAwesomeIcon icon={faShuffle} className="w-5 h-5" />
              RANDOM
            </button>
          </div>
          <div id="problems-wrapper" className="flex justify-center">
            <ProblemsTable problems={problems} />
          </div>
        </div>

        {/*calander with streak*/}
        <div className="relative lg:left-10 md:left-2 flex lg:block md:block justify-center">
          <DayPicker
            mode="single"
            classNames={{
              today: `font-bold text-catppuccin-red`,
              root: `${defaultClassNames.root} lg:px-3 lg:py-5 md:px-1.5 md:py-1 bg-secondary-body-bg rounded-md`,
            }}
            selected={selected}
            onSelect={setSelected}
            footer={`Streak: ${0}`}
            // set a simple function which would retrive streak from the db(gotta make that route no the db a well)
            onDayClick={(day) => {
              console.log(day.getDate());
            }}
          />
        </div>
      </main>
    </div>
  );
}
