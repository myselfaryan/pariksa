import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProblemsTable({ problems }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (problems) {
      setLoading(false);
    }
  }, [problems]);
  return (
    <div className="flex flex-col lg:w-auto w-1/2">
      <div className="flex pb-1.5 mb-3 border-b-1 border-b-navbar-boder text-main-text-color gap-10">
        <span className="w-20 px-10">Id</span>
        <span className="w-80">Title</span>
        <span className="w-40">Difficulty</span>
        <span>Acceptance</span>
      </div>
      {!loading ? (
        <div className="flex flex-col gap-2 bg-secondary-body-bg rounded-sm py-2">
          {problems.map((x) => {
            return <ProblemItem key={x.id} problem={x} loading={loading} />;
          })}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

function ProblemItem({ problem, loading }) {
  let difficultyColor = "text-catppuccin-green";

  if (!loading) {
    if (problem.difficulty === "MEDIUM") {
      difficultyColor = "text-catppuccin-yellow";
    } else if (problem.difficulty === "HARD") {
      difficultyColor = "text-catppuccin-red";
    }
  }

  return (
    <div>
      {!loading ? (
        <div className="flex lg:gap-10 md:gap-0">
          <span className="w-10 px-10">{problem.id}</span>
          <span className="w-80">
            <Link
              to={"/problemset/" + problem.id}
              className="hover:text-catppuccin-red"
            >
              {problem.title}
            </Link>
          </span>
          <span className={difficultyColor + " w-40"}>
            {problem.difficulty}
          </span>
          <span>{problem.AcceptanceRate}</span>
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
}
