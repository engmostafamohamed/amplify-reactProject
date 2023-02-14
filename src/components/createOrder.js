import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import SuccessOrder from './SucessOrder';

const authinticationAPIs = axios.create({
  baseURL: 'https://x84o4kin6e.execute-api.us-east-1.amazonaws.com/Prod/',
  timeout: 5000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
});
export default function () {
  const { id,product_name,product_price } = useParams();
  
  const [addOrderResponse, setAddOrderResponse] = useState();
  const [messageHidden, setMessageHidden] = useState(false);
  const [UserCreateOrder,setUserCreateOrder] = useState();

  const paymentMethodOption = [
    { code: 'Cash', displayText: 'Cash' },
    { code: 'Fawry', displayText: 'Fawry' },
    { code: 'Credit card', displayText: 'Credit card' }
  ];

  const listItems = paymentMethodOption.map(({ code, displayText }, index) => (
    <MenuItem key={'option-' + index} value={code}>
      {displayText}
    </MenuItem>
  ));

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    address: Yup.string()
      .min(6, 'Adress must be more than 6')
      .max(50, 'Too Long !')
      .required('Required'),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(11, 'must be 11')
      .max(11, 'must be 11')
      .required('Required'),
    paymentMethod: Yup.string().required('Required'),
    quantity: Yup.number().min(1).required('Required')
  });

  const handleOnSubmit = (e) => {
    const body = {
      id: id,
      ...e
    };
    setUserCreateOrder(body);
    authinticationAPIs
      .post('create-order', body)
      .then((res) => {
        setMessageHidden(true);
        setAddOrderResponse('Success Operation');
      })
      .catch((err) => {
        setMessageHidden(true);
        setAddOrderResponse('Faild to add Order');
      });
  };

  return (
    addOrderResponse === "Success Operation"?
    <SuccessOrder UserCreateOrder={UserCreateOrder} product_name={product_name} product_price={product_price}/>:
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div>
        <Typography component='h1' variant='h5'>
          {'User'}
        </Typography>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            phoneNumber: '',
            paymentMethod: '',
            quantity: 1
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            handleOnSubmit(values);
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                error={Boolean(touched.firstName && errors.firstName)}
                fullWidth
                helperText={touched.firstName && errors.firstName}
                label='first Name'
                margin='normal'
                name='firstName'
                onBlur={handleBlur}
                onChange={handleChange}
                type='text'
                value={values.firstName}
                variant='outlined'
                autoFocus
              />
              <TextField
                error={Boolean(touched.lastName && errors.lastName)}
                fullWidth
                helperText={touched.lastName && errors.lastName}
                label='last Name'
                margin='normal'
                name='lastName'
                onBlur={handleBlur}
                onChange={handleChange}
                type='text'
                value={values.lastName}
                variant='outlined'
                autoFocus
              />
              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label='Email'
                margin='normal'
                name='email'
                onBlur={handleBlur}
                onChange={handleChange}
                type='text'
                value={values.email}
                variant='outlined'
                autoFocus
              />
              <TextField
                error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                fullWidth
                helperText={touched.phoneNumber && errors.phoneNumber}
                label='phone number'
                margin='normal'
                name='phoneNumber'
                onBlur={handleBlur}
                onChange={handleChange}
                type='text'
                value={values.phoneNumber}
                variant='outlined'
              />
              <TextField
                error={Boolean(touched.address && errors.address)}
                fullWidth
                helperText={touched.address && errors.address}
                label='Address'
                margin='normal'
                name='address'
                onBlur={handleBlur}
                onChange={handleChange}
                type='text'
                value={values.address}
                variant='outlined'
              />

              <TextField
                error={Boolean(touched.quantity && errors.quantity)}
                fullWidth
                helperText={touched.quantity && errors.quantity}
                label='quantity'
                margin='normal'
                name='quantity'
                onBlur={handleBlur}
                onChange={handleChange}
                type='number'
                value={values.quantity}
                min={1}
                variant='outlined'
              />

              <TextField
                variant='outlined'
                select
                fullWidth
                id='paymentMethod'
                error={Boolean(touched.paymentMethod && errors.paymentMethod)}
                helperText={touched.paymentMethod && errors.paymentMethod}
                name='paymentMethod'
                onBlur={handleBlur}
                onChange={handleChange}
                type='text'
                value={values.paymentMethod}
                label={'Paymeny methods'}
                required
              >
                {listItems}
              </TextField>
              <Button
                color='primary'
                disabled={isSubmitting}
                width='60%'
                size='large'
                type='submit'
                variant='contained'
              >
                {'Order'}
              </Button>
            </form>
          )}
        </Formik>
        <div hidden={messageHidden}>{addOrderResponse}</div>
      </div>
    </Container>
  );
}
