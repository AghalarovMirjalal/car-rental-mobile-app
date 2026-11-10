## Запуск

```bash
npm install
npm start          # Expo dev server (i — iOS, a — Android, w — web)
npm run web        # сразу в браузере
npm run lint       # ESLint (eslint-config-expo)
npm run typecheck  # TypeScript
```

## Флоу

Launch → Authentication (Sign up / Sign in) → Main (tabs)

- **Home** — поиск, бренды, hot deals
- **Models** (`/models?brand=bmw`) — `<Brands/>` + `<Models/>`, фильтрация по `selectedSlug`
- **Car details** (`/car/[id]`) — динамический роут, данные машины по `id` из параметров
- **Information** (`/information/*`) — экран с табами: Personal Data → Driving Licence (фото прав через `expo-image-picker`: камера или галерея)
- **Payment** — выбор карты, форма, модалка «Succesfully Done», бронь попадает в историю
- **Recent History**, **Location**, **Settings** (переключатель светлой / тёмной темы)

## Архитектура

```
src/
├── app/                 # только маршруты Expo Router (тонкие файлы)
│   ├── index.tsx        # Launch
│   ├── (auth)/          # sign-up, sign-in
│   └── (main)/
│       ├── (tabs)/      # нижние табы: (home) stack [index, models], history, location, settings
│       ├── car/[id].tsx # динамический роут
│       ├── information/ # табы Personal Data / Driving Licence
│       └── payment.tsx
├── layout/              # root layout (шрифты, сплэш, провайдеры), ScreenContainer, HeaderSheetLayout, TabBar
├── components/
│   ├── ui/              # кнопки, инпуты, текст, хедер, плитка бренда, bottom sheet …
│   ├── shared/          # Catalog (общий FlatList), CarCard
│   └── screens/         # компоненты экранов по фичам (home, models, car-details, information, payment …)
├── mock/                # моковые данные: бренды, машины, история, способы оплаты
├── store/               # zustand: auth (persist), booking
├── context/             # ThemeProvider (light / dark / system, сохраняется в AsyncStorage)
├── hooks/               # useTheme, useThemedStyles, useImagePicker
├── constants/           # цвета (токены из Figma + тёмная палитра), шрифты
├── types/               # доменные типы
└── utils/               # scale (размеры из макета 428×926), форматирование
assets/                  # шрифты Poppins, картинки из Figma, иконка и сплэш
```

Все размеры берутся из Figma-фрейма 428×926 и масштабируются под экран через `s()` / `fs()` из `src/utils/scale.ts`.
Цвета компоненты получают только через `useTheme()` — поэтому светлая и тёмная темы работают на всех страницах.
