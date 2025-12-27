<template>
    <section :class="[style, type]">
        <slot/>
      <TvNoiseEffect v-if="type === 'hard_skils' || type === 'skills'"/>
    </section>
</template>


<script setup>
import TvNoiseEffect from "~/components/UI/TvNoiseEffect.vue";

const props = defineProps({
  style: { type: String, default: '' },
  type: { type: String, default: '' },

})
</script>

<style scoped>
section {
    width: 100%;
    min-height: 100vh;
    position: relative;
    top: 0;
    padding: 2rem 4rem;
}

section.faq {
    height: 100%;
    min-height: unset;
    padding-bottom: 10rem;
}

section.hard_skils,
section.faq {
    position: sticky;
    top: 0;
}

section.hard_skils {
    padding: 12rem 4rem;
    height: 100dvh;
    min-height: unset;
}

section.accnet_background {
    background-color: var(--main-color);
    color: var(--bg-color);
}

section.dark_background {
    background-color: var(--bg-color);
    color: var(--text-color);
}
section.white_background {
  background-color: var(--bg-color-white);
  color: var(--text-color-black);
}

section.hard_skils {
    position: relative;
    top: 0;
}
@media (max-width: 768px) {
  section{
    padding: 2rem;
  }
  section.hard_skils{
    padding: 4rem 2rem
  }
  .hard_skill_container h4 {
    font-size: 3rem;
  }
}
</style>