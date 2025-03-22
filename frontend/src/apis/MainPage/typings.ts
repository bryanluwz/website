import { HTTPStatusBody } from "../typings";

export interface PageCardModel {
  title?: string;
  supertitle?: string;
  time?: string;
  company?: string;
  backgroundColor?: string;
  image?: string;
  content?: PageCardContentModel[];
}

export interface PageCardContentModel {
  contentTitle: string;
  contentBody: string[];
}

// export interface ExampleResponseModel {
//   status: HTTPStatusBody;
//   data: {
//     example: ExampleModel[];
//   };
// }
