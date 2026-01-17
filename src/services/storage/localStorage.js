const safeParse = (value, fallback) => {
    if (!value) return fallback
    try {
        return JSON.parse(value)
    } catch {
        return fallback
    }
}

export const storage = {
    get(key, fallback = null) {
        return safeParse(localStorage.getItem(key), fallback)
    },
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    remove(key) {
        localStorage.removeItem(key)
    },
}
