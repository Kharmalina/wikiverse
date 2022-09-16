import React from "react";

import apiURL from '../api';

import { Update } from "./Update";



export function Article ({article, setArticle, pages, setPages, buttonText, setButtonText, isUpdatingArticle, setIsUpdatingArticle}) {

    const day = new Date(article.createdAt).getUTCDate();
    const month = new Date(article.createdAt).getUTCMonth();
    const year = new Date(article.createdAt).getUTCFullYear();

    // console.log(article) // particular article/object 
    
    const handleClick = async () => {
        // window.location.reload(false)
        // console.log(article)
        const response = await fetch(`${apiURL}/wiki/${article.slug}`, {
             method: "DELETE"
        });
        const data = await response.json();
        // re-fetch the new list of articles - does not include deleted article
        const res = await fetch(`${apiURL}/wiki`);
        const pagesData = await res.json();
        setPages(pagesData);
        // setButtonText(false)
        setArticle(null)
    }


    return <>
        {isUpdatingArticle ? 
        (<div>< Update isUpdatingArticle={isUpdatingArticle} setIsUpdatingArticle={setIsUpdatingArticle} pages={pages} setPages={setPages} setArticle={setArticle} article={article}/></div> 
        ) : (<div className="article">
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
            <button onClick={() => setIsUpdatingArticle(true)}>Update Page</button>
            <br></br>
            <button onClick={() => setArticle(null)}>If you change your mind...Back to Wiki List!</button>
        </div>)}
    </>
}