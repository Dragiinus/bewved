import httpClient from '@/axios';

const getAll = () => {
  return httpClient.get('/learners');
}

const create = (data) => {
  return httpClient.put('/learners', data);
}

const update = (id, data) => {
  return httpClient.patch(`/learners/${id}`, data);
}

const getData = (id) => {
  return httpClient.get(`/learners/${id}`);
}

const remove = (id) => {
  return httpClient.delete(`/learners/${id}`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, getData, remove };