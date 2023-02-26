async function editPostHandler(event){
    event.preventDefault();
    const title = document.querySelector('input[name="edit-blog-post-title"]').value.trim();
    const content = document.querySelector('input[name="edit-blog-post-content"]').value.trim();
    const id = window.location.toString().split('/')[window.location.toString().split('/').length-1];

    const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            blog_id: id,
            title,
            content,
        }),
        header: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok){
        document.location.replace('/dashboard/')
    }else{
        alert(response.statusText)
    }
}

document.querySelector('#edit-post').addEventListener('submit', editPostHandler);