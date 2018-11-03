import { Asset } from 'contentful';

const assetToUrl = (asset?: Asset) => {
  if (asset != null) {
    return asset.fields.file.url;
  }

  return undefined;
};

export default assetToUrl;
