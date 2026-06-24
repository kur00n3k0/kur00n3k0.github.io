<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import StencilText from '@/components/StencilText.vue'
import GlitchSpan from '@/components/GlitchSpan.vue'
import AsciiRule from '@/components/AsciiRule.vue'
import SitePanel from '@/components/SitePanel.vue'
import AsciiSkull from '@/components/AsciiSkull.vue'
import BlinkCursor from '@/components/BlinkCursor.vue'
import CodeBlock from '@/components/CodeBlock.vue'

const router = useRouter()

const pgpBlock = ref<InstanceType<typeof CodeBlock>>()
const pgpLines = [
  { t: 'prompt' as const, x: '-----BEGIN PGP PUBLIC KEY BLOCK-----' },
  { t: 'prompt' as const, x: 'mDMEajss/RYJKwYBBAHaRw8BAQdASMiqtQFJHFfSXfXCh5xYrBGgHpRjLzxWkj8b' },
  { t: 'prompt' as const, x: 'jUe19Ua0IWt1cjBuM2swIDxtNHNoMWxvQHByb3Rvbm1haWwuY29tPoiWBBMWCgA+' },
  { t: 'prompt' as const, x: 'FiEENih+laM/HZaphdYYrShd5YelweIFAmo7LP0CGwMFCQWjmoAFCwkIBwIGFQoJ' },
  { t: 'prompt' as const, x: 'CAsCBBYCAwECHgECF4AACgkQrShd5YelweIi0gEAtDbSwt+R6QA540gAsGhlYYmA' },
  { t: 'prompt' as const, x: 'AWLye4IwmQNDRn+AXRkA/0i4EEhomqdMBdNbovBy+Xz7q3z5PfMuXTqIAF/PWCEM' },
  { t: 'prompt' as const, x: 'uDgEajss/RIKKwYBBAGXVQEFAQEHQCaE4b8serfo+8xhiMtk5WlZ0ZthVcUVQodr' },
  { t: 'prompt' as const, x: 'lWXZK9w3AwEIB4h+BBgWCgAmFiEENih+laM/HZaphdYYrShd5YelweIFAmo7LP0C' },
  { t: 'prompt' as const, x: 'GwwFCQWjmoAACgkQrShd5YelweIauQD/dnm6QEtMtLrAaggaO/0hOXeQJT/2+yRd' },
  { t: 'prompt' as const, x: '2lyD6TTtoT0A/iJd4VxtF69LRH53NAgMfOhNRAIakaG/GwTDp3eSQ28F' },
  { t: 'prompt' as const, x: '=ihWi' },
  { t: 'prompt' as const, x: '-----END PGP PUBLIC KEY BLOCK-----' },
]
</script>

<template>
  <div class="wrap" style="padding-top: 30px; padding-bottom: 60px">
    <StencilText :size="56"><GlitchSpan text="WHOAMI" /></StencilText>
    <AsciiRule :double="true" style="margin: 18px 0 26px" />

    <div style="display: grid; grid-template-columns: 1fr 280px; gap: 26px; align-items: start">
      <div>
        <p class="fg2" style="max-width: 62ch; font-size: 15px; line-height: 1.8">
          kur0n3k0 — security researcher, hardware tinkerer, and reluctant blogger. This is a field
          journal of things pulled apart: firmware, radios, protocols, and the occasional
          badly-configured network I was paid to break into.
        </p>
        <p class="fg2" style="max-width: 62ch; font-size: 15px; line-height: 1.8; margin-top: 14px">
          Everything here is written for people who want to <span class="acc">understand</span>, not
          just run tools. If a post helps you secure something, it did its job.<BlinkCursor />
        </p>
        <div style="margin-top: 22px; display: flex; gap: 12px">
          <span class="btn pri" @click="router.push('/archive')">read the archive ▸</span>
          <span class="btn" @click="router.push('/')">◂ home</span>
        </div>
      </div>

      <div style="display: grid; gap: 16px">
        <SitePanel label="// ethics">
          <div
            style="
              padding: 14px;
              color: var(--fg2);
              font-size: 11px;
              letter-spacing: 0.06em;
              line-height: 1.9;
            "
          >
            ▸ authorized targets only<br />▸ disclose, don't exploit<br />▸ teach what you learn<br />▸
            leave it more secure
          </div>
        </SitePanel>
        <SitePanel label="// keys">
          <div style="padding: 14px">
            <pre class="code dim" style="font-size: 11px; line-height: 1.9"><span
                class="acc"
                style="cursor: pointer; text-decoration: underline; text-underline-offset: 3px"
                @click="pgpBlock?.open()"
                >[ PGP ]</span>
matrix . @kur0n3k0
rss .... /rss.xml
mirror . .onion</pre>
          </div>
        </SitePanel>
        <div style="display: flex; justify-content: center">
          <AsciiSkull small style="font-size: 13px" />
        </div>
      </div>
    </div>
  </div>

  <!-- PGP key modal (no visible panel, modal only) -->
  <CodeBlock ref="pgpBlock" :no-panel="true" :lines="pgpLines" label="PGP PUBLIC KEY" />
</template>
