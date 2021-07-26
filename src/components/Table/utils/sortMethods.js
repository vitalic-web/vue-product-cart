/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */

import getDate from './getDate'
import fromObjToArr from './fromObjToArr'

const collator = new Intl.Collator('en')

const sortMethods = {
  sort (data, isStringAsc, sortName) {
    const newArr = Array.isArray(data) ? JSON.parse(JSON.stringify(data)) : fromObjToArr(data)
    if (isStringAsc) {
      return newArr.sort((a, b) => {
        if (a[sortName]) {
          return collator.compare(a[sortName], b[sortName])
        } else {
          if (a.person) {
            return collator.compare(a.person[sortName], b.person[sortName])
          }
        }
      })
    } else {
      return newArr.sort((a, b) => {
        if (a[sortName]) {
          return collator.compare(b[sortName], a[sortName])
        } else {
          if (a.person) {
            return collator.compare(b.person[sortName], a.person[sortName])
          }
        }
      })
    }
  },
  sortDate (data, isDateAsc) {
    const newArr = JSON.parse(JSON.stringify(data))
    if (isDateAsc) {
      return newArr.sort((a, b) => getDate(a) - getDate(b))
    } return newArr.sort((a, b) => getDate(b) - getDate(a))
  },
  search (data, input) {
    const newArr = Array.isArray(data) ? JSON.parse(JSON.stringify(data)) : fromObjToArr(data)
    return newArr.filter((item) => {
      for (let key in item) {
        if (String(item[key]).toLowerCase().includes(input.toLowerCase())) {
          return String(item[key]).toLowerCase().includes(input.toLowerCase())
        } if (typeof (item[key]) === 'object') {
          for (let key2 in item[key]) {
            if (String(item[key][key2]).toLowerCase().includes(input.toLowerCase())) {
              return String(item[key][key2]).toLowerCase().includes(input.toLowerCase())
            }
          }
        }
      }
    })
  }
}

export default sortMethods
