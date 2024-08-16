//Master Scripts
// script.js

// Utility function to fetch file content
async function fetchFileContent(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }
    return response.text();
}

// Function to generate new post HTML from a text file
async function generatePostFromTextFile(fileName) {
    try {
        const fileContent = await fetchFileContent(`posts/${fileName}`);
        const [postHeader, postIntro, postMain, postConclusion] = fileContent.split('; ').map(part => part.split(': ')[1]);
        
        const postTitle = fileName.replace('.txt', '');
        const postHtmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Palrishita - ${postHeader}</title>
    <style>
        body { font-family: 'Arial', sans-serif; color: #f5f5f5; margin: 0; padding: 0; background-color: #1e1e1e; }
        a { text-decoration: none; color: #ff66b2; }
        a:hover { text-decoration: underline; }
        header { background-color: #333; padding: 20px; }
        .navbar { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 2em; color: #ff66b2; }
        nav ul { list-style: none; margin: 0; padding: 0; display: flex; }
        nav ul li { margin-left: 20px; }
        nav ul li a { color: #f5f5f5; font-size: 1.1em; }
        nav ul li a:hover { color: #ff66b2; }
        .post-header { background: url('images/${postTitle}.jpg') no-repeat center center/cover; height: 50vh; display: flex; justify-content: center; align-items: center; color: #fff; text-align: center; padding: 20px; border-bottom: 2px solid #ff66b2; }
        .post-header h1 { font-size: 2.5em; background-color: rgba(0, 0, 0, 0.5); padding: 10px; border-radius: 10px; }
        .post-content { padding: 40px; max-width: 800px; margin: 0 auto; }
        .post-content h2 { color: #ff66b2; }
        .post-content p { line-height: 1.6; }
        footer { background-color: #333; padding: 10px; text-align: center; color: #fff; }
        .btn-back { background-color: #ff66b2; color: #fff; padding: 10px 20px; border-radius: 5px; text-align: center; display: inline-block; margin-top: 20px; transition: background-color 0.3s ease; }
        .btn-back:hover { background-color: #ff3399; }
    </style>
</head>
<body>
    <header>
        <div class="navbar">
            <h1><a href="index.html" class="logo">Palrishita</a></h1>
            <nav>
                <ul>
                    <li><a href="index.html#about">About</a></li>
                    <li><a href="index.html#blog">Blog</a></li>
                    <li><a href="index.html#contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <section class="post-header">
        <h1>${postHeader}</h1>
    </section>

    <section class="post-content">
        <h2>Introduction</h2>
        <p>${postIntro}</p>

        <h2>Main Content</h2>
        <p>${postMain}</p>

        <h2>Conclusion</h2>
        <p>${postConclusion}</p>

        <a href="index.html" class="btn-back">Back to Blog</a>
    </section>

    <footer>
        <p>&copy; 2024 Palrishita. All Rights Reserved.</p>
    </footer>
</body>
</html>
        `;

        // Creating and downloading the HTML file
        const blob = new Blob([postHtmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${postTitle}.html`;
        link.click();
        URL.revokeObjectURL(url);
        
    } catch (error) {
        console.error('Error generating post:', error);
    }
}

// Function to update the home page with new posts
async function updateHomePage() {
    const postsSection = document.querySelector('.post-grid');
    const response = await fetch('posts/');
    const files = await response.text();
    
    const postFiles = files.split('\n').filter(file => file.endsWith('.txt'));
    
    for (const file of postFiles) {
        const fileName = file.trim();
        const postTitle = fileName.replace('.txt', '');
        
        const postHtmlLink = `${postTitle}.html`;
        const postImage = `images/${postTitle}.jpg`;
        
        const postHtml = `
<article class="post">
    <img src="${postImage}" alt="${postTitle}">
    <h3>${postTitle}</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et lectus quis sapien vehicula scelerisque.</p>
    <a href="${postHtmlLink}" class="btn-primary">Read More</a>
</article>
        `;
        postsSection.innerHTML += postHtml;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateHomePage();
});
