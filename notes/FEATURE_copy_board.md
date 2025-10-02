# I want to copy a board from one team to another.

This is rather different from the other things hny-tricks does, so it should be another page in the app.

## add a new page to the app called Copy Honeycomb Board ✅

- make a link from the main page to the new page.

Try to keep the code for this feature in its own directory. Reuse code and routes from the main page where possible.

## Get the API keys ✅

- on the new page, ask for two api keys. One is "From Environment" and the other is "To Environment".

- validate the api keys (using the existing htmx route). If they are not valid, show an error message. If they are valid, show the team and environment names.

- check that they each have permission to manage boards. If not, display a message.

## Get the boards from the From Environment ✅

- list the boards in the From Environment
- for each board, show the name and a button to copy it.
- When I push the button, a new section appears, which will eventually show the analysis of the board.

## Analyze the board

- Retrieve the board info from the Honeycomb API.

The API Docs are here, read them: https://api-docs.honeycomb.io/api/boards

- List the queries on the board. Retrieve and show their query definitions.

## Analyze it some more - not yet

- From the queries, extract a list of datasets and columns (name and type).

- from the columns, extract a list of derived columns. From those, get their definitions and list the columns included in their formula.

The Derived Columns (Calculated Fields) API Docs are here: https://api-docs.honeycomb.io/api/derived-columns

## Check feasibility - not yet

Now it gets interesting.

- For each dataset, check if it exists in the To Environment. If not, mark it with an emoji

- For each column, check if it exists in the To Environment (in the same dataset). If not, mark it with an emoji

- For each column that is a derived column, check whether it exists.

## Draw the rest of the owl - not yet

- we'll need to create datasets and columns by sending events.
- then create calculated fields
- then create queries
- then create the board
- each query that requires a creation of something else (dataset, column, calculated field, SLO) should get a "create dependencies" button and a "skip" option. We don't have to copy every single panel.

## Things to test later

- when the field exists but with a different type
- when the calculated field exists with a different definition
- text panels
- slo panels, yikes, do we create the SLO?
- environment-level calculated fields
