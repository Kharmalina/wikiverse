import React, {useState, useEffect} from "react";

import apiURL from '../api';


export function Update({isUpdatingArticle, setIsUpdatingArticle, pages, setPages, article, setArticle}) {

    const [title, setTitle] = useState(article.title);
    const [content, setContent] = useState(article.content);

    const [authorName, setAuthorName] = useState(article.author.name);
    const [authorEmail, setAuthorEmail] = useState(article.author.email);

    const tagName = article.tags.map((tag) => tag.name)
    // console.log(tagName)

    const [tags, setTags] = useState(tagName);
    // console.log(tagName)
    // console.log(tags)


    const handleUpdate = async (event) => {
            
        // window.location.reload(false)
        // event.preventDefault();
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
            console.log("this one here", data)
            // setPages([...pages,
            //     data
            // ]);

            // setArticle({...article,
            //     author: {
            //         ...article.author,
            //         name: authorName,
            //         email: authorEmail
            //     },
            //     tags: [{
            //         ...article.tags,
            //         tags: tags
            //     }]
            // })

            // setArticle({...article,
            //     tags: [{
            //         ...article.tags,
            //         tags: tags
            //     }]
            // })

            console.log(article)
            
            // setTitle(title);
            // setContent(content);
            // setAuthorName(authorName);
            // setAuthorEmail(authorEmail);
            // setTags(tags);

            // setTitle("");
            // setContent("");
            // setAuthorName("");
            // setAuthorEmail("");
            setTags("");


 
        


        // setIsUpdatingArticle(false)
        // setArticle(null)
    }

    useEffect(() => {
		handleUpdate();
	}, []);

    const handleUpdateReal = async (event) => {
            
        window.location.reload(false)
        try{event.preventDefault();
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
            console.log("this one here", data)
            // setPages([...pages,
            //     data
            // ]);

            // setArticle({...article,
            //     author: {
            //         ...article.author,
            //         name: authorName,
            //         email: authorEmail
            //     },
            //     tags: [{
            //         ...article.tags,
            //         tags: tags
            //     }]
            // })

            // setArticle({...article,
            //     tags: [{
            //         ...article.tags,
            //         tags: tags
            //     }]
            // })

            console.log(article)
            // setTitle("");
            // setContent("");
            // setAuthorName("");
            // setAuthorEmail("");
            // setTags("");
        } catch (err){
            console.log("update error", err);
            if (err.name === 'SequelizeUniqueConstraintError') {
                response.status(403)
                response.send({ status: 'error', message: "User already exists"});
            } else {
                response.status(500)
                response.send({ status: 'error', message: "Something went wrong"});
            }
        }


        // setIsUpdatingArticle(false)
        // setArticle(null)
    }
    

    return (
        <>
            <h1>WikiVerse</h1>
            <h2>Update an Article</h2>
            <form onSubmit={handleUpdateReal}>
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
                <br></br>
                <h4><strong>*Original tags will be lost once updated*</strong></h4>
                <button type="submit" >Edit Article!</button>
                <button onClick={() => setIsUpdatingArticle(false)}>Back to Article</button>
                {/* <button onClick={() => setArticle(false)}>Back to Wiki List</button> */}
            </form>
        </>
    )
}