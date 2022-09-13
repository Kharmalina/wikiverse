import React from "react";

import apiURL from '../api';


export function Article ({article, setArticle, pages, setPages, buttonText, setButtonText}) {

    const day = new Date(article.createdAt).getUTCDate();
    const month = new Date(article.createdAt).getUTCMonth();
    const year = new Date(article.createdAt).getUTCFullYear();

    console.log(article)
    
    const handleClick = async () => {
        window.location.reload(false)
        // console.log(article)
        const response = await fetch(`${apiURL}/wiki/${article.slug}`, {
             method: "DELETE"
        });
        const data = await response.json();

        const res = await fetch(`${apiURL}/wiki`);
        const pagesData = await res.json();
        setPages(pagesData);
        // setButtonText(false)
    }


    return <>
        <div className="article">
            <h2>{article.title}</h2>
            <br></br>
            <div><strong>Author: </strong>{article.author.name}</div>
            <br></br>
            <div><strong>Published: </strong>{`${month + 1}/${day}/${year}`}</div>
            <br></br>
            <div>{article.content}</div>
            <br></br>
            <div><strong>Tags: </strong>
            {
                article.tags.map((tag, idx) => <div key={idx}>{tag.name}</div>)
            }
            </div>
            {/* null is false as a falsy value */}
            <br></br>
            <button onClick={handleClick}>DELETE</button>
            <br></br>
            <button onClick={() => setArticle(null)}>If you change your mind...Back to Wiki List!</button>
        </div>
    </>
}