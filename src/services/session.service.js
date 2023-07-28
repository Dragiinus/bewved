import httpClient from '@/axios';

const getList = () => {
  return httpClient.get('/sessions');
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getList };