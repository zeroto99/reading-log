import { useState } from 'react';
import styled from 'styled-components';


const ResultItem = ({ result, data, setData, addData }) => {
  return (
    <>
      {result.map((it) => (
        <li key={it.key}>
          <ul className="item">
            <li><img className="thumbnail" src={it.thumbnail} alt='책 표지 이미지'/></li>
            <li className="title">{it.title}</li>
            <li className="author">{it.author}</li>
            <li><button onClick={() => addData(it.key, it.thumbnail, it.title, it.author)}>선택</button></li>
          </ul>
        </li>
      ))}
    </>
  )
}

export default ResultItem;