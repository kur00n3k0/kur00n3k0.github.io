<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import type { CodeLine } from '@/data/articles'
import SitePanel from './SitePanel.vue'

const props = defineProps<{ label?: string; lines: CodeLine[] }>()

const expanded = ref(false)
const copied = ref(false)

// ── typewriter state ──────────────────────────────────────────────────────────
const visibleChars = ref(0)
const typewriterStarted = ref(false)
const typewriterDone = ref(false)
let typewriterTimer: ReturnType<typeof setInterval> | null = null

// Cumulative char counts per line: cumChars[i] = total chars before line i
const cumChars = computed(() => {
  const r: number[] = [0]
  for (const ln of props.lines) r.push(r[r.length - 1] + (ln.x?.length ?? 0))
  return r
})

const totalChars = computed(() => cumChars.value[props.lines.length])

// Index of the line currently being typed (-1 when done)
const currentLine = computed(() => {
  if (typewriterDone.value) return -1
  for (let i = 0; i < props.lines.length; i++) {
    if (visibleChars.value < cumChars.value[i + 1]) return i
  }
  return -1
})

function lineVisible(i: number) {
  if (!typewriterStarted.value) return false
  return typewriterDone.value || visibleChars.value >= cumChars.value[i]
}

function lineSlice(i: number, text: string) {
  if (typewriterDone.value) return text
  return text.slice(0, Math.max(0, visibleChars.value - cumChars.value[i]))
}

function startTypewriter() {
  visibleChars.value = 0
  typewriterStarted.value = true
  typewriterDone.value = false
  typewriterTimer = setInterval(() => {
    visibleChars.value = Math.min(visibleChars.value + 3, totalChars.value)
    if (visibleChars.value >= totalChars.value) {
      typewriterDone.value = true
      clearInterval(typewriterTimer!)
      typewriterTimer = null
    }
  }, 16)
}

function stopTypewriter() {
  if (typewriterTimer) {
    clearInterval(typewriterTimer)
    typewriterTimer = null
  }
  typewriterStarted.value = true
  visibleChars.value = totalChars.value
  typewriterDone.value = true
}

// ── modal open/close ──────────────────────────────────────────────────────────
function copyCode() {
  const text = props.lines.map((ln) => ln.x ?? '').join('\n')
  navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}

function open() {
  expanded.value = true
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKey)
  setTimeout(startTypewriter, 620) // start after CRT power-on animation
}

function close() {
  stopTypewriter()
  typewriterStarted.value = false
  expanded.value = false
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
  if (typewriterTimer) clearInterval(typewriterTimer)
})
</script>

