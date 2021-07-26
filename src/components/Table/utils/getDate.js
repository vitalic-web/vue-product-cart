import getFullDate from './getFullDate';

export default function getDate(user) {
  return new Date(getFullDate(user.person.birthday));
}
