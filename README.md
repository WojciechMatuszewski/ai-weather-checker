# AI Weather Checker

A very simplistic application to test the `runTools` API exposed by `openai` SDK.

By providing the `tools` array, you give the LLM ability to _reason, observer and act_ based on the result of a given "tool". This is so called _ReAct_ pattern. This pattern is used in building _agents_.

## Running the application

1. Create the `.env.local` file in the project root directory.

1. Copy the values from `.env.local.example` into `.env.local`.

1. Get an API key from [https://www.geoapify.com/get-started-with-maps-api](geoapify.com).

1. Get an API key from [OpenAI website](https://help.openai.com/en/articles/4936850-where-do-i-find-my-api-key).

1. Update the values in your `.env.local` with the API keys you have just created.

1. Install the dependencies.

   ```bash
   pnpm install
   ```

1. Run the app.

   ```bash
   pnpm run dev
   ```
