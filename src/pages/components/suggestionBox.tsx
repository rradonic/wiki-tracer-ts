import classNames from "classnames";
import { useState } from "react";

export default function SuggestionBox({ suggestions }: SuggestionBoxProps) {
  const [selection, setSelection] = useState(0);

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute bg-white p-1.5 rounded-sm border border-solid border-slate-300">
      {suggestions.map((suggestion, i) => (
        <div key={i} className={classNames("p-1 px-2", { "bg-slate-200": selection === i })}>
          {suggestion.toUpperCase()}
        </div>
      ))}
    </div>
  );
}

type SuggestionBoxProps = {
  suggestions: string[];
};
