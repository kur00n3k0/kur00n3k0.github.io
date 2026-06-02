<script setup lang="ts">
import type { CodeLine } from '@/data/articles'
import SitePanel from './SitePanel.vue'

defineProps<{ label?: string; lines: CodeLine[] }>()
</script>

<template>
  <SitePanel raise style="margin:20px 0">
    <div class="panel-h"><span class="acc">▸</span> terminal — {{ label ?? 'sh' }}</div>
    <div style="padding:14px 16px;font-family:var(--mono);font-size:12.5px;line-height:1.7;overflow-x:auto">
      <div v-for="(ln, i) in lines" :key="i">
        <template v-if="ln.t === 'cmd'"><span class="acc">$ </span>{{ ln.x }}</template>
        <template v-else-if="ln.t === 'prompt'"><span class="acc">{{ ln.p }} </span>{{ ln.x }}</template>
        <template v-else-if="ln.t === 'ok'"><span class="acc">{{ ln.x }}</span></template>
        <template v-else><span class="dim">{{ ln.x }}</span></template>
      </div>
    </div>
  </SitePanel>
</template>
