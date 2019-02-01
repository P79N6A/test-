export default {
  serviceInfo: {
    url: 'api.magellan.qiyi.domain',
    method: 'HTTP POST',
    contentType: 'x-www-form-urlencoded',
  },
  serviceParams: [
    {
      params: 'biz_name',
      type: 'string',
      necessary: true,
      desc: '业务名称',
      comment: 'passport_login',
    },
    {
      params: 'biz_code',
      type: 'string',
      necessary: true,
      desc: '业务标识码',
      comment: 'passport',
    },
    {
      params: 'biz_sec',
      type: 'string',
      necessary: true,
      desc: '业务token',
      comment: '详见申请工单回执',
    },
    {
      params: 'version',
      type: 'int',
      necessary: false,
      desc: '策略版本',
      comment: '选填，默认使用最新规则集',
    },
    {
      params: 'params',
      type: 'jsonString',
      necessary: true,
      desc: '原数据入参',
      comment: '详见业务参数说明',
    },
  ],
  bzParams: [
    {
      params: 'uid',
      type: 'string',
      necessary: false,
      desc: '用户ID',
      comment: '用户ID',
    },
    {
      params: 'ip',
      type: 'string',
      necessary: false,
      desc: 'ip',
      comment: 'ip',
    },
    {
      params: 'dfp',
      type: 'string',
      necessary: false,
      desc: 'dfp',
      comment: '设备指纹',
    },
    {
      params: 'agent_type',
      type: 'int',
      necessary: false,
      desc: '登录端',
      comment: '登录端',
    },
  ],
};
