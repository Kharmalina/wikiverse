import React, {useState} from "react";

import apiURL from '../api';


export function Form({isAddingArticle, setIsAddingArticle, pages, setPages}) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [authorName, setAuthorName] = useState("");
    const [authorEmail, setAuthorEmail] = useState("");

    const [tags, setTags] = useState("");

    // console.log({title})

    // const articleData = {
    //     title: "Title is interesting2",
    //     content: "This article is interesting",
    //     name: "Ryan",
    //     email: "ryan@example.com",
    //     tags: "tagalicious123"
    //   };

      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const response = await fetch(`${apiURL}/wiki`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
            //   articleData // our data TO CREATE here
            {
                title: title,
                content: content,
                name: authorName,
                email: authorEmail,
                tags: tags
            }
            )
          });
          const data = await response.json();

        //   console.log(data.title)
        //   I need lines 49-51 if not I have to manually refresh to see the new submitted page
          setPages([...pages,
                data
            ]);

            setTitle("");
            setContent("");
            setAuthorName("");
            setAuthorEmail("");
            setTags("");
        } catch (err) {
            console.log("form error", err)
        }  
	  }


      


    return (
        <>
            <h1>WikiVerse</h1>
            <h2>Add a Page</h2>
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
                <button type="submit" >Create an Article!</button>
                <button onClick={() => setIsAddingArticle(false)}>Back to Wiki List!</button>
            </form>
        </>
    )
}