// Карта пар с 1.09. Источник — карточки «начни отсюда» по каждому предмету.
// tema: '' — тему не нашли; material: '' — материала нет; ne_bylo: true — пары не было.
// urok: { id, nazvanie, ssylka } — если к паре есть урок на сайте; несколько уроков — массив [A, B].
(function () {
  const LJ = { id: 'bd-left-join-group-by', nazvanie: 'LEFT JOIN и GROUP BY', ssylka: 'uroki/bd-left-join-group-by.html' };
  const CD = { id: 'bd-case-daty', nazvanie: 'CASE и даты', ssylka: 'uroki/bd-case-daty.html' };
  const BE = { id: 'bd-er', nazvanie: 'База, ключи и ER-диаграмма', ssylka: 'uroki/bd-er.html' };
  const BS = { id: 'bd-sozdanie-tablic', nazvanie: 'Создание базы и таблиц', ssylka: 'uroki/bd-sozdanie-tablic.html' };
  const BF = { id: 'bd-filtry-join', nazvanie: 'Сортировка, фильтры и JOIN', ssylka: 'uroki/bd-filtry-join.html' };
  const BI = { id: 'bd-izmenenie-dannyh', nazvanie: 'INSERT, UPDATE, DELETE', ssylka: 'uroki/bd-izmenenie-dannyh.html' };
  const BP = { id: 'bd-podzaprosy-cte', nazvanie: 'Подзапросы, WITH и множества', ssylka: 'uroki/bd-podzaprosy-cte.html' };
  const BR = { id: 'bd-stroki', nazvanie: 'Строковые функции', ssylka: 'uroki/bd-stroki.html' };
  const SP = { id: 'sa-process', nazvanie: 'Цикл, роли, модели', ssylka: 'uroki/sa-process.html' };
  const ST = { id: 'sa-trebovaniya', nazvanie: 'Требования и диаграммы', ssylka: 'uroki/sa-trebovaniya.html' };
  const SR = { id: 'sa-uchastniki-riski', nazvanie: 'Участники, вопрос, риск, ограничение', ssylka: 'uroki/sa-uchastniki-riski.html' };
  const SC = { id: 'sa-chto-takoe', nazvanie: 'Что такое системный анализ', ssylka: 'uroki/sa-chto-takoe.html' };
  const SM = { id: 'sa-problema-mvp', nazvanie: 'Проблема, ценность, границы, MVP', ssylka: 'uroki/sa-problema-mvp.html' };
  const SE = { id: 'sa-er-sequence', nazvanie: 'Диаграммы ER и Sequence', ssylka: 'uroki/sa-er-sequence.html' };
  const SK = { id: 'sa-konkurenty-prototipy', nazvanie: 'Рынок, конкуренты и прототипы', ssylka: 'uroki/sa-konkurenty-prototipy.html' };
  const AK = { id: 'ach-nauchnaya-kommunikaciya', nazvanie: 'Научная коммуникация', ssylka: 'uroki/ach-nauchnaya-kommunikaciya.html' };
  const AI = { id: 'ach-apparat-issledovaniya', nazvanie: 'Аппарат исследования', ssylka: 'uroki/ach-apparat-issledovaniya.html' };
  const AG = { id: 'ach-gost-tz', nazvanie: 'ГОСТ и ТЗ', ssylka: 'uroki/ach-gost-tz.html' };
  // Вводная 15.09 и ПР4 13.10 уроком не закрываются: условия курса и статус на странице предмета.
  const AS = { id: 'ach-kak-sdat', nazvanie: 'Как сдать академ (страница предмета)', ssylka: 'ach/#kak-sdat' };
  const FK = { id: 'fiz-kolebaniya', nazvanie: 'Колебания и затухание', ssylka: 'uroki/fiz-kolebaniya.html' };
  const FO = { id: 'fiz-volnovaya-optika', nazvanie: 'Волновая оптика', ssylka: 'uroki/fiz-volnovaya-optika.html' };
  const TV = { id: 'tv-vyskazyvaniya', nazvanie: 'Высказывания и законы логики', ssylka: 'uroki/tv-vyskazyvaniya.html' };
  const TD = { id: 'tv-dnf', nazvanie: 'ДНФ, КНФ и схемы', ssylka: 'uroki/tv-dnf.html' };
  const TM = { id: 'tv-mnozhestva', nazvanie: 'События как множества', ssylka: 'uroki/tv-mnozhestva.html' };
  const TS = { id: 'tv-sigma-algebra', nazvanie: 'Системы множеств, σ-алгебра', ssylka: 'uroki/tv-sigma-algebra.html' };
  const TP = { id: 'tv-prostranstvo', nazvanie: 'Вероятностное пространство', ssylka: 'uroki/tv-prostranstvo.html' };
  const TU = { id: 'tv-uslovnaya', nazvanie: 'Условная вероятность и Байес', ssylka: 'uroki/tv-uslovnaya.html' };
  const TN = { id: 'tv-nezavisimost', nazvanie: 'Полная вероятность, Байес, независимость', ssylka: 'uroki/tv-nezavisimost.html' };
  const AA = { id: 'alg-asimptotika', nazvanie: 'Асимптотика и сложность кода', ssylka: 'uroki/alg-asimptotika.html' };
  const AM = { id: 'alg-master-teorema', nazvanie: 'Рекурренты и мастер-теорема', ssylka: 'uroki/alg-master-teorema.html' };
  const AL = { id: 'alg-lineynye-sortirovki', nazvanie: 'Сортировки за линейное время', ssylka: 'uroki/alg-lineynye-sortirovki.html' };
  const AH = { id: 'alg-kuchi', nazvanie: 'Кучи и амортизация', ssylka: 'uroki/alg-kuchi.html' };
  const AR = { id: 'alg-rekursiya', nazvanie: 'Java с нуля и рекурсия', ssylka: 'uroki/alg-rekursiya.html' };
  const AO = { id: 'alg-grafy-obhody', nazvanie: 'Графы: BFS и DFS', ssylka: 'uroki/alg-grafy-obhody.html' };
  const AD = { id: 'alg-deykstra', nazvanie: 'Дейкстра', ssylka: 'uroki/alg-deykstra.html' };
  const AP = { id: 'alg-dinamicheskoe', nazvanie: 'Динамическое программирование', ssylka: 'uroki/alg-dinamicheskoe.html' };
  const JT = { id: 'java-tipy-if', nazvanie: 'Типы, формулы и if', ssylka: 'uroki/java-tipy-if.html' };
  const JC = { id: 'java-cikly-metody', nazvanie: 'Циклы и статические методы', ssylka: 'uroki/java-cikly-metody.html' };
  const JM = { id: 'java-massivy', nazvanie: 'Массивы и участки убывания', ssylka: 'uroki/java-massivy.html' };
  const JS = { id: 'java-sreda', nazvanie: 'Среда разработки и первая программа', ssylka: 'uroki/java-sreda.html' };
  const JP = { id: 'java-stroki-palindrom', nazvanie: 'Строки, Scanner и палиндром', ssylka: 'uroki/java-stroki-palindrom.html' };
  const JK = { id: 'java-klassy', nazvanie: 'Классы, объекты и композиция', ssylka: 'uroki/java-klassy.html' };
  const JI = { id: 'java-inkapsulyaciya', nazvanie: 'Инкапсуляция', ssylka: 'uroki/java-inkapsulyaciya.html' };
  const JN = { id: 'java-nasledovanie', nazvanie: 'Наследование и полиморфизм', ssylka: 'uroki/java-nasledovanie.html' };
  const JL = { id: 'java-lyambdy', nazvanie: 'Лямбды и Stream', ssylka: 'uroki/java-lyambdy.html' };
  const JR = { id: 'java-sealed-record', nazvanie: 'sealed-типы и record', ssylka: 'uroki/java-sealed-record.html' };
  const JE = { id: 'java-isklyucheniya', nazvanie: 'Исключения и null', ssylka: 'uroki/java-isklyucheniya.html' };
  const NO = { id: 'seti-osnovy', nazvanie: 'Основы компьютерных сетей', ssylka: 'uroki/seti-osnovy.html' };
  const NT = { id: 'seti-tcp-ip', nazvanie: 'Адреса, подсети и TCP', ssylka: 'uroki/seti-tcp-ip.html' };
  const NH = { id: 'seti-http', nazvanie: 'Протокол HTTP', ssylka: 'uroki/seti-http.html' };
  const NA = { id: 'seti-http-api', nazvanie: 'HTTP для API: REST, запросы, ключи', ssylka: 'uroki/seti-http-api.html' };
  const ND = { id: 'seti-dns', nazvanie: 'DNS: имена и адреса', ssylka: 'uroki/seti-dns.html' };
  // Физика: темы пар нигде не подписаны, одна и та же запись для всех.
  const FN = 'не найдено, искал: Модеус (у пар только название «Лекционное занятие N», тем нет), элеарн 7500 (там только виртуальные лабы), exam1.urfu.ru курс 846 (в разделе Горы тестов и материалов нет), записи BBB комнаты p2w-k5g-y9a-obg (ни одной), сводки чатов. Курс по названию тестов и лаб (косвенно): колебания и волновая оптика';
  const FM = 'конспекты «Колебания» и «Волновая оптика» по учебнику (не со слов преподавателя)';
  window.KARTA = [
    {
      predmet: 'Базы данных',
      pary: [
        { data: 'ср 9.09', tip: 'лаба', tema: 'Проектирование ER-диаграммы', material: 'конспект', urok: BE },
        { data: 'вт 15.09', tip: 'лекция 1', tema: 'Введение в БД, ER-диаграммы, установка СУБД', material: 'конспекты, слайды', urok: BE },
        { data: 'ср 16.09', tip: 'лаба', tema: 'Создание базы GrantPlatform в DBeaver', material: 'конспект', urok: BS },
        { data: 'ср 23.09', tip: 'лаба', tema: 'Тема для СР1, ER-диаграмма по ней, CREATE TABLE, тестовые данные', material: 'конспект', urok: BS },
        { data: 'вт 29.09', tip: 'лекция 2–3', tema: 'Создание таблиц, выборка, фильтры, подзапросы, JOIN', material: 'конспекты, слайды', urok: [BS, BF, LJ, BP] },
        { data: 'ср 30.09', tip: 'лаба', tema: 'Запросы на выборку: SELECT, WHERE, BETWEEN', material: 'конспект', urok: BF },
        { data: 'ср 7.10', tip: 'лаба', tema: 'Агрегаты: COUNT, SUM, AVG, MIN, MAX', material: 'конспект', urok: LJ },
        { data: 'вт 13.10', tip: 'лекция 4', tema: 'INSERT, UPDATE, DELETE, CASE, CTE', material: 'конспекты, слайды', urok: [BI, CD, BP] },
        { data: 'ср 14.10', tip: 'лаба', tema: 'Функции дат и CASE: EXTRACT, TO_CHAR (по чату записей соседних групп той же недели)', material: 'конспект', urok: CD },
        { data: 'ср 21.10', tip: 'лаба', tema: 'Строковые функции: SUBSTRING, склейка || (по чату записей 20.10 соседних групп. Своя запись пары есть, 53 мин, в её чате только вопрос про ДЗ 3, тему по видео не сверяли)', material: 'конспект', urok: BR },
      ],
    },
    {
      predmet: 'Алгоритмы',
      pary: [
        { data: 'сб 12.09', tip: 'лаба', tema: 'Вводная: собрать сумматор из NAND (игра; по чату потока, в Модеусе тема не подписана)', material: '' },
        { data: 'пн 14.09', tip: 'лекция', tema: 'Сорвалась, сервер лёг. Показали только устройство курса', material: 'вводные слайды: структура курса и оценивание' },
        { data: 'чт 17.09', tip: 'лекция 1', tema: 'Асимптотика, рекуррентные соотношения, мастер-теорема, нижняя граница сортировки, выход за модель сравнений: подсчёт и поразрядная', material: 'конспекты, слайды, запись', urok: [AA, AM, AL] },
        { data: 'сб 19.09', tip: 'лаба', tema: 'не найдено, искал: репозиторий Зубарева Java_algorithms (коммиты только с 26.09), записи BBB обеих комнат лекций (пусто), Salute Jazz (записей нет), элеарн 10052, Модеус (тема не подписана), сводки чатов (про 19.09 только «в 10:15 в Salute Jazz»). Скорее всего продолжение вводной (косвенно: 12.09 весь поток играл в игру с кодом)', material: '' },
        { data: 'чт 24.09', tip: 'лекция 2', tema: 'Структуры данных, кучи, амортизационный анализ', material: 'конспект, слайды, запись', urok: AH },
        { data: 'сб 26.09', tip: 'лаба', tema: 'Java с нуля: типы, калькулятор, FizzBuzz, «угадай число»', material: 'код Зубарева', urok: AR },
        { data: 'сб 3.10', tip: 'лаба', tema: 'Рекурсия и перебор: сумма цифр, скобки, подмножества', material: 'конспект, код', urok: AR },
        { data: 'пн 5.10', tip: 'лекция 3', tema: 'Алгоритмы на графах', material: 'конспект, слайды', urok: [AO, AD] },
        { data: 'сб 10.10', tip: 'лаба', tema: 'Графы: обход в ширину и глубину, Дейкстра, путь в лабиринте', material: 'конспект, код', urok: [AO, AD] },
        { data: 'сб 17.10', tip: 'лаба', tema: 'Разбор домашних задач: сортировка пузырьком и слиянием, куча на массиве, обход в ширину, алгоритм Прима (косвенно: код «class 4» Зубарев выложил только 24.10 вместе с пятым занятием, записи пары нет)', material: 'код Зубарева: hw/assignment1 и PrimVisualization', urok: [AH, AO] },
        { data: 'пн 19.10', tip: 'лекция 4', tema: 'не найдено, искал: элеарн 10052 (лекций и слайдов в курсе нет совсем, форум пуст), записи BBB комнат 6kj-sn9-boc-wiz и hrp-c6w-mpp-zpy (пусто), ktalk (список записей закрыт), Модеус (тема не подписана), вольт. Лекция 3 остановилась на графах', material: '' },
        { data: 'сб 24.10', tip: 'лаба', tema: 'Динамическое программирование: Фибоначчи (мемоизация и таблица), рюкзак 0/1, наибольшая общая подпоследовательность, лабиринт и уравнение Беллмана', material: 'слайды «Динамическое программирование» и код Зубарева (hw/assignment2)', urok: AP },
      ],
    },
    {
      predmet: 'Теорвер',
      pary: [
        { data: 'вт 8.09', tip: 'практика', tema: 'Высказывания, таблицы истинности', material: 'конспект, задачи с решениями', urok: TV },
        { data: '14–15.09', tip: 'лекция и практика', tema: 'Законы логики, ДНФ, схемы', material: 'конспект, задачи с решениями', urok: [TV, TD] },
        { data: '21–22.09', tip: 'лекция и практика', tema: 'События как множества', material: 'конспект, задачи с решениями', urok: TM },
        { data: '28–29.09', tip: 'лекция и практика', tema: 'Системы множеств, σ-алгебра', material: 'конспект, задачи с решениями', urok: TS },
        { data: '5–6.10', tip: 'лекция и практика', tema: 'Вероятностное пространство', material: 'конспект, задачи с решениями', urok: TP },
        { data: '12–13.10', tip: 'лекция и практика', tema: 'Условная и полная вероятность, Байес', material: 'конспект, задачи с решениями', urok: TU },
        { data: '19–20.10', tip: 'лекция и практика', tema: 'Вероятностное дерево, независимость событий, полная вероятность и Байес на задачах', material: 'рабочая книга Сергеева, задачи', urok: TN },
      ],
    },
    {
      predmet: 'Java',
      pary: [
        { data: 'вт 8.09', tip: 'лаба', tema: 'Среда разработки и первая программа', material: 'конспект', urok: JS },
        { data: 'пн 14.09', tip: 'лекция 1', tema: 'JVM, типы, переменные, Scanner, if', material: 'конспекты, запись', urok: JT },
        { data: 'вт 15.09', tip: 'лаба', tema: 'Ввод через Scanner, палиндром двумя указателями', material: 'конспект', urok: JP },
        { data: 'пн 21.09', tip: 'лекция 2', tema: 'ООП: классы, объекты, композиция', material: 'запись, примеры лектора', urok: JK },
        { data: 'вт 22.09', tip: 'лаба', tema: 'Работа по командам, ПР1', material: 'конспект', urok: JT },
        { data: 'пн 28.09', tip: 'лекция 3', tema: 'Функциональное программирование', material: 'конспект, запись', urok: JL },
        { data: 'вт 29.09', tip: 'лаба', tema: 'Доделка ПР1: типы, ввод-вывод, if', material: 'конспект', urok: JT },
        { data: 'пн 5.10', tip: 'лекция 4', tema: 'sealed-типы и record', material: 'конспект, запись', urok: JR },
        { data: 'вт 6.10', tip: 'лаба', tema: 'Циклы, статические методы, строки', material: 'конспекты, слайды', urok: JC },
        { data: 'пн 12.10', tip: 'лекция 5', tema: 'Исключения и null', material: 'конспект, запись', urok: JE },
        { data: 'вт 13.10', tip: 'лаба', tema: 'Массивы', material: 'конспект, слайды', urok: JM },
        { data: 'пн 19.10', tip: 'лекция 6', tema: 'не найдено, искал: элеарн 10103 (слайдов лекции нет, форум пуст), java-demos Корелина (последний коммит 2.10, новых папок нет), записи BBB комнаты лекций w2m-z8c-rdr-myp (пусто), ktalk (запись по ссылке открывается, но ссылки на 19.10 нет, список записей закрыт), Модеус (тема не подписана), вольт', material: '' },
        { data: 'вт 20.10', tip: 'лаба', tema: 'ООП: классы и объекты, инкапсуляция (косвенно: в элеарне раздел ПР4 «ООП. Инкапсуляция» и слайды «ООП часть I», выложены 22.10; записи нет)', material: 'слайды «ООП часть I» и «ООП часть II»', urok: [JI, JN] },
      ],
    },
    {
      predmet: 'Сети',
      pary: [
        { data: 'пт 11.09', tip: 'лекция 1', tema: 'Основы компьютерных сетей', material: 'конспект, слайды', urok: NO },
        { data: 'сб 12.09', tip: 'лаба', tema: 'Пары не было: до смены расписания лаб нет', ne_bylo: true },
        { data: 'пт 18.09', tip: 'лекция 2', tema: 'Сети TCP/IP', material: 'конспект, слайды', urok: NT },
        { data: 'сб 19.09', tip: 'лаба', tema: 'Пары не было: отменили', ne_bylo: true },
        { data: 'пт 25.09', tip: 'лекция 3', tema: 'Протокол HTTP', material: 'конспект, запись', urok: NH },
        { data: 'сб 26.09', tip: 'лаба', tema: 'не найдено, искал: записи BBB комнаты лаб mk8-pmv-fhq-uem (ни одной), Яндекс.Диск курса (только слайды лекций 1–2), элеарн 10105 (не зачислен), Модеус (везде «Лабораторная 1»), сводки чатов. Инструменты лаб по слайдам лекции 1: Wireshark и Postman', material: 'шпаргалка для лабы (Wireshark, Postman)' },
        { data: 'пт 2.10', tip: 'лекция 4', tema: 'HTTP для API: REST, запросы, API-ключи', material: 'конспект, запись', urok: NA },
        { data: 'сб 3.10', tip: 'лаба', tema: 'не найдено, искал: записи BBB комнаты лаб mk8-pmv-fhq-uem (ни одной), Яндекс.Диск курса, элеарн 10105 (не зачислен), Модеус, сводки чатов. Лекция недели (HTTP для API) шла 2.10', material: 'шпаргалка для лабы (Wireshark, Postman)' },
        { data: 'пт 9.10', tip: 'лекция', tema: 'Пары не было', ne_bylo: true },
        { data: 'сб 10.10', tip: 'лаба', tema: 'не найдено, искал: записи BBB комнаты лаб mk8-pmv-fhq-uem (ни одной), Яндекс.Диск курса, элеарн 10105 (не зачислен), Модеус, сводки чатов', material: 'шпаргалка для лабы (Wireshark, Postman)' },
        { data: 'пт 16.10', tip: 'лекция', tema: 'Система доменных имён DNS (по названию записи BBB; в чате лекции: nslookup, домены верхнего уровня, .ai и .tv, IPv6)', material: 'запись BBB (92 мин, без слайдов), заготовка конспекта про DNS', urok: ND },
        { data: 'сб 17.10', tip: 'лаба', tema: 'не найдено, искал: записи BBB комнаты лаб mk8-pmv-fhq-uem (ни одной), Яндекс.Диск курса (всё ещё только лекции 1–2), элеарн 10105 (не зачислен), Модеус, вольт. Лекция недели была про DNS, возможно лаба про nslookup (догадка)', material: '' },
        { data: 'пт 23.10', tip: 'лекция', tema: 'не найдено, искал: записи BBB комнаты лекций 3u7-bqf-sg0-hq7 (на 24.10 последняя запись 16.10, этой нет), Яндекс.Диск курса (только слайды лекций 1–2), Модеус (тема не подписана), вольт', material: '' },
        { data: 'сб 24.10', tip: 'лаба', tema: 'не найдено, искал: записи BBB комнаты лаб mk8-pmv-fhq-uem (ни одной), Яндекс.Диск курса (только лекции 1–2), элеарн 10105 (не зачислен), Модеус (тема не подписана), вольт', material: '' },
      ],
    },
    {
      predmet: 'Системная аналитика',
      pary: [
        { data: 'ср 16.09', tip: 'лаба 1', tema: 'Что такое системный анализ', material: 'конспект, слайды', urok: SC },
        { data: 'ср 16.09', tip: 'лекция МТС 1', tema: 'Жизненный цикл ПО, роли в команде', material: 'конспект, слайды, запись', urok: SP },
        { data: 'ср 23.09', tip: 'лекция МТС 2', tema: 'Модели разработки ПО: водопад, V-модель, спираль, итерации и инкременты, Scrum, Kanban', material: 'конспект, слайды, запись', urok: SP },
        { data: 'ср 30.09', tip: 'лаба 2', tema: 'Проблема, ценность, границы, MVP', material: 'конспект, слайды, запись', urok: SM },
        { data: 'ср 30.09', tip: 'лекция МТС 3', tema: 'Анализ проблем и бизнес-требований, рынок и конкуренты', material: 'конспект, слайды', urok: [ST, SK] },
        { data: 'ср 7.10', tip: 'лекция МТС 4', tema: 'Требования: функциональные и нефункциональные', material: 'слайды, запись', urok: ST },
        { data: 'ср 14.10', tip: 'лаба 3', tema: 'Участники, требования, риски (по плану курса)', material: 'конспект, слайды', urok: SR },
        { data: 'ср 14.10', tip: 'лекция МТС 5', tema: 'Прототипы и диаграммы: Use Case, BPMN', material: 'слайды, запись, шпаргалки BPMN', urok: [ST, SK] },
        { data: 'ср 21.10', tip: 'лекция МТС 6', tema: 'Диаграммы: ER и Sequence (по плану курса: раздел 6 «Диаграммы (ER, Sequence)» в TeachBase). Слайдов нет: раздел там ещё черновик, запись МТС Линк закрыта организатором (403); искал также элеарн 10012. Урок по плану курса, стандартное содержание тем', material: '', urok: SE },
      ],
    },
    {
      predmet: 'Академ. чтение',
      pary: [
        { data: 'вт 15.09', tip: 'практика', tema: 'Вводная: условия курса', material: 'страница «Условия прохождения курса» (текст в вольте)', urok: AS },
        { data: 'вт 22.09', tip: 'практика', tema: 'ПР1 «Элементы научного знания»', material: 'конспект', urok: AI },
        { data: 'ср 23.09', tip: 'лекция 1', tema: 'Исследование в академической науке и IT', material: 'конспект, слайды, запись', urok: AI },
        { data: 'вт 29.09', tip: 'практика', tema: 'ПР2 «Научное исследование в IT-сфере»', material: 'конспект', urok: AI },
        { data: 'ср 30.09', tip: 'лекция 2', tema: 'Логика научного исследования', material: 'конспект, слайды, запись', urok: [AI, AG] },
        { data: 'вт 6.10', tip: 'практика', tema: 'ПР3 «Работа с ГОСТами»', material: 'конспект', urok: AG },
        { data: 'вт 13.10', tip: 'практика', tema: 'ПР4 «ИИ в планировании научного исследования» (сдана 20.10)', material: 'конспект', urok: AS },
        { data: 'ср 14.10', tip: 'лекция 3', tema: 'Научная коммуникация в цифровую эпоху', material: 'текст лекции', urok: AK },
        { data: 'вт 20.10', tip: 'практика', tema: 'ПР5 «Научная коммуникация. Научный язык»', material: 'задание', urok: AK },
      ],
    },
    {
      predmet: 'СЦИНИ',
      pary: [
        { data: 'чт 10.09', tip: 'практика 1', tema: 'Знакомство, тема научной работы', material: 'конспект' },
        { data: 'чт 10.09', tip: 'лекция 1', tema: 'не найдено, искал: Модеус (тема не подписана), элеарн (курса нет), записи BBB комнаты Тарасова cgl-idl-72j-tf3 (ни одной), папка Library и папка курса на Google Drive (только работы студентов), сводки чатов. Тебя на ней не было', material: '' },
        { data: 'чт 17.09', tip: 'практика 2', tema: 'Сдача резюме через форму', material: 'форма Тарасова для резюме' },
        { data: 'чт 17.09', tip: 'лекция 2', tema: 'не найдено, искал: Модеус (тема не подписана), элеарн (курса нет), записи BBB комнаты cgl-idl-72j-tf3 (ни одной), Google Drive курса, сводки чатов. Ты был (по таблице Тарасова)', material: '' },
        { data: 'чт 24.09', tip: 'практика 3', tema: 'Пары не было: вместо неё таблица тем и команд', ne_bylo: true },
        { data: 'чт 24.09', tip: 'лекция 3', tema: 'Наукометрия (обещал показать)', material: 'конспект' },
        { data: 'чт 1.10', tip: 'практика 4', tema: 'Короткие доклады команд: тема, состав, роли', material: 'план статьи' },
        { data: 'чт 1.10', tip: 'лекция 4', tema: 'не найдено, искал: Модеус (тема не подписана), элеарн (курса нет), записи BBB комнаты cgl-idl-72j-tf3 (ни одной), Google Drive курса, сводки чатов 28.09–12.10. Ты был (по таблице Тарасова)', material: '' },
        { data: 'чт 8.10', tip: 'практика 5', tema: 'Планы команд, ссылки по ГОСТ, задание на литобзор', material: 'конспекты' },
        { data: 'чт 8.10', tip: 'лекция 5', tema: 'не найдено, искал: Модеус (тема не подписана), элеарн (курса нет), записи BBB комнаты cgl-idl-72j-tf3 (ни одной), Google Drive курса, сводки чатов. Тебя не было', material: '' },
        { data: 'чт 15.10', tip: 'практика 6', tema: 'Отчёты участников команд Тарасову; задание: привести репозиторий в порядок, вписать ссылку в его таблицу, за неделю выбрать журнал или конференцию (по чату команды «джейлбрейк» от 15.10, не по записи пары)', material: 'репозиторий команды scini-team2, таблица Тарасова' },
        { data: 'чт 15.10', tip: 'лекция 6', tema: 'не найдено, искал: Модеус (тема не подписана), элеарн (курса нет), записи BBB комнаты cgl-idl-72j-tf3 (ни одной), Google Drive курса, сводки и выводы по чату команды', material: '' },
        { data: 'чт 22.10', tip: 'практика 7', tema: 'не найдено, искал: Модеус (тема не подписана), элеарн (курса нет), записи BBB комнаты cgl-idl-72j-tf3 (ни одной), Google Drive курса, выводы по чату команды (на 20.10 заканчиваются; срок черновиков команды был 20.10)', material: '' },
        { data: 'чт 22.10', tip: 'лекция 7', tema: 'не найдено, искал: Модеус (тема не подписана), элеарн (курса нет), записи BBB комнаты cgl-idl-72j-tf3 (ни одной), Google Drive курса', material: '' },
      ],
    },
    {
      predmet: 'Физика',
      pary: [
        { data: 'чт 17.09', tip: 'лекция', tema: FN, material: FM },
        { data: 'чт 17.09', tip: 'практика', tema: FN, material: FM },
        { data: 'чт 24.09', tip: 'лекция', tema: FN, material: FM },
        { data: 'чт 24.09', tip: 'практика', tema: FN, material: FM },
        { data: 'чт 1.10', tip: 'лекция', tema: FN, material: FM },
        { data: 'чт 1.10', tip: 'лаба', tema: 'Лаба 17 или 26, колебания или кольца Ньютона, какая именно не подтверждено', material: 'конспекты', urok: [FK, FO] },
        { data: 'чт 8.10', tip: 'лекция', tema: FN, material: FM },
        { data: 'чт 8.10', tip: 'лаба', tema: 'Лаба 17 или 26, какая именно не подтверждено', material: 'конспекты', urok: [FK, FO] },
        { data: 'чт 15.10', tip: 'лекция', tema: FN, material: FM },
        { data: 'чт 15.10', tip: 'практика', tema: FN, material: FM },
        { data: 'чт 22.10', tip: 'лекция', tema: FN, material: FM },
        { data: 'чт 22.10', tip: 'практика', tema: FN, material: FM },
      ],
    },
  ];
})();
