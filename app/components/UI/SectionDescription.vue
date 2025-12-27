<template>
    <h4 class="h4_title">
        <p class="title">{{ title }}</p>
        <p class="description">{{description}}</p>
    </h4>
</template>

<script>
export default {
    props: ['title', 'description']
}
</script>

<style scoped>
.h4_title {
    /* position: sticky; */
    /* top: 2em; */
  position: relative;
  z-index: 11;
  max-width: 2000px;

  margin: 0 auto ;

}

.h4_title p {
    display: inline;
}

.h4_title .title {
    font-size: 16px;
    display: inline-block;
    /* padding: 0 20px; */
    transform: translateY(-4px);
    font-weight: 800;
    text-transform: uppercase;
}

.h4_title .description {
    /* font-size: 35px; */
    line-height: 1.2;
}

/* Адаптивный размер для h4 заголовков */
h4 {
    font-size: clamp(1.5rem, 2vw, 3.5rem);
    /* min: 24px, adaptive: 4% viewport width, max: 56px */
    line-height: 1.2;
    font-weight: 600;
}

.h4_title .description {
  text-align: left;
  color: var(--text-color);
  font-size: clamp(2rem, 2vw, 3rem);
  letter-spacing: 0.05rem;
  display: block;
}

.skill_section .h4_title .description{
  color: var(--text-color-black);
}
/* Для мобильных устройств */
@media (max-width: 768px) {
    h4 {
        font-size: clamp(1.25rem, 2vw, 2.5rem);
        /* min: 20px, adaptive: 5% viewport width, max: 40px */
    }

  .h4_title .description {
    font-size: clamp(1.5rem, 4vw, 3rem);
  }
}
</style>