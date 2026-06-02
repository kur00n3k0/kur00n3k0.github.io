<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AsciiSkull from './AsciiSkull.vue'

const emit = defineEmits<{ done: [] }>()

const LINES = [
  'dedsec bootloader v0.94 — node:dedsec-7',
  'POST ........................ OK',
  'mounting /dev/mem ........... OK',
  'spoofing MAC :: 00:DE:AD:C0:DE',
  'establishing tor circuit .... 3 hops',
  'decrypting vault ............ OK',
  'verifying pgp 0xA1B2 ........ TRUSTED',
  'auth :: kur0n3k0 ··········· GRANTED',
  '',
  '> launching DEAD BYTE JOURNAL …',
]

const shown = ref(0)
const out = ref(false)

function skip() {
  out.value = true
  setTimeout(() => emit('done'), 400)
}

onMounted(() => {
  let i = 0
  const next = () => {
    if (i < LINES.length) {
      shown.value = ++i
      setTimeout(next, i === 1 ? 220 : 150)
    } else {
      setTimeout(() => { out.value = true }, 650)
      setTimeout(() => emit('done'), 1150)
    }
  }
  setTimeout(next, 220)
})
</script>

<template>
  <div class="boot" :class="{ out }" @click="skip">
    <div style="margin-bottom:16px"><AsciiSkull small style="font-size:12px" /></div>
    <div v-for="(line, i) in LINES.slice(0, shown)" :key="i" class="boot-line">
      <template v-if="line === ''">&nbsp;</template>
      <template v-else>
        <span class="dim">{{ String(i).padStart(2, '0') }}  </span>
        <span v-if="line.includes('GRANTED') || line.includes('launching')" class="acc glow">{{ line }}</span>
        <span v-else>{{ line }}</span>
      </template>
    </div>
    <div style="margin-top:20px"><span class="cur"></span></div>
    <div class="dim mono-xs" style="position:absolute;bottom:6vh;left:8vw">[ click to skip ]</div>
  </div>
</template>
