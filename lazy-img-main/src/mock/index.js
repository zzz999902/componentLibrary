import Mock from 'mockjs';

Mock.mock('/images', 'get', {
  code: 200,
  msg: 'ok',
  'list|50': [
    {
      id: '@guid',
      name: '分类@id',
      'thumb|1': [
        Mock.Random.image('300x250', '#4A7BF7', '#fff', 'Hello')
      ],
    }
  ],
});
