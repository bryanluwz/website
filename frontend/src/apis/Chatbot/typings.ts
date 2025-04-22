import { ChatbotRoleEnum } from "../enums";
import { HTTPStatusBody } from "../typings";

export interface ChatbotMessageModel {
  role: ChatbotRoleEnum;
  content: string;
}

export interface ChatbotApiRequestModel {
  messages: ChatbotMessageModel[];
}

export interface ChatbotApiResponseModel {
  status: HTTPStatusBody;
  data: {
    response: string;
  };
}
