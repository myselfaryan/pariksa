import { useState, useEffect } from "react";

export default function TestResult({ submissionResult }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (submissionResult) {
      setLoading(false);
    }
  }, [submissionResult]);

  /*
  {
      "id": "e85ad8a0-ca4a-4975-82f6-4185f7530ffd",
      "answer": "//Write your code here\nfunction solution(nums) {\n  return [0.1];\n}",
      "testCasesResult": "PENDING",
      "SubmissionStat": "PENDING",
      "usersId": "d17c1415-0c5a-45d4-916c-0f224d764f48",
      "problemsId": 1,
      "stdout": "PENDING",
      "stderr": "PENDING"
  }*/

  // in case the problem is malformed
  if (!loading) {
    if (JSON.parse(submissionResult.testCasesResult).execution_err) {
      // console.log(TestCasesResult)
      return (
        <div className="text-sm mx-5 my-4">
          <div className="flex flex-col w-full gap-2">
            <div className="bg-err-bg text-red-400 flex px-4 py-2 rounded-md whitespace-pre-wrap">
              {JSON.parse(submissionResult.testCasesResult).execution_err}
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="text-sm mx-5 my-4">
      {!loading ? (
        <div>
          {submissionResult.stderr !== "" ? (
            <ExecutionErr submissionResult={submissionResult} />
          ) : (
            <TestCasesResult submissionResult={submissionResult} />
          )}
        </div>
      ) : (
        <h1>Run your code to see the result</h1>
      )}
    </div>
  );
}

function ExecutionErr({ submissionResult }) {
  return (
    <div className="flex flex-col w-full gap-2">
      <h1 className="text-red-400 font-bold text-xl">
        {submissionResult.ExecutionStat}
      </h1>
      <div className="bg-err-bg text-red-400 flex px-4 py-2 rounded-md whitespace-pre-wrap">
        {submissionResult.stderr}
      </div>
    </div>
  );
}

function TestCasesResult({ submissionResult }) {
  const testCases = JSON.parse(submissionResult.testCasesResult);
  const [currentTestcase, setCurrentTestcase] = useState(0);

  return (
    <div className="flex flex-col">
      <h1
        className={`${submissionResult.ExecutionStat === "Accepted" ? "text-catppuccin-green" : "text-red-400"} font-bold text-xl pb-4`}
      >
        {submissionResult.ExecutionStat}
      </h1>
      <nav className="flex gap-3">
        {Object.keys(testCases).map((key) => {
          return (
            <button
              key={Number(key) + 1}
              onClick={() => {
                setCurrentTestcase(Number(key));
              }}
              className={`rounded-lg px-3.5 py-1 ${currentTestcase == Number(key) ? "bg-case-bg-code" : "bg-none"} ${testCases[key].passed ? "text-catppuccin-green" : "text-red-400"}`}
            >
              Case {Number(key) + 1}
            </button>
          );
        })}
      </nav>
      <main className="flex flex-col mt-4">
        {Object.keys(testCases[currentTestcase]).map((key) => {
          if (Array.isArray(testCases[currentTestcase][key])) {
            return (
              <div key={key}>
                <span className="text-xs text-gray-400">{key} =</span>
                <div className="flex text-base bg-case-bg-code px-4 py-2 my-2 rounded-md">
                  <span>[</span>
                  <ul className="flex">
                    {testCases[currentTestcase][key].map((value, index) => {
                      return index <
                        testCases[currentTestcase][key].length - 1 ? (
                        <li key={index}>{value},</li>
                      ) : (
                        <li key={index}>{value}</li>
                      );
                    })}
                  </ul>
                  <span>]</span>
                </div>
              </div>
            );
          } else {
            return (
              <div key={key}>
                <span className="text-xs text-gray-400">{key} =</span>
                <div className="flex text-base bg-case-bg-code px-4 py-2 my-2 rounded-md">
                  {testCases[currentTestcase][key].toString()}
                </div>
              </div>
            );
          }
        })}
        {submissionResult.stdout !== "" ? (
          <div>
            <span className="text-xs text-gray-400">stdout =</span>
            <div className="flex text-base bg-case-bg-code px-4 py-2 my-2 rounded-md">
              {submissionResult.stdout}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
