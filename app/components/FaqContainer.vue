<template>
  <div id="faq">
    <SectionDescription
        class="text_item"
        ref="sectionDesc"
        title="Perguntas Frequentes"
        description="A seção de perguntas frequentes foi criada para fornecer rapidamente respostas sobre meu trabalho, experiências e abordagens de desenvolvimento."
    />
    <div class="faq_container">
      <div class="faqs">
        <FaqItem
            v-for="(item, index) in faqInfo"
            :key="index"
            :item="item"
            :index="index"
            :active-index="activeIndex"
            @toggle="setActive"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import FaqItem from './UI/FaqItem.vue';
import faqInfo from '../assets/data/faq_info.json';
import SectionDescription from './UI/SectionDescription.vue';

export default defineComponent({
  components: { FaqItem, SectionDescription },
  setup() {
    // Реактивные данные
    const activeIndex = ref(null);

    // Метод для переключения активного индекса
    const setActive = (index) => {
      activeIndex.value = activeIndex.value === index ? null : index;
    };

    // Возвращаем данные и методы для использования в шаблоне
    return {
      faqInfo,
      activeIndex,
      setActive,
    };
  },
});
</script>

<style>

@media screen and (min-width: 2000px) {
  #faq .h4_title.text_item{
    margin-bottom: 2rem;
  }
}
</style>