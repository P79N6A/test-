// import HTTP from './http';
import bzgroupList from '../../pages/bzgroup/mocks/bzgroupList';
import allbzgroupList from '../../pages/bzgroup/mocks/allbzgroupList';
import bzgroupInfo from '../../pages/bzgmanage/mocks/bzgroupInfo';
import users from '../../pages/bzgmanage/mocks/users';

const  BZGroupHttps = {
  getMyGroupList() {
    return Promise.resolve(bzgroupList.data);
  },

  getAllGroupList() {
    return Promise.resolve(allbzgroupList.data);
  },

  getGroupInfo(gid) {
    if (!gid) {
      return Promise.resolve({});
    }
    return Promise.resolve(bzgroupInfo.data);
  },

  getAllUsers(gid) {
    if (!gid) {
      return Promise.resolve({});
    }
    return Promise.resolve(users.data);
  },
};

export default BZGroupHttps;
