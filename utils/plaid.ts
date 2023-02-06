import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

const plaidClient = new PlaidApi(
    new Configuration({
      basePath: PlaidEnvironments[process.env.PLAID_ENV],
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
          'PLAID-SECRET': process.env.PLAID_SECRET,
          'Plaid-Version': '2020-09-14',
        },
      },
    })
  );
  
  const sessionOptions = {
    cookieName: 'chimp-cookies',
    password: process.env.COOKIE_SECRET,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  };
  
  export { plaidClient, sessionOptions };