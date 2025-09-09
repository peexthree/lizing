# Лизинг и точка — лендинг (MVP без калькулятора)

Совместимо с: Next **15.5.2**, React **19.1.1**, Tailwind **3.4.17**.

## Быстрый старт
```bash
npm i
npm run dev
# откройте http://localhost:3000
```

## Переменные окружения
Скопируйте `.env.example` в `.env` и заполните:
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

## Скрипты
- `npm run dev` — dev сервер
- `npm run build` — сборка
- `npm start` — прод-старт

## Структура
- `/app` — App Router, страницы и API
- `/components` — секции лендинга
- `/app/api/lead/route.ts` — приём лидов и отправка нотификаций в Telegram

## Деплой на Vercel
1. Создайте репозиторий на GitHub и запушьте код.
2. В Vercel: Add New → Project → Import из GitHub.
3. В `Project Settings → Environment Variables` добавьте `TELEGRAM_*`.
4. Deploy.

## Примечание
Форма sanitizes payload (строки/булевы), чтобы не ловить React error #130.
