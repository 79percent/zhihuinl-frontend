//搜索关键字高亮
export const highLightKeyword = (str, keyword) => {
  str = String(str)
  const arr = str.split(`${keyword}`)
  return arr.map((item, index) => {
    return (
      <>
        {index === 0 ? null : <span style={{ color: '#c00' }}>{keyword}</span>}
        <span>{item}</span>
      </>
    )
  })
}