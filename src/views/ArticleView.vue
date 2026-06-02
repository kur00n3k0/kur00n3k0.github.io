<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ARTICLES, byId } from '@/data/articles'
import type { ArticleBlock, CodeLine } from '@/data/articles'
import StencilText from '@/components/StencilText.vue'
import GlitchSpan from '@/components/GlitchSpan.vue'
import AsciiRule from '@/components/AsciiRule.vue'
import SitePanel from '@/components/SitePanel.vue'
import CodeBlock from '@/components/CodeBlock.vue'
import TheMarquee from '@/components/TheMarquee.vue'

const props = defineProps<{ id: string }>()
const router = useRouter()

const article = computed(() => byId(props.id))
const idx = computed(() => ARTICLES.findIndex((x) => x.id === article.value.id))
const prev = computed(() => ARTICLES[idx.value - 1] ?? null)
const next = computed(() => ARTICLES[idx.value + 1] ?? null)

// Annotate each body block with a section id for heading blocks
type AnnotatedBlock = ArticleBlock & { secId?: string }
const body = computed<AnnotatedBlock[]>(() => {
  let h = -1
  return article.value.body.map((b) => ({
    ...b,
    secId: b.t === 'h' ? `sec-${++h}` : undefined,
  }))
})

const active = ref(0)

function onScroll() {
  let cur = 0
  body.value.forEach((b) => {
    if (b.secId) {
      const el = document.getElementById(b.secId)
      if (el && el.getBoundingClientRect().top < 120) {
        const k = parseInt(b.secId.replace('sec-', ''))
        cur = k
      }
    }
  })
  active.value = cur
}

function jump(k: number) {
  const el = document.getElementById(`sec-${k}`)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: 'smooth' })
}

onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); onScroll() })
onUnmounted(() => window.removeEventListener('scroll', onScroll))
watch(() => props.id, () => { active.value = 0; window.scrollTo(0, 0) })
</script>

<template>
  <div class="wrap" style="padding-top:26px;padding-bottom:60px">
    <!-- breadcrumb -->
    <div class="dim mono-xs" style="margin-bottom:18px">
      <span class="acc" style="cursor:pointer" @click="router.push('/')">~</span>
      <span> / </span>
      <span class="acc" style="cursor:pointer" @click="router.push('/archive')">archive</span>
      <span> / {{ article.slug }}.md</span>
    </div>

    <div style="display:grid;grid-template-columns:210px 1fr;gap:28px;align-items:start">

      <!-- toc + meta rail -->
      <div style="display:grid;gap:16px;position:sticky;top:70px">
        <SitePanel label="// contents">
          <div style="padding:13px;display:grid;gap:4px">
            <div
              v-for="(s, k) in article.toc" :key="k"
              style="font-size:12.5px;cursor:pointer;padding:4px 6px;letter-spacing:.02em"
              :style="{
                color: active === k ? 'var(--acc)' : 'var(--dim)',
                borderLeft: `2px solid ${active === k ? 'var(--acc)' : 'transparent'}`,
                background: active === k ? 'var(--bg3)' : 'transparent',
              }"
              @click="jump(k)"
            >{{ active === k ? '▸ ' : '  ' }}{{ String(k + 1).padStart(2, '0') }} · {{ s }}</div>
          </div>
        </SitePanel>

        <SitePanel label="// meta">
          <div style="padding:13px">
            <pre class="code dim" style="font-size:11.5px;line-height:1.95">author · kur0n3k0
