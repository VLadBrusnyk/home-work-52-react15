import { delay } from '../../../services/api/baseApi'
import { storage } from '../../../services/storage/localStorage'

const STORAGE_KEY = 'blog_posts_v3'

const seedPosts = [
    {
        id: '1',
        title: 'Як почати шлях у фронтенді в 2026',
        excerpt:
            'Огляд базових технологій, план навчання та поради для першого портфоліо у React-екосистемі.',
        content:
            `Щоб стартувати у фронтенді в 2026, зосередьтесь на міцній базі. Перший крок — впевнений JavaScript: типи, масиви, об’єкти, асинхронність і робота з даними. Далі обов’язково підтягніть HTML та CSS, бо саме вони створюють доступний та адаптивний інтерфейс. Вивчіть семантику, Flex і Grid, а також бази доступності та фокусів. Лише після цього переходьте до React і глибше розбирайтеся з компонентами та станом.

Паралельно освоюйте інструменти, бо вони формують професійне середовище. Vite пришвидшує розробку та збірку, ESLint тримає якість коду, а Git дисциплінує командну роботу. Важливо одразу звикати до маленьких, зрозумілих комітів та читабельної структури папок. Для керування станом у середніх проєктах варто використовувати Redux Toolkit як стандартний підхід. Це дає передбачувані дані, чіткий data‑flow і готовність до масштабування.

Навчання має бути практичним і вимірюваним. Складіть план: наприклад, два тижні на базу JS, два на React і тиждень на роутинг зі станом. Під час навчання робіть міні‑проєкти: TODO, каталог постів, dashboard із фільтрами. У портфоліо покажіть чисту архітектуру, повторне використання компонентів і роботу з API навіть через mock‑дані. Завершіть усе деплоєм на Vercel або Netlify та коротким описом у README. Так ви доведете, що готові до реальних задач фронтенду.`,
        author: 'Студент',
        tags: ['frontend', 'react', 'roadmap'],
        comments: [],
        createdAt: '2025-12-01T10:00:00.000Z',
        updatedAt: '2025-12-01T10:00:00.000Z',
    },
    {
        id: '2',
        title: 'Redux Toolkit: мінімум коду, максимум користі',
        excerpt:
            'Чому slices, thunks та selectors спрощують керування станом у великих застосунках.',
        content:
            `Redux Toolkit — стандарт де‑факто для керування станом у React. Він зменшує кількість шаблонного коду і робить ланцюжки дій прозорими. Слайси об’єднують редюсери та actions в одному місці і спрощують підтримку. Асинхронні запити оформлюються через thunks, що дає контрольований життєвий цикл. У результаті команда працює швидше, а код стає читабельнішим.

Для масштабованості варто зберігати нормалізовані дані і уникати дублювання логіки в компонентах. Селектори тримайте поруч зі slice, щоб робити доступ до даних консистентним. Для асинхронних потоків показуйте користувачу стан завантаження та помилок. Важливо не приховувати процеси, бо це покращує UX. Такі правила роблять додаток передбачуваним і надійним.

У цьому проєкті запити імітуються через localStorage, але структура готова під реальний API. Окремі модулі для API, thunks і чіткий data‑flow дозволяють легко замінити джерело даних. Достатньо підключити реальний HTTP‑клієнт і зберегти контракти відповідей. Це показує зрілий підхід до архітектури. Головний плюс Redux Toolkit — дисципліна, яка масштабується разом із проєктом.`,
        author: 'Студент',
        tags: ['redux', 'state', 'toolkit'],
        comments: [],
        createdAt: '2025-12-05T09:15:00.000Z',
        updatedAt: '2025-12-05T09:15:00.000Z',
    },
    {
        id: '3',
        title: 'Архітектура feature-based для React',
        excerpt:
            'Як розділяти код на модулі, щоб підтримка не перетворилась на хаос, а фічі масштабувались.',
        content:
            `Feature‑based архітектура групує код за доменами: posts, auth, cart та іншими. Кожен модуль має свої компоненти, API, slice і helpers, що зменшує зв’язність. Це дозволяє масштабувати додаток без хаосу та розростання технічного боргу. Команда працює паралельно, не блокуючи одна одну. А ще легше контролювати межі відповідальності.

Для кожної фічі створюйте структуру api, components, model, lib та публічний index. Новий розробник швидко знаходить потрібну частину, а бізнес‑логіка не змішується з UI. Загальні компоненти, які не мають доменної логіки, слід тримати у глобальних components. Це зменшує дублювання і підвищує повторне використання. В результаті кодова база стає чистою та передбачуваною.

У великих командах важливо, щоб зміни були локалізовані. Feature‑based підхід дозволяє редагувати одну фічу без ризику зламати інші. Він також полегшує інтеграцію бекенду, бо кожен модуль знає свої ендпоінти. Такий підхід економить час на навігацію і рефакторинг. Архітектура — це інвестиція у швидкість розвитку і стабільність продукту.`,
        author: 'Студент',
        tags: ['architecture', 'react', 'structure'],
        comments: [],
        createdAt: '2025-12-10T15:30:00.000Z',
        updatedAt: '2025-12-10T15:30:00.000Z',
    },
    {
        id: '4',
        title: 'Підготовка фронтенду до API',
        excerpt:
            'Як проєктувати запити та відповіді, щоб легко перейти на справжній сервер.',
        content:
            `Найкращий шлях підготувати фронтенд до бекенду — відразу розділити UI та API. Запити варто виносити у services/api, використовувати один HTTP‑клієнт і ділити ендпоінти за доменами. Так перехід на реальний сервер буде мінімальним за обсягом. Структура файлів при цьому вже відображає майбутній бекенд. Це спрощує і тестування, і підтримку.

Стандартизуйте схеми даних, щоб уникати хаосу у відповідях. Домовтеся про поля id, createdAt, updatedAt, author і tags, та дотримуйтесь їх у всіх модулях. Обробляйте помилки централізовано, показуючи повідомлення користувачу через toast. Логування помилок допоможе швидше знаходити проблеми в інтеграції. Такий підхід виглядає професійно навіть у навчальному проєкті.

Поки бекенду немає, використовуйте localStorage або mock‑сервери, але не змінюйте структуру. Це дисциплінує команду і захищає від великого рефакторингу наприкінці курсу. Коли сервер буде готовий, ви просто заміните імплементацію API‑клієнта. Це значно скоротить час інтеграції. Грамотно спроєктований API‑шар — запорука стабільності та росту продукту.`,
        author: 'Студент',
        tags: ['api', 'backend', 'integration'],
        comments: [],
        createdAt: '2025-12-14T12:00:00.000Z',
        updatedAt: '2025-12-14T12:00:00.000Z',
    },
    {
        id: '5',
        title: 'Git-практики для командної розробки',
        excerpt:
            'Коротко про гілки, коміти та pull request, які чекають на реальних проєктах.',
        content:
            `У командній розробці Git — це щоденний інструмент, без якого складно рухатися швидко. Використовуйте feature‑гілки для кожної задачі, щоб ізолювати зміни та спростити рев’ю. Це зменшує конфлікти та дозволяє працювати паралельно. Перед злиттям завжди оновлюйтеся від main, щоб уникати сюрпризів. Такий процес дисциплінує команду і робить код‑базу чистою.

Коміти мають бути зрозумілими і короткими, з чітким описом дії. Дотримуйтеся конвенції типів комітів, щоб історія читалася як журнал змін. Наприклад, для нових можливостей використовуйте префікс feat, для виправлень — fix. Це полегшує пошук проблем і аналіз прогресу. Чіткі коміти — це інвестиція в підтримку.

Pull request — це не формальність, а інструмент якості. Додавайте опис, скріншоти і список змін, щоб іншим було легко рев’ювати. Перед злиттям запускайте lint і тести, щоб не ламати основну гілку. Регулярні перевірки підвищують стабільність та довіру. Гарна Git‑дисципліна економить години на дебаг і покращує співпрацю.`,
        author: 'Студент',
        tags: ['git', 'workflow', 'team'],
        comments: [],
        createdAt: '2025-12-18T08:45:00.000Z',
        updatedAt: '2025-12-18T08:45:00.000Z',
    },
]

