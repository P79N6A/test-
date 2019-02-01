
export default [
  {
    title: '工单号',
    key: 'wlNum',
  },
  {
    title: '申请人',
    key: 'sqName',
  },
  {
    title: '标题',
    key: 'workTitle',
  },
  {
    title: '工单类型',
    key: 'workType',
  },
  {
    title: '项目',
    key: 'Project',
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    // State: [0, 1, 2, 3],
    status: [
      {
        text: status[0],
        value: 0,
      },
      {
        text: status[0],
        value: 0,
      },
      {
        text: status[0],
        value: 0,
      },
      {
        text: status[0],
        value: 0,
      },
    ],
    // render(val) {
    //   return <Badge State={State.Map[val]} text={status[val]} />;
    // },
  },
  {
    title: '创建时间',
    key: 'applyTime',
  },
  {
    title: '更新时间',
    key: 'Update',
  },
  {
    title: '操作',
    key: 'action',
  },
];
