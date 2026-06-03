<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{ text: string; block?: boolean; delay?: number }>()

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%?><'
const SPEED = 32 // ms per frame
const HOLD = 6 // frames before revealing next char

const displayed = ref(props.text)
let timerId: ReturnType<typeof setInterval> | null = null

function scramble() {
  if (timerId) clearInterval(timerId)

  const original = props.text.split('')
  let frame = 0

  timerId = setInterval(() => {
    const revealed = Math.floor(frame / HOLD)

    displayed.value = original
      .map((ch, i) => {
        if (i < revealed || ch === ' ') return ch
        return CHARS[Math.floor(Math.random() * CHARS.length)]!
      })
      .join('')

    frame++

    if (revealed >= original.length) {
      clearInterval(timerId!)
      timerId = null
      displayed.value = props.text
    }
  }, SPEED)
}

onMounted(() => setTimeout(scramble, props.delay ?? 250))
onUnmounted(() => {
  if (timerId) clearInterval(timerId)
})
</script>

<template>
  <span class="glitch" :data-text="displayed" :style="block ? { display: 'block' } : {}">{{
    displayed
  }}</span>
</template>
