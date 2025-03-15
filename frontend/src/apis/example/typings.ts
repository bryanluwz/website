import { HTTPStatusBody } from "../typings";

export interface ExampleModel {}

export interface ExampleResponseModel {
  status: HTTPStatusBody;
  data: {
    example: ExampleModel[];
  };
}
