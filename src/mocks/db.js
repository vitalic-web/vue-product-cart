class Db {
  __entries = {
    products: {
      1: {
        id: 1,
        name: 'Cup',
        price: '122'
      },
      2: {
        id: 2,
        name: 'Pen',
        price: '23'
      },
      3: {
        id: 3,
        name: 'Notebook',
        price: '49'
      }
    },
    cart: {}
  }

  __set = null
  __id = null
  __entryName = null

  select (id) {
    this.__id = id
    this.__set = { ...this.__entries }
    return this
  }

  from (entryName) {
    this.__entryName = entryName
    this.__set = this.__id ? { ...this.__set[entryName][this.__id] } : { ...this.__set[entryName] }
    return this
  }

  add (entry) {
    if (this.__id) {
      console.warn('Ошибка составления запроса к данным. Новая запись не может быть добавлена в одиночную запись и будет добавлена в родительскую таблицу')
    }
    const entryId = Object.keys(this.__entries[this.__entryName]).length + 1
    this.__set = { id: entryId, ...entry }
    this.__entries[this.__entryName][entryId] = { ...this.__set }
    return this
  }

  update (entry) {
    if (!this.__id) {
      console.warn('Ошибка составления запроса к данным. Отсутствует идентификатор')
    }
    // const entryId = Object.keys(this.__entries[this.__entryName]).length + 1
    this.__set = { id: this.__id, ...entry }
    this.__entries[this.__entryName][this.__id] = { ...this.__set }
    return this
  }

  toArray () {
    if (this.__id) {
      console.warn('Ошибка составления запроса к данным. Одиночная запись не может быть массивом')
    } else {
      this.__set = Object.values(this.__set)
    }

    return this
  }

  build () {
    const result = this.__set
    this.__set = null
    this.__id = null
    return result
  }
}

export const db = new Db()
