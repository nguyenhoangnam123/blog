import { Container } from "unstated-x";

interface ArticleState {
  articles: ArticleProps[];
}

interface ArticleProps {
  _id: string;
  title: string;
  body: string;
  slug: string;
  author: string;
  comment: string[];
  tagList: string[];
}

export default class Article extends Container<ArticleState> {
  state: ArticleState = {
    articles: [
      {
        _id: "5d19e64bfd7090e2b27e7cf7",
        title: "the first article",
        body: "this is debut article",
        slug: "the-first-article",
        author: "5d19ba196dfc96dd77c7932e",
        comment: ["1234", "1235", "1236"],
        tagList: ["blog", "public blog"]
      }
    ]
  };
}
