/* Tribute mini app — общий движок для ru/ и en/ версий.
   Язык: window.APP_LANG (жёстко задан в языковой папке), иначе язык Telegram.
   Экраны: лендинги, куда приземляется человек по ссылке, и кабинет автора. */
(function () {
  var tg = window.Telegram && window.Telegram.WebApp;
  if (tg) { tg.ready(); tg.expand(); }

  var user = (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) || null;
  var autoLang = ((user && user.language_code) || navigator.language || 'ru').slice(0, 2);
  var lang = window.APP_LANG || (autoLang === 'ru' ? 'ru' : 'en');

  var DICT = {
    ru: {
      // общее
      back: 'Назад', trust: '✅ 70 000+ авторов, 1,6 млн пользователей · 🔒 Проверено Telegram',
      verified: '🔒 Проверено Telegram',
      copy: 'Скопировать ссылку', copyShort: 'Копировать', share: 'Поделиться',
      copied: 'Ссылка скопирована', any: 'Любая',
      // продуктовый лендинг
      homeTitle: 'Tribute', homeLead: 'Закрытые каналы, платные чаты, эксклюзивный контент и донаты.',
      homeSubs: ['Подписки', 'Платный доступ в канал и чат'],
      homeDonate: ['Донаты', 'Разовая поддержка от читателей'],
      homePartner: ['Партнёрская программа', 'Процент с выручки приведённых авторов'],
      homeCta: 'Стать автором',
      // лендинг партнёрки
      partnerTitle: 'Партнёрская программа', partnerLead: 'Приводите авторов — получайте процент с их выручки.',
      partnerSteps: ['Берёте свою ссылку в кабинете', 'Автор регистрируется по ней',
                     'Вам капает процент с каждой его выплаты'],
      partnerFacts: ['№1 по монетизации в Telegram', '💸 Вывод на карту или в крипте',
                     '✅ 70 000+ авторов, 1,6 млн пользователей'],
      partnerCta: 'Получить ссылку',
      // лендинг подписки (зритель)
      subChannel: 'Закрытый канал Ани', subAuthor: 'Аня Ким', subPrice: '499 ₽',
      subPeriod: 'в месяц', subLead: 'Доступ к закрытым каналам и платным чатам.',
      subPerks: [['📝', 'Тексты, которых нет в открытом канале'],
                 ['💬', 'Чат для подписчиков'],
                 ['🎧', 'Разборы и эфиры каждую неделю']],
      subCta: 'Подписаться за 499 ₽',
      subNote: 'Продление раз в месяц, отменить можно в любой момент.',
      subDone: 'Открываем оплату…',
      // лендинг доната (зритель)
      donTitle: 'Поддержать автора', donLead: 'Поддержите любимых авторов донатом.',
      donNotePh: 'Сообщение автору — по желанию',
      donCta: 'Отправить', donDone: 'Спасибо за поддержку!',
      donAmounts: [100, 300, 500, 1000], donCur: '₽',
      // кабинет автора
      cabSub: 'Кабинет автора',
      cabSubs: ['Подписка на канал', 'Ссылка, по которой оформляют подписку'],
      cabDon: ['Донаты', 'Ссылка на донат вам'],
      cabPartner: ['Партнёрская программа', 'Приводите авторов — получайте процент'],
      cabSubsLead: 'Выберите канал — ссылка обновится. Отправьте её подписчикам.',
      cabSubsHint: 'По ссылке человек попадает на страницу подписки, после оплаты бот добавит его в канал.',
      cabChannels: [['Закрытый канал Ани', '499 ₽ в месяц', 'private'], ['Чат для своих', '990 ₽ в месяц', 'chat']],
      cabDonLead: 'Ссылка на разовый донат. Можно зафиксировать сумму или оставить свободную.',
      cabDonHint: 'Ссылку удобно закрепить в канале или положить в описание профиля.',
      cabDonNotePh: 'За что донат — по желанию',
      cabPartnerLead: 'Приводите авторов — получайте процент с их выручки.',
      cabPartnerHint: 'Ссылка работает и в сторис, и в описании канала.',
      shareSubs: 'Подписка на мой канал', shareDonate: 'Поддержать меня донатом',
      sharePartner: '№1 по монетизации в Telegram',
      creatorFallback: 'Автор'
    },
    en: {
      back: 'Back', trust: '✅ 70,000+ creators, 1.6M users · 🔒 Verified by Telegram',
      verified: '🔒 Verified by Telegram',
      copy: 'Copy link', copyShort: 'Copy', share: 'Share',
      copied: 'Link copied', any: 'Any',
      homeTitle: 'Tribute', homeLead: 'Private channels, paid chats, exclusive content and donations.',
      homeSubs: ['Subscriptions', 'Paid access to a channel or chat'],
      homeDonate: ['Donations', 'One-off support from your readers'],
      homePartner: ['Partner program', 'A share of revenue from creators you bring'],
      homeCta: 'Become a creator',
      partnerTitle: 'Partner program', partnerLead: 'Bring creators in — earn a share of their revenue.',
      partnerSteps: ['Grab your link in the dashboard', 'A creator signs up through it',
                     'You earn a share of every payout they get'],
      partnerFacts: ['#1 monetization platform in Telegram', '💸 Payouts to bank cards or crypto',
                     '✅ 70,000+ creators, 1.6M users'],
      partnerCta: 'Get my link',
      subChannel: "Anya's private channel", subAuthor: 'Anya Kim', subPrice: '$5.99',
      subPeriod: 'per month', subLead: 'Access to private channels and paid chats.',
      subPerks: [['📝', 'Posts you will not find in the public channel'],
                 ['💬', 'Subscribers-only chat'],
                 ['🎧', 'Weekly live sessions and reviews']],
      subCta: 'Subscribe for $5.99',
      subNote: 'Renews monthly, cancel any time.',
      subDone: 'Opening checkout…',
      donTitle: 'Support the creator', donLead: 'Support your favourite creators with a donation.',
      donNotePh: 'A message to the creator — optional',
      donCta: 'Send', donDone: 'Thank you for your support!',
      donAmounts: [1, 5, 10, 20], donCur: '$',
      cabSub: 'Creator dashboard',
      cabSubs: ['Channel subscription', 'Link people subscribe through'],
      cabDon: ['Donations', 'Your donation link'],
      cabPartner: ['Partner program', 'Bring creators in — earn a share'],
      cabSubsLead: 'Pick a channel — the link updates. Send it to your audience.',
      cabSubsHint: 'The link opens the subscription page; after payment the bot adds the person to the channel.',
      cabChannels: [["Anya's private channel", '$5.99 / month', 'private'], ['Insiders chat', '$9.99 / month', 'chat']],
      cabDonLead: 'A one-off donation link. Fix an amount or leave it open.',
      cabDonHint: 'Pin the link in your channel or put it in your bio.',
      cabDonNotePh: 'What it is for — optional',
      cabPartnerLead: 'Bring creators in — earn a share of their revenue.',
      cabPartnerHint: 'Works in stories and in your channel description too.',
      shareSubs: 'Subscribe to my channel', shareDonate: 'Support me with a donation',
      sharePartner: '#1 monetization platform in Telegram',
      creatorFallback: 'Creator'
    }
  };
  var T = DICT[lang];
  document.documentElement.lang = lang;

  var bot = ((tg && tg.initDataUnsafe && tg.initDataUnsafe.bot) || {}).username || 'tribute';
  var me = user ? user.id : 'me';
  var base = 'https://t.me/' + bot;
  var myName = user ? [user.first_name, user.last_name].filter(Boolean).join(' ') : T.creatorFallback;

  var app = document.getElementById('app');
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) {
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var initial = function (s) { return (s.trim()[0] || 'A').toUpperCase(); };

  function backBtn() { return '<button class="back" data-go="back">‹ ' + T.back + '</button>'; }
  function rowHtml(route, ico, cls, pair) {
    return '<button class="row" data-go="' + route + '">' +
      '<span class="ico ' + cls + '">' + ico + '</span>' +
      '<span class="txt"><b>' + esc(pair[0]) + '</b><span>' + esc(pair[1]) + '</span></span>' +
      '<span class="chev">›</span></button>';
  }
  function linkBox(id) {
    return '<div class="linkbox"><code id="' + id + '"></code>' +
      '<button class="mini" data-copy="' + id + '">' + T.copyShort + '</button></div>' +
      '<button class="btn" data-share="' + id + '">' + T.share + '</button>' +
      '<button class="btn ghost" data-copy="' + id + '">' + T.copy + '</button>';
  }

  // --- экраны ---------------------------------------------------------------
  var SCREENS = {
    // продуктовая ссылка — общий лендинг
    home: function () {
      return '<div class="hero-c"><div class="ava lg">◈</div><h1>' + T.homeTitle + '</h1>' +
        '<p class="sub">' + esc(T.homeLead) + '</p>' +
        '<div class="badge">' + T.verified + '</div></div>' +
        '<div class="list">' +
          rowHtml('subscribe', '🔒', 'violet', T.homeSubs) +
          rowHtml('donate', '💸', 'pink', T.homeDonate) +
          rowHtml('partner', '🤝', 'blue', T.homePartner) +
        '</div>' +
        '<button class="btn" data-go="creator">' + T.homeCta + '</button>' +
        '<p class="foot">' + T.trust + '</p>';
    },

    // партнёрская ссылка — лендинг программы
    partner: function () {
      return backBtn() + '<div class="card"><h2>' + T.partnerTitle + '</h2>' +
        '<p class="sub">' + esc(T.partnerLead) + '</p>' +
        '<ol class="steps">' + T.partnerSteps.map(function (s) {
          return '<li><span>' + esc(s) + '</span></li>'; }).join('') + '</ol>' +
        '<button class="btn" data-go="creator-partner">' + T.partnerCta + '</button>' +
        '<ul class="facts">' + T.partnerFacts.map(function (f) {
          return '<li>' + esc(f) + '</li>'; }).join('') + '</ul></div>';
    },

    // ссылка на подписку — страница канала, куда приземляется читатель
    subscribe: function () {
      return backBtn() +
        '<div class="card"><div class="hero-c"><div class="ava lg round">' + initial(T.subChannel) + '</div>' +
          '<h1>' + esc(T.subChannel) + '</h1>' +
          '<p class="sub">' + esc(T.subAuthor) + ' · ' + T.subPrice + ' ' + T.subPeriod + '</p></div>' +
        '<p class="sub">' + esc(T.subLead) + '</p>' +
        '<ul class="bullets">' + T.subPerks.map(function (p) {
          return '<li><i>' + p[0] + '</i><span>' + esc(p[1]) + '</span></li>'; }).join('') + '</ul>' +
        '<button class="btn" data-act="subscribe">' + esc(T.subCta) + '</button>' +
        '<p class="caption">' + esc(T.subNote) + '</p></div>' +
        '<p class="foot">' + T.trust + '</p>';
    },

    // ссылка на донат — страница, куда приземляется читатель
    donate: function () {
      return backBtn() +
        '<div class="card"><div class="hero-c"><div class="ava lg round">' + initial(T.subAuthor) + '</div>' +
          '<h1>' + T.donTitle + '</h1>' +
          '<p class="sub">' + esc(T.donLead) + '</p></div>' +
        '<div class="seg" id="don-amounts"></div>' +
        '<input class="field" id="don-note" maxlength="80" placeholder="' + esc(T.donNotePh) + '">' +
        '<button class="btn" data-act="donate" id="don-cta"></button></div>' +
        '<p class="foot">' + T.trust + '</p>';
    },

    // кабинет автора
    creator: function () {
      return '<div class="hero"><div class="ava">' + initial(myName) + '</div>' +
        '<div class="who"><b>' + esc(myName) + '</b><span>' + T.cabSub + '</span></div></div>' +
        '<div class="list">' +
          rowHtml('creator-subs', '🔒', 'violet', T.cabSubs) +
          rowHtml('creator-donate', '💸', 'pink', T.cabDon) +
          rowHtml('creator-partner', '🤝', 'blue', T.cabPartner) +
        '</div><p class="foot">' + T.trust + '</p>';
    },

    'creator-subs': function () {
      return backBtn() + '<div class="card"><h2>' + esc(T.cabSubs[0]) + '</h2>' +
        '<p class="sub">' + esc(T.cabSubsLead) + '</p>' +
        '<div class="picks" id="channels"></div>' + linkBox('subs-link') + '</div>' +
        '<p class="caption">' + esc(T.cabSubsHint) + '</p>';
    },

    'creator-donate': function () {
      return backBtn() + '<div class="card"><h2>' + esc(T.cabDon[0]) + '</h2>' +
        '<p class="sub">' + esc(T.cabDonLead) + '</p>' +
        '<div class="seg" id="cab-amounts"></div>' +
        '<input class="field" id="cab-note" maxlength="60" placeholder="' + esc(T.cabDonNotePh) + '">' +
        linkBox('donate-link') + '</div>' +
        '<p class="caption">' + esc(T.cabDonHint) + '</p>';
    },

    'creator-partner': function () {
      return backBtn() + '<div class="card"><h2>' + esc(T.cabPartner[0]) + '</h2>' +
        '<p class="sub">' + esc(T.cabPartnerLead) + '</p>' + linkBox('partner-link') +
        '<ul class="facts">' + T.partnerFacts.map(function (f) {
          return '<li>' + esc(f) + '</li>'; }).join('') + '</ul></div>' +
        '<p class="caption">' + esc(T.cabPartnerHint) + '</p>';
    }
  };

  // --- маршрутизация --------------------------------------------------------
  var ALIAS = {
    product: 'home', product_ru: 'home', product_en: 'home',
    partner_ru: 'partner', partner_en: 'partner',
    subs: 'subscribe', subs_ru: 'subscribe', subs_en: 'subscribe',
    donate_ru: 'donate', donate_en: 'donate',
    cabinet: 'creator', dashboard: 'creator'
  };
  // у каждого экрана-точки входа есть своя страница, подэкраны кабинета живут в /creator/
  var FOLDER = {
    home: '', partner: 'partner/', subscribe: 'subscribe/', donate: 'donate/',
    creator: 'creator/', 'creator-subs': 'creator/', 'creator-donate': 'creator/',
    'creator-partner': 'creator/'
  };
  var ROOT = (function () {
    var p = location.pathname.replace(/index\.html$/, '');
    if (p.slice(-1) !== '/') p += '/';
    return p.replace(/(partner|subscribe|donate|creator)\/$/, '');
  })();
  var current = 'home';

  // адрес всегда соответствует открытому экрану, а не странице входа
  function syncUrl(name) {
    var hash = name.indexOf('creator-') === 0 ? '#' + name : '';
    try { history.replaceState(null, '', ROOT + FOLDER[name] + hash); } catch (e) {}
  }

  function render(name, push) {
    name = ALIAS[name] || name;
    if (!SCREENS[name]) name = 'home';
    current = name;
    app.innerHTML = SCREENS[name]();
    window.scrollTo(0, 0);
    if (push !== false) syncUrl(name);
    if (tg && tg.BackButton) { name === 'home' ? tg.BackButton.hide() : tg.BackButton.show(); }
    wire();
  }

  function goBack() {
    if (current.indexOf('creator-') === 0) return render('creator');
    if (current === 'creator') return render('home');
    render('home');
  }

  // --- ссылки автора --------------------------------------------------------
  var channel = 0, cabAmount = null;

  function refLink() { return base + '?start=ref' + me; }
  function subsLink() { return base + '?start=sub_' + T.cabChannels[channel][2] + '_' + me; }
  function donLink() {
    var q = base + '?start=donate_' + me + (cabAmount ? '_' + cabAmount : '');
    var note = document.getElementById('cab-note');
    var n = note ? note.value.trim() : '';
    return n ? q + '&text=' + encodeURIComponent(n) : q;
  }
  function setText(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }

  // --- служебное ------------------------------------------------------------
  var toastEl = document.getElementById('toast'), toastTimer;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 1800);
  }
  function haptic(kind) {
    if (!tg || !tg.HapticFeedback) return;
    kind === 'ok' ? tg.HapticFeedback.notificationOccurred('success') : tg.HapticFeedback.selectionChanged();
  }
  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } finally { document.body.removeChild(ta); }
    return Promise.resolve();
  }
  function segment(host, items, selected, label, onPick) {
    host.innerHTML = '';
    items.forEach(function (a) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = label(a);
      b.setAttribute('aria-pressed', String(a === selected));
      b.addEventListener('click', function () {
        selected = a;
        host.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        haptic(); onPick(a);
      });
      host.appendChild(b);
    });
  }
  function money(a) { return lang === 'ru' ? a + ' ' + T.donCur : T.donCur + a; }

  // --- обработчики после каждого рендера ------------------------------------
  function wire() {
    app.querySelectorAll('[data-go]').forEach(function (el) {
      el.addEventListener('click', function () {
        haptic();
        el.dataset.go === 'back' ? goBack() : render(el.dataset.go);
      });
    });

    app.querySelectorAll('[data-copy]').forEach(function (el) {
      el.addEventListener('click', function () {
        copy(document.getElementById(el.dataset.copy).textContent).then(function () {
          haptic('ok'); toast(T.copied);
        });
      });
    });

    var shareText = { 'subs-link': 'shareSubs', 'donate-link': 'shareDonate', 'partner-link': 'sharePartner' };
    app.querySelectorAll('[data-share]').forEach(function (el) {
      el.addEventListener('click', function () {
        var link = document.getElementById(el.dataset.share).textContent;
        var url = 'https://t.me/share/url?url=' + encodeURIComponent(link) +
                  '&text=' + encodeURIComponent(T[shareText[el.dataset.share]]);
        if (tg && tg.openTelegramLink) tg.openTelegramLink(url); else window.open(url, '_blank');
      });
    });

    // лендинг доната
    var donSeg = document.getElementById('don-amounts');
    if (donSeg) {
      var picked = T.donAmounts[1];
      var cta = document.getElementById('don-cta');
      var setCta = function (a) { cta.textContent = T.donCta + ' ' + money(a); };
      segment(donSeg, T.donAmounts, picked, money, function (a) { picked = a; setCta(a); });
      setCta(picked);
      cta.addEventListener('click', function () {
        haptic('ok'); toast(T.donDone);
        if (tg && tg.sendData) tg.sendData(JSON.stringify({
          action: 'donate', amount: picked, note: document.getElementById('don-note').value.trim() }));
      });
    }

    // лендинг подписки
    var subCta = app.querySelector('[data-act="subscribe"]');
    if (subCta) subCta.addEventListener('click', function () {
      haptic('ok'); toast(T.subDone);
      if (tg && tg.sendData) tg.sendData(JSON.stringify({ action: 'subscribe', channel: 'private' }));
    });

    // кабинет: подписка
    var channels = document.getElementById('channels');
    if (channels) {
      channels.innerHTML = '';
      T.cabChannels.forEach(function (c, i) {
        var b = document.createElement('button');
        b.className = 'pick'; b.type = 'button';
        b.setAttribute('aria-pressed', String(i === channel));
        b.innerHTML = '<span><b>' + esc(c[0]) + '</b><span>' + esc(c[1]) + '</span></span>';
        b.addEventListener('click', function () {
          channel = i;
          channels.querySelectorAll('.pick').forEach(function (x, j) {
            x.setAttribute('aria-pressed', String(j === i)); });
          haptic(); setText('subs-link', subsLink());
        });
        channels.appendChild(b);
      });
      setText('subs-link', subsLink());
    }

    // кабинет: донат
    var cabSeg = document.getElementById('cab-amounts');
    if (cabSeg) {
      var amounts = [null].concat(T.donAmounts.slice(1, 3));
      segment(cabSeg, amounts, cabAmount, function (a) { return a === null ? T.any : money(a); },
        function (a) { cabAmount = a; setText('donate-link', donLink()); });
      document.getElementById('cab-note').addEventListener('input', function () {
        setText('donate-link', donLink()); });
      setText('donate-link', donLink());
    }

    // кабинет: партнёрка
    setText('partner-link', refLink());
  }

  if (tg && tg.BackButton) tg.BackButton.onClick(goBack);
  window.addEventListener('hashchange', function () { render(location.hash.replace('#', ''), false); });

  var start = (tg && tg.initDataUnsafe && tg.initDataUnsafe.start_param) ||
              location.hash.replace('#', '') || window.APP_SCREEN || '';
  var pathScreen = (location.pathname.match(/(partner|subscribe|donate|creator)\/?$/) || [])[1];
  if (!start && pathScreen) start = pathScreen;
  render(start || 'home', false);
})();
