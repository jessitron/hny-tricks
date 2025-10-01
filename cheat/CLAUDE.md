# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This repository contains automation scripts for Honeycomb configuration tasks that are supported by the API but not directly available in the product UI.

## Architecture

All scripts are standalone bash scripts that interact with the Honeycomb API (https://api.honeycomb.io/1). Each script:
- Requires `HONEYCOMB_API_KEY` environment variable
- Uses curl to make API calls
- Uses jq for JSON processing (dataset-name.sh)

### Scripts

**dataset-name.sh**: Creates a derived column called 'dc.dataset' in each dataset containing the dataset name. Fetches all datasets in the environment, then loops through each to create the derived column. Useful for querying across all datasets and grouping by dataset name.

**timestamp-dcs.sh**: Creates three derived columns across all datasets using the `__all__` endpoint:
- `dc.env.event_timestamp`: Formatted event timestamp
- `dc.env.ingest_timestamp`: When Honeycomb received the event
- `dc.env.ingest_delay`: Time difference between ingest and event occurrence

## API Reference

Honeycomb API docs: https://api-docs.honeycomb.io/api/derived-columns

Key endpoints:
- `GET /1/datasets` - List all datasets
- `POST /1/derived_columns/{dataset}` - Create derived column for specific dataset
- `POST /1/derived_columns/__all__` - Create derived column across all datasets

## Running Scripts

All scripts require the `HONEYCOMB_API_KEY` environment variable:

```bash
export HONEYCOMB_API_KEY=your_api_key_here
./dataset-name.sh
./timestamp-dcs.sh
```

Scripts will exit silently (exit 0) if `HONEYCOMB_API_KEY` is not set.
