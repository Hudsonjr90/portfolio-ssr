<script setup>
import projects from '~/assets/data/projects.json'
const route = useRoute()
const router = useRouter()

const project = computed(() =>
    projects.find(p => p.projectName === route.params.projectName)
)


</script>

<template>
  <div v-if="project" class="p-6">
    <NuxtLink to="/"></NuxtLink>

    <h1 class="text-2xl font-bold mb-2">{{ project.title }}</h1>
    <p class="mb-4">{{ project.description }}</p>

    <div class="flex flex-wrap gap-4 mb-4">
      <img
          v-for="img in project.images"
          :key="img"
          :src="img"
          class="w-64 rounded-lg shadow"
          :alt="project.title"
      />
    </div>

    <a
        :href="project.link"
        target="_blank"
        class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      
    </a>
  </div>

  <div v-else class="p-6">
    <p></p>
    <NuxtLink to="/" class="text-blue-600 hover:underline"></NuxtLink>
  </div>
</template>
