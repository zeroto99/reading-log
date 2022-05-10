import ResultItem from "./ResultItem";
import styled from 'styled-components';

const StyledList = styled.ul`
  height: 400px;
  overflow-y: scroll;
  padding: 20px;
`;

const ResultList = ({ result, data, setData, addData }) => {
  return (
    <StyledList>
      <ResultItem result={result} data={data} setData={setData} addData={addData} />
    </StyledList>
  )
}

export default ResultList;