export default function getTitles (data) {
  // console.log('data', data);
  const keys = []
  const dataForTitles = Array.isArray(data) ? data[0] : data[Object.keys(data)[0]]

  for (const key in dataForTitles) {
    if (typeof dataForTitles[key] === 'object') {
      for (const key2 in dataForTitles[key]) {
        keys.push(key2)
      }
    } if (key !== 'person') {
      keys.push(key)
    }
  }

  return keys
}
