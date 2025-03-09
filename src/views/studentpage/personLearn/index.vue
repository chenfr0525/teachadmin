<script setup>
import { ref } from 'vue';
import EmptyPage from './components/EmptyPage.vue';
import PersonalizedLearning from './components/HomePage.vue';

// 用户是否已设置学习计划
const isProfileSet = ref(false);

// 用户画像数据
const profile = ref({
  goal: '',
  interests: [],
  level: '',
});

// 处理设置学习计划
const handleSetProfile = (newProfile) => {
  profile.value = newProfile;
  isProfileSet.value = true; // 更新状态
};
</script>

<template>
  <div class="demo-main">
    <!-- 空页面 -->
    <EmptyPage v-if="!isProfileSet" @set-profile="handleSetProfile" />

    <!-- 个性化学习页面 -->
    <PersonalizedLearning v-else :profile="profile" />
  </div>
</template>

<style scoped lang="scss">
</style>