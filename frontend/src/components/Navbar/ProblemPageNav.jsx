import { PacmanLoader } from "react-spinners";

export default function ProblemPageNav({ onSubmit, isSubmissionLoading }) {
  return (
    <div className="flex justify-center items-center font-mono px-5 py-2">
      <button
        disabled={isSubmissionLoading}
        onClick={onSubmit}
        className={`bg-case-bg-code px-4 py-0.5 rounded-sm flex ${isSubmissionLoading ? "text-catppuccin-yellow cursor-not-allowed" : "text-white"}`}
      >
        <PacmanLoader
          size={10}
          className="mr-8"
          color="#f9e2af"
          loading={isSubmissionLoading}
        />
        Submit
      </button>
    </div>
  );
}
