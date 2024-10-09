const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const fs = require("node:fs").promises;

async function getProblemsList(req, res) {
  try {
    const problems = await prisma.problems.findMany({
      select: {
        id: true,
        title: true,
        difficulty: true,
        AcceptanceRate: true,
      },
    });
    res.status(200).json({
      message: "Successfully retrivied all problems data form the database",
      problems: problems,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Err: something went wrong during getting the problems",
    });
  }
}

async function getFullProblem(req, res) {
  try {
    const problemId = parseInt(req.params.problemId);

    const fullProblem = await prisma.problems.findUnique({
      where: {
        id: problemId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        examples: true,
        testCases: true,
        Submissions: true,
        difficulty: true,
        AcceptanceRate: true,
        StarterCode: true,
        langSupport: true,
        problemEvalCode: false,
      },
    });

    if (!fullProblem) {
      return res.status(404).json({
        status: 404,
        message: "Err: Problem not found in the DB",
      });
    }

    res.status(200).json({
      message: "Successfully retrivied the problem from the database",
      problem: fullProblem,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Err: something went wrong during getting the problems",
    });
  }
}

async function createProblem(req, res) {
  const problem = req.body;
  try {
    console.log('Creating Problem:', problem);

    const newProblem = await prisma.problems.create({
      data: {
        title: problem.title,
        description: problem.description,
        examples: problem.examples,
        testCases: problem.testCases,
        difficulty: problem.difficulty,
        AcceptanceRate: parseInt(problem.AcceptanceRate),
        StarterCode: problem.StarterCode,
        langSupport: problem.langSupport,
        problemEvalCode: problem.problemEvalCode,
      },
    });
    console.log('Created Problem:', problem);

    res.status(200).json({
      message: "problem created Successfully!",
      link: `/problemset/${newProblem.id}`,
      problem: newProblem,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Err: please check if all the fields are provided",
      err: e,
    });
  }
}

module.exports = { getProblemsList, getFullProblem, createProblem };
