export const createSlug = (title) =>
    title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')

export const formatDate = (isoString) =>
    new Date(isoString).toLocaleString('uk-UA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
