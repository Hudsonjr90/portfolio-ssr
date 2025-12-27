
<template>
  <div class="menu_holder"
       :class="{ active: activeBtn }"

  >
    <button
        ref="menuButton"
        class="menu_button"
        :class="{ active: activeBtn }"
        aria-label="Toggle navigation menu"
        @click="clickBtn"
    >
      <div class="activateBtn" :class="{ hide: activeBtn }">
        <span /><span /><span />
      </div>
      <div class="closeBtn" :class="{ show: activeBtn }">
        <span /><span />
      </div>
    </button>

    <div
        ref="menuSection"
        class="menu_section"
        :class="{ active: activeBtn, closing: closing }"
        tabindex="-1"
        @keydown="handleKeydown"
    >
      <tv-noise-effect class="noise-dark-rounded"/>
      <div
          v-for="(el, index) in elements"
          :key="index"
          ref="linkHolders"
          class="link_holder"

      >
        <div
            class="link_without_child"
        >
          <button
              class="menu_link"
              role="button"
              @click="() => scrollToSection(el.link)"
          >
            {{ el.text }}
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import TvNoiseEffect from "~/components/UI/TvNoiseEffect.vue";


const activeBtn = ref(false);
const closing = ref(false);
const menuSection = ref(null);
const menuButton = ref(null);
const linkHolders = ref([]);
const childHolder = ref(null);
const isOpen = ref(false);
const isFocusTrapped = ref(false);

const elements = [
  { text: 'Início', link: '#main' },
  { text: 'Sobre Mim', link: '#portfolio' },
  { text: 'Habilidades', link: '#skills' },
  { text: 'Projetos', link: '#portfolio' },
  { text: 'FAQ', link: '#faq' },
  { text: 'Contatos', link: '#footer' },
];


function clickBtn() {
  if (activeBtn.value) {
    closeMenuAnimation();
  } else {
    activeBtn.value = true;
    isFocusTrapped.value = true;
  }
}

function closeMenuAnimation() {
  activeBtn.value = false;
  isFocusTrapped.value = false;

  isOpen.value = false
  closing.value = true;

  setTimeout(() => {
    closing.value = false;
    menuSection.value.style.animationDuration = `1600ms`;
  }, 1600); 
  const linkHoldersEls = menuSection.value.querySelectorAll('.link_holder');
  linkHoldersEls.forEach((el) =>
  {
    el.style.transitionDuration = `1600ms`; 
  });
}

