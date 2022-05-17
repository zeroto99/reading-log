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
`;

const StyledModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 500px;
  background: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const Modal = ({ modal, setModal, data, setData }) => {
  const outside = useRef();
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [item, setItem] = useState([]);

  const kakao = axios.create({
    baseURL: 'https://dapi.kakao.com',
    headers: {
      Authorization: API_KEY
    }
  });
  
  const kakaoSearch = params => {
    return kakao.get('/v3/search/book', {params})
  }

  const getData = async() => {
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
      setResult(requiredData);
    } catch(err) {
      console.log(`err: ${err}`)
    }
  }

  const getherData = (key, thumbnail, title, author) => {
    if(data.map(it => it.key.includes(key)).indexOf(true) !== -1) {
      window.confirm(`내서재에 이미 등록된 도서입니다.`);
    } else {
      console.log('새로 등록 가능');
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
    setData([item, ...data]);
    setModal(false);
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
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            name="query"
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)}
            type="text" 
            placeholder="도서 제목을 입력해주세요."
            autoComplete="off"
          />
          <button onClick={getData}>검색</button>
          <SearchList result={result} data={data} setData={setData} getherData={getherData}/>
          <button onClick={addData}>추가하기</button>
          <button onClick={ () => setModal(false) }>취소하기</button>
        </StyledModal>
      </StyledModalBg>
    </>
  )
}

export default Modal;