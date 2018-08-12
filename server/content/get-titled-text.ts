import {Asset, ContentfulClientApi, Entry, EntryCollection} from 'contentful';

interface TitledText {
  title: string;
  text: string;
}

interface TitledTextEntry extends TitledText {
  id: string;
}

const getTitledText = async (client: ContentfulClientApi, id: string): Promise<TitledText> => {
  const entries: EntryCollection<TitledTextEntry> = await client.getEntries<TitledTextEntry>({
    content_type: 'titledText'
  });

  return entries.items
    .filter(entry => entry.fields.id === id)
    .map(entry => ({
      title: entry.fields.title,
      text: entry.fields.text
    }))[0];
};

export default getTitledText;
