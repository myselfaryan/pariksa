"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"];
const PROGRAMMING_LANGUAGES = [
  { id: "python", name: "Python" },
  { id: "java", name: "Java" },
  { id: "cpp", name: "C++" },
  { id: "javascript", name: "JavaScript" },
  { id: "go", name: "Go" },
  { id: "ruby", name: "Ruby" },
];

export default function OrganizerDashboard() {
  const [problemTitle, setProblemTitle] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [supportedLanguages, setSupportedLanguages] = useState([]);
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);
  const navigate = useNavigate();

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  const removeTestCase = (index) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  const updateTestCase = (index, field, value) => {
    const updatedTestCases = testCases.map((testCase, i) =>
      i === index ? { ...testCase, [field]: value } : testCase
    );
    setTestCases(updatedTestCases);
  };

  const toggleLanguage = (languageId) => {
    setSupportedLanguages((prev) =>
      prev.includes(languageId)
        ? prev.filter((id) => id !== languageId)
        : [...prev, languageId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("New problem:", {
      problemTitle,
      problemDescription,
      difficulty,
      supportedLanguages,
      testCases,
    });

    const authToken = localStorage.getItem("auth_token");

    const problem = {
      title: problemTitle,
      description: problemDescription,
      difficulty: difficulty.toUpperCase(),
      langSupport: supportedLanguages,
      examples: testCases.slice(0, 2),
      testCases: testCases,
      AcceptanceRate: 88,
      StarterCode: {
        javascript: `function solution() {
}
solution();
`,
      },
      problemEvalCode: {
        javascript: "",
      },
    };

    console.log("Request Problem Creation", problem);
    console.log("Token", authToken);

    try {
      const result = await axios.post(
        import.meta.env.VITE_API_URL + "/createproblem",
        problem,
        {
          headers: { authorization_token: "Bearer " + authToken },
        }
      );
      toast.success(result.status + " Problem created successsfully");
      navigate("/");
    } catch (e) {
      toast.error(
        "Some error happened during creating problem. please check console"
      );
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Problem</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="problem-title">Problem Title</Label>
          <Input
            id="problem-title"
            value={problemTitle}
            onChange={(e) => setProblemTitle(e.target.value)}
            placeholder="Enter problem title"
            required
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="problem-description">Problem Description</Label>
          <Textarea
            id="problem-description"
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
            placeholder="Enter problem description"
            required
            className="min-h-[200px] w-full"
          />
        </div>

        <div>
          <Label>Difficulty</Label>
          <RadioGroup
            value={difficulty}
            onValueChange={setDifficulty}
            className="flex space-x-4"
          >
            {DIFFICULTY_LEVELS.map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={level}
                  id={`difficulty-${level.toLowerCase()}`}
                />
                <Label htmlFor={`difficulty-${level.toLowerCase()}`}>
                  {level}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <Label>Supported Programming Languages</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
            {PROGRAMMING_LANGUAGES.map((language) => (
              <div key={language.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`lang-${language.id}`}
                  checked={supportedLanguages.includes(language.id)}
                  onCheckedChange={() => toggleLanguage(language.id)}
                />
                <Label htmlFor={`lang-${language.id}`}>{language.name}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Test Cases</h2>
          {testCases.map((testCase, index) => (
            <div key={index} className="mb-4 p-4 border rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Test Case {index + 1}</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTestCase(index)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-2">
                <div>
                  <Label htmlFor={`test-input-${index}`}>Input</Label>
                  <Textarea
                    id={`test-input-${index}`}
                    value={testCase.input}
                    onChange={(e) =>
                      updateTestCase(index, "input", e.target.value)
                    }
                    placeholder="Enter test case input"
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor={`test-output-${index}`}>
                    Expected Output
                  </Label>
                  <Textarea
                    id={`test-output-${index}`}
                    value={testCase.output}
                    onChange={(e) =>
                      updateTestCase(index, "output", e.target.value)
                    }
                    placeholder="Enter expected output"
                    required
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addTestCase}
            className="mt-2"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Test Case
          </Button>
        </div>

        <Button type="submit" className="w-full">
          Create Problem
        </Button>
      </form>
    </div>
  );
}
