export default function Results({ path }: ResultsProps) {
  if (path instanceof Error) {
    return <div>Couldn't find a path between those two articles.</div>;
  }

  const nodes = path.map((node, i) => {
    return (
      <span key={i}>
        <span>{node.toUpperCase()}</span> {i < path.length - 1 && " -> "}
      </span>
    );
  });

  return (
    <div>
      {path.length > 0 && <div>Found a path:</div>}
      <div>{nodes}</div>
    </div>
  );
}

type ResultsProps = {
  path: string[] | Error;
};
