import allBZData from '../mocks/allBZDataSource';
const GroupAction = {
  getAllBZData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(allBZData);
      }, 1000);
    });
  },
};
export default GroupAction;