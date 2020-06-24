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
    >
      <i :class="choiceItem.iconName"></i>
      <span>{{ choiceItem.choiceName }}</span>
    </div>
  </div>
</template>

<script>
import choiceInfo from "../../static/songListChoiceInfo";
export default {
  name: "",
  data() {
    return {
      choiceData: choiceInfo.data
    };
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
