import * as React from 'react';
import { ErrorMessage, Field, Formik, FormikActions } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';

interface Values {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

const initialValues: Values = {
  firstName: '',
  lastName: '',
  emailAddress: '',
  phoneNumber: '',
  username: '',
  password: '',
  passwordConfirm: ''
};

const validationSchema = Yup.object().shape({
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

const onSubmit = (values: Values, { setSubmitting }: FormikActions<Values>) => {
  setTimeout(() => {
    // tslint:disable-next-line:no-console
    console.log('values', values);
    setSubmitting(false);
  }, 50);
};

const MembershipDetailsForm: React.FunctionComponent<{}> = () => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ dirty, handleSubmit, isSubmitting, isValid }) => (
      <form
        onSubmit={handleSubmit}
        className={cn('needs-validation', {
          'was-validated': dirty
        })}
      >
        <div className="row">
          <div className="col-12 col-sm-6 pb-2">
            <label htmlFor="firstName">First name</label>
            <Field
              id="firstName"
              name="firstName"
              type="text"
              className="form-control form-control-secondary"
              placeholder="First name"
              required="true"
            />
            <ErrorMessage
              name="firstName"
              className="invalid-feedback"
              component="div"
            />
          </div>
          <div className="col-12 col-sm-6 pb-2">
            <label htmlFor="lastName">Last name</label>
            <Field
              id="lastName"
              name="lastName"
              type="text"
              className="form-control form-control-secondary"
              placeholder="Last name"
              required="true"
            />
            <ErrorMessage
              name="lastName"
              className="invalid-feedback"
              component="div"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6 pb-2">
            <label htmlFor="emailAddress">Email address</label>
            <Field
              id="emailAddress"
              name="emailAddress"
              type="email"
              className="form-control form-control-secondary"
              placeholder="you@example.com"
              required="true"
            />
            <ErrorMessage
              name="emailAddress"
              className="invalid-feedback"
              component="div"
            />
          </div>
          <div className="col-12 col-sm-6 pb-2">
            <label htmlFor="phoneNumber">Phone number</label>
            <Field
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              className="form-control form-control-secondary"
              required="true"
            />
            <ErrorMessage
              name="phoneNumber"
              className="invalid-feedback"
              component="div"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="username">Account username</label>
          <Field
            id="username"
            name="username"
            type="text"
            className="form-control form-control-secondary"
            required="true"
          />
          <ErrorMessage
            name="username"
            className="invalid-feedback"
            component="div"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Create account password</label>
          <Field
            id="password"
            name="password"
            type="password"
            className="form-control form-control-secondary"
            required="true"
          />
          <ErrorMessage
            name="password"
            className="invalid-feedback"
            component="div"
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordConfirm">Confirm password</label>
          <Field
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            className="form-control form-control-secondary"
            required="true"
          />
          <ErrorMessage
            name="passwordConfirm"
            className="invalid-feedback"
            component="div"
          />
        </div>
        <button
          className="btn btn-primary btn-lg"
          disabled={isSubmitting || !isValid}
        >
          Save
        </button>
      </form>
    )}
  </Formik>
);

export default MembershipDetailsForm;
