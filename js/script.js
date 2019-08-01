axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(
    response => {
      response.data.forEach(post => {
        appendPosttoDOM(post);
      })
    });

let appendPosttoDOM = (post) => {
  let ul = document.getElementById('posts');
  let li = document.createElement('li');
  li.className = 'post__container';
  li.id = `li-${post.id}`;

  let title = document.createElement('h2');
  title.innerText = post.title;
  title.className = 'post__title';
  li.appendChild(title);

  let postText = document.createElement('p');
  postText.innerText = post.body;
  postText.className = 'post__text';

  let commentsDiv = document.createElement('div');

  li.appendChild(postText);
  let button = document.createElement('button');
  button.innerText = 'Show Comments';
  button.className = 'post__button';
  button.id = `button-${post.id}`;

  button.onclick = function() {
    let commentsArr = axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(
        response => {
          let comments = [];
          response.data.forEach(comment => {
            if (comment.postId == post.id) {
              comments.push(comment);
            }
          })
          return comments;

        })
      .then(function(comments) {
        showComments(comments, post.id);
      });
    li.style.overflow = "scroll";
  };
  li.appendChild(button);

  ul.appendChild(li);

}


let showComments = (comments, postId) => {
  let targetLi = document.getElementById(`li-${postId}`);
  let clickedButton = document.getElementById(`button-${postId}`);
  let newCommentDiv = document.createElement('div');
  newCommentDiv.className = "comment";
  comments.forEach(comment => {
    let name = document.createElement('h4');
    name.innerText = comment.name;
    name.className = 'comment__author';

    let commentText = document.createElement('p');
    commentText.innerText = comment.body;
    commentText.className = 'comment__text';
    newCommentDiv.appendChild(name);
    newCommentDiv.appendChild(commentText);
  });

  targetLi.appendChild(newCommentDiv);
  clickedButton.disabled = true;
}