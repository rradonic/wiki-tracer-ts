import classNames from "classnames";

export default function SuggestionBox({ suggestions, selection }: SuggestionBoxProps) {
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
            "text-center text-sm p-0": suggestion === "...",
          })}
        >
          {suggestion.toUpperCase()}
        </div>
      ))}
    </div>
  );
}

export type Suggestions = {
  titles: string[];
  more: boolean;
};

type SuggestionBoxProps = {
  suggestions: Suggestions;
  selection: number;
};
