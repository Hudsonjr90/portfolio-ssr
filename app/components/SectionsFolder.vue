<template>
  <div   id="portfolio" v-show="!isMobile" class="sticky_parent" ref="stickyParent">
    <section class="sticky" ref="horizontalSection">
      <div class="scroll_section" ref="contentStrip">

        <!-- About Panel -->
        <div class="panel about-panel">
          <aside>
            <SectionDescription
                class="description"
                title="SOBRE MIM"
                description="Sou Hudson Kennedy — um desenvolvedor full-stack com paixão por criar interfaces elegantes e responsivas usando React, Vue e Angular. Também trabalho com Node.js, NestJS e bancos de dados para desenvolver sistemas completos. Com um olhar atento para design e UX, entrego funcionalidade e acabamento visual em projetos web modernos."
            />
            <div class="links_block">
              <a href="https://github.com/Hudsonjr90" target="_blank"><span>GitHub</span></a>
              <a href="https://www.linkedin.com/in/hudsonkennedyjr" target="_blank"><span>LinkedIn</span></a>
            </div>
          </aside>
        </div>

        <!-- Project Panels -->
        <div
            class="panel project-panel"
            v-for="(project, index) in projectInfo"
            :key="index"
            @click="handleProjectClick(index)"
        >
          <ProjectItem :project="project" :index="index" />
        </div>

      </div>
    </section>
  </div>

  <!-- Mobile vertical scroll -->
  <section  id="portfolio-mobile" v-show="isMobile" class="vertical-scroll-section">
    <div class="mobile-panel about-panel">
      <SectionDescription
          class="description"
          title="SOBRE MIM"
          description="Sou Hudson Kennedy — um desenvolvedor full-stack com paixão por criar interfaces elegantes e responsivas usando React, Vue e Angular. Também trabalho com Node.js, NestJS e bancos de dados para desenvolver sistemas completos. Com um olhar atento para design e UX, entrego funcionalidade e acabamento visual em projetos web modernos."
      />
      <div class="links_block">
        <a href="https://github.com/Hudsonjr90" target="_blank"><span>GitHub</span></a>
        <a href="https://www.linkedin.com/in/hudsonkennedyjr" target="_blank"><span>LinkedIn</span></a>
      </div>
    </div>

    <div
        class="mobile-panel project-panel"
        v-for="(project, index) in projectInfo"
        :key="index"
        @click="handleProjectClick(index)"
    >
      <ProjectItem
          class="mobile"
          :project="project"
          :index="index"
          :isActive="activePanel === index + 1"
      />
    </div>
  </section>

  <ProjectReveal
      :active="activeReveal"
      :index="activeIndex"
      :item="projectInfoData"
      @close="activeReveal = false"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import ProjectItem from "./UI/ProjectItem.vue";
import ProjectReveal from "~/components/test/ProjectReveal.vue";
import SectionDescription from "./UI/SectionDescription.vue";
import projectInfoData from "@/assets/data/project_info.json";
import Lenis from "@studio-freight/lenis";

const stickyParent = ref(null);
const horizontalSection = ref(null);
const contentStrip = ref(null);

const isMobile = ref(false);
const activePanel = ref(0);
const activeReveal = ref(false);
const activeIndex = ref(null);
const projectInfo = ref(projectInfoData);

let lenis = null;
let ticking = false;

// Клік по проекту
function handleProjectClick(index) {
  activeIndex.value = index;
  activeReveal.value = true;
}

// Визначення мобільної версії
function checkScreenSize() {
  isMobile.value = window.innerWidth <= 768;
}

// Оновлення висоти sticky_parent для горизонтального скроллу
function updateStickyHeight() {
  if (!stickyParent.value || !contentStrip.value) return;
  const totalWidth = contentStrip.value.scrollWidth;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const newHeight = (totalWidth / windowWidth) * windowHeight;
  stickyParent.value.style.height = `${newHeight}px`;
}

// Горизонтальна трансформація панелей
function updateTransforms() {
  if (!contentStrip.value) return;
  const scrollY = window.scrollY;
  const offsetTop = stickyParent.value.offsetTop;
  const winHeight = window.innerHeight;

  let percentage = ((scrollY - offsetTop) / winHeight) * 100;
  const maxPercentage =
      ((contentStrip.value.scrollWidth - window.innerWidth) / window.innerWidth) * 100;
  percentage = Math.min(maxPercentage, Math.max(0, percentage));

  contentStrip.value.style.transform = `translate3d(${-percentage}vw, 0, 0)`;
  ticking = false;
}

// Мобільна активна панель
function updateActivePanelMobile() {
  if (!isMobile.value) return;
  const panels = document.querySelectorAll(".mobile-panel.project-panel");
  let currentIndex = 0;

  panels.forEach((panel, idx) => {
    const rect = panel.getBoundingClientRect();
    const panelMiddle = rect.top + rect.height / 2;
    if (panelMiddle >= window.innerHeight * 0.25 && panelMiddle <= window.innerHeight * 0.75) {
      currentIndex = idx + 1;
    }
  });

  activePanel.value = currentIndex;
}

// Lenis smooth scroll
function initLenis() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    smooth: true,
  });

  function raf(time) {
    if (!lenis) return;
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateTransforms);
      ticking = true;
    }
  });
}

// Resize handler
function handleResize() {
  checkScreenSize();
  if (!isMobile.value) {
    updateStickyHeight();
    initLenis();
  } else {
    if (lenis) {
      lenis.destroy();
      lenis = null;
    }
    updateActivePanelMobile();
  }
}

// Lifecycle
onMounted(async () => {
  await nextTick();
  checkScreenSize();

  if (!isMobile.value) {
    updateStickyHeight();
    initLenis();
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateTransforms);
        ticking = true;
      }
    });
  } else {
    window.addEventListener("scroll", updateActivePanelMobile);
    updateActivePanelMobile();
  }

  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("scroll", updateActivePanelMobile);

  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
});
</script>

<style scoped>
.sticky_parent {
  position: relative;
}

.sticky {
  overflow: hidden;
  position: sticky;
  top: 0;
  height: 100vh;
}

.scroll_section {
  position: absolute;
  top: 0;
  height: 100%;
  width: auto;
  display: flex;
  align-items: center;
  will-change: transform;
}

.panel {
  flex-shrink: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-panel {
  background: var(--bg-color);
  width: var(--about-width);
  padding: 0 4rem;
}

.project-panel {
  background: var(--bg-color);
  width: var(--project-width);
  border-left: 1px solid var(--text-color);
  display: block;
}

/* Mobile */
.vertical-scroll-section {
  background: var(--bg-color);
  position: relative;
}

.mobile-panel.about-panel,
.mobile-panel.project-panel {
  width: 100%;
}

.mobile-panel.about-panel {
  padding: 4rem;
}

.mobile-panel.project-panel {
  border: none;
}

.links_block {
  width: 100%;
  display: flex;
  justify-content: start;
  transform: translateX(-2rem);
}

.links_block a {
  padding: 2rem;
}

@media (max-width: 768px) {
  .mobile-panel.about-panel{
    padding: 2rem;
  }
  .links_block {
    transform: translateX(-1rem);
  }
  .links_block a{
    padding: 1rem;
  }
}
</style>
