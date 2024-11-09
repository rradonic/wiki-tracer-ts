import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { debounce } from "../helpers/debounce";
import Suggestions from "./suggestions";

export default function Input({ id, label }: InputProps) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const suggest = useCallback(
    debounce(async (value: string) => {
      const response = await fetch("/suggest?" + new URLSearchParams({ input: value }));

      if (response.ok) {
        const json = await response.json();
        setSuggestions(json.suggestions);
      }
    }, 500),
    [],
  );

  useEffect(() => {
    suggest(value);
  }, [value]);

  function onChange(evt: ChangeEvent<HTMLInputElement>) {
    setValue(evt.currentTarget.value);
  }

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
        onChange={onChange}
      />

      <Suggestions suggestions={suggestions} />
    </>
  );
}

type InputProps = {
  id: string;
  label: string;
};