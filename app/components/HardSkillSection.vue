<template>
    <div class="hard_skill_container">
        <SkillsChart title="Dashboard de Habilidades Técnicas" />
    </div>
</template>

<script setup>
import SkillsChart from './UI/SkillsChart.vue'
</script>

<style scoped>
.hard_skill_container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

@media screen and (max-width: 768px) {
  .hard_skill_container {
    padding: 1rem;
  }
}
</style>
  <!-- width: 100%;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  z-index: 11;
  gap: 4rem;
}

aside {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.skill_holder {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.skills {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.hard_skill_container h4 {
    font-weight: 700;
    font-size: 5rem;
    max-width: 50%;
}

.hard_skill_container h5 {
    font-size: 1.3rem;
    font-weight: 500;

}

.skill_text {
    background-color: #f4f4f4;
    border: .052vw solid #f4f4f4;
  padding: 10px 25px;    border-radius: 50px;
  position: relative;
  transition: 0.3s ease-in-out;


}
.skill_text>p{
  position: relative;
  z-index: 4;
}
.skill_text:hover>p{
  color: var(--text-color);

}
.skill_text::after{
  content: "";
  border-radius: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--text-color-black);
  clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0 100%);
  transition: 0.3s ease-in-out;
}
.skill_text:hover::after{
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0 100%);
}
@media screen and (max-width: 1100px) {
  .hard_skill_container {
    flex-direction: column;
    justify-content: space-between;
    height: unset;
    gap: 4rem;
  }
  .hard_skill_container h4{
    max-width: 100%;
  }
}
@media (max-width: 768px) {

  .hard_skill_container h4 {
    font-size: 3rem;
  }
} -->