import allBZData from '../mocks/List';
const WorkListAction = {
  getAllBZData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(allBZData);
      }, 1000);
    });
  },
};
export default WorkListAction;
