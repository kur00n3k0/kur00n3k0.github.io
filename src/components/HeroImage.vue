<script setup lang="ts">
// Add your saved Pinterest images to src/assets/ and list them here.
const images = [
  new URL('@/assets/hero/1.jpg', import.meta.url).href,
  new URL('@/assets/hero/2.jpg', import.meta.url).href,
  new URL('@/assets/hero/3.jpg', import.meta.url).href,
  new URL('@/assets/hero/4.jpg', import.meta.url).href,
  new URL('@/assets/hero/5.jpg', import.meta.url).href,
  new URL('@/assets/hero/6.jpg', import.meta.url).href,
  new URL('@/assets/hero/7.jpg', import.meta.url).href,
  new URL('@/assets/hero/8.jpg', import.meta.url).href,
  new URL('@/assets/hero/9.jpg', import.meta.url).href,
  new URL('@/assets/hero/10.jpg', import.meta.url).href,
  new URL('@/assets/hero/11.jpg', import.meta.url).href,
  new URL('@/assets/hero/12.jpg', import.meta.url).href,
]

const src = images[Math.floor(Math.random() * images.length)]!
</script>

<template>
  <div class="hero-img-wrap" :style="{ '--img-src': `url('${src}')` }">
    <img :src="src" alt="" class="hero-img" />
  </div>
</template>

<style scoped>
.hero-img-wrap {
  position: relative;
  width: 170px;
  height: 268px;
  overflow: hidden;
  flex-shrink: 0;
}

/* glitch slice layer — duplicates image via CSS var so clip-path strips can shift */
.hero-img-wrap::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: var(--img-src);
  background-size: cover;
  background-position: center;
  filter: grayscale(100%) contrast(1.15);
  clip-path: inset(100% 0 0 0); /* hidden at rest */
  z-index: 1;
  pointer-events: none;
  animation:
    imgGA 5.5s steps(1) infinite,
    imgGB 7.3s steps(1) infinite;
}

/* green phosphor overlay */
.hero-img-wrap::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--acc);
  opacity: 0.4;
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 2;
}

.hero-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: grayscale(100%) contrast(1.15);
}

@keyframes imgGA {
  0%,
  88%,
  100% {
    clip-path: inset(100% 0 0 0);
    transform: translateX(0);
  }
  89% {
    clip-path: inset(12% 0 58% 0);
    transform: translateX(-5px);
  }
  90% {
    clip-path: inset(52% 0 22% 0);
    transform: translateX(4px);
  }
  91% {
    clip-path: inset(100% 0 0 0);
    transform: translateX(0);
  }
}

@keyframes imgGB {
  0%,
  91%,
  100% {
    clip-path: inset(100% 0 0 0);
    transform: translateX(0);
  }
  92% {
    clip-path: inset(5% 0 72% 0);
    transform: translateX(6px);
  }
  93% {
    clip-path: inset(65% 0 8% 0);
    transform: translateX(-4px);
  }
  94% {
    clip-path: inset(100% 0 0 0);
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-img-wrap::before {
    animation: none;
  }
}
</style>
