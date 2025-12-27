export default {
    scrollBehavior(to, from, savedPosition) {
        // Если есть сохранённая позиция (возврат назад) — используем её
        if (savedPosition) {
            return savedPosition
        }
        // По умолчанию — наверх
        return { top: 0 }
    }
}