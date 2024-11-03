export default function Results({ path }: ResultsProps) {
  const nodes = path.map((node) => <div>{node}</div>);

  return <div>{nodes}</div>;
}

type ResultsProps = {
  path: string[];
};
