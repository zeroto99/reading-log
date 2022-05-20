import { useState } from 'react';
import styled from 'styled-components';

const StyledLi = styled.li`
  padding: 20px;
`;

const StyledUl = styled.ul`
  display: flex;
  align-items: center;
  gap: 5%;
  justify-content: space-between;

  .thumbnail {
    width: 120px;
  }
  .txt-wrap {
    width: 60%;
    height: 170px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .txt-wrap .title, .author {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .btn {
    width: 20%;
    flex: 1;
  }
  .select-btn {
    width: 100%;
    border: 1px solid;
    padding: 4px 10px;
  }
  .select-btn:focus {
    color: blue;
  }
`;


const SearchItem = ({ result, getherData }) => {
  return (
    <>
      {result.map((it) => (
        <StyledLi key={it.key}>
          <StyledUl className="item">
            <li><img className="thumbnail" src={it.thumbnail} alt='책 표지 이미지'/></li>
            <li className='txt-wrap'>
              <span className="title">{it.title}</span>
              <span className="author">{it.author}</span>
            </li>
            <li className='btn'><button className="select-btn" onClick={() => getherData(it.key, it.thumbnail, it.title, it.author)}>선택</button></li>
          </StyledUl>
        </StyledLi>
      ))}
    </>
  )
}

export default SearchItem;