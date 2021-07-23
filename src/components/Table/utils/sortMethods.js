/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */

import getDate from './getDate'

const collator = new Intl.Collator('en')

const sortMethods = {
  sortString (data, isStringAsc, sortName) {
    const newArr = JSON.parse(JSON.stringify(data))
    switch (sortName) {
      case 'userName':
        if (isStringAsc) {
          return newArr.sort((a, b) => collator.compare(a.username, b.username))
        } return newArr.sort((a, b) => collator.compare(b.username, a.username))
      case 'email':
        if (isStringAsc) {
          return newArr.sort((a, b) => collator.compare(a.email, b.email))
        } return newArr.sort((a, b) => collator.compare(b.email, a.email))
      case 'name':
        if (isStringAsc) {
          return newArr.sort((a, b) => collator.compare(a.person.name, b.person.name))
        } return newArr.sort((a, b) => collator.compare(b.person.name, a.person.name))
      case 'surname':
        if (isStringAsc) {
          return newArr.sort((a, b) => collator.compare(a.person.surname, b.person.surname))
        } return newArr.sort((a, b) => collator.compare(b.person.surname, a.person.surname))
      default: {
        if (isStringAsc) {
          return newArr.sort((a, b) => collator.compare(a.username, b.username))
        } return newArr.sort((a, b) => collator.compare(b.username, a.username))
      }
    }
  },
  sortNumber (data, isNumberAsc, sortName) {
    const newArr = JSON.parse(JSON.stringify(data))
    switch (sortName) {
      case 'phone':
        if (isNumberAsc) {
          return newArr.sort((a, b) => collator.compare(a.phone, b.phone))
        } return newArr.sort((a, b) => collator.compare(b.phone, a.phone))
      case 'age':
        if (isNumberAsc) {
          return newArr.sort((a, b) => collator.compare(a.person.age, b.person.age))
        } return newArr.sort((a, b) => collator.compare(b.person.age, a.person.age))
      default: {
        if (isNumberAsc) {
          return newArr.sort((a, b) => collator.compare(a.person.age, b.person.age))
        } return newArr.sort((a, b) => collator.compare(b.person.age, a.person.age))
      }
    }
  },
  sortDate (data, isDateAsc) {
    const newArr = JSON.parse(JSON.stringify(data))
    if (isDateAsc) {
      return newArr.sort((a, b) => getDate(a) - getDate(b))
    } return newArr.sort((a, b) => getDate(b) - getDate(a))
  },
  search (data, input) {
    const newArr = JSON.parse(JSON.stringify(data))
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
