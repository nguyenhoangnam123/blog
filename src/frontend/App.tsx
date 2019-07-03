import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider, Subscribe } from "unstated-x";
import ArticleContainer from "./components/containers/ArticleContainer";

const el = document.createElement("div");
document.body.appendChild(el);
ReactDom.render(
  <Provider>
    <Subscribe to={[ArticleContainer]}>
      {(articleContainer: ArticleContainer) => {
        const { articles } = articleContainer.state;
        const el = articles.map((item, index) => {
          const { title, body, author, slug, comment, tagList } = item;
          return (
            <div key={index}>
              <h4>{title}</h4>
              <small>{author}</small>
              <p>{body}</p>
            </div>
          );
        });
        return <ul>{el}</ul>;
      }}
    </Subscribe>
  </Provider>,
  el as HTMLElement
);
