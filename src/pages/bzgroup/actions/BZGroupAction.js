import BZGroupHttps from '../../../common/https/BZGroupHttps';

const BZGroupAction = {
  getMyBZGList() {
    return BZGroupHttps.getMyGroupList()
      .then(res => {
        return res;
      });
  },

  getAllBZGList() {
    return BZGroupHttps.getAllGroupList()
      .then(res => {
        return res;
      });
  },
};
export default BZGroupAction;
