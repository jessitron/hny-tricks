
export type DatasetSlug = string;

export type HnyTricksDataset = {
  name: string;
  slug: DatasetSlug;
  created: Date;
  last_written: Date;
};


export type Html = string;
export interface Column {
  header(): Html;
  row(d: HnyTricksDataset, i: number): Html;
  footer(): Html;
}
