import { Asset } from 'contentful';

interface Practitioner {
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

export default Practitioner;
