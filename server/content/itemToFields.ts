import { Entry } from 'contentful';

const itemToFields = (item: Entry<any>): any => item.fields;

export default itemToFields;
