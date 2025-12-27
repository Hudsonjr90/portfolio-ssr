
<template>
  <div class="menu_holder">
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
      <div
          v-for="(el, index) in elements"
          :key="index"
          ref="linkHolders"
          class="link_holder"
          :style="{ 'transition-delay': `${index * 0.2 + 0.2}s` }"
          :class="{ showLink: activeBtn }"
      >
        <div
            :class="el.child ? 'link_with_child_buttton' : 'link_without_child'"
            @click.stop="el.child ? isOpen = !isOpen : scrollToSection(el.link)"
        >
          <button
              class="menu_link"
              role="button"
              :aria-expanded="el.child ? openChild[index] : undefined"
              @click.stop="el.child ? isOpen = !isOpen : scrollToSection(el.link)"
          >
            {{ el.text }}
          </button>

          <span
              v-if="el.child"
              class="child_buttton"
              :class="{ active: isOpen }"
              role="button"
              aria-label="Toggle submenu"
          >
            +
          </span>
        </div>

        <div
            v-if="el.child"
            ref="childHolder"
            class="child_holder"
            :class="{ open: openChild[index] }"
            :data-index="index"
        >
          <button
              v-for="(childEl, cIndex) in el.child"
              :key="childEl.link"
              role="button"
              :style="{ 'transition': `opacity 0.2s, clip-path 1s ${cIndex * 0.1 + 0.2}s` }"
              @click="scrollToSection(childEl.link)"
              :class="{ active: isOpen }"
          >
            {{ childEl.text }}
          </button>
        </div>
      </div>
      <Footer location="menu" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue';
import Footer from '~/components/Footer.vue';

const activeBtn = ref(false);
const closing = ref(false);
const menuSection = ref(null);
const menuButton = ref(null);
const linkHolders = ref([]);
const childHolder = ref(null);
const isOpen = ref(false);
const isFocusTrapped = ref(false); 

const elements = [
  { text: 'Main', link: '#main' },
  {
    text: 'My Works',
    link: '#section-2',
  },
  { text: 'FAQ', link: '#faq' },
  { text: 'Contacts', link: '#footer' },
];

const openChild = reactive({});

function clickBtn() {
  if (activeBtn.value) {
    closeMenuAnimation();
  } else {
    activeBtn.value = true;
    menuSection.value.style.transform = '';
    isFocusTrapped.value = true; 
  }
}

function closeMenuAnimation() {
  activeBtn.value = false;
  isFocusTrapped.value = false;

  isOpen.value = false
  closing.value = true;

  requestAnimationFrame(() => {
    setTimeout(() => {
      menuSection.value.style.transition = 'none';
      menuSection.value.style.transform = 'translateY(100%)';

      closing.value = false;

      requestAnimationFrame(() => {
        menuSection.value.style.transition = '';
      });
    }, 600);
  });
}


function smoothScrollTo(targetY, duration = 600, easing = (t) => t) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime = null;

  function step(time) {
    if (!startTime) startTime = time;
    const progress = Math.min((time - startTime) / duration, 1);
    const easeProgress = easing(progress);
    window.scrollTo(0, startY + diff * easeProgress);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const customEase = (t) => {
  if (t < 0.6) {
    return t * 1.3;
  } else {
    return 1 - Math.pow(1 - t, 2);
  }
};

function scrollToSection(link) {
  const id = link.replace('#', '');
  const el = document.getElementById(id);
  if (!el && link !== '#main' && link !== '#footer') return;

  const scrollToTarget = () => {
    let targetY = 0;

    if (link === '#main') {
      targetY = 0;
    } else if (link === '#footer') {
      targetY = document.body.scrollHeight;
    } else {
      targetY = el.getBoundingClientRect().top + window.scrollY;
    }

    smoothScrollTo(targetY, 1200, customEase);
  };

  if (activeBtn.value) {
    closeMenuAnimation();
    setTimeout(scrollToTarget, 600);
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

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
  menuSection.value.addEventListener('keydown', trapFocus);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown);
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
  right: 20px;
  top: 20px;
  height: 40px;
  width: 40px;
  z-index: 9999;
  mix-blend-mode: difference;
  background: transparent;
}

.menu_section {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  transform: translateY(100%);
  transition: transform 0.6s ease;
  z-index: 99;
  padding: 4rem 6rem;
  display: flex;
  flex-direction: column;
}

.menu_section.active {
  transform: translateY(0%);
}

.menu_section.closing {
  transform: translateY(-100%);
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

.link_holder {
  clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0 100%);
  transition: clip-path 1.2s ease 0.2s;
}

.link_holder.showLink {
  clip-path: polygon(0% 0, 100% 0, 100% 100%, 0 100%);
}

button.menu_link {
  font-size: 4rem;
  font-weight: 300;
  letter-spacing: 3px;
  opacity: 0.3;
  transition: opacity 0.2s;
  color: var(--text-color);
  padding: 1rem 0;
  display: inline-block;
  text-transform: uppercase;
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
}

.menu_section:has(button:hover) button {
  opacity: 0.4;
}
.menu_section button:hover {
  opacity: 1 !important;
}

.link_without_child {
  display: flex;
  align-items: center;
  width: 100%;
}

.link_with_child_buttton {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.child_holder {
  display: flex;
  flex-direction: column;
  transform: translateX(3vw);
  overflow: hidden;
  height: 0;
  transition: height 0.3s ease;
}

.child_holder button {
  font-size: 2rem;
  font-weight: 400;
  padding: 0.5rem 0;
  opacity: 0.3;
  transition: opacity 0.2s, clip-path 1s;
  clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0 100%);
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
}

.child_holder button.active {
  clip-path: polygon(0% 0, 100% 0, 100% 100%, 0 100%);
}

.child_buttton {
  cursor: pointer;
  font-size: 4vw;
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0.2;
}
.link_with_child_buttton:hover .child_buttton {
  opacity: 1;
}
.child_buttton.active {
  transform: rotate(180deg);
}
</style>
