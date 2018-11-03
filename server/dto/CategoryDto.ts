import { Asset } from 'contentful';
import Category from '../domain/Category';
import assetToUrl from './assetToUrl';

interface CategoryDto {
  name: string;
  image?: Asset;
}

export const dtoToDomain = (dto: CategoryDto): Category => {
  if (dto.image == null) {
    return dto;
  } else {
    return { name: dto.name, imageUrl: assetToUrl(dto.image) };
  }
};

export default CategoryDto;
