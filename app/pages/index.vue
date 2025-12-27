<template>
  <div ref="container" class="container">
    <Animation />
    <SectionsFolder />
    <SectionBase :style="'accnet_background'" type="skills">
      <SkillContainer />
    </SectionBase>
    <SectionBase :style="'dark_background'" type="faq">
      <FaqContainer />
    </SectionBase>
    <SectionBase :style="'dark_background'" type="hard_skils">
      <HardSkillSection />
    </SectionBase>
    <Footer />

    <MenuItem />
    
    <Cursor v-if="hasCursor" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Animation from "~/components/Animation.vue";
import SectionsFolder from "~/components/SectionsFolder.vue";
import SectionBase from "~/components/SectionBase.vue";
import Cursor from "~/components/UI/Cursor.vue";
import SkillContainer from "~/components/SkillContainer.vue";
import FaqContainer from "~/components/FaqContainer.vue";
import Footer from "~/components/Footer.vue";
import HardSkillSection from "~/components/HardSkillSection.vue";
import MenuItem from "~/components/UI/MenuItem.vue";

const typeSplit = ref(null);
const windowWidth = ref(0);
const container = ref(null);
const scrollProgress = ref(0);
const hasCursor = ref(false);

const handleResize = () => {
  if (!import.meta.client) return;
  const currentWidth = window.innerWidth;
  if (windowWidth.value !== currentWidth) {
    windowWidth.value = currentWidth;
    if (typeSplit.value) typeSplit.value.revert();
  }
};

const handleScroll = () => {
  if (!import.meta.client) return;
  const containerEl = container.value;
  if (!containerEl) return;

  const rect = containerEl.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const start = rect.top;
  const end = rect.bottom - viewportHeight;
  const scrollRange = end - start;

  let progress = 0;
  if (scrollRange === 0) {
    progress = start <= 0 ? 1 : 0;
  } else {
    progress = (0 - start) / scrollRange;
    progress = Math.min(1, Math.max(0, progress));
  }
  scrollProgress.value = progress;
};

onMounted(() => {
  if (!import.meta.client) return;

  windowWidth.value = window.innerWidth;
  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", handleScroll);
  hasCursor.value = window.matchMedia("(any-pointer: fine)").matches;

  handleScroll();
});

onUnmounted(() => {
  if (!import.meta.client) return;
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("scroll", handleScroll);
  if (typeSplit.value) typeSplit.value.revert();
});
</script>

<style>
.horizontal-scroll-section {
  top: 0 !important;
}

.test {
  height: 300vh;
}

.big_h4 {
  font-size: clamp(1.2rem, 2vw, 3rem);
}
.p-6 {
  position: relative;
}
</style>
