export default [
  {
    title: '用户名',
    key: 'username',
    onFilter: (value, record) => record.name.includes(value),
  },
  {
    title: '操作类型',
    key: 'type',
  }, 
  {
    title: '操作实体',
    key: 'entity',
  }, 
  {
    title: '方法名',
    key: 'methodname',
  }, 
  {
    title: '操作参数',
    key: 'czcs',
  }, 
  {
    title: '操作时间',
    key: 'time',
  },
];