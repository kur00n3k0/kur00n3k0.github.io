<script setup lang="ts">
defineProps<{ size?: number; glow?: boolean }>()
</script>

<template>
  <div class="stencil" :class="{ glow }" :style="{ fontSize: (size ?? 48) + 'px' }">
    <slot />
  </div>
</template>
