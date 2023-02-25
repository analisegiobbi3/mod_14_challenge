const commentHandler = async (event) =>{
    event.preventDefault();
    const comment = document.querySelector('textarea [name="comment-content"').value;


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