tag .... {{ article.tag }}
read ... {{ article.mins }} min
date ... {{ article.date }}
sha256 · 9f3a…b1
pgp .... verified</pre>
          </div>
        </SitePanel>
      </div>

      <!-- document window -->
      <div class="panel ticks">
        <span class="tk"></span>
        <div class="panel-h" style="justify-content:space-between">
          <span style="display:flex;gap:8px;align-items:center">
            <span style="display:flex;gap:5px">
              <i style="width:8px;height:8px;border-radius:50%;border:1px solid var(--dim);display:inline-block"></i>
              <i style="width:8px;height:8px;border-radius:50%;border:1px solid var(--dim);display:inline-block"></i>
              <i style="width:8px;height:8px;border-radius:50%;border:1px solid var(--dim);display:inline-block"></i>
            </span>
            {{ article.slug }}.md
          </span>
          <span>read-only</span>
        </div>

        <div style="padding:30px 38px 34px">
          <div class="dim mono-xs upper" style="margin-bottom:14px">{{ article.id }} · {{ article.date }} · {{ article.tag }}</div>
          <StencilText :size="44" style="white-space:normal;line-height:1.16;padding-bottom:.12em">
            <GlitchSpan :text="article.title.split(/[:—]/)[0]?.trim() ?? article.title" :block="true" />
          </StencilText>
          <div class="fg2" style="margin-top:20px;font-size:16px;max-width:60ch">{{ article.dek }}</div>
          <AsciiRule :double="true" style="margin:22px 0 4px" />

          <!-- body blocks -->
          <template v-for="(b, i) in body" :key="i">

            <!-- note -->
            <div v-if="b.t === 'note'"
              style="margin:22px 0;border-left:2px solid var(--acc);
                background:color-mix(in srgb,var(--acc) 6%, transparent);padding:12px 16px">
              <div class="acc mono-xs upper" style="margin-bottom:4px;letter-spacing:.1em">⚠ authorized use only</div>
              <div style="font-size:13px;color:var(--fg2);max-width:62ch">{{ b.x }}</div>
            </div>

            <!-- heading -->
            <h2 v-else-if="b.t === 'h'"
              :id="b.secId"
              style="scroll-margin-top:80px;margin:42px 0 16px;display:flex;align-items:center;gap:12px">
              <span style="width:3px;height:24px;background:var(--acc);box-shadow:0 0 8px var(--acc);flex-shrink:0"></span>
              <span class="upper" style="font-family:var(--bit);font-size:30px;line-height:1.2;
                color:var(--fg);letter-spacing:.02em;white-space:nowrap">{{ b.x }}</span>
            </h2>

            <!-- paragraph -->
            <p v-else-if="b.t === 'p'"
              style="max-width:64ch;margin:14px 0;font-size:15px;line-height:1.8;color:var(--fg2)">{{ b.x }}</p>

            <!-- code block -->
            <CodeBlock v-else-if="b.t === 'code'" :label="b.label" :lines="(b.lines ?? []) as CodeLine[]" />

            <!-- ascii art -->
            <div v-else-if="b.t === 'ascii'"
              class="panel raise" style="margin:20px 0;padding:16px 18px;overflow-x:auto">
              <pre class="ascii" style="color:var(--fg2);font-size:12.5px;line-height:1.55">{{ b.x }}</pre>
            </div>

            <!-- list -->
            <ul v-else-if="b.t === 'list'"
              style="list-style:none;padding:0;margin:16px 0;max-width:64ch;display:grid;gap:9px">
              <li v-for="(li, j) in (b.x as string[])" :key="j"
                style="display:flex;gap:11px;font-size:14.5px;line-height:1.65;color:var(--fg2)">
                <span class="acc" style="flex-shrink:0">▸</span>
                <span>{{ li }}</span>
              </li>
            </ul>
          </template>

          <AsciiRule :double="true" style="margin:34px 0 18px" />
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
            <span class="dim mono-xs">— EOF · signed kur0n3k0 · {{ article.id }}</span>
            <div style="display:flex;gap:8px">
              <span v-if="prev" class="btn" @click="router.push('/article/' + prev.id)">◂ {{ prev.id }}</span>
              <span v-else class="btn" @click="router.push('/archive')">◂ archive</span>
              <span v-if="next" class="btn pri" @click="router.push('/article/' + next.id)">{{ next.id }} ▸</span>
              <span v-else class="btn pri" @click="router.push('/')">home ▸</span>
            </div>
          </div>
        </div>
        <div style="border-top:1px solid var(--line)">
          <TheMarquee :items="['END OF FILE', 'STAY ANON', 'MASK ON', 'DEDSEC']" />
        </div>
      </div>
    </div>
  </div>
</template>
