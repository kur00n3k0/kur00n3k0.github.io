<script setup lang="ts">
import { ref } from 'vue'
import { ARTICLES } from '@/data/articles'
import { MONERO_LINES, PGP_LINES } from '@/data/contact'
import AsciiRule from '@/components/AsciiRule.vue'
import SitePanel from '@/components/SitePanel.vue'
import CodeBlock from '@/components/CodeBlock.vue'

const pgpBlock = ref<InstanceType<typeof CodeBlock>>()
const moneroBlock = ref<InstanceType<typeof CodeBlock>>()
</script>

<template>
  <div class="wrap" style="padding: 46px 28px 60px">
    <AsciiRule :double="true" style="margin-bottom: 22px" />
    <div class="foot-grid">
      <SitePanel label="// identity">
        <div style="padding: 15px">
          <div class="acc" style="font-size: 13px; margin-bottom: 6px">kur0n3k0</div>
          <div class="dim mono-xs" style="line-height: 1.9">
            <span
              class="acc"
              style="cursor: pointer; text-decoration: underline; text-underline-offset: 3px"
              @click="pgpBlock?.open()"
              >[ PGP ]
            </span
            ><br />sha256 verified · self-hosted<br />no trackers · no js telemetry
          </div>
        </div>
      </SitePanel>
      <SitePanel label="// status">
        <div style="padding: 15px">
          <pre class="code dim" style="font-size: 11.5px; line-height: 1.85">
uptime ..... 412d
posts ...... {{ ARTICLES.length }}
tor relay .. DOWN
i2p ........ DOWN
last sync .. 2026.08.23</pre
          >
        </div>
      </SitePanel>
      <SitePanel label="// channels">
        <div style="padding: 15px">
          <div class="dim mono-xs" style="line-height: 2.1">
            ▸ nostr: npub1u2r6uk4jqfgr9t4myn2rspvrs9kafyfe7zjjjajrg6ua6phdxqyqnj83q2<br />▸ github : https://github.com/kur00n3k0<br />▸ mirror : .onion<br />▸ <span
              class="acc"
              style="cursor: pointer; text-decoration: underline; text-underline-offset: 3px"
              @click="moneroBlock?.open()"
              >[ Monero ]
            </span>
          </div>
        </div>
      </SitePanel>
    </div>
    <div class="dim mono-xs" style="margin-top: 26px; text-align: center; letter-spacing: 0.14em">
      ◼ DEAD BYTE JOURNAL · EST. 1997 (ALLEGEDLY) · INFORMATION WANTS TO BE FREE ◼
    </div>
  </div>

  <!-- PGP key modal (no visible panel, modal only) -->
  <CodeBlock ref="pgpBlock" :no-panel="true" :lines="PGP_LINES" label="PGP PUBLIC KEY" />
  <CodeBlock ref="moneroBlock" :no-panel="true" :lines="MONERO_LINES" label="MONERO WALLET" />
</template>
