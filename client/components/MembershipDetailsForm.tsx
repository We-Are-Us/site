import * as React from 'react';
import { ErrorMessage, Field, Formik, FormikActions } from 'formik';
import cn from 'classnames';
import formatDate from '../format/formatDate';
import formatMoney from '../format/formatMoney';
import Membership from '../../shared/domain/Membership';
import MembershipDetailsDto, {
  validationSchema
} from '../../shared/dto/MembershipDetailsDto';

export interface MembershipDetailsFormProps {
  membership: Membership;
  total: number;
  recurringTotal: number;
  renewal: Date;
}

const getInitialValues = (
  props: MembershipDetailsFormProps
): MembershipDetailsDto => ({
  firstName: '',
  lastName: '',
  emailAddress: '',
  phoneNumber: '',
  username: '',
  password: '',
  passwordConfirm: '',
  membership: props.membership
});

const onSubmit = async (
  values: MembershipDetailsDto,
  { setSubmitting }: FormikActions<MembershipDetailsDto>
) => {
  try {
    const response = await fetch('/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(values)
    });

    // tslint:disable-next-line:no-console
    console.log('response.status', response.status);
  } finally {
    setSubmitting(false);
  }
};

const MembershipDetailsForm: React.FunctionComponent<
  MembershipDetailsFormProps
> = (props: MembershipDetailsFormProps) => {
  const { membership, total, recurringTotal, renewal } = props;

  return (
    <React.Fragment>
      <div className="container pt-5">
        <h2 className="h2 text-primary text-center">Membership Details</h2>
      </div>
      <Formik
        initialValues={getInitialValues(props)}
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
            <div className="container">
              <div className="row">
                <div className="col-12 col-sm-6 pb-2">
                  <label htmlFor="firstName">First name</label>
                  <Field
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="form-control form-control-secondary"
                    placeholder="First name"
                    required={true}
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
                    required={true}
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
                    required={true}
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
                    required={true}
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
                  required={true}
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
                  required={true}
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
                  required={true}
                />
                <ErrorMessage
                  name="passwordConfirm"
                  className="invalid-feedback"
                  component="div"
                />
              </div>
              <div className="container pb-3">
                <h2 className="h2 text-primary text-center">Your Order</h2>
                <div className="row border-top border-bottom py-1">
                  <div className="col-4 font-weight-bold">Membership</div>
                  <div className="col-8">
                    {membership}
                    <Field type="hidden" />
                  </div>
                </div>
                <div className="row border-bottom py-1">
                  <div className="col-4 font-weight-bold">Total</div>
                  <div className="col-8">{formatMoney(total)} / year</div>
                </div>
                <div className="row border-bottom py-1">
                  <div className="col-4 font-weight-bold">Recurring Totals</div>
                  <div className="col-8">
                    {formatMoney(recurringTotal)} / year (renewal:{' '}
                    {formatDate(renewal)})
                  </div>
                </div>
              </div>
              <div className="container pt-1 pb-3">
                <div className="row">
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg px-4"
                      disabled={isSubmitting || !isValid}
                    >
                      Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default MembershipDetailsForm;
