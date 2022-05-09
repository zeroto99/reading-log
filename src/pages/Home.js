import { useRef, useState } from "react";
import Modal from "./Modal";

const Home = () => {
  const [modal, setModal] = useState(false);
  
  return (
    <>
      <section className="list"></section>
      <button onClick={ () => setModal(true) }>클릭하면 모달이 열림</button>
      {
        modal === true
        ? <Modal modal={modal} setModal={setModal}/>
        : null
      }
    </>
  )
}


export default Home;