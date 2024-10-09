const { PrismaClient } = require("@prisma/client");
const { sendMessage } = require("../../utils/rabbitmq");
const prisma = new PrismaClient();

async function getSubmissions(req, res) {
  try {
    const { userId } = req.body;
    const problemId = parseInt(req.params.problemId);

    // Checking if the userID and problemID is provided or not
    if (!userId || !problemId) {
      return res.status(400).json({
        message: "Err: provide the userID and problemID",
        body: req.body,
      });
    }

    const usersProblemSubmissions = await prisma.submissions.findMany({
      where: {
        usersId: userId,
        problemsId: problemId,
      },
    });

    return res.status(200).json({
      message:
        "Successfully retrivied the users submissions for the current problem",
      solutions: usersProblemSubmissions,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Err: Something went wrong when retreving the submissions",
    });
  }
}

let runtimes = [];

(async () => {
  runtimes = (await (await fetch("https://emkc.org/api/v2/piston/runtimes")).json());
})();

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function verifyOutput(output, answer) {
  const outputLines = output.split('\n').map(line => line.trimEnd());
  const answerLines = answer.split('\n').map(line => line.trimEnd());
  while (outputLines.length > 0 && outputLines[outputLines.length - 1] === '') {
    outputLines.pop();
  }
  while (answerLines.length > 0 && answerLines[answerLines.length - 1] === '') {
    answerLines.pop();
  }
  return arraysEqual(outputLines, answerLines);
}

async function postSubmission(req, res) {
  console.log(runtimes);
  console.log(typeof runtimes);
  try {
    const { userId, answer, language } = req.body;

    if (!answer) {
      return res.status(400).json({ message: "Err: no answer provided" });
    }
    if (!language) {
      return res.status(400).json({ message: "Err: no langauge specified" });
    }

    const problemId = parseInt(req.params.problemId);

    const problem = await prisma.problems.findUnique({
      where: {
        id: problemId,
      },
    });

    if (!problem) {
      return res.status(404).json({
        message: "Err: problem not found",
      });
    }

    const idx = runtimes.findIndex(
      (runtime) =>
        runtime.language === language || runtime.aliases?.includes(language)
    );

    if (idx === -1) {
      return res.status(400).json({ message: "Invalid language" });
    }

    const version = runtimes[idx].version;
    const prepared = {
      language,
      version,
      files: [
        {
          content: answer,
        },
      ],
      compile_timeout: 10000,
      run_timeout: 3000,
      compile_cpu_time: 10000,
      run_cpu_time: 3000,
      compile_memory_limit: -1,
      run_memory_limit: -1,
    };

    const verdicts = [];

    for (const testCase of problem.testCases) {
      console.log("testCase", testCase);
      const request = { ...prepared, stdin: testCase.input };

      console.log('request', request);

      const result = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      const data = await result.json();
      const filteredResult = {
        stdout: data.run.stdout,
        stderr: data.run.stderr,
        code: data.run.code,
      };
      console.log(data, filteredResult);

      verdicts.push(filteredResult.code === 0 && verifyOutput(filteredResult.stdout, testCase.output));
    }

    const verdict = verdicts.every(verdict => verdict) ? "Accepted" : "Wrong Answer";


    let submission = await prisma.submissions.create({
      data: {
        answer: answer,
        usersId: userId,
        problemsId: problemId,
        testCasesResult: verdict,
        stdout: verdict,
        stderr: verdict,
        ExecutionStat: verdict,
      },
    });

    return res.status(200).json({
      verdict,
    });

    /*
    const data = {
      userId: userId,
      answer: answer,
      language: language,
      problem: problem,
      submissionId: submission.id,
    };

    // Enqueue the code to rabbitmq
    sendMessage(data);

    res.status(200).json({
      message: "The submission was successful",
      submissionId: submission.id,
    });
    */
  } catch (err) {
    console.log(err);
    return res.status(501).json({
      message:
        "Server Error: Something went wrong when trying to submit your submission",
    });
  }
}

module.exports = { getSubmissions, postSubmission };
