import { useRef, useState, useEffect } from "react";
import Modal from "./Modal";
import styled from 'styled-components';

const StyledList = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 960px;
  height: 600px;
  padding: 20px;
  background: #efefef;
  overflow-y: scroll;
`;

const sortOptionList = [
  {value: 'latest', name: '최신순'},
  {value: 'oldest', name: '오래된 순'},
]

const ControlMenu = ({value, onChange, optionList}) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
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
      <ControlMenu 
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
      <StyledList>
        {getProcessedList().map((it) => (
          <div key={it.key}>
            <img src={it.thumbnail} alt="책 표지 이미지" />
            <p>{it.title}</p>
            <p>{it.author}</p>
            <p>완독일: {it.date}</p>
            <button onClick={() => {
              console.log(it.key);
              if(window.confirm(`${it.title}를 삭제하시겠습니까?`)) {
                onRemove(it.key);
              }
            }}
            >삭제하기</button>
          </div>
        ))}
      </StyledList>
      <button onClick={ () => setModal(true) }>클릭하면 모달이 열림</button>
      {
        modal === true
        ? <Modal modal={modal} setModal={setModal} data={data} setData={setData} />
        : null
      }
    </>
  )
}

export default Home;