"use client";

import { Fragment } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { handleFormSubmit } from "./action";

export default function Home() {
  const [data, action] = useFormState(handleFormSubmit, {
    message: null
  });

  return (
    <Fragment>
      <form action={action}>
        <fieldset className={"max-w-md m-auto mt-4 flex flex-col gap-3"}>
          <label className={"flex flex-col"}>
            <span>Query about activities</span>
            <textarea name="query" className={"border border-gray-400 p-2"} />
          </label>
          <SubmitButton />
        </fieldset>
      </form>
      <div className={"max-w-md mt-3 m-auto"}>
        {data.message ? <span>{data.message}</span> : null}
      </div>
    </Fragment>
  );
}
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={"border-gray-300 border bg-gray-100 p-1"}
      type="submit"
    >
      {pending ? "Loading..." : "Submit"}
    </button>
  );
}
