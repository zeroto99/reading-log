import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import ResultList from "../components/ResultList";
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

const Modal = ({ modal, setModal, data, setData, addData }) => {
  const outside = useRef();
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState([]);

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

  return (
    <>
      <StyledModalBg
        ref={outside} 
        onClick={(e) => { 
          if(outside.current === e.target) setModal(false) 
        }} 
      >
        <StyledModal>
          <input type="date" />
          <input
            name="query"
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)}
            type="text" 
          />
          <button onClick={getData}>검색</button>
          <ResultList result={result} data={data} setData={setData} addData={addData}/>
          <button>추가하기</button>
          <button onClick={ () => setModal(false) }>취소하기</button>
        </StyledModal>
      </StyledModalBg>
    </>
  )
}

export default Modal;