import React, {useState} from "react";

import apiURL from '../api';


export function Update({isUpdatingArticle, setIsUpdatingArticle, pages, setPages, article, setArticle}) {

    const [title, setTitle] = useState(article.title);
    const [content, setContent] = useState(article.content);

    const [authorName, setAuthorName] = useState(article.author.name);
    const [authorEmail, setAuthorEmail] = useState(article.author.email);

    const [tags, setTags] = useState(article.tags[0].name);

    // console.log({title})

    // const articleData = {
    //     title: "Title is interesting2",
    //     content: "This article is interesting",
    //     name: "Ryan",
    //     email: "ryan@example.com",
    //     tags: "tagalicious123"
    //   };

    // console.log(pages) // entire array of current article list

    console.log(article) // one article/object

        const handleSubmit = async (event) => {
        window.location.reload(false)
        event.preventDefault();
            const response = await fetch(`${apiURL}/wiki/${article.slug}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                },
            body: JSON.stringify({
            // our NEW/UPDATED data here
                title: title,
                content: content,
                name: authorName,
                email: authorEmail,
                tags: tags
            })
        })
            const data = await response.json();
            setPages([...pages,
                data
            ]);

            setTitle("");
            setContent("");
            setAuthorName("");
            setAuthorEmail("");
            setTags("");
    }


    return (
        <>
            <h1>WikiVerse</h1>
            <h2>Update an Article</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <input placeholder="Title" type="text" aria-label="title" value={title} onChange={event => setTitle(event.target.value)}/>
                </div>
                <div>
                <input placeholder="Article Content" type="text" aria-label="article-content" value={content} onChange={event => setContent(event.target.value)} />
                </div>
                <div>
                <input placeholder="Author Name" type="text" aria-label="author-name" value={authorName} onChange={event => setAuthorName(event.target.value)} />
                </div>
                <div>
                <input placeholder="Author Email" type="email" aria-label="author-email" value={authorEmail} onChange={event => setAuthorEmail(event.target.value)} />
                </div>
                <div>
                <input placeholder="Tags" type="text" aria-label="tags" value={tags} onChange={event => setTags(event.target.value)} />
                </div>
                <button type="submit" >Update an Article!</button>
                <button onClick={() => setIsUpdatingArticle(false)}>Back to Article</button>
            </form>
        </>
    )
}