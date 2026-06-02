<script setup lang="ts">
defineProps<{ text: string; block?: boolean }>()
</script>

<template>
  <span class="glitch" :data-text="text" :style="block ? { display: 'block' } : {}">{{ text }}</span>
</template>
