import { Connection, InsertResult } from 'typeorm';
import { Practitioner } from '../entity/Practitioner';

export const createPractitioner = async (
  connection: Connection,
  values: Practitioner
): Promise<Practitioner> => connection.getRepository(Practitioner).save(values);
