# Check if HONEYCOMB_API_KEY is set
if [ -z "$HONEYCOMB_API_KEY" ]; then
  echo "no HONEYCOMB_API_KEY environment variable"
  exit 0 # this is not an error, just the state of things
fi

# Honeycomb API base URL
BASE_URL="https://api.honeycomb.io/1"

name=dc.env.event_timestamp
echo "creating $name"
curl -i -X POST \
  'https://api.honeycomb.io/1/derived_columns/__all__' \
  -H 'Content-Type: application/json' \
  -H "X-Honeycomb-Team: $HONEYCOMB_API_KEY" \
  -d '{
    "alias": "dc.env.event_timestamp",
    "expression": "FORMAT_TIME(\"%FT %TZ\", EVENT_TIMESTAMP())",
    "description": "When the event occurred, according to its data"
  }'

name=dc.env.ingest_timestamp
echo "creating $name"
curl -i -X POST \
  'https://api.honeycomb.io/1/derived_columns/__all__' \
  -H 'Content-Type: application/json' \
  -H "X-Honeycomb-Team: $HONEYCOMB_API_KEY" \
  -d '{
    "alias": "dc.env.ingest_timestamp",
    "expression": "FORMAT_TIME(\"%FT %TZ\", INGEST_TIMESTAMP())",
    "description": "When Honeycomb received this event"
  }'

name=dc.env.ingest_delay
echo "creating $name"
curl -i -X POST \
  'https://api.honeycomb.io/1/derived_columns/__all__' \
  -H 'Content-Type: application/json' \
  -H "X-Honeycomb-Team: $HONEYCOMB_API_KEY" \
  -d '{
    "alias": "dc.env.ingest_delay",
    "expression": "SUB(INGEST_TIMESTAMP(), EVENT_TIMESTAMP())",
    "description": "seconds between ingest and when the event says it happened"
  }'