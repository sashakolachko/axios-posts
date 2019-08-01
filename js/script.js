axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(
    response => {
      response.data.forEach(post => {
        appendPosttoDOM(post);

      })
    });

axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
    console.log(response);
  })

let appendPosttoDOM = (post) => {
  let ul = document.getElementById('posts');
  let li = document.createElement('li');
  li.className = 'post__container';


  let title = document.createElement('h2');
  title.innerText = post.title;
  title.className = 'post__title';
  li.appendChild(title);

  let postText = document.createElement('p');
  postText.innerText = post.body;
  postText.className = 'post__text';

  li.appendChild(postText);
  let button = document.createElement('button');
  button.innerText = 'Show Comments';
  button.className = 'post__button';
  li.appendChild(button);

  ul.appendChild(li);

}