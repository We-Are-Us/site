import { Asset } from 'contentful';
import Practitioner from '../domain/Practitioner';
import assetToUrl from './assetToUrl';

interface PractitionerDto {
  identifier: string;
  headerPhoto?: Asset;
  profilePhoto?: Asset;
  title: string;
  aboutTitle?: string;
  aboutText: string;
  contactLocation: string;
  contactPhone: string;
  contactEmail: string;
}

export const dtoToDomain = (dto: PractitionerDto): Practitioner => ({
  identifier: dto.identifier,
  headerPhotoUrl: assetToUrl(dto.headerPhoto),
  profilePhotoUrl: assetToUrl(dto.profilePhoto),
  title: dto.title,
  aboutTitle: dto.aboutTitle,
  aboutText: dto.aboutText,
  contactLocation: dto.contactLocation,
  contactPhone: dto.contactPhone,
  contactEmail: dto.contactEmail
});

export default PractitionerDto;
