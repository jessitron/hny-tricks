#!/bin/bash

# set -x

# Check if HONEYCOMB_API_KEY is set
if [ -z "$HONEYCOMB_API_KEY" ]; then
  echo "no HONEYCOMB_API_KEY environment variable"
  exit 0 # this is not an error, just the state of things
fi

# Honeycomb API base URL
BASE_URL="https://api.honeycomb.io/1"


# Fetch all datasets in the environment
datasets=$(curl -s -H "X-Honeycomb-Team: $HONEYCOMB_API_KEY" \
  -H "Content-Type: application/json" \
  "$BASE_URL/datasets" | jq -r '.[].slug')

  # Check if the curl command executed at all
if [ $? -ne 0 ]; then
  echo "Error: Failed to fetch data from Honeycomb API."
  exit 1
fi

echo "Datasets found: "
echo $datasets

# Loop through each dataset
for dataset in $datasets; do
  echo "Processing dataset: $dataset"
  
  # Derived column data
  derived_column_data=$(cat <<EOF
{
  "alias": "dc.dataset",
  "expression": "COALESCE(\"$dataset\")",
  "description": "Where is this event?"
}
EOF
)

  # Create derived column for the dataset
  response=$(curl -s -X POST "$BASE_URL/derived_columns/$dataset" \
    -H "X-Honeycomb-Team: $HONEYCOMB_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$derived_column_data")

  echo "result: $?"

  # Check if the derived column was created successfully
  if echo "$response" | grep -q '"id"'; then
    echo "Derived column created successfully for dataset: $dataset"
  else
    echo "Failed to create derived column for dataset: $dataset. Response: $response"
  fi
done
