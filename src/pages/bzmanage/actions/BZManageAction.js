import BZGroupHttps from '../../../common/https/BZGroupHttps';
import BZServiceInfo from '../mocks/BZServiceInfo';
import allUsers from '../mocks/users';

const BZManageAction = {
  getBZGList() {
    return BZGroupHttps.getGroupList()
      .then(res => {
        res.forEach(item => {
          item.roleMembers = this._handleRoleUsers(item.members);
        });
        return res;
      });
  },

  getAllUsers(gid) {
    return BZGroupHttps.getAllUsers(gid)
      .then(res => {
        return res;
      });
  },

  _handleRoleUsers(members = []) {
    const roleMembers = {};
    members.forEach(m => {
      const { roleId, userName } = m;
      if (!roleMembers[roleId]) {
        roleMembers[roleId] = [];
      }
      roleMembers[roleId].push(userName);
    });
    return roleMembers;
  },

  getBZInfo() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          bzNum: 10004,
          bzName: 'passport_contacts_upload',
          desc: 'passport通讯录上传防范',
          sence: '上传防护',
          bzGroup: 'passport风控',
          principal: 'zhangwenbin,zhangxuejun',
          applyTime: 1548057119317,
        });
      }, 1000);
    });
  },

  getBZServiceInfo() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(BZServiceInfo);
      }, 1000);
    });
  },

  getSelectedUsers() {

  },

  getAllUsersByBZId() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(allUsers);
      }, 1000);
    });
  },
};
export default BZManageAction;
