<script setup lang="ts">
import { useRouter } from 'vue-router'
import StencilText from '@/components/StencilText.vue'
import GlitchSpan from '@/components/GlitchSpan.vue'
import AsciiRule from '@/components/AsciiRule.vue'
import SitePanel from '@/components/SitePanel.vue'
import AsciiSkull from '@/components/AsciiSkull.vue'
import BlinkCursor from '@/components/BlinkCursor.vue'

const router = useRouter()
</script>

<template>
  <div class="wrap" style="padding-top:30px;padding-bottom:60px">
    <StencilText :size="56"><GlitchSpan text="WHOAMI" /></StencilText>
    <AsciiRule :double="true" style="margin:18px 0 26px" />

    <div style="display:grid;grid-template-columns:1fr 280px;gap:26px;align-items:start">
      <div>
        <p class="fg2" style="max-width:62ch;font-size:15px;line-height:1.8">
          kur0n3k0 — security researcher, hardware tinkerer, and reluctant blogger. This is a
          field journal of things pulled apart: firmware, radios, protocols, and the occasional
          badly-configured network I was paid to break into.
        </p>
        <p class="fg2" style="max-width:62ch;font-size:15px;line-height:1.8;margin-top:14px">
          Everything here is written for people who want to <span class="acc">understand</span>,
          not just run tools. If a post helps you secure something, it did its job.<BlinkCursor />
        </p>
        <div style="margin-top:22px;display:flex;gap:12px">
          <span class="btn pri" @click="router.push('/archive')">read the archive ▸</span>
          <span class="btn" @click="router.push('/')">◂ home</span>
        </div>
      </div>

      <div style="display:grid;gap:16px">
        <SitePanel label="// ethics">
          <div style="padding:14px;color:var(--fg2);font-size:11px;letter-spacing:.06em;line-height:1.9">
            ▸ authorized targets only<br />▸ disclose, don't exploit<br />▸ teach what you learn<br />▸ leave it more secure
          </div>
        </SitePanel>
        <SitePanel label="// keys">
          <div style="padding:14px">
            <pre class="code dim" style="font-size:11px;line-height:1.9">pgp .... 0xA1B2 C3D4
matrix . @kur0n3k0
rss .... /rss.xml
mirror . .onion</pre>
          </div>
        </SitePanel>
        <div style="display:flex;justify-content:center">
          <AsciiSkull small style="font-size:13px" />
        </div>
      </div>
    </div>
  </div>
</template>
