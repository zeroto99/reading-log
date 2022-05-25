import SearchItem from "./SearchItem";
import styled from 'styled-components';

const StyledList = styled.ul`
  height: 400px;
  overflow-y: scroll;
  padding: 20px;
  margin: 30px 0;
  background: #fffdeb47;
`;

const SearchList = ({ result, data, setData, getherData }) => {
  return (
    <StyledList>
      <SearchItem result={result} data={data} setData={setData} getherData={getherData} />
    </StyledList>
  )
}

export default SearchList;