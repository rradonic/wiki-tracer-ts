export default function Results({ path }: ResultsProps) {
  if (path instanceof Error) {
    return <div>Couldn't find a path between those two articles.</div>;
  }

  const nodes = path.map((node, i) => {
    return (
      <div key={i}>
        <div className="inline-block p-1.5 px-3 bg-slate-300 rounded-lg">{node.toUpperCase()}</div>{" "}
        {i < path.length - 1 && <div className="mx-4 my-1">↓</div>}
      </div>
    );
  });

  return (
    <div>
      {path.length > 0 && <div className="mb-2">Found a path:</div>}
      <div>{nodes}</div>
    </div>
  );
}

type ResultsProps = {
  path: string[] | Error;
};
