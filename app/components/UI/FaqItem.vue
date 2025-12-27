<template>
  <div class="faq_item" @click="toggle" :class="{ active: isActive }">
    <div class="faq_header">
      <span class="faq_span">00{{ index + 1 }}</span>
      <h4 class="faq_text big_h4">{{ item.title }}</h4>
      <span class="faq_button">{{ isActive ? '-' : '+' }}</span>
    </div>
    <div ref="content" class="faq_description" :style="descriptionStyle">
      <p>{{ item.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    activeIndex: {
      type: [Number, null],
      default: null
    }
  },
  data() {
    return {
      height: 0,
      useInterpolate: false
    };
  },
  computed: {
    isActive() {
      return this.activeIndex === this.index;
    },
    descriptionStyle() {
      if (this.useInterpolate) {
        return {
          height: this.isActive ? 'auto' : '0',
          overflow: 'hidden',
          transition: 'height 0.3s ease'
        };
      } else {
        return {
          maxHeight: this.isActive ? this.height + 'px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease'
        };
      }
    }
  },
  watch: {
    isActive(val) {
      if (val && !this.useInterpolate) {
        this.$nextTick(() => {
          const el = this.$refs.content;
          this.height = el.scrollHeight;
        });
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.useInterpolate = CSS.supports('interpolate-size', 'allow-keywords');
    });
  },
  methods: {
    toggle() {
      this.$emit('toggle', this.index);

      if (!this.useInterpolate) {
        const el = this.$refs.content;
        if (!this.isActive) {  // Если сейчас закрыто, откроем
          this.height = el.scrollHeight;
          el.style.maxHeight = this.height + 'px';
        } else {  // Если открыто, закроем
          el.style.maxHeight = '0px';
        }
      }
    }
  }
};
</script>

<style scoped>
.faq_item {
  width: 100%;
  padding: 2rem 2rem 0 2rem;
  position: relative;
  transition: 0.3s;
  cursor: pointer; /* Добавлено для лучшей индикации кликабельности */
}

.faq_item::after {
  content: "";
  width: calc(100% + 8rem); /* Изменено, чтобы избежать выхода за пределы */
  height: 1px;
  background: var(--text-color);
  transition: 0.3s;
  position: absolute;
  left: -4rem;
  bottom: 0;
}

.faq_item:hover::after {
  height: 100%;
}

.faq_item.active::after {
  height: 1px;
  bottom: -32px;
}

span.faq_button {
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center; /* Центрирование '+' и '-' */
}

.faq_item:hover {
  color: var(--bg-color);
}

.faq_item.active:hover {
  color: var(--text-color);
}

.faq_text {
  font-weight: 700;
  text-align: center;
}

.faq_header {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  position: relative;
  z-index: 2;
}

.faq_description {
  margin-top: 2rem;
  font-size: 1.6rem;
  overflow: hidden; /* Уже в стиле, но подтверждено */
}

.faq_item.active .faq_description {
  margin-bottom: 2rem;
}

@media screen and (max-width: 800px) {
   .faq_item {
     padding:  2rem 0 0 0;
   }
  .faq_span{
    font-size: 0.8rem;
  }
  .faq_item[data-v-e61bb0a9]::after {
    width: calc(100% + 4rem);
    background: var(--text-color);
    left: -2rem;
  }
  .faq_description {
    font-size: 1.2rem;
  }
}
</style>