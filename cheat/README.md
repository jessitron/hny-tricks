# Cheaty scripts for doing automating honeycomb configuration

This is where I put scripts for doing stuff in Honeycomb that the API can support but the product does not.

## Available Scripts

### dataset-name.sh

Creates a derived column called `dc.dataset` in each dataset, containing the name of the dataset. After running this script, you can query across all datasets in Honeycomb and group by `dc.dataset` to see which dataset events came from.

### timestamp-dcs.sh

Creates three useful derived columns across all datasets:
- `dc.env.event_timestamp` - When the event occurred, formatted as a readable timestamp
- `dc.env.ingest_timestamp` - When Honeycomb received the event
- `dc.env.ingest_delay` - The delay in seconds between event occurrence and ingestion

## Usage

All scripts require the `HONEYCOMB_API_KEY` environment variable:

```bash
export HONEYCOMB_API_KEY=your_api_key_here
./dataset-name.sh
```

### copy-calculated-field.py

Copies a calculated field (derived column) from one Honeycomb environment to another. Requires two API keys - one for the source environment and one for the target.

```bash
export SOURCE_API_KEY=your_source_api_key
export TARGET_API_KEY=your_target_api_key
python copy-calculated-field.py <field_alias> <source_dataset> <target_dataset>
```

Examples:
```bash
# Copy a specific field from one dataset to another
python copy-calculated-field.py dc.my_field my-dataset other-dataset

# Copy a field that exists across all datasets
python copy-calculated-field.py dc.env.event_timestamp __all__ __all__
```


