export function showPostData(post, comments, html) {
  html.title().innerHTML = post.title;
  html.body().innerHTML = post.body;
  showComments(comments, post.id, html.comments());
}

export function loadPosts(posts, html) {
  html.select().innerHTML = "";
  const fragment = document.createDocumentFragment();
  Object.keys(posts).forEach(function(x) {
    let option = document.createElement("option");
    option.value = x;
    option.innerHTML = posts[x].title;
    fragment.appendChild(option);
  });

  html.select().appendChild(fragment);
}

function showComments(comments, id, postComments) {
  postComments.innerHTML = "";
  Object.keys(comments)
    .filter((x) => comments[x].postId === id)
    .map((x) => comments[x])
    .forEach(function(x) {
      const li = document.createElement("li");
      li.innerHTML = x.text;
      postComments.appendChild(li);
    });
}
