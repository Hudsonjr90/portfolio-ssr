<template>
  <div ref="wrapperRef" :class="locationClass">
    <!-- "Phantom" spacer that reserves footer space -->
    <div v-if="location === 'bottom'" class="footer-spacer" aria-hidden="true">
      <div class="ul_folder">
        <ul>
          <h4>CONTATOS </h4>
          <li><a href="mailto:hudsonhugo90@gmail.com" tabindex="-1">Email</a></li>
          <li><a href="https://api.whatsapp.com/send?phone=5521969609121" tabindex="-1">WhatsApp</a></li>
          <li><a href="https://github.com/Hudsonjr90" tabindex="-1">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/hudsonkennedyjr" tabindex="-1">LinkedIn</a></li>
        </ul>
        <ul>
          <h4>LOCALIZAÇÃO</h4>
          <li>
            <p>Rio de Janeiro, Brasil</p>
          </li>
          <li>
            <p>Desenvolvedor Full-Stack</p>
          </li>
        </ul>
      </div>
      <h5 class="gradient-text-spacer">DESENVOLVEDOR FULL-STACK</h5>
    </div>

    <!-- Real footer -->
    <footer
        :id="location === 'bottom' ? 'footer' : null"
        ref="footerRef"
        class="sticky-footer"
    >
      <div class="ul_folder">
        <ul>
          <h4>CONTATOS</h4>
          <li><a href="mailto:hudsonhugo90@gmail.com" target="_blank">Email</a></li>
          <li><a href="https://api.whatsapp.com/send?phone=5521969609121" target="_blank">WhatsApp</a></li>
          <li><a href="https://github.com/Hudsonjr90" target="_blank">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/hudsonkennedyjr" target="_blank">LinkedIn</a></li>
        </ul>
        <ul>
          <h4>LOCALIZAÇÃO</h4>
          <li>
            <p>Rio de Janeiro, Brasil</p>
          </li>
          <li>
            <p>Desenvolvedor Full-Stack</p>
          </li>
        </ul>
      </div>
      <h5
          ref="textRef"
          class="gradient-text"
          :style="{
          '--x': cursorX + 'px',
          '--y': cursorY + 'px',
          '--hover': isHover ? 1 : 0
        }"
          @mousemove="handleMouseMove"
          @mouseenter="handleEnter"
          @mouseleave="handleLeave"
      >
        HK DEV
      </h5>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue"

const textRef = ref(null)
const cursorX = ref(0)
const cursorY = ref(0)
const isHover = ref(false)
const footerRef = ref(null)
const wrapperRef = ref(null)

let observer = null

const props = defineProps({
  location: {
    type: String,
    default: "bottom",
  },
})

const locationClass = computed(() => {
  if (props.location === "bottom") return "sticky-footer-wrapper"
  if (props.location === "menu") return "menu-footer-wrapper"
  return ""
})

function handleMouseMove(e) {
  if (!textRef.value) return
  const { left, top } = textRef.value.getBoundingClientRect()
  cursorX.value = e.clientX - left
  cursorY.value = e.clientY - top
}

function handleEnter() {
  isHover.value = true
}

function handleLeave() {
  isHover.value = false
}

function syncFooterHeight() {
  if (!footerRef.value || !wrapperRef.value) return
  const spacer = wrapperRef.value.querySelector(".footer-spacer")
  if (spacer) {
    footerRef.value.style.height = spacer.offsetHeight + "px"
  }
}

onMounted(() => {
  const spacer = wrapperRef.value?.querySelector(".footer-spacer")
  if (spacer) {
    observer = new ResizeObserver(syncFooterHeight)
    observer.observe(spacer)
    syncFooterHeight() 
  }
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.menu-footer-wrapper {
  width: 100%;
  position: absolute;
  min-height: 600px;
  left: 0;
  bottom: 0;
}

.menu-footer-wrapper footer {
  position: static;
  height: auto;
  min-height: 600px;
  background: #0f0f0f;
}

.menu-footer-wrapper .gradient-text {
  display: none;
}

.menu-footer-wrapper .footer-spacer {
  display: none;
}

/* Phantom element that reserves space for the fixed footer */
.footer-spacer {
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 600px;
  gap: 5rem;
  visibility: hidden; /* hidden visually but keeps layout */
  pointer-events: none;
  position: relative;
  z-index: -1;
}

.gradient-text-spacer {
  font-size: 11vw;
  margin: auto;
  font-weight: 600;
  opacity: 0;
}

/* Wrapper */
.sticky-footer-wrapper {
  position: relative;
  width: 100%;
  clip-path: polygon(0% 0, 100% 0%, 100% 100%, 0 100%);
}

/* Actual footer */
footer {
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #191919;
  z-index: 10;
  /* height is set dynamically via JS */
}

.ul_folder {
  display: flex;
  gap: 3rem;
}

ul {
  display: flex;
  flex-direction: column;
}

h4 {
  margin-bottom: 1.5rem;
}

a,
li > p {
  display: inline-block;
  padding: 0.7rem 1rem 0.7rem 0;
  transition: 0.1s;
}

h5 {
  font-size: clamp(2rem, 11vw, 10rem);
  margin: auto;
  font-weight: 600;
  opacity: 0.6;
}

.gradient-text {
  position: relative;
  background: linear-gradient(
      90deg,
      #ffba08,
      #ff9f00,
      #e75d04,
      #c60000,
      #cd0000,
      #620000,
      #370617,
      #ffba08
  );
  background-size: 400% 400%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: gradientShift 6s ease-in-out infinite alternate;
  transition: filter 0.4s ease;
}

.gradient-text::after {
  content: "WEB-DESIGNER";
  position: absolute;
  inset: 0;
  background: radial-gradient(
      circle 25vw at var(--x, 100%) var(--y, 100%),
      #000000 20%,
      #ffffff 80%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  filter: invert(1);
  mix-blend-mode: difference;
  opacity: var(--hover, 0);
  transition: opacity 0.4s ease;
  pointer-events: none;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

@media (max-width: 768px) {
  footer,
  .footer-spacer {
    padding: 2rem;
  }
}
</style>
