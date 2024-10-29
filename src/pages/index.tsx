import { FormEvent } from "react";

async function onSubmit(evt: FormEvent<HTMLFormElement>) {
  evt.preventDefault();

  const response = await fetch("/api/search");

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  console.log(json);
}

export default function Index() {
  return (
    <div
      className={
        "grid gap-2 grid-cols-2 text-slate-600 bg-slate-100 max-w-lg mx-auto p-10 rounded-lg " +
        "shadow-md mt-6"
      }
    >
      <div className="col-span-2">
        <h1 className="text-2xl mb-4 font-bold">Wikipedia Tracer</h1>

        <div className="text-sm">
          <p className="mb-4">
            Welcome to Wikipedia Tracer, the only tool that answers life's most important questions:
          </p>

          <ul className="list-disc ml-4 mb-4">
            <li>
              How many jumps from the Wikipedia article about HALLOWEEN to the one about
              TRANSISTORS?
            </li>
            <li>How about from CAMELS to WAYNE GRETZKY?</li>
          </ul>

          <p className="mb-4">Let's find out.</p>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="start-page" className="mr-4 text-sm">
            Start page:
          </label>
          <input type="text" id="start-page" className="mt-0.5 p-1 rounded-sm"></input>
        </div>

        <div>
          <label htmlFor="end-page" className="mr-4 text-sm">
            End page:
          </label>
          <input type="text" id="end-page" className="mt-0.5 p-1 rounded-sm"></input>
        </div>

        <button
          type="submit"
          className="max-w-24 mt-4 p-2 rounded-sm bg-emerald-700 text-slate-100"
        >
          Search
        </button>
      </form>
    </div>
  );
}
