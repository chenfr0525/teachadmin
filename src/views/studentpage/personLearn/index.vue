<script setup>
import {useStudentStore} from '@/stores'
import { ref,onMounted,computed } from 'vue';
import EmptyPage from './components/EmptyPage.vue';
import PersonalizedLearning from './components/HomePage.vue';

const studentStore=useStudentStore()

onMounted(()=>{
  studentStore.getPlan()
  plan.value=studentStore.plan
})

//计划表
const plan=ref({
  goal: '',
  interests: '',
  level: '',
})

// 用户是否已设置学习计划
const isPlanSet = computed(() => {
  return plan.value.goal !== '' && plan.value.interests!=='' && plan.value.level !== '';
});

// 处理设置学习计划
const handleSetProfile = async(newProfile) => {
  plan.value = newProfile;
};
</script>

<template>
    <!-- 空页面 -->
    <EmptyPage v-if="!isPlanSet" @set-profile="handleSetProfile" />

    <!-- 个性化学习页面 -->
    <PersonalizedLearning v-else :plan="plan" />
</template>
