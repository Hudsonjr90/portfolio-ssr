<template>
  <div class="quasar-test-container q-pa-md">
    <q-card class="test-card q-mb-md">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">🧪 Teste do Quasar UI</div>
        <div class="text-subtitle2">Verificando se todos os componentes estão funcionando</div>
      </q-card-section>
      
      <q-card-section>
        <div class="q-gutter-md">
          <!-- Teste de Botões -->
          <div class="test-section">
            <h6 class="q-mb-sm">Botões:</h6>
            <q-btn 
              color="primary" 
              label="Primário" 
              @click="showNotify('success')"
              class="q-mr-sm"
            />
            <q-btn 
              color="secondary" 
              label="Secundário" 
              outline
              @click="showDialog"
              class="q-mr-sm"
            />
            <q-btn 
              color="accent" 
              label="Loading" 
              @click="showLoading"
              icon="refresh"
            />
          </div>

          <!-- Teste de Input -->
          <div class="test-section">
            <h6 class="q-mb-sm">Inputs:</h6>
            <q-input 
              v-model="testText" 
              label="Digite algo aqui"
              outlined
              clearable
              class="q-mb-sm"
            />
            <p v-if="testText" class="text-body2">
              Você digitou: <strong>{{ testText }}</strong>
            </p>
          </div>

          <!-- Teste de Ícones -->
          <div class="test-section">
            <h6 class="q-mb-sm">Ícones disponíveis:</h6>
            <div class="icon-grid">
              <div class="icon-item">
                <q-icon name="eva-home" size="24px" />
                <span>Eva Icons</span>
              </div>
              <div class="icon-item">
                <q-icon name="mdi-heart" size="24px" />
                <span>MDI</span>
              </div>
              <div class="icon-item">
                <q-icon name="material-symbols:star" size="24px" />
                <span>Material</span>
              </div>
              <div class="icon-item">
                <q-icon name="fas fa-rocket" size="24px" />
                <span>FontAwesome</span>
              </div>
            </div>
          </div>

          <!-- Teste de Toggle -->
          <div class="test-section">
            <h6 class="q-mb-sm">Controles:</h6>
            <q-toggle 
              v-model="darkMode" 
              label="Modo Escuro"
              @update:model-value="toggleDark"
            />
          </div>

          <!-- Teste de Expansão -->
          <div class="test-section">
            <q-expansion-item 
              expand-separator 
              icon="eva-settings"
              label="Configurações Avançadas"
              caption="Clique para expandir"
            >
              <q-card>
                <q-card-section>
                  <p>Todas as funcionalidades do Quasar estão funcionando!</p>
                  <q-linear-progress :value="progress" class="q-mt-md" />
                  <p class="q-mt-sm">Progresso: {{ Math.round(progress * 100) }}%</p>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const testText = ref('')
const darkMode = ref(false)
const progress = ref(0)

// Simular progresso
onMounted(() => {
  const interval = setInterval(() => {
    progress.value += 0.01
    if (progress.value >= 1) {
      progress.value = 0
    }
  }, 50)

  // Limpar interval quando componente for desmontado
  onUnmounted(() => {
    clearInterval(interval)
  })
})

const showNotify = (type) => {
  const config = {
    success: {
      color: 'positive',
      message: 'Sucesso! Quasar Notify está funcionando! 🎉',
      icon: 'eva-checkmark-circle'
    },
    error: {
      color: 'negative',
      message: 'Erro simulado para teste',
      icon: 'eva-alert-circle'
    }
  }

  $q.notify(config[type] || config.success)
}

const showDialog = () => {
  $q.dialog({
    title: 'Teste do Dialog',
    message: 'O Quasar Dialog está funcionando perfeitamente! ✨',
    ok: 'Ótimo!',
    cancel: 'Cancelar',
    persistent: true
  }).onOk(() => {
    showNotify('success')
  })
}

const showLoading = () => {
  $q.loading.show({
    message: 'Testando o loading do Quasar...',
    backgroundColor: 'rgba(0,0,0,0.4)',
    spinnerColor: 'primary'
  })

  setTimeout(() => {
    $q.loading.hide()
    showNotify('success')
  }, 2000)
}

const toggleDark = (val) => {
  $q.dark.set(val)
}
</script>

<style scoped>
.quasar-test-container {
  max-width: 800px;
  margin: 0 auto;
}

.test-card {
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.test-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.test-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.icon-grid {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  min-width: 80px;
}

.icon-item span {
  font-size: 0.75rem;
  text-align: center;
}
</style>