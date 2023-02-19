const postHandler = async (event) =>{
    event.preventDefault();
    const post_title = document.querySelector('input [name="blog-title"').value;
    const post_text = document.querySelector('textarea [name="blog-text"').value;

    const response = await('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({
            post_title,
            post_text
        }),
        header:{
            'Content-Type': 'application/json'
        }
    });

    if(response.ok){
        document.location.replace('/dashboard')
    }else{
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', postHandler);