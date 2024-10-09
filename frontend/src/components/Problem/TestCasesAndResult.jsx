import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";
import TestCase from "./TestCase";
import TestResult from "./TestResult";

export default function TestCasesAndResult({ testcases, submissionResult, focusedTab, setFocusedTab}) {

  return (
    <div className="font-sans flex flex-col">
      <nav className="bg-case-bg-code px-3.5 py-1.5 text-sm flex items-center gap-2 rounded-t-lg">
        <button
          className={`flex justify-center items-center gap-2 py-0.5 ${focusedTab === "testcase" ? "opacity-100" : "opacity-50"}`}
          onClick={() => {
            setFocusedTab("testcase");
          }}
        >
          <FontAwesomeIcon
            icon={faSquareCheck}
            className="text-testcase-green"
          />
          Testcase
        </button>
        <span className="text-gray-400">|</span>
        <button
          className={`flex justify-center items-center gap-2 py-0.5 ${focusedTab === "testresult" ? "opacity-100" : "opacity-50"}`}
          onClick={() => {
            setFocusedTab("testresult");
          }}
        >
          <FontAwesomeIcon icon={faTerminal} className="text-testcase-green" />
          Test Result
        </button>
      </nav>
      <main>{focusedTab === "testcase" ? <TestCase testcase={testcases}/> : <TestResult submissionResult={submissionResult}/>}</main>
    </div>
  );
}
