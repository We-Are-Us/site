import { ContentfulClientApi, Entry, EntryCollection } from 'contentful';
import Practitioner from '../domain/Practitioner';

const getPractitioner = async (
  client: ContentfulClientApi,
  identifier: string
): Promise<Entry<Practitioner>> => {
  const entries: EntryCollection<Practitioner> = await client.getEntries<
    Practitioner
  >({
    content_type: 'practitioner'
  });

  if (entries.items.length === 0) {
    throw new Error();
  }

  return entries.items[0];
};

export default getPractitioner;
