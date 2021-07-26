export default function getFullDate(date, isTable) {
  const fullDate = date.split('.');

  if (fullDate[2].length === 2) {
    fullDate[2] = `19${fullDate[2]}`;
  }

  if (isTable) {
    return fullDate.join('.');
  } return fullDate.reverse().join('-');
}
