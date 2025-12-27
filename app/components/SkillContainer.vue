<template>
  <div ref="skillSection" class="skill_section">
    <SectionDescription
        ref="sectionDesc"
        class="text_item"
        title="Minhas Habilidades"
        description="Além do desenvolvimento frontend, trabalho com backend, bancos de dados e ferramentas modernas para criar soluções completas e eficientes."
    />
    <SkillUnit
        v-for="(item, index) in skillsInfo"
        :key="index"
        :item="item"
        :index="index"
        :topOffset="height"
        :previousItems="itemRefs"
        ref="featureItemsRefs"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue'
import skillsInfo from '@/assets/data/skills_info.json'
import SectionDescription from './UI/SectionDescription.vue'
import SkillUnit from './UI/SkillUnit.vue'

const skillSection = ref(null)
const sectionDesc = ref(null)
const featureItemsRefs = ref([])

const height = ref(0)
let observer = null

const itemRefs = computed(() => featureItemsRefs.value || [])

onMounted(async () => {
  if (import.meta.client) {
    await nextTick()
    if (sectionDesc.value) {
      observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          height.value = entry.contentRect.height
        }
      })

      observer.observe(sectionDesc.value.$el ?? sectionDesc.value)
    }
  }
})

onBeforeUnmount(() => {
  if (observer && sectionDesc.value) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.skill_section {
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  flex-flow: column;
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
}

.text_item {
  position: sticky;
  top: 2rem;
  margin-bottom: 2rem;
  max-width: 2000px;
  }
</style>
