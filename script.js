document.addEventListener('DOMContentLoaded', function() {
    fetch('posts.json')
        .then(response => response.json())
        .then(posts => {
            const postContainer = document.getElementById('post-container');
            
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.innerHTML = `
                    <img src="images/${post.image}" alt="${post.title}">
                    <h3>${post.title}</h3>
                    <p>${post.intro}</p>
                    <a href="posts/${post.id}.html" class="btn-secondary">Read More</a>
                `;
                postContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error loading posts:', error));
});
