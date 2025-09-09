# BTC Service

## Установка

Клонируем репозиторий и ставим зависимости:

```bash
git clone https://github.com/vendatt0r/check_btc.git
cd check_btc
npm install
```

## Запуск

### Локально:

```bash
npm start
```

### Через Docker:

```bash
docker build -t check_btc .
docker run -p 3000:3000 --env-file .env check_btc
```

### Через docker-compose:

```bash
docker-compose up --build -d
```
