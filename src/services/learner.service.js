import httpClient from '@/axios';

const getAll = () => {
    return httpClient.get('/learners');
}

const create = (data) => {
    return httpClient.put('/learners', data);
}

const remove = id => {
    return httpClient.delete(`/learners/${id}`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll, create, remove};