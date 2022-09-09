import React from 'react';

import apiURL from '../api';

export const Page = ({page, article, setArticle}) => {

  const handleClick = async () => {
    const res = await fetch (`${apiURL}/wiki/duff`);
    const data = await res.json();
    setArticle(data)
    article
    console.log(article)
  }

  return <>
    <h3 onClick={handleClick}>{page.title}</h3>
  </>
} 
	