export const columnItems = (clickHandle) => [
  {
    prop: 'name',
    label: '名字',
    align: 'center',
    type: 'el-link',
    handleClick: clickHandle,
  },
  {
    prop: 'age',
    label: '年龄',
    align: 'center',
  },
  {
    prop: 'sex',
    label: '性别',
    align: 'center',
    type: 'el-tag',
    render: (h, data) => {
      const {
        row,
        column: { prop },
      } = data;
      //   可过滤状态
      const status = sexTYpe(row[prop]);
      return <span>{status}</span>;
    },
  },
  {
    prop: 'img',
    label: '图片',
    align: 'center',
    type: 'el-img',
    // 也可以有以下的方法做图片
    // render: (h, data) => {
    //   const {
    //     row,
    //     column: { prop },
    //   } = data;
    //   const url = row[prop];
    //   return (
    //     <img
    //       src={url ? url : null}
    //       style={{ width: '40px', height: '40px' }}
    //       alt=''
    //     />
    //   );
    // },
  },
  {
    prop: 'address',
    label: '地址',
    align: 'center',
  },
];

export const ProductBomList = [
  {
    name: '刘芳',
    age: '21',
    sex: 1,
    img: 'https://picsum.photos/200/300?random=1',
    address: '北京市海淀区中关村大街 27 号',
  },
  {
    name: '张伟',
    age: '25',
    sex: 0,
    img: 'https://picsum.photos/200/300?random=2',
    address: '广东省深圳市南山区科技园科发路',
  },
  {
    name: '王丽',
    age: '32',
    sex: 1,
    img: 'https://picsum.photos/200/300?random=3',
    address: '江苏省南京市建邺区应天大街 99 号',
  },
  {
    name: '李强',
    age: '27',
    sex: 0,
    img: 'https://picsum.photos/200/300?random=4',
    address: '四川省成都市武侯区高升桥南路 9 号',
  },
  {
    name: '赵阳',
    age: '19',
    sex: 1,
    img: 'https://picsum.photos/200/300?random=5',
    address: '湖南省长沙市雨花区万家丽中路 608 号',
  },
  {
    name: '刘军',
    age: '29',
    sex: 0,
    img: 'https://picsum.photos/200/300?random=6',
    address: '浙江省杭州市拱墅区水印路 58 号',
  },
  {
    name: '李磊',
    age: '22',
    sex: 0,
    img: 'https://picsum.photos/200/300?random=7',
    address: '北京市东城区前门大街 24 号',
  },
  {
    name: '赵丽',
    age: '31',
    sex: 1,
    img: 'https://picsum.photos/200/300?random=8',
    address: '山东省济南市市中区经四路 88 号',
  },
  {
    name: '刘伟',
    age: '28',
    sex: 0,
    img: 'https://picsum.photos/200/300?random=9',
    address: '广东省广州市天河区黄埔大道中 70 号',
  },
  {
    name: '张磊',
    age: '24',
    sex: 0,
    img: 'https://picsum.photos/200/300?random=10',
    address: '福建省福州市鼓楼区五一北路 88 号',
  },
];

function sexTYpe(item) {
  if (item == 1) {
    return '男';
  } else {
    return '女';
  }
}
