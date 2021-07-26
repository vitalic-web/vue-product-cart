/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */

import getFullDate from './getFullDate';
import getUserAge from './getUserAge';

export default function transformData(usersData) {
  const newArr = [];
  const do_not_show_it_in_UI = Symbol('do_not_show_it_in_UI');

  usersData.forEach((item) => {
    const el = {
      username: item.username,
      phone: item.phone ? item.phone : '',
      email: item.email ? item.email : '',
      person: {
        name: item.person.name,
        surname: item.person.surname,
        birthday: getFullDate(item.person.birthday, true),
        age: getUserAge(item.person.birthday),
      },
      [do_not_show_it_in_UI]: 'be-e-e-e',
    };

    newArr.push(el);
  });

  return newArr;
}
