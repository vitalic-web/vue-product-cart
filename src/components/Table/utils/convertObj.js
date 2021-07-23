export default function convertObj (obj) {
  const newObj = {}

  for (const key in obj) {
    if (typeof (obj[key]) === 'object') {
      for (const key2 in obj[key]) {
        newObj[key2] = obj[key][key2]
      }
    } else {
      newObj[key] = obj[key]
    }
  }

  return newObj
}
