import ResultItem from "./ResultItem";
import styled from 'styled-components';

const StyledList = styled.ul`
  height: 400px;
  overflow-y: scroll;
  padding: 20px;
`;

const ResultList = ({ result, data, setData, getherData }) => {
  return (
    <StyledList>
      <ResultItem result={result} data={data} setData={setData} getherData={getherData} />
    </StyledList>
  )
}

export default ResultList;