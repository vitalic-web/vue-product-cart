export default function fromObjToArr (obj) {
  console.log('obj', obj)
  const newArr = []
  for (const key in obj) {
    newArr.push(obj[key])
  }
  console.log('newArr', newArr)
  return newArr
};
