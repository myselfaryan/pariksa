import Example from "./Example";

function Examples({ examples }) {
  return (
    <div className="flex flex-col gap-4">
      {Object.keys(examples).map((key) => (
        <Example
          key={key}
          example={examples[key]}
          exampleNo={Number(key) + 1}
        />
      ))}
    </div>
  );
}

export default Examples;
