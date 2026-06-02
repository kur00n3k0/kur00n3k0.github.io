<script setup lang="ts">
defineProps<{ small?: boolean }>()

const SKULL = `        .-=========-.
      /   _     _   \\
     |   (o)   (o)   |
     |       ^       |
     |    \\_____/    |
      \\  | | | | |  /
       \\  '-----'  /
        '-._____.-'
          |__|__|`

const SKULL_SM = `   .-=====-.
  /  _   _  \\
 |  (o) (o)  |
 |     ^     |
 |   |||||   |
  \\  '---'  /
   '-.___.-'`
</script>

<template>
  <pre class="ascii glow" style="margin:0">{{ small ? SKULL_SM : SKULL }}</pre>
</template>
