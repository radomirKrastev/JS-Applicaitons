function getArticleGenerator(articles) {
  let articlesLeft = articles;

  return function getNextArticle() {
    if (articlesLeft.length > 0) {
      let content = document.querySelector("#content");
      let article = document.createElement("article");
      article.textContent = articlesLeft.shift();
      content.appendChild(article);
    }
  };
}
