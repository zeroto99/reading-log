import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import SearchList from "../components/SearchList";
import styled from 'styled-components';

const API_KEY = process.env.REACT_APP_KAKAO_API_KEY;

const StyledModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.15);
  backdrop-filter: blur(5px);
  z-index: 20;
`;

const StyledModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  padding: 20px;
  background: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  .btn-wrapper {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
`;

const StyledForm = styled.form`
  text-align: center;

  label {
    font-size: 13px;
    font-weight: 700;
    color: #5a695a;
  }
  .date {
    width: 300px;
    margin: 10px 0 0 10px;
    padding: 4px 9px;
    border: none;
    border-bottom: 1px solid #5a695a;

  }
  .search-inp {
    width: 299px;
    padding: 10px;
    margin-left: 14px;
    outline: none;
    border: none;
    border-bottom: 1px solid #5a695a;
  }
  button {
    display: none;
  }
`;

const StyledBtn = styled.button`
  width: 100px;
  padding: 10px;
  border-radius: 20px;
  border: none;
  background: #5a695a;
  color: #fdfde8;
`;

const Modal = ({ modal, setModal, data, setData }) => {
  const outside = useRef();
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [item, setItem] = useState([]);
  const [search, setSearch] = useState(false);

  const kakao = axios.create({
    baseURL: 'https://dapi.kakao.com',
    headers: {
      Authorization: API_KEY
    }
  });
  
  const kakaoSearch = params => {
    return kakao.get('/v3/search/book', {params})
  }

  const getData = async(e) => {
    e.preventDefault();
    try {
      const params = {
        query: keyword,
        size: 40,
        target: 'title',
      };
      const res = await kakaoSearch(params);
      const requiredData = res.data.documents.map((it) => {
        return {
          thumbnail: it.thumbnail,
          title: it.title,
          author: it.authors,
          key: it.isbn
        }
      });
      setSearch(true);
      setResult(requiredData);
    } catch(err) {
      console.log(`err: ${err}`)
    }
  }

  const getherData = (key, thumbnail, title, author) => {
    if(data.map(it => it.key.includes(key)).indexOf(true) !== -1) {
      window.confirm(`로그에 이미 등록된 도서입니다.`);
    } else {
      const newItem = {
        key: key,
        thumbnail: thumbnail, 
        title: title, 
        author: author,
        date: date
      }
      setItem(newItem);
    }
  }

  const addData = () => {
    if(item.length == 0) {
      alert('도서를 선택하세요.');
    } else {
      setData([item, ...data]);
      setModal(false);
    } 
  }

  return (
    <>
      <StyledModalBg
        ref={outside} 
        onClick={(e) => { 
          if(outside.current === e.target) setModal(false) 
        }} 
      >
        <StyledModal>
          <StyledForm onSubmit={getData}>
            <label htmlFor="search">검색어</label>
            <input
              className="search-inp"
              id="search"
              name="query"
              value={keyword} 
              onChange={(e) => setKeyword(e.target.value)}
              type="text" 
              placeholder="도서 제목을 입력해주세요."
              autoComplete="off"
            />
            <button type="submit">검색</button>
          </StyledForm>
          {
            search && <StyledForm>
              <label htmlFor="date">완독일 </label>
              <input
                className="date"
                id="date"
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
              >
              </input> 
            </StyledForm>
          }
          {
            search && <SearchList result={result} data={data} setData={setData} getherData={getherData} />
          }
          {
            search && <div className="btn-wrapper">
              <StyledBtn onClick={addData}>추가하기</StyledBtn>
              <StyledBtn onClick={ () => setModal(false) }>취소하기</StyledBtn>
            </div>
          }
        </StyledModal>
      </StyledModalBg>
    </>
  )
}

export default Modal;