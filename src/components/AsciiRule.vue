<script setup lang="ts">
defineProps<{ label?: string; double?: boolean }>()
</script>

<template>
  <div style="display:flex;align-items:center;gap:12px;min-width:0">
    <span v-if="label" class="dim mono-xs upper" style="flex-shrink:0">{{ label }}</span>
    <span style="flex:1;min-width:0" :style="{
      height: double ? '3px' : '1px',
      borderTop: '1px solid var(--faint)',
      borderBottom: double ? '1px solid var(--faint)' : 'none',
    }"></span>
  </div>
</template>
