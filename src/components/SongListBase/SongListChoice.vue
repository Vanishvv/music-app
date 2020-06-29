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
      <!--图标class名-->
      <i :class="choiceItem.iconName"></i>
      <!--图标下显示文字-->
      <span>{{ choiceItem.choiceName }}</span>
    </div>
    <!--分享上滑框组件-->
    <van-share-sheet
      v-model="showShare"
      :title="shareTitle"
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
      choiceData: choiceInfo.data, //图表信息
      showShare: false, //显示分享滑出框
      options: choiceInfo.shareOptions, //分享框内容数据
      shareTitle: "立即分享给好友" //分享框标题
    };
  },
  methods: {
    /*van-share-sheet自带处理函数*/
    handle(data) {
      if (data === "share") {
        this.showShare = true;
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
