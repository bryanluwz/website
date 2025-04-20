import { ChatbotRoleEnum } from "../enums";

export interface ChatbotMessageModel {
  role: ChatbotRoleEnum;
  content: string;
}
