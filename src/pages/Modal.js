import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import ResultList from "../components/ResultList";

const API_KEY = process.env.REACT_APP_KAKAO_API_KEY;



const Modal = ({ modal, setModal }) => {
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
        size: 20,
        target: 'title',
      };
      const res = await kakaoSearch(params);
      const requiredData = res.data.documents.map((it) => {
        return {
          thumbnail: it.thumbnail,
          title: it.title,
          author: it.authors
        }
      });
      setResult(requiredData);
    } catch(err) {
      console.log(`err: ${err}`)
    }
  }

  return (
    <>
      <div 
        className="modal-bg"
        ref={outside} 
        onClick={(e) => 
          {
            if(outside.current === e.target) {
              setModal(false)
            }
          }
        } 
      >
        <div className="modal">
          <input type="date" />
          <input
            name="query"
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)}
            type="text" 
          />
          <button onClick={getData}>검색</button>
          <ResultList result={result} />
          <button>추가하기</button>
          <button onClick={ () => setModal(false) }>취소하기</button>
        </div>
      </div>
    </>
  )
}

export default Modal;