<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Article } from '@/data/articles'
import GlitchSpan from '@/components/GlitchSpan.vue'

defineProps<{ article: Article }>()

const router = useRouter()
</script>

<template>
  <a
    class="tile tile-pinned"
    style="grid-row: span 2; justify-content: space-between; padding: 22px 24px"
    @click="router.push('/article/' + article.id)"
  >
    <span class="num-bg">{{ article.id.slice(-2) }}</span>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        z-index: 1;
      "
    >
      <span class="tile-id">{{ article.id }} · pinned</span>
      <span class="tag on">{{ article.tag }}</span>
    </div>
    <div style="position: relative; z-index: 1; margin-top: 18px">
      <div style="max-width: 300px">
        <div
          style="
            font-family: var(--bit);
            font-size: 40px;
            line-height: 1.05;
            text-transform: uppercase;
            color: var(--fg);
            position: relative;
            z-index: 1;
            padding-bottom: 0.06em;
          "
        >
          <GlitchSpan :text="article.title.split(':')[0]!" />
        </div>
      </div>
      <p class="fg2" style="margin-top: 18px; max-width: 380px; font-size: 13.5px">
        {{ article.dek }}
      </p>
    </div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 22px;
        position: relative;
        z-index: 1;
      "
    >
      <span class="dim mono-xs">{{ article.date }} · {{ article.mins }} min read</span>
      <span class="tile-go upper" style="font-size: 12px; letter-spacing: 0.08em">read ▸</span>
    </div>
  </a>
</template>
