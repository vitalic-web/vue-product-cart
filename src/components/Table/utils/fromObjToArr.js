export default function fromObjToArr (obj) {
  const newArr = []
  for (const key in obj) {
    newArr.push(obj[key])
  }
  return newArr
};
