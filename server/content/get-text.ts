import { ContentfulClientApi, EntryCollection } from 'contentful';

interface Text {
  id: string;
  text: string;
}

const getText = async (
  client: ContentfulClientApi,
  id: string
): Promise<string> => {
  const entries = await client.getEntries<Text>({
    content_type: 'text'
  });

  return entries.items
    .filter(entry => entry.fields.id === id)
    .map(entry => entry.fields.text)[0];
};

export default getText;
