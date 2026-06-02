<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const time = ref('')

let timer: ReturnType<typeof setInterval>
function tick() {
  const d = new Date()
  const p = (n: number) => String(n).padStart(2, '0')
  time.value = `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
}
onMounted(() => { tick(); timer = setInterval(tick, 1000) })
onUnmounted(() => clearInterval(timer))

const current = computed(() => {
  if (route.path.startsWith('/archive')) return 'archive'
  if (route.path.startsWith('/article')) return 'article'
  if (route.path.startsWith('/about')) return 'about'
  return 'index'
})
</script>

<template>
  <div class="nav">
    <div class="nav-in">
      <span class="brand glow" style="cursor:pointer" @click="router.push('/')">◼ KUR0N3K0</span>
      <nav class="nav-links">
        <RouterLink to="/" class="nav-link" :class="{ on: current === 'index' }">/index</RouterLink>
        <RouterLink to="/archive" class="nav-link" :class="{ on: current === 'archive' }">/archive</RouterLink>
        <RouterLink to="/about" class="nav-link" :class="{ on: current === 'about' }">/about</RouterLink>
      </nav>
      <span class="nav-right">
        <span class="dim">node:dedsec-7</span>
        <span style="font-variant-numeric:tabular-nums">{{ time }}</span>
        <span class="acc"><span class="led"></span>online</span>
      </span>
    </div>
  </div>
</template>
