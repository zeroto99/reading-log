import { useRef, useState, useEffect } from "react";
import Modal from "./Modal";
import styled from 'styled-components';

const StyledList = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 960px;
  height: 600px;
  background: #efefef;
`;

const Home = () => {
  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem("item")) || []
  );
  const [modal, setModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('item', JSON.stringify(data));
  }, [data]);
  
  return (
    <>
      <StyledList>
        {data.map((it) => (
          <div key={it.key}>
            <img src={it.thumbnail} alt="책 표지 이미지" />
            <p>{it.title}</p>
            <p>{it.author}</p>
            <p>완독일: {it.date}</p>
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