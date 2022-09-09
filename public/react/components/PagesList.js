import React from 'react';
import { Page } from './Page';

export const PagesList = ({pages, article, setArticle}) => {
	
	return <>
		{
			article ? article : pages.map((page, idx) => {
				return <Page page={page} key={idx} article={article} setArticle={setArticle} />
			})
		}
	</>
} 
