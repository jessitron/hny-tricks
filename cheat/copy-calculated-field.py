#!/usr/bin/env python3
"""
Copy a calculated field (derived column) from one Honeycomb environment to another.

Usage:
    export SOURCE_API_KEY=your_source_api_key
    export TARGET_API_KEY=your_target_api_key
    python3 copy-calculated-field.py <field_alias> <source_dataset> <target_dataset>

Examples:
    # Copy from specific dataset to specific dataset
    python3 copy-calculated-field.py dc.my_field my-dataset other-dataset

    # Copy from __all__ to __all__ (all datasets)
    python3 copy-calculated-field.py dc.my_field __all__ __all__
"""

import sys
import os
import subprocess
import json

BASE_URL = "https://api.honeycomb.io/1"


def get_derived_column(api_key, dataset, alias):
    """Fetch a specific derived column from a dataset."""
    url = f"{BASE_URL}/derived_columns/{dataset}"

    result = subprocess.run(
        [
            "curl", "-s",
            "-H", f"X-Honeycomb-Team: {api_key}",
            "-H", "Content-Type: application/json",
            url
        ],
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        print(f"Error fetching derived columns: {result.stderr}")
        return None

    try:
        columns = json.loads(result.stdout)
    except json.JSONDecodeError:
        print(f"Error parsing response: {result.stdout}")
        return None

    # Find the column with matching alias
    for column in columns:
        if column.get("alias") == alias:
            return column

    return None


def create_derived_column(api_key, dataset, column_data):
    """Create a derived column in the target environment."""
    url = f"{BASE_URL}/derived_columns/{dataset}"

    # Extract only the fields needed for creation
    payload = {
        "alias": column_data["alias"],
        "expression": column_data["expression"]
    }

    # Include description if present
    if "description" in column_data and column_data["description"]:
        payload["description"] = column_data["description"]

    result = subprocess.run(
        [
            "curl", "-s", "-w", "\n%{http_code}",
            "-X", "POST",
            "-H", f"X-Honeycomb-Team: {api_key}",
            "-H", "Content-Type: application/json",
            "-d", json.dumps(payload),
            url
        ],
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        print(f"✗ Failed to create derived column in dataset '{dataset}'")
        print(f"  Error: {result.stderr}")
        return False

    # Split response body and status code
    lines = result.stdout.strip().split('\n')
    status_code = lines[-1] if lines else ""
    response_body = '\n'.join(lines[:-1]) if len(lines) > 1 else ""

    if status_code in ["200", "201"]:
        print(f"✓ Successfully created derived column '{payload['alias']}' in dataset '{dataset}'")
        return True
    else:
        print(f"✗ Failed to create derived column in dataset '{dataset}'")
        print(f"  Status: {status_code}")
        print(f"  Response: {response_body}")
        return False


def main():
    if len(sys.argv) != 4:
        print(__doc__)
        sys.exit(1)

    field_alias = sys.argv[1]
    source_dataset = sys.argv[2]
    target_dataset = sys.argv[3]

    # Check for required API keys
    source_api_key = os.environ.get("SOURCE_API_KEY")
    target_api_key = os.environ.get("TARGET_API_KEY")

    if not source_api_key:
        print("Error: SOURCE_API_KEY environment variable not set")
        sys.exit(1)

    if not target_api_key:
        print("Error: TARGET_API_KEY environment variable not set")
        sys.exit(1)

    print(f"Fetching derived column '{field_alias}' from source dataset '{source_dataset}'...")

    # Fetch the derived column from source
    column = get_derived_column(source_api_key, source_dataset, field_alias)

    if not column:
        print(f"Error: Derived column '{field_alias}' not found in source dataset '{source_dataset}'")
        sys.exit(1)

    print(f"Found column: {column['alias']}")
    print(f"  Expression: {column['expression']}")
    if column.get('description'):
        print(f"  Description: {column['description']}")

    print(f"\nCreating in target dataset '{target_dataset}'...")

    # Create in target environment
    success = create_derived_column(target_api_key, target_dataset, column)

    if success:
        print("\n✓ Copy completed successfully")
        sys.exit(0)
    else:
        print("\n✗ Copy failed")
        sys.exit(1)


if __name__ == "__main__":
    main()
