import sortMethods from './sortMethods'

export default function sortData (sortName, data, isAscending) {
  switch (sortName) {
    case 'birthday':
      return sortMethods.sortDate(data, isAscending)
    default:
      return sortMethods.sort(data, isAscending, sortName)
  }
}
