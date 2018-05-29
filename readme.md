# Фундамент

Стартовый шаблон для вёрстки сайта.

### Содержание

* [Как работает](#Как-работает)
  * [Быстрый старт](#Быстрый-старт)
  * [Сборка](#Сборка)
  * [Структура папок и файлов](#Структура-папок-и-файлов)
  * [Рекомендуемый лейаут](#Рекомендуемый-лейаут)
* [Настройка](#Настройка)
  * [Основное](#Основное)
  * [Типографика](#Типографика)
    * [Шрифт](#Шрифт)
    * [Кегль и интерлиньяж](#Кегль-и-интерлиньяж)
  * [Цвета](#Цвета)
  * [Сетка](#Сетка)
  * [Анимация](#Анимация)
  * [Отступы](#Отступы)
* [Стиль](#Стиль)
  * [Иконки](#Иконки)

## Как работает

### Быстрый старт

1. Скопировать в новый проект содержимое этого репозитория
2. Отредактировать или удалить файл `readme.md`
3. В файле `package.json` отредактировать значения:
  * `name` (название проекта или репозитория)
  * `version` (прописать `1.0.0`)
4. Установить зависимости командой `npm ci`
5. Запустить сервер разработки командой `gulp watch`
6. Начать кодить

### Сборка

Сайт собирается с помощью Галпа, вот его основные таски:

* `gulp` — запустить сборку
* `gulp watch` — запустить сборку, сервер и слежение за файлами
* `gulp build` — сборка версии проекта

### Структура папок и файлов

```bash
build/              # Папка сборки версии проекта
dist/               # Папка сборки, здесь работает сервер автообновлений
src/                # Исходные файлы
  blocks/             # Блоки
  img/                # Медиафайлы
  inc/                # Подключаемые части разметки
    doc-end.html        # Конец разметки документа
    doc-start.html      # Начало разметки документа
    page-footer.html    # Нижняя часть лейаута
    page-header.html    # Верхняя часть лейаута
  js/                 # Скрипты
    app.js              # Файл для подключения скриптов из блоков
    global.js           # Общие скрипты для всего сайта
  less/               # Стили
    global.less         # Общие стили для всего сайта
    main.less           # Файл для подключения стилей из блоков
    variables.less      # Файл с переменными
  index.html          # Индексный файл
```

### Рекомендуемый лейаут

```html
<div class="page">
  <header class="header">
    
  </header>

  <main class="main">
    
  </main>

  <footer class="footer">
    
  </footer>
</div>
```

## Настройка

Вся настройка производится через переменные в файле [variables.less](https://github.com/constlab/sedona-basis/blob/master/src/less/variables.less). Если не хватает текущих настроек, то допускается создание новых переменных для конкретного сайта.

### Основное

Шаг от которого строятся все последующие размеры и радиус скругления:

```less
@rhythm: 4px;
@radius: @rhythm; // 4px
```

### Типографика

#### Шрифт

Шрифт на каждой системе свой. Вторичный шрифт служит для заголовков `H1`, `H2` и `H3`:

```less
@font-family-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "NotoColorEmoji", "Segoe UI Emoji", "Segoe UI Symbol";
@font-family-secondary: @font-family-primary; // -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "NotoColorEmoji", "Segoe UI Emoji", "Segoe UI Symbol"
…
```

#### Кегль и интерлиньяж

Базовый:

```less
@font-size: (@rhythm * 4); // 16px
@line-height: (@rhythm * 7); // 28px
```

Уменьшенный:

```less
@font-size-smaller: (@rhythm * 3); // 12px
@line-height-smaller: (@rhythm * 5); // 20px
```

Увеличенный:

```less
@font-size-larger: (@rhythm * 6); // 24px
@line-height-larger: (@rhythm * 8); // 32px
```

Заголовочный (обычный — для маленьких и увеличенный — для больших экранов):

```less
@font-size-h1: (@rhythm * 8); // 32px
@line-height-h1: (@rhythm * 10); // 40px

@font-size-h1-larger: (@rhythm * 9); // 36px
@line-height-h1-larger: (@rhythm * 11); // 44px

@font-size-h2: @font-size-h1; // 32px
@line-height-h2: @line-height-h1; // 40px

@font-size-h2-larger: @font-size-h1-larger; // 36px
@line-height-h2-larger: @line-height-h1-larger; // 44px

@font-size-h3: (@rhythm * 5); // 20px
@line-height-h3: (@rhythm * 7); // 28px

@font-size-h3-larger: @font-size-h3; // 20px
@line-height-h3-larger: @line-height-h3; // 28px
```

### Цвета

Основной цвет должен быть описан в переменной. Далее в коде его оттенки можно изменять с помощью [less-функций](http://lesscss.org/functions/#color-operations).

Цвет шрифта может быть темным (для светлого фона) или светлым (для темного фона).

Цвет имеет четыре оттенка (основной, вторичный, для подсказок и для разделителей):

```less
@dark-primary: lighten(#000, 12%); // #1f1f1f
@dark-secondary: lighten(#000, 54%); // #8a8a8a
@dark-hint: lighten(#000, 72%); // #b8b8b8
@dark-divider: lighten(#000, 88%); // #e0e0e0

@light-primary: #fff;
@light-secondary: darken(#fff, 30%); // #b3b3b3
@light-hint: darken(#fff, 50%); // #808080
@light-divider: darken(#fff, 72%); // #474747
```

Базовый цвет отвечает за цвет по-умолчанию (обычно это темный):

```less
@base-primary: @dark-primary; // #1f1f1f
@base-secondary: @dark-secondary; // #8a8a8a
@base-hint: @dark-hint; // #b8b8b8
@base-divider: @dark-divider; // #e0e0e0
```

Брендовые цвета:

```less
@brand-primary: #fec906;
@brand-secondary: #fe3b48;
…
```

Цвета ссылок и кнопок:

```less
@link-primary: #007aff;
…

@button-primary: @link-primary; // #007aff
…
```

Цвета уведомлений (успех, требуется внимание и ошибка):

```less
@alert-success: #4cd964;
@alert-warning: #fc0;
@alert-danger: #ff3b30;
```

### Сетка

Mobile first. Четыре контрольных точки:

```less
@grid-breakpoints-sm: 576px; // Phone
@grid-breakpoints-md: 768px; // Tablet
@grid-breakpoints-lg: 992px; // Notebook
@grid-breakpoints-xl: 1200px; // Desktop
```

Количество колонок и промежуток между ними:

```less
@grid-columns: 12;
@grid-gutter: (@indent * 2); // 32px
```

### Анимация

Продолжительность анимации и временна́я функция:

```less
@duration: 0.2s;
@timing-function: ease-out;
```

### Отступы (https://yadi.sk/i/jyL2YltT3Wedr2)

Между параграфами:

```less
@indent: @font-size; // 16px
```

Между блоками (для маленьких и больших экранов):

```less
@indent-block-smaller: (@indent * 3); // 48px
@indent-block-larger: (@indent * 6); // 96px
```

Между элементами (для маленьких и больших экранов):

```less
@indent-element-smaller: (@indent * 2); // 32px
@indent-element-larger: (@indent * 3); // 48px
```

## Стиль

### Иконки

Основные иконки — [Material Icons](https://material.io/tools/icons/)
