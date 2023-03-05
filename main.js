const post_el = document.querySelector('.post');
const post_list = document.querySelector('.post-list');
const com = document.querySelector('.for-comments-ul');


const xhr = new XMLHttpRequest();
const xhrComments = new XMLHttpRequest();

xhr.open('GET', "https://jsonplaceholder.typicode.com/posts");
xhr.responseType = 'json';

xhrComments.open('GET', "https://jsonplaceholder.typicode.com/comments");
xhrComments.responseType = 'json';

xhr.send();
xhrComments.send();


xhr.onload = () => {
    const posts = xhr.response;

    for(const post of posts){
        const postEl = document.importNode(post_el.content, true);
        postEl.querySelector('h2').textContent = post.title;
        postEl.querySelector('p').textContent = post.body;

        xhrComments.onload = () => {
            var comments = xhrComments.response;
            console.log(comments);
            for(const comment of comments){
                if(comment.postId == post.id){
                    console.log(comment.body);
                    const li = document.createElement('li');
                    li.textContent = comment.body;
                    li.setAttribute('class','comment');
                    com.append(li);
                }
            }
        }

        post_list.appendChild(postEl);
    }
}
