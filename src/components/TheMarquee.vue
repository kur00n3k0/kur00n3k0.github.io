<script setup lang="ts">
withDefaults(defineProps<{ items?: string[] }>(), {
  items: () => ['MASK ON', 'DEDSEC', 'ACCESS GRANTED', 'TRUST NO BINARY', 'STAY ANON', 'WE ARE LEGION'],
})
</script>

<template>
  <div class="marq">
    <i>
      <template v-for="(x, i) in [...items, ...items]" :key="i">
        <b>◼</b> {{ x }} &nbsp;
      </template>
    </i>
  </div>
</template>
