import httpClient from '../axios';

const getAll = () => {
    return httpClient.get('/learners');
}

const create = (data) => {
    return httpClient.put('/learners', data);
}
export default { getAll, create };