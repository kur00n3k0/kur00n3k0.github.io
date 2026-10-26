<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Article } from '@/data/articles'

defineProps<{ article: Article }>()

const router = useRouter()
</script>

<template>
  <a
    class="tile"
    style="justify-content: space-between"
    @click="router.push('/article/' + article.id)"
  >
    <div style="display: flex; justify-content: space-between; align-items: center">
      <span class="tile-id">{{ article.id }}</span>
      <span class="tag">{{ article.tag }}</span>
    </div>
    <div
      style="
        font-family: var(--bit);
        font-size: 23px;
        line-height: 1.05;
        text-transform: uppercase;
        color: var(--fg);
      "
    >
      {{ article.title.replace(/:.*$/, '').replace(/—.*/, '') }}
    </div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16px;
      "
    >
      <span class="dim mono-xs">{{ article.mins }} min</span>
      <span class="tile-go upper" style="font-size: 11px; letter-spacing: 0.08em">open ▸</span>
    </div>
  </a>
</template>
