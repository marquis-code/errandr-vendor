import { GATEWAY_ENDPOINT, GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config';

export const payments_api = {
  getBanks: () => {
    return GATEWAY_ENDPOINT.get('/payments/banks');
  },

  resolveAccount: (account_number: string, bank_code: string) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.post('/payments/resolve-account', {
      account_number,
      bank_code,
    });
  },
};
