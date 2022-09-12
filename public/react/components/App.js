import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';
import { Article } from "./Article"


// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [pages, setPages] = useState([]);
	// console.log(pages)

	// set the article data on state (a new piece of state)
	const [article, setArticle] = useState(null)

	async function fetchPages(){
		try {
			const response = await fetch(`${apiURL}/wiki`);
			const pagesData = await response.json();
			setPages(pagesData);
			// console.log(pagesData)
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchPages();
	}, []);


	const fetchArticleData = async (page) => {
		// console.log(page)
		const res = await fetch (`${apiURL}/wiki/${page.slug}`);
		const articleData = await res.json();
		setArticle(articleData)
		console.log(articleData)
	  }

	return <>
		{
			article ?
			<div>
				<Article setArticle={setArticle} article={article}/>
			</div> 
			: 
			<main>	
				<h1>WikiVerse</h1>
				  	<h2>An interesting 📚</h2>
				  	<PagesList pages={pages} fetchArticleData={fetchArticleData}/>
			</main>
		}
	</>
}