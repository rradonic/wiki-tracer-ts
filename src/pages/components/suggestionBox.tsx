import classNames from "classnames";

export default function SuggestionBox({
  suggestions,
  selectedSuggestion: selection,
}: SuggestionBoxProps) {
  if (suggestions.titles.length === 0) {
    return null;
  }

  return (
    <div className="absolute bg-white p-1.5 rounded-sm border border-solid border-slate-300">
      {suggestions.titles.map((suggestion, i) => (
        <div
          key={i}
          className={classNames("p-1 px-2", {
            "bg-slate-200": selection === i,
          })}
        >
          {suggestion.toUpperCase()}
        </div>
      ))}
      {suggestions.more && <div className="text-center text-xs p-0 pb-1">...</div>}
    </div>
  );
}

export type Suggestions = {
  titles: string[];
  more: boolean;
};

type SuggestionBoxProps = {
  suggestions: Suggestions;
  selectedSuggestion: number;
};