<template>
  <!-- ── Compact inline panel ── -->
  <SitePanel raise style="margin: 20px 0">
    <div class="panel-h">
      <span><span class="acc">▸</span> terminal — {{ label ?? 'sh' }}</span>
      <div style="margin-left: auto; display: flex; gap: 6px">
        <button class="tag btn" @click="copyCode">{{ copied ? '✓ copied' : 'copy' }}</button>
        <button class="tag btn" @click="open">expand</button>
      </div>
    </div>
    <div class="code-body">
      <div v-for="(ln, i) in lines" :key="i" style="white-space: pre">
        <template v-if="ln.t === 'cmd'"><span class="acc">$ </span>{{ ln.x }}</template>
        <template v-else-if="ln.t === 'prompt'">
          <template v-if="!ln.p && !ln.x">&nbsp;</template>
          <template v-else
            ><span class="acc">{{ ln.p }} </span>{{ ln.x }}</template
          >
        </template>
        <template v-else-if="ln.t === 'ok'"
          ><span class="acc">{{ ln.x }}</span></template
        >
        <template v-else
          ><span class="dim">{{ ln.x }}</span></template
        >
      </div>
    </div>
  </SitePanel>

  <!-- ── IBM 5151 fullscreen modal ── -->
  <Teleport to="body">
    <Transition name="crt-modal">
      <div v-if="expanded" class="crt-backdrop" @click.self="close">
        <div class="ibm-monitor">
          <!-- Model label -->
          <div class="monitor-top">
            <span class="monitor-model">IBM 5151 PERSONAL COMPUTER DISPLAY</span>
          </div>

          <!-- Dark recessed bezel around screen -->
          <div class="screen-housing">
            <div class="monitor-screen">
              <!-- All CRT effects + content animated together -->
              <div class="screen-inner">
                <div class="crt-noise"></div>
                <div class="crt-scanlines"></div>
                <div class="crt-roll"></div>
                <div class="crt-vignette"></div>

                <!-- Scrollable content -->
                <div class="crt-content">
                  <div class="crt-bar">
                    <span class="crt-path">C:\TERM\{{ (label ?? 'SHELL').toUpperCase() }}</span>
                    <div class="crt-actions">
                      <button class="crt-btn" @click="stopTypewriter" v-if="!typewriterDone">
                        [ SKIP ]
                      </button>
                      <button class="crt-btn" @click="copyCode">
                        {{ copied ? '[ COPIED ]' : '[ COPY ]' }}
                      </button>
                      <button class="crt-btn" @click="close">[ ESC ]</button>
                    </div>
                  </div>
                  <div class="crt-rule"></div>
                  <div class="crt-code">
                    <div v-for="(ln, i) in lines" v-show="lineVisible(i)" :key="i" class="crt-line">
                      <template v-if="ln.t === 'cmd'">
                        <span class="crt-sym">C:\&gt;&nbsp;</span>{{ lineSlice(i, ln.x ?? '')
                        }}<span v-if="i === currentLine" class="crt-cursor">█</span>
                      </template>
                      <template v-else-if="ln.t === 'prompt'">
                        <template v-if="!ln.p && !ln.x">&nbsp;</template>
                        <template v-else
                          >{{ ln.p ? `${ln.p} ` : '' }}{{ lineSlice(i, ln.x ?? '')
                          }}<span v-if="i === currentLine" class="crt-cursor">█</span></template
                        >
                      </template>
                      <template v-else-if="ln.t === 'ok'">
                        <span class="crt-ok">{{ lineSlice(i, ln.x ?? '') }}</span
                        ><span v-if="i === currentLine" class="crt-cursor">█</span>
                      </template>
                      <template v-else>
                        <span class="crt-out">{{ lineSlice(i, ln.x ?? '') }}</span
                        ><span v-if="i === currentLine" class="crt-cursor">█</span>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Control strip -->
          <div class="monitor-base">
            <div class="monitor-ibm">IBM</div>
            <div class="monitor-knobs">
              <div class="knob"></div>
              <div class="knob"></div>
              <div class="knob knob-sm"></div>
            </div>
            <div class="monitor-indicators">
              <div class="pwr-switch"></div>
              <div class="pwr-led"></div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ── compact code panel ── */
.code-body {
  padding: 14px 16px;
  font-family: var(--mono);
  font-size: 12.5px;
  line-height: 1.7;
  overflow-x: auto;
}

