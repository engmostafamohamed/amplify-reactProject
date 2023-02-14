import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SuccessOrder = ({ UserCreateOrder, product_name, product_price }) => {
  return (
    <Card sx={{ minWidth: 275, textAlign: 'center', backgroundColor: 'red' }}>
      <CardContent>
        <CheckCircleOutlineIcon color='success' />
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          Success Operation
        </Typography>
        <Typography variant='h5' component='div'>
          Product name :{product_name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          product Price :{product_price}
        </Typography>
        <Typography variant='body2'>
          About You :
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            full name :{UserCreateOrder.firstName} {UserCreateOrder.lastName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            email :{UserCreateOrder.email}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            phone number :{UserCreateOrder.phoneNumber}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            Address :{UserCreateOrder.address}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            PaymenyMethods :{UserCreateOrder.paymentMethod}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            quantity :{UserCreateOrder.quantity}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            total Price :
            {parseInt(UserCreateOrder.quantity) * parseInt(product_price)}
          </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SuccessOrder;
