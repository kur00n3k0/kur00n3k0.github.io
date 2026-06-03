<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ARTICLES } from '@/data/articles'
import StencilText from '@/components/StencilText.vue'
import GlitchSpan from '@/components/GlitchSpan.vue'
import AsciiRule from '@/components/AsciiRule.vue'
import SitePanel from '@/components/SitePanel.vue'
import BlinkCursor from '@/components/BlinkCursor.vue'

const router = useRouter()
const tag = ref('all')
const year = ref('all')
const q = ref('')

const tags = computed(() => {
  const m: Record<string, number> = {}
  ARTICLES.forEach((a) => { m[a.tag] = (m[a.tag] || 0) + 1 })
  return [['all', ARTICLES.length], ...Object.entries(m).sort((x, y) => y[1] - x[1])] as [string, number][]
})

const years = computed(() => {
  const ys = [...new Set(ARTICLES.map((a) => a.date.slice(0, 4)))].sort((a, b) => Number(b) - Number(a))
  return ['all', ...ys]
})

const rows = computed(() =>
  ARTICLES.filter((a) =>
    (tag.value === 'all' || a.tag === tag.value) &&
    (year.value === 'all' || a.date.startsWith(year.value)) &&
    (q.value === '' || a.title.toLowerCase().includes(q.value.toLowerCase()) || a.tag.includes(q.value.toLowerCase()))
  )
)
</script>

<template>
  <div class="wrap" style="padding-top:30px;padding-bottom:60px">

    <!-- header -->
    <div class="dim mono-xs" style="margin-bottom:12px">
      <span class="acc">kur0n3k0@dedsec</span>:~/articles$ grep -ri "{{ q }}" . | sort -r<BlinkCursor />
    </div>
    <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:18px">
      <StencilText :size="56"><GlitchSpan text="ARCHIVE" /></StencilText>
      <span class="dim mono-xs">{{ rows.length }} / {{ ARTICLES.length }} entries</span>
    </div>
    <AsciiRule :double="true" style="margin-bottom:22px" />

    <div style="display:grid;grid-template-columns:218px 1fr;gap:22px;align-items:start">

      <!-- filter rail -->
      <div style="display:grid;gap:16px;position:sticky;top:70px">
        <SitePanel label="// search">
          <div style="padding:13px">
            <div style="display:flex;align-items:center;gap:8px;border:1px solid var(--line2);
              padding:7px 10px;background:var(--bg)">
              <span class="acc">⌕</span>
              <input
                v-model="q"
                placeholder="filter…"
                style="flex:1;min-width:0;background:transparent;border:0;outline:none;
                  color:var(--fg);font-family:var(--mono);font-size:12.5px"
              />
              <span v-if="q" class="dim" style="cursor:pointer" @click="q = ''">✕</span>
            </div>
          </div>
        </SitePanel>

        <SitePanel label="// filter::tag">
          <div style="padding:13px;display:grid;gap:3px">
            <div
              v-for="[t, n] in tags" :key="t"
              style="display:flex;justify-content:space-between;font-size:12.5px;cursor:pointer;padding:4px 6px"
              :style="{
                color: tag === t ? 'var(--acc)' : 'var(--dim)',
                background: tag === t ? 'var(--bg3)' : 'transparent',
                borderLeft: `2px solid ${tag === t ? 'var(--acc)' : 'transparent'}`,
              }"
              @click="tag = t"
            >
              <span class="upper" style="letter-spacing:.04em">{{ tag === t ? '▸ ' : '  ' }}{{ t }}</span>
              <span>{{ String(n).padStart(2, '0') }}</span>
            </div>
          </div>
        </SitePanel>

        <SitePanel label="// filter::year">
          <div style="padding:13px;display:flex;gap:7px;flex-wrap:wrap">
            <span
              v-for="y in years" :key="y"
              class="tag"
              :class="{ on: year === y }"
              style="cursor:pointer"
              @click="year = y"
            >{{ y }}</span>
          </div>
        </SitePanel>
      </div>

      <!-- list -->
      <div class="panel ticks">
        <span class="tk"></span>
        <!-- header row -->
        <div class="arow" style="border-bottom:1px solid var(--line2);cursor:default;color:var(--dim);
          font-size:10px;letter-spacing:.1em;text-transform:uppercase">
          <span>id</span><span>date</span><span>title</span><span>tag</span><span style="text-align:right">read</span>
        </div>

        <!-- empty state -->
        <div v-if="rows.length === 0" style="padding:40px 16px;text-align:center" class="dim">
          <div class="ascii" style="color:var(--faint);display:inline-block">¯\_(ツ)_/¯</div>
          <div class="mono-xs" style="margin-top:10px">
            no entries match.
            <span class="acc" style="cursor:pointer" @click="tag = 'all'; year = 'all'; q = ''">reset filters</span>
          </div>
        </div>

        <!-- rows -->
        <a
          v-for="a in rows" :key="a.id"
          class="arow"
          @click="router.push('/article/' + a.id)"
        >
          <span class="acc mono-xs">{{ a.id }}</span>
          <span class="dim mono-xs">{{ a.date }}</span>
          <span class="arow-t" style="font-size:14px">
            {{ a.title }}<span v-if="a.pinned" class="acc mono-xs"> ● pinned</span>
          </span>
          <span class="tag">{{ a.tag }}</span>
          <span class="dim mono-xs" style="text-align:right">{{ a.mins }}m</span>
        </a>

        <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 16px">
          <span class="dim mono-xs">page 1 / 1 · {{ rows.length }} shown</span>
          <div style="display:flex;gap:8px">
            <span class="btn">◂ prev</span>
            <span class="btn">next ▸</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
