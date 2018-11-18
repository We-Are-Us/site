import * as Yup from 'yup';
import Membership from '../domain/Membership';

interface MembershipDetailsDto {
  firstName: string;
  lastName: string;
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
  emailAddress: Yup.string()
    .email('Must be a valid email address')
    .required('Email address is required'),
  phoneNumber: Yup.string().required(),
  // TODO: async validation to check not already in use
  username: Yup.string().required(),
  password: Yup.string().required('Password is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null])
    .required('Password confirm is required')
});

export default MembershipDetailsDto;
