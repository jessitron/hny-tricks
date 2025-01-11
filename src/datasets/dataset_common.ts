import { Html } from "../htm-but-right";

export type DatasetSlug = string;

export type HnyTricksDataset = {
  name: string;
  slug: DatasetSlug;
  created: Date;
  last_written: Date;
};


export interface Column {
  header(): Html;
  row(d: HnyTricksDataset, i: number): Html;
  footer(): Html;
}
