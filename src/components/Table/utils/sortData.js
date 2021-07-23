import sortMethods from './sortMethods'

export default function sortData (sortName, data, isAscending) {
  switch (sortName) {
    case 'userName':
    case 'email':
    case 'name':
    case 'surname':
      return sortMethods
        .sortString(data, isAscending, sortName)
    case 'phone':
    case 'age':
      return sortMethods
        .sortNumber(data, isAscending, sortName)
    case 'birthday':
      return sortMethods.sortDate(data, isAscending)
    default:
      return data
  }
}
