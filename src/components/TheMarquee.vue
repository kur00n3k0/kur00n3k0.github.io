<script setup lang="ts">
withDefaults(defineProps<{ items?: string[] }>(), {
  items: () => [
    'MASK ON',
    'SAFETY IS AN ILUSION',
    'DONATE TO US (MONERO) @ 0xffffffff',
    'TRUST NO ONE',
    'STAY ANON',
    'STAY SAFE',
    'FIGHT FOR YOUR RIGHTS',
  ],
})
</script>

<template>
  <div class="marq">
    <i>
      <template v-for="(x, i) in [...items, ...items]" :key="i"> <b>◼</b> {{ x }} &nbsp; </template>
    </i>
  </div>
</template>
