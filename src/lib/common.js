import userServices from './userServices';

// eslint-disable-next-line import/prefer-default-export
export function headers() {
  return {
    'Content-Type': 'application/json',
    Authorization: userServices.userData() ? userServices.userData().auth_token : '',
  };
}
