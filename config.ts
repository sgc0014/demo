export default {
  s3: {
    REGION: 'YOUR_S3_UPLOADS_BUCKET_REGION',
    BUCKET: 'YOUR_S3_UPLOADS_BUCKET_NAME'
  },
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_u9TKYft5D',
    APP_CLIENT_ID: '5o6k4m1g02d6vett538lm33mok',
    IDENTITY_POOL_ID: 'us-east-1:a4155ed9-7afa-4854-9d6b-2c572a122c33'
  },
  stripe: {
    apiUrl: 'https://api.stripe.com/v1',
    currency: 'usd',
    publicKey:
      'pk_test_51IFaoFEvdBGhexVAcFnWmophz9iY1DWme8MvF4YJOvalM3DNWactxrGA7cMI6BsX9b5WIqr0mLeOqBrX0YAbbqHM00olrjTEnw',
    priceId: 'price_1IiMWvEvdBGhexVAMih3SDEd',
    redirectUrl: 'https://localhost:3000'
  }
};
