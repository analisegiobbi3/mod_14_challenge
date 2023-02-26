const commentHandler = async (event) =>{
    event.preventDefault();
    const comment_content = document.querySelector('input[name="comment-body"]').value.trim();
    const blog_id = window.location.toString().split('/')[window.location.toString().split('/').length-1];

    const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
            blog_id,
            comment_content,
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    });

    if(response.ok){
        document.location.reload();
    }else{
        alert(response.statusText);
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentHandler);