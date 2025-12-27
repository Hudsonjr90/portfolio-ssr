<template>
  <div
      v-if="windowWidth > 1000"
      ref="featureItem"
      class="feature-item"
      :class="tagClass"
      :style="{ top: (topOffset + (index + 1) * 30) + 'px'}"
  >
    <span class="card-index">00{{ index + 1 }}</span>
    <h4 class="big_h4">{{ item.title }}</h4>
    <p>{{ item.description }}</p>
  </div>

  <div
      v-if="windowWidth < 1000"
      ref="featureItem"
      class="feature-item mobile"
      :class="tagClass"
      :style="{ top: (topOffset + (index + 1) * 30) + 'px'}"
  >
    <div class="title_holder">
      <span class="card-index">00{{ index + 1 }}</span>
      <h4 class="big_h4">{{ item.title }}</h4>
    </div>

    <p>{{ item.description }}</p>
  </div>
</template>

<script>
export default {
  props: ["item", "index", "topOffset", "previousItems"],

  data() {
    return {
      computedTop: 0,
      windowWidth: 0 // reactive window width
    };
  },

  computed: {
    tagClass() {
      if (this.index === 1) return "second";
      if (this.index === 2) return "third";
      return "";
    }
  },

  mounted() {
    // set initial width after mount
    this.updateWidth();
    window.addEventListener("resize", this.updateWidth);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  },

  methods: {
    updateWidth() {
      if (typeof window !== "undefined") {
        this.windowWidth = window.innerWidth;
      }
    }
  }
};
</script>



<style scoped>
.feature-item {
  color: white;
  border-radius: .94em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 4rem 2rem;
  position: sticky;
  background-color: #e6393c;
  z-index: 11;
  transition: 0.3s;
  margin-bottom: 2rem;
  max-width: 2000px;
}

.feature-item.second {
  background-color: #c41e24;
}

.feature-item.third {
  background-color: #b31a1f;
}

.feature-item:hover {
  background-color: #f0554f;
}

span {
  font-size: 1.4rem;
}

h4 {
  text-transform: uppercase;
  font-weight: 700;
}

p {
  text-align: left;
  font-size: 1.2rem;
}
.feature-item.mobile, .title_holder {
  display: flex;
}
.feature-item.mobile{
  gap: 2rem;
}
.title_holder{
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}
.mobile h4 {
  min-width: fit-content;
  text-wrap: nowrap;
}


@media (max-width: 768px) {
  .feature-item.mobile{
    gap: 2rem;
    flex-direction: column;
    padding: 2rem ;
  }
  p{
    font-size:1rem;
  }

}
</style>
