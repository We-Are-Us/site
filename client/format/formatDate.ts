import * as months from 'months';

const formatDate = (date: Date) =>
  `${months[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`;

export default formatDate;
