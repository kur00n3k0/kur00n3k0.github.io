<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ARTICLES } from '@/data/articles'
import StencilText from '@/components/StencilText.vue'
import AsciiRule from '@/components/AsciiRule.vue'
import PinnedTile from '@/components/PinnedTile.vue'
import MiniTile from '@/components/MiniTile.vue'

const router = useRouter()
const pinned = ARTICLES.find((a) => a.pinned) ?? ARTICLES[0]!
const minis = ARTICLES.filter((a) => a !== pinned)
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 4)
</script>

<template>
  <div class="wrap">
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 16px;
      "
    >
      <StencilText :size="34">// Latest Dispatches</StencilText>
      <span class="tag btn" @click="router.push('/archive')"
        >view all ({{ ARTICLES.length }}) ▸</span
      >
    </div>
    <AsciiRule style="margin-bottom: 20px" />
    <div class="bull-grid">
      <PinnedTile :article="pinned" />
      <MiniTile v-for="a in minis" :key="a.id" :article="a" />
    </div>
  </div>
</template>
