import { MainPageCardModel } from "../../../apis/MainPage/typings";
import ChatbotImage from "../../../../public/assets/main-page/chatbot.png";
import InternImage from "../../../../public/assets/main-page/intern.png";
import UniversityImage from "../../../../public/assets/main-page/ntu.png";
import CircuiBoardImage from "../../../../public/assets/main-page/circuit-board.png";

export const mockMainPageCards: {
  title: string;
  backgroundColor: string;
  image: string;
  supertitle: string;
  content: string;
}[] = [
  {
    title: "card-0.title",
    backgroundColor: "var(--lavender)",
    image: InternImage,
    supertitle: "card-0.supertitle",
    content: "card-0.content",
  },
  {
    title: "card-1.title",
    backgroundColor: "var(--light-cyan)",
    image: ChatbotImage,
    supertitle: "card-1.supertitle",
    content: "card-1.content",
  },
  {
    title: "card-2.title",
    backgroundColor: "var(--cornsilk)",
    image: CircuiBoardImage,
    supertitle: "card-2.supertitle",
    content: "card-2.content",
  },
  {
    title: "card-3.title",
    backgroundColor: "var(--mint-cream)",
    image: UniversityImage,
    supertitle: "card-3.supertitle",
    content: "card-3.content",
  },
];
