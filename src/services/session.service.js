import httpClient from '@/axios';

const getList = () => {
  return httpClient.get('/sessions');
}

export default { getList };