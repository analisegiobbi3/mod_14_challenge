async function deletePostHandler(event){
    event.preventDefault();
    const id = window.location.toString().split('/')[window.location.toString().split('/').length-1];
    //grabs the id from the URL
    //fetch allows your to delete a post
    const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            blog_id: id,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok){
        document.location.replace('/dashboard/')
    }else{
        alert(response.statusText)
    }
}

document.querySelector('#delete-post').addEventListener('click', deletePostHandler);