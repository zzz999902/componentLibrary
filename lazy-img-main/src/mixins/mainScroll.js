/*
 * 事件总线
 * 事件名：mainScroll
 * 含义：主区域滚动条位置变化后触发
 * 参数：
 * - 滚动的dom元素，如果是undefined，则表示dom元素已经不存在
 */
export default function (refValue) {
  return {
    mounted() {
      this.$refs[refValue].addEventListener('scroll', this.handleMainScroll); // 滚动触发
    },
    beforeDestroy() {
      //销毁 = 不监听它
      this.$bus.$emit('mainScroll');
      this.$refs[refValue].removeEventListener('scroll', this.handleMainScroll);
    },
    methods: {
      handleMainScroll() {
        this.$bus.$emit('mainScroll', this.$refs[refValue]);
      },
    },
  };
}
