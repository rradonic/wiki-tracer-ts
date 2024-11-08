import { ChangeEvent, useEffect, useState } from "react";

import { debounce } from "../helpers/debounce";

const autoSuggest = debounce((value) => {
  console.log(value);
}, 500);

export default function Input({ id, label }: InputProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    autoSuggest(value);
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
    </>
  );
}

type InputProps = {
  id: string;
  label: string;
};
