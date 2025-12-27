<template>
  <div class="chart-container">
    <div class="chart-header">
      <h4>{{ title }}</h4>
      <div class="chart-controls">
        <button 
          v-if="selectedCategory !== 'all'"
          @click="setCategory('all')"
          class="back-btn"
        >
          
        </button>
        <button 
          v-for="category in categories" 
          :key="category.value"
          @click="setCategory(category.value)"
          :class="{ active: selectedCategory === category.value }"
          class="category-btn"
        >
          {{ category.label }}
        </button>
      </div>
    </div>
    <div class="chart-wrapper">
      <canvas ref="chartCanvas" width="400" height="400"></canvas>
      <div v-if="selectedCategory !== 'all'" class="category-info">
        <p>{{ filteredData.length }} habilidades em {{ selectedCategory }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'
import skillsData from '~/assets/data/technologies.json'

Chart.register(...registerables)

const chartCanvas = ref(null)
const selectedCategory = ref('all')
const chart = ref(null)

const props = defineProps({
  title: {
    type: String,
    default: 'Dashboard de Habilidades'
  }
})

const categories = [
  { value: 'all', label: 'Todas' },
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Backend', label: 'Backend' },
  { value: 'Database', label: 'Database' },
  { value: 'Tools', label: 'Tools' },
  { value: 'Design', label: 'Design' }
]

const getColorByLevel = (level) => {
  const colors = {
    'expert': '#0ef6cc',      // Verde ciano vibrante
    'advanced': '#f6a900',    // Laranja vibrante  
    'intermediate': '#f65151', // Vermelho coral
    'basic': '#6c757d'         // Cinza
  }
  return colors[level] || '#6c757d'
}

// Cores específicas para categorias quando mostra visão geral
const getCategoryColor = (category) => {
  const categoryColors = {
    'Frontend': '#0ef6cc',
    'Backend': '#f6a900', 
    'Database': '#f65151',
    'Tools': '#9c88ff',
    'Design': '#ff6b9d'
  }
  return categoryColors[category] || '#6c757d'
}

const getLevelValue = (level, percentage) => {
  // Se existe percentual específico, usar ele, senão usar valor padrão por nível
  if (percentage) return percentage
  
  const values = {
    'expert': 90,
    'advanced': 75,
    'intermediate': 60,
    'basic': 40
  }
  return values[level] || 40
}

const filteredData = ref([])

const updateFilteredData = () => {
  if (selectedCategory.value === 'all') {
    // Agrupar por categoria e calcular médias
    const categoryGroups = {}
    skillsData.forEach(skill => {
      if (!categoryGroups[skill.category]) {
        categoryGroups[skill.category] = []
      }
      categoryGroups[skill.category].push(getLevelValue(skill.level, skill.percentage))
    })
    
    filteredData.value = Object.entries(categoryGroups).map(([category, values]) => ({
      name: category,
      value: Math.round(values.reduce((a, b) => a + b, 0) / values.length),
      color: getCategoryColor(category)
    }))
  } else {
    // Mostrar skills da categoria específica
    const categorySkills = skillsData.filter(skill => 
      skill.category.toLowerCase() === selectedCategory.value.toLowerCase()
    )
    
    filteredData.value = categorySkills.map(skill => ({
      name: skill.name,
      value: getLevelValue(skill.level, skill.percentage),
      color: getColorByLevel(skill.level)
    }))
  }
}

const createChart = () => {
  if (!chartCanvas.value) return
  
  const ctx = chartCanvas.value.getContext('2d')
  
  if (chart.value) {
    chart.value.destroy()
  }
  
  chart.value = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: filteredData.value.map(item => item.name),
      datasets: [{
        data: filteredData.value.map(item => item.value),
        backgroundColor: filteredData.value.map(item => item.color),
        borderWidth: 3,
        borderColor: '#000000',
        hoverBorderWidth: 4,
        hoverBorderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#ffffff',
            font: {
              size: 14,
              family: 'Inter, sans-serif',
              weight: '500'
            },
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: '#0ef6cc',
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.parsed + '%'
            }
          }
        }
      },
      animation: {
        animateRotate: true,
        duration: 1500,
        easing: 'easeInOutQuart'
      },
      interaction: {
        intersect: false,
        mode: 'index'
      },
      onHover: (event, activeElements) => {
        event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default'
      }
    }
  })
}

const setCategory = (category) => {
  selectedCategory.value = category
}

watch(selectedCategory, () => {
  updateFilteredData()
  nextTick(() => {
    createChart()
  })
})

onMounted(() => {
  updateFilteredData()
  nextTick(() => {
    createChart()
  })
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.chart-header {
  text-align: center;
  margin-bottom: 2rem;
}

.chart-header h4 {
  color: var(--text-color);
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.chart-controls {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.category-btn {
  padding: 0.5rem 1rem;
  border: 2px solid var(--main-color);
  background: transparent;
  color: var(--text-color);
  cursor: pointer;
  border-radius: 25px;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.category-btn:hover,
.category-btn.active {
  background: var(--main-color);
  color: var(--bg-color);
  transform: translateY(-2px);
}

.back-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #0ef6cc;
  background: #0ef6cc;
  color: #000000;
  cursor: pointer;
  border-radius: 25px;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-right: 1rem;
}

.back-btn:hover {
  background: transparent;
  color: #0ef6cc;
  transform: translateY(-2px);
}

.category-info {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  color: var(--main-color);
  font-size: 0.9rem;
  font-weight: 500;
}

.chart-wrapper {
  position: relative;
  height: 400px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@media screen and (max-width: 768px) {
  .chart-container {
    padding: 1rem;
  }
  
  .chart-header h4 {
    font-size: 1.8rem;
  }
  
  .category-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
  
  .chart-wrapper {
    height: 300px;
    padding: 1rem;
  }
}
</style>