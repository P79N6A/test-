import BZGroupHttps from '../../../common/https/BZGroupHttps';

const BZManageAction = {

  getBZGInfo(gid) {
    return BZGroupHttps.getGroupInfo(gid)
      .then(res => {
        res.roleMembers = this._handleRoleUsers(res.members);
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
};
export default BZManageAction;
