import classNames from "classnames";
import { FormEvent, useState } from "react";

import Spinner from "./spinner";
import Results from "./results";

async function onSubmit(evt: FormEvent<HTMLFormElement>) {
  evt.preventDefault();

  const form = evt.currentTarget;
  const startPage = (form["start-page"] as HTMLInputElement).value;
  const endPage = (form["end-page"] as HTMLInputElement).value;

  const response = await fetch("/search?" + new URLSearchParams({ startPage, endPage }));

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  console.log(json);
}

export default function App() {
  const [searching, setSearching] = useState(false);
  const [path, setPath] = useState(["test1", "test2"]);

  return (
    <div
      className={
        "flex flex-col text-slate-600 bg-slate-100 max-w-xl mx-auto p-10 rounded-lg " +
        "shadow-md mt-6"
      }
    >
      <div className="col-span-2">
        <object data="/public/wikipedia-logo.svg" className="mb-4"></object>
        <h1 className="text-2xl mb-4 font-bold">Wikipedia Tracer</h1>

        <div className="text-sm">
          <p className="mb-4">
            Welcome to Wikipedia Tracer, the only tool that answers life's most important questions:
          </p>

          <ul className="list-disc ml-4 mb-4">
            <li className="mb-0.5">
              How many jumps from the Wikipedia article about GUACAMOLE to the one about the
              TRANSISTOR?
            </li>
            <li>How about from TOYOTA to WAYNE GRETZKY?</li>
          </ul>

          <p className="mb-4">Let's find out.</p>
        </div>
      </div>

      <form
        className="mb-4"
        onSubmit={async (evt) => {
          setSearching(true);
          await onSubmit(evt);
          setSearching(false);
        }}
      >
        <label htmlFor="start-page" className="mr-4 mb-1 text-sm block">
          Start page:
        </label>
        <input type="text" id="start-page" className="w-64 p-1.5 mb-1 rounded-sm block"></input>

        <label htmlFor="end-page" className="mr-4 mb-1 text-sm">
          End page:
        </label>
        <input type="text" id="end-page" className="w-64 p-1.5 rounded-sm block"></input>

        <button
          type="submit"
          className={classNames("w-24 mt-4 p-2 px-3 rounded-sm bg-emerald-700 text-slate-100", {
            "opacity-50": searching,
          })}
          disabled={searching}
        >
          <Spinner show={searching} />
          <span className={classNames({ hidden: searching })}>Search</span>
        </button>
      </form>

      <Results path={path} />
    </div>
  );
}
