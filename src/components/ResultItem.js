const ResultItem = ({ result }) => {
  console.log(result);
  return (
    <>
      <h1>{result.length}개의 결과가 있습니다.</h1>
      {result.map((it) => (
        <ul>
          <li><img src={it.thumbnail} alt='책 표지 이미지'/></li>
          <li>{it.title}</li>
          <li>{it.author}</li>
        </ul>
      ))}
    </>
  )
}

export default ResultItem;