const normalizePost = (post) => ({
    ...post,
    comments: Array.isArray(post.comments) ? post.comments : [],
})

const getStoredPosts = () => {
    const stored = storage.get(STORAGE_KEY, null)
    if (!stored || stored.length === 0) {
        storage.set(STORAGE_KEY, seedPosts)
        return seedPosts
    }
    const needsSave = stored.some((post) => !Array.isArray(post.comments))
    const normalized = needsSave ? stored.map(normalizePost) : stored
    if (needsSave) {
        storage.set(STORAGE_KEY, normalized)
    }
    return normalized
}

const savePosts = (posts) => {
    storage.set(STORAGE_KEY, posts)
}

const generateId = () =>
    typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now())

export const postsApi = {
    async fetchAll() {
        await delay(350)
        return getStoredPosts()
    },
    async fetchById(id) {
        await delay(200)
        return getStoredPosts().find((post) => post.id === id) || null
    },
    async create(post) {
        await delay(300)
        const posts = getStoredPosts()
        const now = new Date().toISOString()
        const newPost = {
            id: generateId(),
            createdAt: now,
            updatedAt: now,
            comments: [],
            ...post,
        }
        const next = [newPost, ...posts]
        savePosts(next)
        return newPost
    },
    async update(id, changes) {
        await delay(300)
        const posts = getStoredPosts()
        const index = posts.findIndex((post) => post.id === id)
        if (index === -1) return null
        const updated = {
            ...posts[index],
            ...changes,
            updatedAt: new Date().toISOString(),
        }
        const next = [...posts]
        next[index] = updated
        savePosts(next)
        return updated
    },
    async remove(id) {
        await delay(200)
        const posts = getStoredPosts()
        const next = posts.filter((post) => post.id !== id)
        savePosts(next)
        return id
    },
    async addComment(postId, comment) {
        await delay(250)
        const posts = getStoredPosts()
        const index = posts.findIndex((post) => post.id === postId)
        if (index === -1) return null
        const now = new Date().toISOString()
        const newComment = {
            id: generateId(),
            createdAt: now,
            likes: 0,
            liked: false,
            ...comment,
        }
        const updated = {
            ...posts[index],
            comments: [newComment, ...posts[index].comments],
            updatedAt: now,
        }
        const next = [...posts]
        next[index] = updated
        savePosts(next)
        return updated
    },
    async removeComment(postId, commentId) {
        await delay(200)
        const posts = getStoredPosts()
        const index = posts.findIndex((post) => post.id === postId)
        if (index === -1) return null
        const updated = {
            ...posts[index],
            comments: posts[index].comments.filter((c) => c.id !== commentId),
            updatedAt: new Date().toISOString(),
        }
        const next = [...posts]
        next[index] = updated
        savePosts(next)
        return updated
    },
    async toggleCommentLike(postId, commentId) {
        await delay(150)
        const posts = getStoredPosts()
        const index = posts.findIndex((post) => post.id === postId)
        if (index === -1) return null
        const updatedComments = posts[index].comments.map((comment) => {
            if (comment.id !== commentId) return comment
            const liked = !comment.liked
            return {
                ...comment,
                liked,
                likes: liked ? comment.likes + 1 : Math.max(comment.likes - 1, 0),
            }
        })
        const updated = {
            ...posts[index],
            comments: updatedComments,
            updatedAt: new Date().toISOString(),
        }
        const next = [...posts]
        next[index] = updated
        savePosts(next)
        return updated
    },
}
