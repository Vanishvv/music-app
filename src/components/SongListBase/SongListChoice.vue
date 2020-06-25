/**
 * @Author:Wang Jun
 * @Date:2020/6/24/024 17:23
 * @Description:歌单详情页功能选项
 */
<template>
  <div class="list-choice">
    <div
      class="list-choice__item"
      v-for="(choiceItem, index) in choiceData"
      :key="index"
      @click="handle(choiceItem.name)"
    >
      <i :class="choiceItem.iconName"></i>
      <span>{{ choiceItem.choiceName }}</span>
    </div>
    <van-share-sheet
            v-model="showShare"
            title="立即分享给好友"
            :options="options"
    />
  </div>
</template>

<script>
import choiceInfo from "../../../static/songListChoiceInfo";
export default {
  name: "",
  data() {
    return {
      choiceData: choiceInfo.data,
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
    };
  },
  methods:{
    handle(data){
      if(data=='share'){
        this.showShare=true;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.list-choice {
  display: flex;
  justify-content: space-around;
  color: white;
  margin-top: 0.5rem;
  &__item {
    display: flex;
    flex-direction: column;
    i {
      font-size: 0.6rem;
    }
  }
}
</style>
