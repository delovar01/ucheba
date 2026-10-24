// Общий скрипт для всех страниц: тема, офлайн, прогресс уроков, подсветка SQL, сроки, карта, формулы.
(function () {
  const koren = document.documentElement.dataset.koren || './';
  const chitat = (k, zapas) => { try { return JSON.parse(localStorage.getItem(k)) || zapas; } catch (e) { return zapas; } };
  const pisat = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };

  // --- тема: авто → светлая → тёмная ---
  const nazvaniya = { auto: '◐ Авто', light: '☀ Светлая', dark: '☾ Тёмная' };
  const opisanie = { auto: 'как в телефоне', light: 'светлая', dark: 'тёмная' };
  const sleduyushaya = { auto: 'light', light: 'dark', dark: 'auto' };
  const knopka = document.querySelector('.knopka-tema');
  function pokazatTemu(t) {
    if (!knopka) return;
    knopka.textContent = nazvaniya[t];
    knopka.setAttribute('aria-label', 'Тема: ' + opisanie[t] + '. Нажми, чтобы сменить');
  }
  if (knopka) {
    pokazatTemu(localStorage.getItem('tema') || 'auto');
    knopka.addEventListener('click', () => {
      const t = sleduyushaya[localStorage.getItem('tema') || 'auto'];
      if (t === 'auto') delete document.documentElement.dataset.theme;
      else document.documentElement.dataset.theme = t;
      localStorage.setItem('tema', t);
      pokazatTemu(t);
    });
  }

  // --- офлайн ---
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register(koren + 'sw.js').catch(() => {});
  }

  // --- прогресс урока: «Шаг N из 9», отметка «пройден» ---
  // В localStorage: 'urok:<id>' = { max: самый дальний шаг, proyden: 'дата' }
  const urokId = document.body.dataset.urok;
  if (urokId) {
    const klyuch = 'urok:' + urokId;
    const sost = chitat(klyuch, {});
    const shagi = [...document.querySelectorAll('section.shag[data-shag]')];
    const vsego = shagi.length;
    const shapka = document.querySelector('.shapka');

    const hod = document.createElement('div');
    hod.className = 'hod';
    hod.innerHTML = '<div class="hod-tekst"><b></b><span></span></div><nav class="dorozhka" aria-label="Шаги урока">' +
      shagi.map((s, i) => '<a href="#' + s.id + '" aria-label="Шаг ' + (i + 1) + '"></a>').join('') + '</nav>';
    shapka && shapka.appendChild(hod);
    const hodB = hod.querySelector('b'), hodSpan = hod.querySelector('span');
    const delenia = [...hod.querySelectorAll('.dorozhka a')];

    let tekushiy = -1;
    const obnovit = () => {
      const porog = innerHeight * 0.4;
      let n = 0;
      shagi.forEach((s, i) => { if (s.getBoundingClientRect().top < porog) n = i + 1; });
      const posle = document.querySelector('#posle-shagov') || document.querySelector('#samostoyatelnaya');
      const vKonce = !!(posle && posle.getBoundingClientRect().top < porog);
      const metka = n + (vKonce ? 'k' : '');
      if (metka === tekushiy) return;
      tekushiy = metka;
      if (n > (sost.max || 0)) { sost.max = n; pisat(klyuch, sost); }
      hodB.textContent = vKonce ? 'Все ' + vsego + ' шагов позади' : n === 0 ? 'Вступление' : 'Шаг ' + n + ' из ' + vsego;
      hodSpan.textContent = sost.proyden ? 'урок пройден ✓' : vKonce ? 'мини-самостоятельная' : n === 0 ? vsego + ' шагов впереди' : '';
      delenia.forEach((d, i) => {
        d.classList.toggle('seychas', vKonce || i === n - 1);
        d.classList.toggle('byl', !vKonce && i < (sost.max || 0) && i !== n - 1);
      });
    };
    addEventListener('scroll', obnovit, { passive: true });
    addEventListener('resize', obnovit);
    obnovit();

    const otmetka = document.querySelector('.otmetka');
    if (otmetka) {
      const k = otmetka.querySelector('.knopka');
      const p = otmetka.querySelector('p');
      const risovat = () => {
        const est = !!sost.proyden;
        otmetka.classList.toggle('gotovo', est);
        p.textContent = est
          ? 'Урок пройден ' + new Date(sost.proyden).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }) + '. На главной он отмечен зелёным.'
          : 'Прошёл все шаги и решил мини-самостоятельную? Отметь урок. Отметка хранится на этом телефоне.';
        k.textContent = est ? 'Снять отметку' : 'Урок пройден ✓';
      };
      k.addEventListener('click', () => {
        if (sost.proyden) delete sost.proyden; else sost.proyden = new Date().toISOString();
        pisat(klyuch, sost); risovat(); tekushiy = -2; obnovit();
      });
      risovat();
    }
  }

  // --- состояние уроков в списках: не начат / шаг N / пройден ---
  const znachok = el => {
    el.querySelector(':scope > .sostoyanie')?.remove();
    const sost = chitat('urok:' + el.dataset.urokStatus, {});
    const vsego = el.dataset.shagov || 9;
    const z = document.createElement('span');
    z.className = 'sostoyanie';
    if (sost.proyden) { z.classList.add('proyden'); z.textContent = 'пройден ✓'; }
    else if (sost.max) { z.classList.add('idet'); z.textContent = 'дошёл до шага ' + sost.max + ' из ' + vsego; }
    else z.textContent = 'не начат';
    el.appendChild(z);
  };
  document.querySelectorAll('[data-urok-status]').forEach(znachok);

  // --- подсветка SQL ---
  const slova = ['SELECT', 'FROM', 'WHERE', 'LEFT JOIN', 'INNER JOIN', 'JOIN', 'ON', 'GROUP BY', 'HAVING',
    'ORDER BY', 'LIMIT', 'AS', 'AND', 'OR', 'IS NOT NULL', 'IS NULL', 'NOT', 'NULL', 'DESC', 'ASC',
    'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'INSERT INTO', 'VALUES', 'CREATE TABLE', 'PRIMARY KEY', 'REFERENCES',
    'DROP TABLE', 'IF EXISTS', 'DELETE', 'UPDATE', 'SET'];
  const re = new RegExp('\\b(' + slova.map(s => s.replace(/ /g, '\\s+')).join('|') + ')\\b', 'gi');
  const ekran = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  document.querySelectorAll('pre code.sql').forEach(el => {
    el.innerHTML = el.textContent.split('\n').map(stroka => {
      const i = stroka.indexOf('--');
      const kod = i >= 0 ? stroka.slice(0, i) : stroka;
      const kom = i >= 0 ? stroka.slice(i) : '';
      return ekran(kod).replace(re, '<span class="kl">$1</span>') + (kom ? '<span class="kom">' + ekran(kom) + '</span>' : '');
    }).join('\n');
  });

  // --- «Горит»: сроки из assets/sroki.js ---
  // #gorit на главной: ближайшие 7 дней, остальное в #gorit-dalshe под раскрывашкой.
  // .gorit[data-predmet] на странице предмета: все сроки этого предмета.
  const seychas = Date.now();
  const den = 86400000;
  const aktivnye = () => (window.SROKI || [])
    .filter(s => !s.sdano && (!s.do || new Date(s.do).getTime() > seychas - den))
    .sort((a, b) => (a.do ? new Date(a.do) : Infinity) - (b.do ? new Date(b.do) : Infinity));
  const sostUroka = put => chitat('urok:' + (document.querySelector('[data-urok-status] a[href$="' + put.split('/').pop() + '"]')?.closest('[data-urok-status]')?.dataset.urokStatus || ''), {});

  // «Сажусь учиться»: урок к ближайшей сдаче, который ещё не пройден
  const glavnyy = document.querySelector('.vhod.glavnyy[data-avto]');
  if (glavnyy && window.SROKI) {
    const s = aktivnye().find(x => x.urok && !sostUroka(x.urok).proyden && document.querySelector('[data-urok-status] a[href$="' + x.urok.split('/').pop() + '"]'));
    if (s) {
      const li = document.querySelector('[data-urok-status] a[href$="' + s.urok.split('/').pop() + '"]').closest('[data-urok-status]');
      const imya = li.querySelector('b').textContent;
      const kogda = new Date(new Date(s.do).getTime() - 60000).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', timeZone: 'Asia/Yekaterinburg' });
      glavnyy.href = li.querySelector('a').getAttribute('href');
      glavnyy.dataset.urokStatus = li.dataset.urokStatus;
      glavnyy.dataset.shagov = li.dataset.shagov;
      glavnyy.querySelector('span').textContent = imya + '. Это к сдаче «' + s.chto + '» до ' + kogda + ', ' + li.dataset.shagov + ' шагов.';
      znachok(glavnyy);
    }
  }

  const gorit = document.querySelector('#gorit');
  if (window.SROKI && (gorit || document.querySelector('.gorit[data-predmet]'))) {
    const formatDaty = d => d.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Asia/Yekaterinburg' });
    const dataEkb = d => new Date(d.toLocaleDateString('en-CA', { timeZone: 'Asia/Yekaterinburg' }));
    const ostalos = d => {
      if (d.getTime() < seychas) return 'срок прошёл';
      const dney = Math.round((dataEkb(d) - dataEkb(new Date(seychas))) / den);
      if (dney <= 0) return 'сегодня';
      if (dney === 1) return 'завтра';
      const n = dney % 10, nn = dney % 100;
      const slovo = (n === 1 && nn !== 11) ? 'день' : (n >= 2 && n <= 4 && (nn < 12 || nn > 14)) ? 'дня' : 'дней';
      return 'через ' + dney + ' ' + slovo;
    };
    const punkt = (s, sPredmetom) => {
      // срок «1.11 00:00» показываем как последний день — 31.10
      const d = s.do ? new Date(new Date(s.do).getTime() - 60000) : null;
      const skoro = d && d.getTime() - seychas < 3 * den;
      const kogda = d ? formatDaty(d) + '<small>' + ostalos(d) + '</small>'
        : s.kogda ? s.kogda + '<small>дата не объявлена</small>'
        : 'без срока<small>чем раньше, тем лучше</small>';
      const urok = s.urok ? sostUroka(s.urok) : null;
      return '<li class="' + (skoro ? 'skoro' : '') + '">' +
        '<div class="kogda">' + kogda + '</div>' +
        '<div>' + (sPredmetom ? '<span class="predmet">' + s.predmet + '</span>' : '') +
        '<span class="chto">' + (s.ssylka ? '<a href="' + s.ssylka + '" target="_blank" rel="noopener">' + s.chto + '</a>' : s.chto) + '</span>' +
        (s.urok ? '<a class="urok" href="' + koren + s.urok + '">' + (urok.proyden ? 'Урок пройден ✓, повторить →' : 'Урок к этому →') + '</a>' : '') +
        (s.probnyy ? '<a class="urok probnyy" href="' + koren + s.probnyy + '">Пробный вариант →</a>' : '') +
        (s.primechanie ? '<details class="podrobnee"><summary>Подробнее</summary><p>' + s.primechanie + '</p></details>' : '') +
        '</div></li>';
    };
    const pusto = '<li><div class="kogda">—</div><div>Ничего не горит</div></li>';
    const vse = aktivnye();
    if (gorit) {
      const nedelya = vse.filter(s => s.do && new Date(s.do).getTime() - seychas < 7 * den);
      const dalshe = vse.filter(s => !nedelya.includes(s));
      gorit.innerHTML = nedelya.map(s => punkt(s, true)).join('') || '<li><div class="kogda">—</div><div>На этой неделе сдач нет</div></li>';
      const dal = document.querySelector('#gorit-dalshe');
      if (dal) {
        dal.querySelector('ul').innerHTML = dalshe.map(s => punkt(s, true)).join('');
        dal.querySelector('.skolko').textContent = dalshe.length;
        dal.hidden = !dalshe.length;
      }
    }
    document.querySelectorAll('.gorit[data-predmet]').forEach(ul => {
      ul.innerHTML = vse.filter(s => s.predmet === ul.dataset.predmet).map(s => punkt(s, false)).join('') ||
        '<li><div class="kogda">—</div><div>Сдач по предмету сейчас нет</div></li>';
    });
  }

  // --- шпаргалка предмета: рамки «Главное» и «В тетрадь» из его уроков ---
  // <div data-shpargalka="../uroki/a.html ../uroki/b.html">
  document.querySelectorAll('[data-shpargalka]').forEach(async kuda => {
    const puti = kuda.dataset.shpargalka.trim().split(/\s+/);
    const chasti = await Promise.all(puti.map(p => fetch(p).then(r => r.ok ? r.text() : '').catch(() => '')));
    const html = chasti.map((t, i) => {
      if (!t) return '';
      const doc = new DOMParser().parseFromString(t, 'text/html');
      const nazvanie = doc.querySelector('main h1')?.textContent || '';
      const shagi = [...doc.querySelectorAll('section.shag[data-shag]')].map((s, n) => {
        const ramki = [...s.querySelectorAll('.glavnoe, .tetrad')].map(r => r.innerHTML).join('');
        return ramki ? '<li><a href="' + puti[i] + '#' + s.id + '">' + (n + 1) + '. ' + (s.querySelector('h2')?.textContent || '') + '</a>' + ramki + '</li>' : '';
      }).join('');
      return shagi ? '<details class="shpargalka"' + (i === 0 ? ' open' : '') + '><summary><b>' + nazvanie + '</b></summary><ol>' + shagi + '</ol></details>' : '';
    }).join('');
    kuda.innerHTML = html || '<p class="tiho">Шпаргалка соберётся из уроков, когда откроешь страницу с интернетом.</p>';
  });

  // --- карта пар: из assets/karta.js ---
  const karta = document.querySelector('#karta');
  if (karta && window.KARTA) {
    const pusto = v => !v || v === '—';
    karta.innerHTML = window.KARTA.filter(p => !karta.dataset.predmet || p.predmet === karta.dataset.predmet).map((p, i) => {
      const bylo = p.pary.filter(r => !r.ne_bylo);
      const bezTemy = bylo.filter(r => pusto(r.tema)).length;
      const bezMat = bylo.filter(r => pusto(r.material)).length;
      const sUrokom = bylo.filter(r => r.urok).length;
      const stroki = p.pary.map(r => {
        if (r.ne_bylo) {
          return '<tr><td class="data">' + r.data + '</td><td>' + r.tip + '</td><td class="ne-bylo" colspan="3">' + r.tema + '</td></tr>';
        }
        let urok = '<td class="pusto">нет</td>';
        if (r.urok) {
          // urok — один урок или массив, если к паре их несколько
          urok = '<td>' + [].concat(r.urok).map(u => {
            const sost = chitat('urok:' + u.id, {});
            return '<a href="' + koren + u.ssylka + '">' + u.nazvanie + '</a>' + (sost.proyden ? ' ✓' : '');
          }).join('<br>') + '</td>';
        }
        return '<tr><td class="data">' + r.data + '</td><td>' + r.tip + '</td>' +
          (pusto(r.tema) ? '<td class="tema pusto">тема не найдена</td>' : '<td class="tema">' + r.tema + '</td>') +
          (pusto(r.material) ? '<td class="pusto">нет</td>' : '<td>' + r.material + '</td>') + urok + '</tr>';
      }).join('');
      return '<details class="karta-predmet"' + (i === 0 && !karta.dataset.zakryto ? ' open' : '') + '><summary><b>' + p.predmet + '</b>' +
        '<span class="tiho">' + bylo.length + ' пар · без темы ' + bezTemy + ' · без материала ' + bezMat + ' · с уроком ' + sUrokom + '</span></summary>' +
        '<div class="tablica"><table><tr><th>дата</th><th>тип</th><th>тема</th><th>материал</th><th>урок</th></tr>' + stroki + '</table></div></details>';
    }).join('');
    document.querySelectorAll('[data-karta]').forEach(b => b.addEventListener('click', () => {
      karta.querySelectorAll('details').forEach(d => { d.open = b.dataset.karta === 'otkryt'; });
    }));
  }

  // --- мини-самостоятельная: ответы копятся на телефоне, копируются одной кнопкой ---
  const sr = document.querySelector('#samostoyatelnaya');
  if (sr) {
    const klyuch = 'sr:' + location.pathname;
    const sohraneno = chitat(klyuch, {});
    sr.querySelectorAll('textarea').forEach(t => {
      t.value = sohraneno[t.name] || '';
      t.addEventListener('input', () => { sohraneno[t.name] = t.value; pisat(klyuch, sohraneno); });
    });
    const k = sr.querySelector('.kopirovat');
    const msg = sr.querySelector('.soobshchenie');
    k && k.addEventListener('click', async () => {
      const tekst = sr.dataset.zagolovok + '\n\n' + [...sr.querySelectorAll('textarea')]
        .map((t, i) => (i + 1) + ')\n' + (t.value.trim() || '— не решил')).join('\n\n');
      try { await navigator.clipboard.writeText(tekst); msg.textContent = 'Скопировано, вставляй в чат'; }
      catch (e) {
        const ta = document.createElement('textarea'); ta.value = tekst; document.body.appendChild(ta);
        ta.select(); document.execCommand('copy'); ta.remove(); msg.textContent = 'Скопировано, вставляй в чат';
      }
    });
  }

  // --- пробный тест: <form class="probnyy-test">, у вопроса .probnyy-v[data-verno="номер верного с 1"] ---
  document.querySelectorAll('form.probnyy-test').forEach(f => {
    f.addEventListener('submit', e => {
      e.preventDefault();
      const voprosy = [...f.querySelectorAll('.probnyy-v[data-verno]')];
      let verno = 0;
      voprosy.forEach(v => {
        const metki = [...v.querySelectorAll('label')];
        const nado = Number(v.dataset.verno) - 1;
        metki.forEach((m, i) => {
          m.classList.remove('verno', 'neverno');
          const vybran = m.querySelector('input').checked;
          if (i === nado) m.classList.add('verno');
          else if (vybran) m.classList.add('neverno');
          if (i === nado && vybran) verno++;
        });
      });
      const itog = f.querySelector('.itog-testa p');
      if (itog) itog.textContent = 'Верно ' + verno + ' из ' + voprosy.length + '. Зелёным отмечен правильный вариант, красным твой неверный. Разбор под кнопкой у каждого вопроса.';
    });
  });

  // --- формулы: KaTeX грузится только там, где есть data-formuly ---
  if (document.querySelector('[data-formuly]')) {
    const cdn = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/';
    const css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = cdn + 'katex.min.css';
    document.head.appendChild(css);
    const s1 = document.createElement('script');
    s1.src = cdn + 'katex.min.js';
    s1.onload = () => {
      const s2 = document.createElement('script');
      s2.src = cdn + 'contrib/auto-render.min.js';
      s2.onload = () => {
        window.renderMathInElement(document.body, {
          delimiters: [{ left: '$$', right: '$$', display: true }, { left: '\\(', right: '\\)', display: false }],
          throwOnError: false,
        });
        // формула шире строки на телефоне листается сама, а не тянет страницу вбок
        const dlinnye = () => document.querySelectorAll('.katex:not(.katex-display .katex)').forEach(k => {
          const ryad = k.closest('p, li, td, div, details') || document.body;
          const shir = [...k.querySelectorAll('.katex-html > .base')].reduce((s, b) => s + b.getBoundingClientRect().width, 0);
          k.classList.toggle('dlinnaya', shir > ryad.clientWidth);
        });
        css.sheet ? dlinnye() : css.addEventListener('load', dlinnye);
        addEventListener('resize', dlinnye);
      };
      document.head.appendChild(s2);
    };
    document.head.appendChild(s1);
  }
})();