/* ── modal backdrop ── */
.crt-backdrop {
  position: fixed;
  inset: 0;
  background: radial-gradient(ellipse at 50% 45%, #0a1a0a 0%, #000 72%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 24px 16px;
}

/* ── IBM 5151 monitor body ── */
.ibm-monitor {
  width: min(840px, 96vw);
  background: linear-gradient(168deg, #d8cdb4 0%, #cabba0 32%, #bba88a 62%, #ac9878 100%);
  border-radius: 13px 13px 7px 7px;
  padding: 16px 20px 0;
  box-shadow:
    inset 4px 4px 10px rgba(255, 255, 255, 0.22),
    inset -3px -3px 8px rgba(0, 0, 0, 0.32),
    0 50px 120px rgba(0, 0, 0, 0.97),
    0 20px 60px rgba(0, 0, 0, 0.85),
    0 0 0 1.5px rgba(0, 0, 0, 0.55);
}

/* ── model text strip ── */
.monitor-top {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}

.monitor-model {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 8.5px;
  letter-spacing: 0.14em;
  color: #8a7660;
  text-transform: uppercase;
}

/* ── dark recessed screen housing ── */
.screen-housing {
  background: #141414;
  border-radius: 5px 5px 3px 3px;
  padding: 11px 11px 13px;
  box-shadow:
    inset 0 3px 14px rgba(0, 0, 0, 0.95),
    inset 2px 0 10px rgba(0, 0, 0, 0.8),
    inset -2px 0 10px rgba(0, 0, 0, 0.8),
    inset 0 -2px 8px rgba(0, 0, 0, 0.6);
}

/* ── CRT glass surface ── */
.monitor-screen {
  position: relative;
  background: #030803;
  border-radius: 4px;
  overflow: hidden;
  height: 58vh;
  min-height: 280px;
  max-height: 500px;
  box-shadow:
    inset 0 0 100px rgba(0, 0, 0, 0.7),
    inset 0 0 30px rgba(0, 40, 0, 0.4),
    0 0 30px rgba(0, 255, 60, 0.06);
}

/* ── inner wrapper: CRT effects + content animate as one ── */
.screen-inner {
  position: absolute;
  inset: 0;
  animation:
    crt-on 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both,
    crt-jitter 13s linear 1.8s infinite;
}

/* CRT power-on: horizontal bar expands to full screen */
@keyframes crt-on {
  0% {
    clip-path: inset(50% 0 50% 0);
    filter: brightness(5) blur(1px);
  }
  18% {
    clip-path: inset(49% 0 49% 0);
    filter: brightness(3);
  }
  48% {
    clip-path: inset(16% 0 16% 0);
    filter: brightness(1.8);
  }
  74% {
    clip-path: inset(1% 0 1% 0);
    filter: brightness(1.3);
  }
  86% {
    filter: brightness(1.4);
  }
  100% {
    clip-path: inset(0% 0 0% 0);
    filter: brightness(1);
  }
}

/* Occasional horizontal sync-loss jitter */
@keyframes crt-jitter {
  0%,
  92%,
  100% {
    transform: none;
  }
  92.5% {
    transform: skewX(-0.5deg) translateX(-3px);
    filter: brightness(1.15);
  }
  93% {
    transform: skewX(0.35deg) translateX(2px);
  }
  93.5% {
    transform: skewX(-0.1deg);
  }
  94% {
    transform: none;
  }
  97.2% {
    transform: skewX(-0.18deg) translateX(-1px);
  }
  97.5% {
    transform: none;
  }
}

/* ── noise/static overlay ── */
.crt-noise {
  position: absolute;
  inset: -100%;
  width: 300%;
  height: 300%;
  opacity: 0.034;
  z-index: 4;
  pointer-events: none;
  mix-blend-mode: screen;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  animation: static-drift 0.45s steps(2) infinite;
}

@keyframes static-drift {
  0% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(-4%, 2%);
  }
  66% {
    transform: translate(3%, -3%);
  }
  100% {
    transform: translate(-1%, 1%);
  }
}

/* ── horizontal scanlines ── */
.crt-scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0px,
    rgba(0, 0, 0, 0) 3px,
    rgba(0, 0, 0, 0.2) 3px,
    rgba(0, 0, 0, 0.2) 4px
  );
  z-index: 5;
  pointer-events: none;
}

/* ── rolling brightness band (electron beam) ── */
.crt-roll {
  position: absolute;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to bottom, transparent, rgba(61, 255, 101, 0.018) 50%, transparent);
  z-index: 6;
  pointer-events: none;
  animation: roll-scan 9s linear infinite;
}

@keyframes roll-scan {
  from {
    top: -60px;
  }
  to {
    top: 100%;
  }
}

/* ── vignette: dark corners simulate CRT glass curvature ── */
.crt-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 50%,
    rgba(0, 0, 0, 0) 42%,
    rgba(0, 0, 0, 0.52) 82%,
    rgba(0, 0, 0, 0.9) 100%
  );
  z-index: 7;
  pointer-events: none;
}

/* ── scrollable content ── */
.crt-content {
  position: relative;
  z-index: 3;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  color: #3dff65;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.8;
  scrollbar-width: thin;
  scrollbar-color: #1d6632 #020802;
}

.crt-content::-webkit-scrollbar {
  width: 5px;
}
.crt-content::-webkit-scrollbar-track {
  background: #010401;
}
.crt-content::-webkit-scrollbar-thumb {
  background: #1a5426;
}

/* ── toolbar ── */
.crt-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px 7px;
  text-shadow:
    0 0 7px rgba(61, 255, 101, 0.85),
    0 0 18px rgba(61, 255, 101, 0.3);
}

.crt-path {
  font-size: 10.5px;
  letter-spacing: 0.1em;
  opacity: 0.8;
}

.crt-actions {
  display: flex;
  gap: 10px;
}

.crt-btn {
  background: transparent;
  border: 1px solid rgba(61, 255, 101, 0.3);
  color: #3dff65;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 9.5px;
  letter-spacing: 0.12em;
  padding: 3px 9px;
  cursor: pointer;
  text-shadow:
    0 0 8px rgba(61, 255, 101, 0.9),
    0 0 18px rgba(61, 255, 101, 0.3);
  box-shadow:
    0 0 6px rgba(61, 255, 101, 0.08),
    inset 0 0 6px rgba(61, 255, 101, 0.04);
  transition:
    box-shadow 0.12s,
    background 0.12s;
}

