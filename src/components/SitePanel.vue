<script setup lang="ts">
defineProps<{ label?: string; raise?: boolean }>()
</script>

<template>
  <div class="panel ticks" :class="{ raise }">
    <span class="tk"></span>
    <div v-if="label" class="panel-h">{{ label }}</div>
    <slot />
  </div>
</template>
