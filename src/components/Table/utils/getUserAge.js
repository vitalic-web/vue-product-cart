/* eslint-disable no-plusplus */

import getFullDate from './getFullDate';

export default function getUserAge(date) {
  const userDate = new Date(getFullDate(date));
  const currentDate = new Date();
  let age = currentDate.getFullYear() - userDate.getFullYear();
  const monthDiff = currentDate.getMonth() - userDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < userDate.getDate())) {
    age--;
  }

  return age;
}
