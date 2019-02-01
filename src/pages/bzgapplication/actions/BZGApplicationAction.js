import BZGroupHttps from '../../../common/https/BZGroupHttps';

const BZGApplicationAction = {
  getServersList() {
    return Promise.resolve([
      {
        key: 'baidu',
        label: '百度',
      },
      {
        key: 'zhongjingyun',
        label: '中经云',
      },
      {
        key: 'beijin',
        label: '北京',
      },
      {
        key: 'shanghai',
        label: '上海',
      },
      {
        key: 'jiyang',
        label: '济阳',
      },
      {
        key: 'wuhan',
        label: '武汉',
      },
    ]);
  },

  getSenceDataSource() {
    return Promise.resolve([
      {
        key: 'fanlaji',
        label: '反垃圾防护',
      },
      {
        key: 'jinrong',
        label: '金融风控',
      },
      {
        key: 'toupiao',
        label: '投票防护',
      },
    ]);
  },

  getModeDataSource() {
    return Promise.resolve([
      {
        key: 'all',
        label: '全托管',
      },
    ]);
  },

  getAllBZGList() {
    return BZGroupHttps.getAllGroupList()
      .then(res => {
        return res;
      });
  },
};

export default BZGApplicationAction;
