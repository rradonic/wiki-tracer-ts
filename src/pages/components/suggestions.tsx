export default function Suggestions({ suggestions }: SuggestionsProps) {
  // console.log(suggestions);
  return suggestions.map((suggestion) => <div>{suggestion}</div>);
}

type SuggestionsProps = {
  suggestions: string[];
};
