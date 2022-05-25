import { useRef, useState, useEffect } from "react";
import Modal from "./Modal";
import styled from 'styled-components';

const StyledAside = styled.aside`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  position: absolute;
  left: 0;
  background: #fdfde8;

  h1 {
    color: #5a695a;
    font-size: 80px;
  }
`;

const StyledMain = styled.main`
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  overflow: hidden;

  .controlMenu {
    position: absolute;
    top: 10px;
    right: 60px;
    width: 160px;
    padding: 10px;
    border: none;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    background: #5a695a;
    color: #fffdeb;
    text-align: center;
  }
`;

const StyledList = styled.section`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-start;
  align-items: center;
  gap: 5%;
  padding: 60px;
  overflow-y: scroll;

  h1 {
    margin: 0 auto;
    color: #4e574e;
  }
`;

const StyledItem = styled.article`
  width: 30%;
  padding: 10px;
  font-size: 14px;
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
  position: relative;

  .thumbnail {
    width: 130px;
    margin: 0 auto;
  }

  .title {
    font-size: 16px;
    font-weight: 600;
    margin-top: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: 10px;
  }

  .date {
    margin: 10px 0 30px 0;
  }

  .remove-btn {
    position: absolute;
    bottom: 10px;
    right: 10px;
    padding: 2px 6px;
    border: 1px solid #767676;
    border-radius: 10px;
    line-height: 20px;
    font-size: 12px;
  }
`;

export const StyledBtn = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 160px;
  padding: 10px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
  background: #5a695a;
  color: #fffdeb;
`;

const sortOptionList = [
  {value: 'latest', name: '최신순'},
  {value: 'oldest', name: '오래된 순'},
]

const ControlMenu = ({value, onChange, optionList}) => {
  return (
    <select className='controlMenu' value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  )
}

const Home = () => {
  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem("item")) || []
  );
  const [modal, setModal] = useState(false);
  const [sortType, setSortType] = useState('latest');

  useEffect(() => {
    localStorage.setItem('item', JSON.stringify(data));
  }, [data]);

  const onRemove = (targetKey) => {
    console.log('타겟이제거됨');
    const newData = data.filter((it) => it.key !== targetKey);
    setData(newData);
  }

  const getProcessedList = () => {
    const compare = (a,b) => {
      if(sortType === 'latest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    }
    const copyList = JSON.parse(JSON.stringify(data));
    const sortedList = copyList.sort(compare);
    return sortedList;
  }
  
  return (
    <>
      <StyledAside>
        <h1>READING LOG</h1>
        <StyledBtn onClick={ () => setModal(true) }>추가하기</StyledBtn>
      </StyledAside>
      <StyledMain>
        <ControlMenu 
          value={sortType}
          onChange={setSortType}
          optionList={sortOptionList}
        />
        <StyledList>
          {data.length >= 1 ? 
            getProcessedList().map((it) => (
              <StyledItem key={it.key}>
                <img className="thumbnail" src={it.thumbnail} alt="책 표지 이미지" />
                <p className="title">{it.title}</p>
                <p className="author">{it.author}</p>
                <p className="date">완독일: {it.date}</p>
                <button
                  className="remove-btn"
                  onClick={() => {
                    console.log(it.key);
                    if(window.confirm(`${it.title}를(을) 내 서재에서 삭제하시겠습니까?`)) {
                      onRemove(it.key);
                    }
                  }}
                >삭제하기</button>
              </StyledItem>
            )) 
            : <h1>로그를 추가해주세요!</h1>
          }
        </StyledList>
      </StyledMain>
      {
        modal === true
        ? <Modal modal={modal} setModal={setModal} data={data} setData={setData} />
        : null
      }
    </>
  )
}

export default Home;