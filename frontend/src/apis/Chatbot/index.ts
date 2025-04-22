import { chatbotUrl } from "../urls";
import { _fetch } from "../utils";
import { ChatbotApiRequestModel, ChatbotApiResponseModel } from "./typings";

export const chatbotApi = async (body: ChatbotApiRequestModel) => {
  const response = await _fetch(chatbotUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response.json() as unknown as ChatbotApiResponseModel;
};
