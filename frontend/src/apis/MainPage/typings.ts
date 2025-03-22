import { HTTPStatusBody } from "../typings";

export interface MainPageCardModel {
  title?: string;
  supertitle?: string;
  link?: string;
  time?: string;
  company?: string;
  backgroundColor?: string;
  image?: string;
  content?: MainPageCardContentModel[];
}

export interface MainPageCardContentModel {
  contentTitle: string;
  contentBody: string[];
}

// export interface ExampleResponseModel {
//   status: HTTPStatusBody;
//   data: {
//     example: ExampleModel[];
//   };
// }
