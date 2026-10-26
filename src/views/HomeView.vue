<script setup lang="ts">
import HomeHero from '@/components/HomeHero.vue'
import TheMarquee from '@/components/TheMarquee.vue'
import LatestDispatches from '@/components/LatestDispatches.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <div>
    <HomeHero />
    <div style="margin: 26px 0"><TheMarquee /></div>
    <LatestDispatches />
    <SiteFooter />
  </div>
</template>