function smoothScrollTo(targetY, duration = 600, easing = (t) => t) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime = null;

  function step(time) {
    if (!startTime) startTime = time;
    const progress = Math.min((time - startTime) / duration, 1);
    window.scrollTo(0, startY + diff * easing(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function getDynamicDuration(distance) {
  const pageHeight = document.body.scrollHeight;
  const minDuration = 500;  
  const maxDuration = 1300;

  let duration = (distance / pageHeight) * maxDuration;

  return Math.min(Math.max(duration, minDuration), maxDuration);
}

function scrollToSection(link) {
  const id = link.replace('#', '');
  const el = document.getElementById(id);

  const scrollToTarget = () => {
    let targetY = 0;
    if (link === '#main') targetY = 0;
    else if (link === '#footer') targetY = document.body.scrollHeight;
    else if (el) targetY = el.getBoundingClientRect().top + window.scrollY;

    const distance = Math.abs(window.scrollY - targetY);
    const duration = getDynamicDuration(distance); 

    smoothScrollTo(targetY, duration, (t) => t); 
    if (menuSection.value) {
      menuSection.value.style.animationDuration = `${duration}ms`;
      const linkHoldersEls = menuSection.value.querySelectorAll('.link_holder');
      linkHoldersEls.forEach((el) => {
        el.style.transitionDuration = `${duration * 0.25}ms`;
      });
    }
  };

  if (activeBtn.value) {
    closeMenuAnimation(); 
    scrollToTarget();     
  } else {
    scrollToTarget();
  }
}


function handleKeydown(event) {
  if (event.key === 'Escape') {
    closeMenuAnimation();
  }
}

function trapFocus(e) {
  if (!isFocusTrapped.value) return;

  const focusableElements = menuSection.value.querySelectorAll(
      'button, [role="button"], [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
}
function handleClickOutside(event) {
  if (
      menuSection.value &&
      !menuSection.value.contains(event.target) &&
      menuButton.value &&
      !menuButton.value.contains(event.target) &&
      activeBtn.value
  ) {
    closeMenuAnimation();
  }
}



onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('click', handleClickOutside);

  menuSection.value.addEventListener('keydown', trapFocus);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.removeEventListener('click', handleClickOutside);

  menuSection.value.removeEventListener('keydown', trapFocus);
});

watch(isOpen, async (val) => {
  await nextTick();

  const el = childHolder.value[0];
  if (!el) return;

  el.style.height = 'auto';
  const childHeight = el.scrollHeight + 'px';
  el.style.height = '0';

  if (val) {
    requestAnimationFrame(() => {
      el.style.transition = 'height 0.4s ease';
      el.style.height = childHeight;
    });
  } else {
    el.style.transition = 'height 0.4s ease';
    el.style.height = '0';
  }
});
</script>

<style scoped>

.menu_button {
  position: fixed;
  right: 2rem;
  top: 2rem;
  height: 3rem;
  width: 3rem;
  z-index: 9999;
  mix-blend-mode: difference;
  background: transparent;
}

.menu_section {
  position: fixed;
  right: .5rem;
  top: .5rem;
  width: 0;
  height: 0;
  background: black;
  transition: transform 0.6s ease;
  display: flex;
  flex-direction: column;
  z-index: -1;
  border-radius: 1rem;
}

.menu_section.active {
  z-index: 9998;
  animation: grow 1.6s ease forwards;

}
.menu_section.closing {
  z-index: 9998;
  animation: shrink 1.6s ease forwards ;
}
.link_holder {
  opacity: 0;
  margin: 0 2rem;
  transition: opacity 0.4s ease 1.6s;
  position: relative;
  z-index: 2;

}
.menu_section.active .link_holder {
  transition: opacity 0.4s ease 1.6s;
  opacity: 1;
}
.menu_section.closing .link_holder {
  transition-property: opacity;
  transition-timing-function: linear; /* optional */
  transition-duration: 0.4s; /* fallback */
  transition-delay: 0s;
}
@keyframes grow {
  0% {
    height: 0;
    width: 6rem;
  }
  49% {
    height: 99dvh;
    width: 6rem;
  }
  50% {
    height: 99dvh;
    width: 6rem;
  }
  100% {
    height: 99dvh;
    width: 400px;
  }
}

@keyframes shrink {
  0% {
    height: 99dvh;
    width: 400px;
  }
  49% {
    height: 99dvh;
    width: 6rem;
  }
  50% {
    height: 99dvh;
    width: 6rem;
  }
  100% {
    height: 0;
    width: 6rem;
  }
}


.closeBtn,
.activateBtn {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.activateBtn {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  z-index: 111;
}

.activateBtn span,
.closeBtn span {
  width: 100%;
  height: 4px;
  mix-blend-mode: difference;
  background-color: white;
  transition: width 0.3s ease;
}

.activateBtn span:nth-child(2) {
  width: 67%;
}
.activateBtn span:nth-child(3) {
  width: 33%;
}

.activateBtn:hover > span {
  width: 100%;
}
.activateBtn.hide span {
  width: 0;
}

.closeBtn {
  z-index: 110;
}
.closeBtn span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  transform-origin: center;
  opacity: 0;
}
.closeBtn.show span {
  width: 100%;
  opacity: 1;
}
.closeBtn span:nth-child(1) {
  transform: translate(-50%, -50%) rotate(45deg);
  transition-delay: 0.35s;
}
.closeBtn span:nth-child(2) {
  transform: translate(-50%, -50%) rotate(-45deg);
  transition-delay: 0.45s;
}
.link_holder:nth-child(2){
  margin-top: 5rem;
}

button.menu_link {
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 3px;

  color: var(--text-color);
  padding: 1rem 0;
  text-transform: uppercase;
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: 0.2s;
  opacity: 0.3;

}

.menu_section:has(button:hover) .menu_link {
  opacity: 0.4;
}
.menu_section .menu_link:hover {
  opacity: 1 !important;
}

@media screen and (max-width: 670px) {
  @keyframes grow {
    0% {
      height: 0;
      width: 6rem;
    }
    49% {
      height: 99dvh;
      width: 6rem;
    }
    50% {
      height: 99dvh;
      width: 6rem;
    }
    100% {
      height: 99dvh;
      width: calc(100vw - 1rem);
    }
  }

  @keyframes shrink {
    0% {
      height: 99dvh;
      width: calc(100vw - 1rem);
      }
    49% {
      height: 99dvh;
      width: 6rem;
    }
    50% {
      height: 99dvh;
      width: 6rem;
    }
    100% {
      height: 0;
      width: 6rem;
    }
  }

}

</style>