.crt-btn:hover {
  background: rgba(61, 255, 101, 0.08);
  box-shadow:
    0 0 14px rgba(61, 255, 101, 0.25),
    inset 0 0 10px rgba(61, 255, 101, 0.1);
}

/* ── glowing divider line ── */
.crt-rule {
  height: 1px;
  margin: 0 16px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(61, 255, 101, 0.4) 15%,
    rgba(61, 255, 101, 0.4) 85%,
    transparent
  );
  box-shadow: 0 0 6px rgba(61, 255, 101, 0.25);
}

/* ── code lines ── */
.crt-code {
  padding: 10px 16px 18px;
  text-shadow:
    0 0 7px rgba(61, 255, 101, 0.92),
    0 0 16px rgba(61, 255, 101, 0.35),
    0 0 36px rgba(61, 255, 101, 0.1);
}

.crt-line {
  white-space: pre;
  min-height: 1.8em;
}

.crt-sym {
  opacity: 0.5;
  font-size: 11.5px;
}

.crt-out {
  color: #1fa842;
  text-shadow:
    0 0 6px rgba(31, 168, 66, 0.75),
    0 0 14px rgba(31, 168, 66, 0.25);
}

.crt-ok {
  color: #66ff88;
  text-shadow:
    0 0 9px rgba(102, 255, 136, 1),
    0 0 22px rgba(102, 255, 136, 0.55),
    0 0 45px rgba(102, 255, 136, 0.2);
}

/* ── typewriter cursor ── */
.crt-cursor {
  display: inline-block;
  color: #3dff65;
  text-shadow:
    0 0 7px rgba(61, 255, 101, 0.92),
    0 0 16px rgba(61, 255, 101, 0.5);
  animation: cur-blink 0.65s steps(1) infinite;
}

@keyframes cur-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* ── monitor control strip ── */
.monitor-base {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 14px;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
}

/* IBM logo: horizontal stripe effect */
.monitor-ibm {
  font-family: 'Arial Black', 'Arial Bold', Helvetica, sans-serif;
  font-size: 19px;
  font-weight: 900;
  letter-spacing: 5px;
  background: repeating-linear-gradient(
    180deg,
    #2558a8 0px,
    #2558a8 2.5px,
    transparent 2.5px,
    transparent 4.5px
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #2558a8;
  padding: 2px 0;
}

/* ── adjustment knobs ── */
.monitor-knobs {
  display: flex;
  align-items: center;
  gap: 9px;
}

.knob {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: radial-gradient(circle at 38% 35%, #c0b09c, #8c7860 50%, #6c5845);
  box-shadow:
    inset 1px 1px 3px rgba(255, 255, 255, 0.28),
    inset -1px -1px 3px rgba(0, 0, 0, 0.5),
    1px 1px 3px rgba(0, 0, 0, 0.45),
    0 0 0 1px rgba(0, 0, 0, 0.25);
  position: relative;
}

.knob::after {
  content: '';
  position: absolute;
  top: 3.5px;
  left: 50%;
  transform: translateX(-50%);
  width: 1.5px;
  height: 5px;
  background: rgba(0, 0, 0, 0.45);
  border-radius: 1px;
}

.knob-sm {
  width: 13px;
  height: 13px;
}
.knob-sm::after {
  height: 3.5px;
  top: 2.5px;
}

/* ── power indicators ── */
.monitor-indicators {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pwr-switch {
  width: 28px;
  height: 9px;
  background: linear-gradient(90deg, #8a7258, #6a5540 50%, #8a7258);
  border-radius: 2px;
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.6),
    inset 0 -1px 2px rgba(255, 255, 255, 0.08);
}

.pwr-led {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #00e044;
  box-shadow:
    0 0 4px #00e044,
    0 0 12px rgba(0, 224, 68, 0.65),
    0 0 24px rgba(0, 224, 68, 0.25);
  animation: led-glow 2.8s ease-in-out infinite;
}

@keyframes led-glow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
    box-shadow:
      0 0 2px #00e044,
      0 0 6px rgba(0, 224, 68, 0.4);
  }
}

/* ── enter/leave transitions ── */
.crt-modal-enter-active {
  transition: opacity 0.22s ease;
}
.crt-modal-leave-active {
  transition: opacity 0.18s ease;
}
.crt-modal-enter-from,
.crt-modal-leave-to {
  opacity: 0;
}

.crt-modal-enter-active .ibm-monitor {
  animation: monitor-in 0.32s cubic-bezier(0.175, 0.885, 0.32, 1.15) both;
}

@keyframes monitor-in {
  from {
    transform: scale(0.9) translateY(14px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
</style>
