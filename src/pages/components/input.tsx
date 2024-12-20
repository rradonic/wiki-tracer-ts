import { useCallback, useEffect, useState } from "react";

import { debounce } from "../helpers/debounce";
import SuggestionBox, { Suggestions } from "./suggestionBox";

export default function Input({ id, label }: InputProps) {
  const emptySuggestions = { titles: [], more: false };

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestions>(emptySuggestions);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [loadSuggestions, setLoadSuggestions] = useState(true);

  const suggest = useCallback(
    debounce(async (value: string) => {
      const response = await fetch("/suggest?" + new URLSearchParams({ input: value }));

      if (response.ok) {
        const json = await response.json();
        setSuggestions(json);
      }
    }, 500),
    [],
  );

  useEffect(() => {
    if (loadSuggestions) {
      suggest(value);
    }
  }, [value]);

  return (
    <>
      <label htmlFor={id} className="mr-4 mb-1 text-sm block">
        {label}
      </label>

      <input
        type="text"
        id={id}
        className="w-64 py-1.5 px-2 mb-1 rounded-sm block"
        value={value}
        onChange={(evt) => {
          setValue(evt.currentTarget.value);
        }}
        onKeyDown={(evt) => {
          if (evt.code === "ArrowDown") {
            evt.preventDefault();
            setSelectedSuggestion(Math.min(selectedSuggestion + 1, suggestions.titles.length - 1));
          } else if (evt.code === "ArrowUp") {
            evt.preventDefault();
            setSelectedSuggestion(Math.max(selectedSuggestion - 1, 0));
          } else if (evt.code === "Enter") {
            evt.preventDefault();

            if (suggestions.titles[selectedSuggestion]) {
              setValue(suggestions.titles[selectedSuggestion]);
              setSuggestions(emptySuggestions);
              setLoadSuggestions(false);
            }
          } else if (evt.code === "Escape") {
            evt.preventDefault();
            setSuggestions(emptySuggestions);
          } else {
            setLoadSuggestions(true);
          }
        }}
        onBlur={() => {
          setSuggestions(emptySuggestions);
        }}
      />

      <SuggestionBox suggestions={suggestions} selectedSuggestion={selectedSuggestion} />
    </>
  );
}

type InputProps = {
  id: string;
  label: string;
};
