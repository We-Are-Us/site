import * as Yup from 'yup';
import Membership from '../domain/Membership';

interface MembershipDetailsDto {
  firstName: string;
  lastName: string;
  practiceName?: string;
  emailAddress: string;
  phoneNumber: string;
  username: string;
  password: string;
  passwordConfirm: string;
  membership: Membership;
}

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  practiceName: Yup.string(),
  emailAddress: Yup.string()
    .email('Must be a valid email address')
    .required('Email address is required'),
  phoneNumber: Yup.string().required(),
  // TODO: async validation to check not already in use
  // Username can only contain alphanumeric characters and
  // '_', '+', '-', or '.'. Username should have between 1 and 15 characters
  username: Yup.string()
    .required()
    .max(15),
  password: Yup.string().required('Password is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null])
    .required('Password confirm is required')
});

export default MembershipDetailsDto;
