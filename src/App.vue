<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import TheNav from '@/components/TheNav.vue'
import BootOverlay from '@/components/BootOverlay.vue'

const booted = ref(false)

onMounted(() => {
  if (sessionStorage.getItem('dbj_booted') === '1') {
    booted.value = true
  }
})

function finishBoot() {
  sessionStorage.setItem('dbj_booted', '1')
  booted.value = true
}
</script>

<template>
  <div class="site">
    <div class="crt"></div>
    <div class="crt-flicker"></div>

    <BootOverlay v-if="!booted" @done="finishBoot" />

    <TheNav />
    <RouterView />
  </div>
</template>
