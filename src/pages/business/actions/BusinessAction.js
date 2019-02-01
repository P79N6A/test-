import myBZData from '../mocks/BZDataSource';
import allBZData from '../mocks/allBZDataSource';
const BusinessAction = {
  getMyBZData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(myBZData);
      }, 1000);
    });
  },
  getAllBZData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(allBZData);
      }, 1000);
    });
  },
};
export default BusinessAction;
