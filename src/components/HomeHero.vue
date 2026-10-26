<script setup lang="ts">
import { useRouter } from 'vue-router'
import StencilText from '@/components/StencilText.vue'
import ScrambleText from '@/components/ScrambleText.vue'
import HeroImage from '@/components/HeroImage.vue'
import BlinkCursor from '@/components/BlinkCursor.vue'

const router = useRouter()
</script>

<template>
  <div class="wrap" style="padding-top: 30px">
    <div class="panel ticks" style="display: flex; align-items: stretch">
      <span class="tk"></span>
      <div style="padding: 30px 32px; flex: 1; min-width: 0">
        <div class="dim mono-xs upper" style="margin-bottom: 14px">
          We are legion // ethical hacking field notes
        </div>
        <StencilText :size="92" style="margin-bottom: 2px">
          <ScrambleText text="DEAD BYTE" :delay="250" />
        </StencilText>
        <StencilText :size="92" class="acc" :glow="true">
          <ScrambleText text="JOURNAL" :delay="820" />
        </StencilText>
        <p class="fg2" style="margin-top: 20px; max-width: 460px; font-size: 14.5px">
          Reverse engineering, rogue hardware and red-team dossiers — pulled apart, documented,
          and signed. No bullshit. Read the source.<BlinkCursor />
        </p>
        <div style="display: flex; gap: 12px; margin-top: 26px; flex-wrap: wrap">
          <span class="btn pri" @click="router.push('/article/0x01')">./read 0x01</span>
          <span class="btn" @click="router.push('/archive')">cd ./archive</span>
        </div>
      </div>
      <div
        class="hero-skull"
        style="
          border-left: 1px solid var(--line);
          background: var(--bg3);
          padding: 20px 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 16px;
          flex-shrink: 0;
        "
      >
        <HeroImage />
        <div class="dim mono-xs" style="text-align: center; letter-spacing: 0.18em">
          // MASK ON
        </div>
      </div>
    </div>
  </div>
</template>
