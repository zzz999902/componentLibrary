<template>
  <div id="app">
    <div class="blog-list-container" ref="mainContainer">
      <ul>
        <li v-for="item in imgsList" :key="item.id">
          <div class="thumb" v-if="item.thumb">
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
          </div>
          <div class="main">
            <h2>{{ item.title }}</h2>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import minScroll from './mixins/mainScroll.js';
import { getImages } from '@/api';
export default {
  mixins: [minScroll('mainContainer')],
  data() {
    return {
      imgsList: [],
    };
  },
  async created() {
    const { data } = await getImages();
    this.imgsList = data.list;
    // console.log(data)
    // this.imgList();
  },
  methods: {
    // 随机数据
    imgList() {
      let img = [];
      for (let i = 1; i <= 100; i++) {
        img.push({
          title: '图片懒加载',
          thumb: `https://picsum.photos/200/300?random=${i}`,
        });
      }
      this.imgsList = img;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  text-align: left;
  color: #2c3e50;
}
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid;
}
.thumb {
  flex: 0 0 auto;
  margin-right: 15px;
}
img {
  display: block;
  max-width: 200px;
  border-radius: 5px;
}
.main {
  flex: 1 1 auto;
}
h2 {
  margin: 0;
}
</style>
