<script setup lang="ts">
defineProps<{ small?: boolean }>()

const SKULL = `
           ______
        .-"      "-.
       /            \\
      |              |
      |,  .-.  .-.  ,|
      | )(__/  \\__)( |
      |/     /       |
      (_     ^^     _)
       \\__|IIIIII|__/
        | \\IIIIII/ |
        \\          /
         \`--------\`
`

const SKULL_SM = `   .-=====-.
  /  _   _  \\
 |  (o) (o)  |
 |     ^     |
 |   |||||   |
  \\  '---'  /
   '-.___.-'`
</script>

<template>
  <pre class="ascii glow" style="margin: 0">{{ small ? SKULL_SM : SKULL }}</pre>
</template>
