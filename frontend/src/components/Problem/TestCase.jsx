import { useState, useEffect } from "react";

export default function TestCase({ testcase }) {
  const [loading, setLoading] = useState(true);
  const [currentTestcase, setCurrentTestcase] = useState(1);

  useEffect(() => {
    if (testcase) {
      setLoading(false);
    }
  }, [testcase]);

  return (
    <div className="text-sm mx-5 my-4">
      <nav className="flex gap-3">
        {!loading
          ? Object.keys(testcase).map((key) => {
              return (
                <button
                  key={Number(key) + 1}
                  onClick={() => {
                    setCurrentTestcase(Number(key) + 1);
                  }}
                  className={`rounded-lg px-3.5 py-1 ${currentTestcase == Number(key) + 1 ? "bg-case-bg-code" : "bg-none"}`}
                >
                  Case {Number(key) + 1}
                </button>
              );
            })
          : "loading"}
      </nav>
      <main>
        {!loading ? (
          <Case currentCase={testcase[currentTestcase - 1]} />
        ) : (
          "loading"
        )}
      </main>
    </div>
  );
}

function Case({ currentCase }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentCase) {
      setLoading(false);
    }
  }, [currentCase]);

  return (
    <div>
      {!loading
        ? Object.keys(currentCase).map((key) => {
            if (key.toLowerCase() === "output") return;
            if (Array.isArray(currentCase[key])) {
              return (
                <div key={key} className="my-4">
                  <span className="text-xs text-gray-400">{key} =</span>
                  <div className="flex text-base bg-case-bg-code px-4 py-2 my-2 rounded-md">
                    <span>[</span>
                    <ul className="flex">
                      {currentCase[key].map((value, index) => {
                        return index < currentCase[key].length - 1 ? (
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
                <div className="my-4" key={key}>
                  <span className="text-xs text-gray-400">{key} =</span>
                  <div className="flex text-base bg-case-bg-code px-4 py-2 my-2 rounded-md">
                    {currentCase[key]}
                  </div>
                </div>
              );
            }
          })
        : "loading"}
    </div>
  );
}
