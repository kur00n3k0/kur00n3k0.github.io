<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ARTICLES } from '@/data/articles'
import StencilText from '@/components/StencilText.vue'
import GlitchSpan from '@/components/GlitchSpan.vue'
import AsciiSkull from '@/components/AsciiSkull.vue'
import AsciiRule from '@/components/AsciiRule.vue'
import SitePanel from '@/components/SitePanel.vue'
import BlinkCursor from '@/components/BlinkCursor.vue'
import TheMarquee from '@/components/TheMarquee.vue'

const router = useRouter()
const pinned = ARTICLES.find((a) => a.pinned) ?? ARTICLES[0]!
const minis = ARTICLES.filter((a) => a !== pinned)
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 4)
</script>

<template>
  <div>
    <!-- hero band -->
    <div class="wrap" style="padding-top:30px">
      <div class="panel ticks" style="display:flex;align-items:stretch">
        <span class="tk"></span>
        <div style="padding:30px 32px;flex:1;min-width:0">
          <div class="dim mono-xs upper" style="margin-bottom:14px">We are legion // ethical hacking field notes</div>
          <StencilText :size="92" style="margin-bottom:2px">
            <GlitchSpan text="DEAD BYTE" />
          </StencilText>
          <StencilText :size="92" class="acc" :glow="true">
            <GlitchSpan text="JOURNAL" />
          </StencilText>
          <p class="fg2" style="margin-top:20px;max-width:460px;font-size:14.5px">
            Reverse engineering, rogue hardware and red-team dossiers — pulled apart, documented,
            and signed. No bullshit. Read the source.<BlinkCursor />
          </p>
          <div style="display:flex;gap:12px;margin-top:26px;flex-wrap:wrap">
            <span class="btn pri" @click="router.push('/article/0x01')">./read 0x01</span>
            <span class="btn" @click="router.push('/archive')">cd ./archive</span>
          </div>
        </div>
        <div class="hero-skull" style="border-left:1px solid var(--line);background:var(--bg3);padding:20px 30px;
          display:flex;flex-direction:column;justify-content:center;gap:16px;flex-shrink:0">
          <AsciiSkull style="font-size:14px" />
          <div class="dim mono-xs" style="text-align:center;letter-spacing:.18em">// MASK ON</div>
        </div>
      </div>
    </div>

    <div style="margin:26px 0"><TheMarquee /></div>

    <!-- bulletin grid -->
    <div class="wrap">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:16px">
        <StencilText :size="34">// Latest Dispatches</StencilText>
        <span class="tag btn" @click="router.push('/archive')">view all ({{ ARTICLES.length }}) ▸</span>
      </div>
      <AsciiRule style="margin-bottom:20px" />
      <div class="bull-grid">

        <!-- big tile (pinned) -->
        <a class="tile tile-pinned" style="grid-row:span 2;justify-content:space-between;padding:22px 24px"
           @click="router.push('/article/' + pinned.id)">
          <span class="num-bg">{{ pinned.id.slice(-2) }}</span>
          <div style="display:flex;justify-content:space-between;align-items:center;position:relative;z-index:1">
            <span class="tile-id">{{ pinned.id }} · pinned</span>
            <span class="tag on">{{ pinned.tag }}</span>
          </div>
          <div style="position:relative;z-index:1;margin-top:18px">
            <div style="max-width:300px">
              <div style="font-family:var(--bit);font-size:40px;line-height:1.05;text-transform:uppercase;
                color:var(--fg);position:relative;z-index:1;padding-bottom:.06em">
                <GlitchSpan :text="pinned.title.split(':')[0]!" />
              </div>
            </div>
            <p class="fg2" style="margin-top:18px;max-width:380px;font-size:13.5px">{{ pinned.dek }}</p>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:22px;position:relative;z-index:1">
            <span class="dim mono-xs">{{ pinned.date }} · {{ pinned.mins }} min read</span>
            <span class="tile-go upper" style="font-size:12px;letter-spacing:.08em">read ▸</span>
          </div>
        </a>

        <!-- mini tiles -->
        <a v-for="a in minis" :key="a.id"
           class="tile" style="justify-content:space-between"
           @click="router.push('/article/' + a.id)">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span class="tile-id">{{ a.id }}</span>
            <span class="tag">{{ a.tag }}</span>
          </div>
          <div style="font-family:var(--bit);font-size:23px;line-height:1.05;text-transform:uppercase;color:var(--fg)">
            {{ a.title.replace(/:.*$/, '').replace(/—.*/, '') }}
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px">
            <span class="dim mono-xs">{{ a.mins }} min</span>
            <span class="tile-go upper" style="font-size:11px;letter-spacing:.08em">open ▸</span>
          </div>
        </a>
      </div>
    </div>

    <!-- footer -->
    <div class="wrap" style="padding:46px 28px 60px">
      <AsciiRule :double="true" style="margin-bottom:22px" />
      <div class="foot-grid">
        <SitePanel label="// identity">
          <div style="padding:15px">
            <div class="acc" style="font-size:13px;margin-bottom:6px">kur0n3k0</div>
            <div class="dim mono-xs" style="line-height:1.9">
              pgp 0xA1B2 C3D4 E5F6<br />sha256 verified · self-hosted<br />no trackers · no js telemetry
            </div>
          </div>
        </SitePanel>
        <SitePanel label="// status">
          <div style="padding:15px">
            <pre class="code dim" style="font-size:11.5px;line-height:1.85">uptime ..... 412d
posts ...... {{ ARTICLES.length }}
tor relay .. UP
last sync .. 2026.06.01</pre>
          </div>
        </SitePanel>
        <SitePanel label="// channels">
          <div style="padding:15px">
            <div class="dim mono-xs" style="line-height:2.1">
              ▸ /rss.xml<br />▸ matrix : @kur0n3k0<br />▸ mirror : .onion<br />▸ monero: 0xffffffff
            </div>
          </div>
        </SitePanel>
      </div>
      <div class="dim mono-xs" style="margin-top:26px;text-align:center;letter-spacing:.14em">
        ◼ DEAD BYTE JOURNAL · EST. 1997 (ALLEGEDLY) · INFORMATION WANTS TO BE FREE ◼
      </div>
    </div>
  </div>
</template>
