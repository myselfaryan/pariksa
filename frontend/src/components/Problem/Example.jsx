function Example({ example, exampleNo }) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold">Example {exampleNo}:</h1>
      <div className="flex flex-col gap-0 px-4">
        <div className="flex gap-2">
          <span className="font-bold">Input:</span>
          <div className="text-example-text flex gap-2">
            {Object.keys(example).map((key, index) => {
              if (key !== "output") {
                if (index < Object.keys(example).length - 1) {
                  return (
                    <div className="flex gap-2" key={key}>
                      <span>{key} =</span>
                      <span>{JSON.stringify(example[key])},</span>
                    </div>
                  );
                } else {
                  return (
                    <div className="flex gap-2" key={key}>
                      <span>{key} =</span>
                      <span>{JSON.stringify(example[key])}</span>
                    </div>
                  );
                }
              }
            })}
          </div>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Output:</span>
          <div className="flex gap-2 text-example-text">
            <span>{JSON.stringify(example["output"])}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Example;
