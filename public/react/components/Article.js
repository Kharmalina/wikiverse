import React from "react";

export function Article ({article, setArticle}) {

    const day = new Date(article.createdAt).getUTCDate();
    const month = new Date(article.createdAt).getUTCMonth();
    const year = new Date(article.createdAt).getUTCFullYear();

    return <>
        <div className="article">
            <h2>{article.title}</h2>
            <br></br>
            <div><strong>Author: </strong>{article.author.name}</div>
            <br></br>
            <div><strong>Published: </strong>{`${month + 1}/${day}/${year}`}</div>
            <br></br>
            <div><strong>Tags: </strong>
            {
                article.tags.map((tag, idx) => <div key={idx}>{tag.name}</div>)
            }
            </div>
            <br></br>
            {/* null is false as a falsy value */}
            <br></br>
            <button onClick={() => setArticle(null)}>Back to Wiki List!</button>
        </div>
    </>
}