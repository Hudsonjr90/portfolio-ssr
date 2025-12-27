<template>
    <div v-if="loading" class="preloader">
<!--        <div class="progress-container">-->
<!--            <div class="progress-bar" :style="{ width: progress + '%' }"></div>-->
<!--            <p class="progress-text">{{ progress < 0 ? 0 : progress }}%</p>-->
<!--        </div>-->

        <div class="columns">
            <span v-for="n in 7" :key="n" :class="['column', n % 2 === 0 ? 'even' : 'odd']"></span>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import FontFaceObserver from 'fontfaceobserver'

const loading = ref(true)
const progress = ref(0)

const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
    })
}


const animateProgress = (from, to, duration = 300) => {
    return new Promise(resolve => {
        const start = performance.now()
        const step = (now) => {
            const elapsed = now - start
            const progressValue = Math.min(from + (to - from) * (elapsed / duration), to)
            progress.value = Math.round(progressValue)
            if (elapsed < duration) {
                requestAnimationFrame(step)
            } else {
                resolve()
            }
        }
        requestAnimationFrame(step)
    })
}

onMounted(async () => {
    try {
        const resources = [
            { type: 'font', font: 'ClashDisplay', weight: 200 },
            { type: 'font', font: 'ClashDisplay', weight: 300 },
            { type: 'font', font: 'ClashDisplay', weight: 400 },
            { type: 'font', font: 'ClashDisplay', weight: 500 },
            { type: 'font', font: 'ClashDisplay', weight: 600 },
            { type: 'font', font: 'ClashDisplay', weight: 700 }]

        const totalSteps = resources.length
        let currentStep = 0

        for (const res of resources) {
            if (res.type === 'font') {
                const f = new FontFaceObserver(res.font, { weight: res.weight })
                await f.load()
            } else if (res.type === 'script') {
                await loadScript(res.src)
            }
            currentStep++
            const targetProgress = Math.round((currentStep / totalSteps) * 100)
            await animateProgress(progress.value, targetProgress, 50) // плавное увеличение
        }

        await new Promise(r => setTimeout(r, 300)) // задержка перед анимацией
        await nextTick()
        document.querySelectorAll('.column').forEach(col => col.classList.add('loaded'))
        document.querySelector(".progress-container").classList.add('loaded')
        document.querySelector(".preloader").classList.add('loaded')


    } catch (err) {
        console.error('Ошибка загрузки ресурсов', err)
    }
})
</script>

<style scoped>
.preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    /* background: #111; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.preloader.loaded {
    animation: hidePreloader 0.5s forwards 0.5s;
    /* 1s задержка перед применением z-index */
}

@keyframes hidePreloader {
    to {
        z-index: 0;
    }
}

.progress-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    /* height: 10px; */
    /* background: #333; */
    border-radius: 5px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    background: var(--text-color);
    min-height: 5px;
    width: 0%;
    transition: width 0.15s linear;
}

.progress-text {
    margin-top: 10px;
    color: var(--text-color);
    font-display: auto;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
    font-weight: 400;
    text-align: center;
}

.columns {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;

}

.column {
    flex: 1;
    background: #631412;
    transition: transform 1s ease, opacity 1s ease;
}

.column.even {
    background: #75221e;
}

.column.loaded.odd {
    transform: translateX(-100vw);
    /* opacity: 0; */
}

.column.loaded.even {
    transform: translateX(100vw);
    /* opacity: 0; */
}

.progress-container.loaded {
    opacity: 0;
}
</style>