import { ContentfulClientApi, Entry, EntryCollection } from 'contentful';
import Practitioner from '../domain/Practitioner';

const getPractitioners = async (
  client: ContentfulClientApi
): Promise<Entry<Practitioner>[]> => {
  const entries: EntryCollection<Practitioner> = await client.getEntries<
    Practitioner
  >({
    content_type: 'practitioner'
  });

  if (entries.items.length === 0) {
    throw new Error();
  }

  return entries.items;
};

export default getPractitioners;
