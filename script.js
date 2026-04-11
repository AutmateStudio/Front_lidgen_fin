document.addEventListener('DOMContentLoaded', () => {

    // ── 1. Sidebar Navigation ──
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            item.classList.add('active');
            document.getElementById(item.getAttribute('data-tab')).classList.add('active');
            closeSidebar();
        });
    });

    // ── 2. Mobile Hamburger ──
    const sidebar = document.querySelector('.sidebar');
    const hamburger = document.getElementById('hamburger');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    function openSidebar() {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('active');
    }
    function closeSidebar() {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
        });
    }
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // ── 3. Platform Tabs (Discovery) ──
    const platformTabs = document.querySelectorAll('.p-tab');
    const platformPlaceholder = document.getElementById('platform-placeholder');
    const discoveryContent = document.getElementById('discovery-content');
    const platformNames = {
        'Telegram': null,
        'VKontakte': 'VKontakte',
        'Instagram': 'Instagram',
        'Threads': 'Threads',
        'МАХ': 'МАХ',
        'Одноклассники': 'Одноклассники'
    };

    platformTabs.forEach(item => {
        item.addEventListener('click', () => {
            platformTabs.forEach(tab => {
                tab.classList.remove('active');
                tab.setAttribute('aria-selected', 'false');
            });
            item.classList.add('active');
            item.setAttribute('aria-selected', 'true');

            const name = item.textContent.trim();
            if (name === 'Telegram') {
                if (discoveryContent) discoveryContent.style.display = '';
                if (platformPlaceholder) platformPlaceholder.classList.remove('active');
            } else {
                if (discoveryContent) discoveryContent.style.display = 'none';
                if (platformPlaceholder) {
                    platformPlaceholder.textContent = 'Подключите ' + name + ', чтобы видеть результаты. Перейдите в «Каналы для поиска лидов».';
                    platformPlaceholder.classList.add('active');
                }
            }
        });
    });

    // ── 4. Discovery Mode Toggle (AI / Expert inline) ──
    const modeBtns = document.querySelectorAll('#funnel-mode .toggle-btn');
    const expertView = document.getElementById('expert-view');
    const autoView = document.getElementById('auto-view');
    const expertInlineView = document.getElementById('expert-inline-view');
    const expertActions = document.getElementById('expert-actions');

    if (expertView) expertView.style.display = 'none';
    if (autoView) autoView.style.display = 'block';
    if (expertInlineView) expertInlineView.style.display = 'none';
    if (expertActions) expertActions.style.display = 'none';

    function setDiscoveryMode(mode) {
        modeBtns.forEach(b => b.classList.remove('active'));
        const target = document.querySelector('#funnel-mode .toggle-btn[data-mode="' + mode + '"]');
        if (target) target.classList.add('active');

        if (mode === 'expert') {
            if (expertView) expertView.style.display = 'none';
            if (autoView) autoView.style.display = 'none';
            if (expertInlineView) expertInlineView.style.display = 'block';
            if (expertActions) expertActions.style.display = 'flex';
        } else {
            if (expertView) expertView.style.display = 'none';
            if (autoView) autoView.style.display = 'block';
            if (expertInlineView) expertInlineView.style.display = 'none';
            if (expertActions) expertActions.style.display = 'none';
        }
    }

    modeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            setDiscoveryMode(e.target.getAttribute('data-mode'));
        });
    });

    const switchToAiBtn = document.getElementById('switch-to-ai-btn');
    if (switchToAiBtn) {
        switchToAiBtn.addEventListener('click', () => setDiscoveryMode('auto'));
    }

    // ── 5. Inbox Toggle (Kanban / Classic) ──
    const inboxToggleBtns = document.querySelectorAll('#inbox-view-toggle .toggle-btn');
    const kanbanView = document.getElementById('kanban-view');
    const classicView = document.getElementById('classic-view');

    inboxToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            inboxToggleBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            if (e.target.getAttribute('data-view') === 'kanban') {
                kanbanView.style.display = 'flex';
                classicView.classList.remove('active');
            } else {
                kanbanView.style.display = 'none';
                classicView.classList.add('active');
            }
        });
    });

    // ── 6. Analytics Toggle ──
    const analyticsBtns = document.querySelectorAll('#analytics-toggle .toggle-btn');
    analyticsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            analyticsBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // ── 7. Classic Inbox Chat Selection ──
    const ciItems = document.querySelectorAll('.ci-item');
    ciItems.forEach(item => {
        item.addEventListener('click', () => {
            ciItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // ── 8. Toast System ──
    const toastContainer = document.getElementById('toast-container');

    function showToast(message, type, link) {
        type = type || 'success';
        const toast = document.createElement('div');
        toast.className = 'toast' + (type !== 'success' ? ' toast--' + type : '');

        const iconClass = 'toast-icon toast-icon--' + type;
        const iconSymbol = type === 'error' ? '✕' : '✓';

        let html = '<div class="' + iconClass + '">' + iconSymbol + '</div>';
        html += '<div><div class="toast-text">' + message + '</div>';
        if (link) {
            html += '<div class="toast-link" data-tab="' + link.tab + '">' + link.text + '</div>';
        }
        html += '</div>';

        toast.innerHTML = html;
        toastContainer.appendChild(toast);

        const toastLink = toast.querySelector('.toast-link');
        if (toastLink) {
            toastLink.addEventListener('click', () => {
                const tab = toastLink.getAttribute('data-tab');
                if (tab) {
                    const navItem = document.querySelector('.nav-item[data-tab="' + tab + '"]');
                    if (navItem) navItem.click();
                }
            });
        }

        setTimeout(() => toast.remove(), 3000);
    }

    // Toast bindings with contextual messages
    const toastMappings = {
        'Сценарий активирован!': { msg: 'Автоответ активен. Проверьте статус в Inbox.', link: { tab: 'inbox', text: 'Перейти в Inbox →' } },
        'Словарные правила обновлены!': { msg: 'Фильтры сохранены. Новые результаты появятся в течение минуты.' },
        'Профиль проекта успешно сохранен в ядро ИИ!': { msg: 'Профиль сохранён. Теперь настройте поиск лидов.', link: { tab: 'discovery', text: 'Перейти к поиску →' } }
    };

    document.querySelectorAll('.show-toast').forEach(btn => {
        btn.addEventListener('click', () => {
            const rawMsg = btn.getAttribute('data-msg') || 'Выполнено';
            const mapping = toastMappings[rawMsg];
            if (mapping) {
                showToast(mapping.msg, 'success', mapping.link);
            } else {
                showToast(rawMsg);
            }

            if (btn.classList.contains('btn-primary') || btn.classList.contains('btn-outline')) {
                btn.classList.add('btn-loading');
                setTimeout(() => btn.classList.remove('btn-loading'), 1200);
            }
        });
    });

    // ── 9. Cmd+K Modal ──
    const cmdModal = document.getElementById('cmd-modal-overlay');
    const cmdInput = document.querySelector('.cmd-input');
    const cmdItems = document.querySelectorAll('.cmd-item');
    const cmdNoResults = document.querySelector('.cmd-no-results');
    let cmdActiveIndex = -1;

    function openCmdModal() {
        cmdModal.classList.add('active');
        cmdInput.value = '';
        cmdItems.forEach(i => { i.classList.remove('hidden'); i.classList.remove('active'); });
        if (cmdNoResults) cmdNoResults.style.display = 'none';
        cmdActiveIndex = -1;
        setTimeout(() => cmdInput.focus(), 50);
    }
    function closeCmdModal() {
        cmdModal.classList.remove('active');
    }

    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            openCmdModal();
        }
        if (e.key === 'Escape' && cmdModal.classList.contains('active')) {
            closeCmdModal();
        }
    });

    cmdModal.addEventListener('click', (e) => {
        if (e.target === cmdModal) closeCmdModal();
    });

    const sidebarSearchBtn = document.getElementById('sidebar-search-btn');
    if (sidebarSearchBtn) {
        sidebarSearchBtn.addEventListener('click', openCmdModal);
    }

    // Cmd+K filtering
    if (cmdInput) {
        cmdInput.addEventListener('input', () => {
            const query = cmdInput.value.toLowerCase().trim();
            let visibleCount = 0;
            cmdActiveIndex = -1;
            cmdItems.forEach(item => {
                item.classList.remove('active');
                const text = item.textContent.toLowerCase();
                if (query === '' || text.includes(query)) {
                    item.classList.remove('hidden');
                    visibleCount++;
                } else {
                    item.classList.add('hidden');
                }
            });
            if (cmdNoResults) {
                cmdNoResults.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        });
    }

    // Cmd+K keyboard navigation
    if (cmdInput) {
        cmdInput.addEventListener('keydown', (e) => {
            const visible = Array.from(cmdItems).filter(i => !i.classList.contains('hidden'));
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                cmdActiveIndex = Math.min(cmdActiveIndex + 1, visible.length - 1);
                updateCmdHighlight(visible);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                cmdActiveIndex = Math.max(cmdActiveIndex - 1, 0);
                updateCmdHighlight(visible);
            } else if (e.key === 'Enter' && cmdActiveIndex >= 0 && visible[cmdActiveIndex]) {
                e.preventDefault();
                visible[cmdActiveIndex].click();
            }
        });
    }

    function updateCmdHighlight(visible) {
        cmdItems.forEach(i => i.classList.remove('active'));
        if (visible[cmdActiveIndex]) {
            visible[cmdActiveIndex].classList.add('active');
            visible[cmdActiveIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    // Cmd item click handlers
    cmdItems.forEach(item => {
        item.addEventListener('click', () => {
            const tab = item.getAttribute('data-nav');
            if (tab) {
                const navItem = document.querySelector('.nav-item[data-tab="' + tab + '"]');
                if (navItem) navItem.click();
            }
            closeCmdModal();
        });
    });

    // ── 10. Drag & Drop (Kanban) ──
    const kanbanCards = document.querySelectorAll('.kanban-card');
    const kanbanCols = document.querySelectorAll('.kanban-col');
    let draggedCard = null;

    kanbanCards.forEach(card => {
        card.addEventListener('dragstart', function () {
            draggedCard = this;
            setTimeout(() => this.classList.add('dragging'), 0);
        });
        card.addEventListener('dragend', function () {
            this.classList.remove('dragging');
            draggedCard = null;
            updateColCounts();
        });
    });

    kanbanCols.forEach(col => {
        col.addEventListener('dragover', function (e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });
        col.addEventListener('dragleave', function () {
            this.classList.remove('drag-over');
        });
        col.addEventListener('drop', function () {
            this.classList.remove('drag-over');
            if (draggedCard) {
                this.appendChild(draggedCard);
                showToast('Статус лида обновлён');
            }
        });
    });

    function updateColCounts() {
        kanbanCols.forEach(col => {
            const count = col.querySelectorAll('.kanban-card').length;
            col.querySelector('.col-count').textContent = count;
        });
    }

    // ── 11. Settings Form ──
    const settingsForm = document.getElementById('settings-form');
    const settingsSaveBtn = document.getElementById('settings-save');

    if (settingsForm && settingsSaveBtn) {
        const originalValues = {};
        settingsForm.querySelectorAll('input').forEach(input => {
            originalValues[input.name] = input.value;
        });
        settingsSaveBtn.disabled = true;

        settingsForm.addEventListener('input', () => {
            let changed = false;
            settingsForm.querySelectorAll('input').forEach(input => {
                if (input.value !== originalValues[input.name]) changed = true;
            });
            settingsSaveBtn.disabled = !changed;
        });
    }

    // ── 12. Prompt Cards (About page) ──
    document.querySelectorAll('.prompt-edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.prompt-card');
            const textarea = card.querySelector('.prompt-textarea');
            if (textarea.hasAttribute('readonly')) {
                textarea.removeAttribute('readonly');
                textarea.focus();
                btn.innerHTML = '<i data-lucide="check"></i> Сохранить';
                if (typeof lucide !== 'undefined') lucide.createIcons();
            } else {
                textarea.setAttribute('readonly', '');
                btn.innerHTML = '<i data-lucide="pencil"></i> Редактировать вручную';
                if (typeof lucide !== 'undefined') lucide.createIcons();
                showToast('Промпт сохранён');
            }
        });
    });

    document.querySelectorAll('.prompt-ai-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.prompt-card');
            const textarea = card.querySelector('.prompt-textarea');
            const improved = btn.getAttribute('data-improved');
            btn.classList.add('btn-loading');
            setTimeout(() => {
                btn.classList.remove('btn-loading');
                textarea.value = improved;
                textarea.setAttribute('readonly', '');
                const editBtn = card.querySelector('.prompt-edit-btn');
                if (editBtn) {
                    editBtn.innerHTML = '<i data-lucide="pencil"></i> Редактировать вручную';
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                }
                showToast('Промпт улучшен с помощью ИИ');
            }, 1500);
        });
    });

    // ── 13. Lead Dialog (Inbox) ──
    const leadDialogOverlay = document.getElementById('lead-dialog-overlay');
    const leadDialogName = leadDialogOverlay ? leadDialogOverlay.querySelector('.lead-dialog-name') : null;
    const leadDialogPlatform = leadDialogOverlay ? leadDialogOverlay.querySelector('.lead-dialog-platform') : null;
    const leadDialogCloseBtn = leadDialogOverlay ? leadDialogOverlay.querySelector('.lead-dialog-close') : null;
    const leadDialogExternalBtn = leadDialogOverlay ? leadDialogOverlay.querySelector('.lead-dialog-external') : null;
    const leadDialogSendBtn = leadDialogOverlay ? leadDialogOverlay.querySelector('.lead-dialog-send') : null;
    const leadDialogInput = leadDialogOverlay ? leadDialogOverlay.querySelector('.lead-dialog-input') : null;
    let wasDragged = false;

    function openLeadDialog(name, platformTag) {
        if (!leadDialogOverlay) return;
        if (leadDialogName) leadDialogName.textContent = name;
        if (leadDialogPlatform) {
            leadDialogPlatform.className = 'c-tag lead-dialog-platform';
            if (platformTag) {
                leadDialogPlatform.textContent = platformTag;
                const tagLower = platformTag.toLowerCase();
                if (tagLower.includes('telegram')) leadDialogPlatform.classList.add('c-tag--telegram');
                else if (tagLower.includes('vk')) leadDialogPlatform.classList.add('c-tag--vk');
                else if (tagLower.includes('insta')) leadDialogPlatform.classList.add('c-tag--instagram');
            }
        }
        leadDialogOverlay.classList.add('active');
    }
    function closeLeadDialog() {
        if (leadDialogOverlay) leadDialogOverlay.classList.remove('active');
    }

    if (leadDialogCloseBtn) leadDialogCloseBtn.addEventListener('click', closeLeadDialog);
    if (leadDialogOverlay) {
        leadDialogOverlay.addEventListener('click', (e) => {
            if (e.target === leadDialogOverlay) closeLeadDialog();
        });
    }
    if (leadDialogExternalBtn) {
        leadDialogExternalBtn.addEventListener('click', () => showToast('Открытие профиля лида...', 'info'));
    }
    if (leadDialogSendBtn && leadDialogInput) {
        leadDialogSendBtn.addEventListener('click', () => {
            if (leadDialogInput.value.trim()) {
                showToast('Сообщение отправлено!');
                leadDialogInput.value = '';
            }
        });
    }

    document.querySelectorAll('.kanban-card').forEach(card => {
        card.addEventListener('dragstart', () => { wasDragged = true; });
        card.addEventListener('click', (e) => {
            if (wasDragged) { wasDragged = false; return; }
            if (e.target.closest('.lead-link')) return;
            const name = card.querySelector('.card-title') ? card.querySelector('.card-title').textContent : 'Лид';
            const tagEl = card.querySelector('.c-tag:not(.c-tag--hot):not(.c-tag--success)');
            const platform = tagEl ? tagEl.textContent.trim() : '';
            openLeadDialog(name, platform);
        });
    });

    // ── 14. Lead Link Buttons ──
    document.querySelectorAll('.lead-link').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            showToast('Открытие профиля лида...', 'info');
        });
    });

    // ── 15. Team Page ──
    document.querySelectorAll('.team-role-select').forEach(select => {
        select.addEventListener('change', () => {
            showToast('Роль обновлена');
        });
    });

    // ── 16. Project Dropdown ──
    const projectDropdown = document.getElementById('project-dropdown');
    if (projectDropdown) {
        projectDropdown.addEventListener('change', function () {
            showToast('Проект изменен: ' + this.value, 'info');
        });
    }

    // ── 17. User Profile click (navigate to settings) ──
    const userProfile = document.querySelector('.user-profile[data-tab]');
    if (userProfile) {
        userProfile.addEventListener('click', () => {
            const tab = userProfile.getAttribute('data-tab');
            const navItem = document.querySelector('.nav-item[data-tab="' + tab + '"]');
            if (navItem) {
                navItem.click();
            } else {
                navItems.forEach(nav => nav.classList.remove('active'));
                tabContents.forEach(t => t.classList.remove('active'));
                const target = document.getElementById(tab);
                if (target) target.classList.add('active');
            }
        });
    }

    // ── 18. Expert Mode (Save / Reset) ──
    const expertSaveBtn = document.getElementById('expert-save-btn');
    const expertResetBtn = document.getElementById('expert-reset-btn');

    if (expertSaveBtn) {
        expertSaveBtn.addEventListener('click', function () {
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Сохраняем...';
            this.style.opacity = '0.8';
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.opacity = '1';
                showToast('Настройки эксперта успешно сохранены!');
            }, 800);
        });
    }

    if (expertResetBtn) {
        expertResetBtn.addEventListener('click', function () {
            if (confirm('Вы уверены, что хотите очистить все поля?')) {
                document.querySelectorAll('#expert-inline-view textarea.expert-field').forEach(ta => { ta.value = ''; });
                showToast('Форма очищена', 'info');
            }
        });
    }

    // ── 19. Подключённые каналы: данные в памяти, фильтры, пагинация (без перегрузки при 100+) ──
    (function initConnectedChannelManager() {
        const TG_NAMES = [
            'B2B Sales & Marketing', 'No-code RU Community', 'Клуб Внедренцев CRM', 'AI News RU', 'Стартап-чат Москва',
            'Предприниматели СПб', 'Маркетинг без сна', 'Интеграторы n8n', 'Лиды B2B', 'Чат автоматизации',
            'SaaS Founders', 'Product Management RU', 'DevOps Talks', 'Нейросети для бизнеса', 'Продажи и воронки'
        ];
        const VK_NAMES = [
            'Типичный Предприниматель', 'Бизнес-клуб Урал', 'Маркетологи России', 'E-commerce сообщество',
            'Фриланс и заказы', 'Digital-агентства', 'Коворкинги и офисы', 'Инвестиции и стартапы'
        ];
        const SUFFIXES = ['Chat', 'Community', 'Club', 'Hub', 'Группа', 'Чат', 'Канал'];

        function buildDemoChannels(count) {
            const list = [];
            let id = 0;
            for (let i = 0; i < count; i++) {
                const isVk = i % 6 === 0 || i % 11 === 0;
                const base = isVk
                    ? VK_NAMES[i % VK_NAMES.length]
                    : TG_NAMES[i % TG_NAMES.length];
                const name = i < TG_NAMES.length + VK_NAMES.length
                    ? base
                    : base + ' · ' + SUFFIXES[i % SUFFIXES.length] + ' #' + (i + 1);
                const members = 800 + Math.floor(Math.random() * 180000);
                const msgPerDay = 8 + Math.floor(Math.random() * 420);
                list.push({
                    id: 'ch-' + id++,
                    name: name,
                    platform: isVk ? 'vk' : 'telegram',
                    members: members,
                    msgPerDay: msgPerDay,
                    active: Math.random() > 0.18,
                    addedAt: Date.now() - i * 86400000 * (0.3 + Math.random() * 2)
                });
            }
            return list;
        }

        const channelsStore = buildDemoChannels(124);

        const els = {
            search: document.getElementById('connected-channel-search'),
            platform: document.getElementById('channel-filter-platform'),
            status: document.getElementById('channel-filter-status'),
            sort: document.getElementById('channel-sort'),
            pageSize: document.getElementById('channel-page-size'),
            viewToggle: document.getElementById('channel-view-toggle'),
            summary: document.getElementById('channel-list-summary'),
            mount: document.getElementById('channel-list-mount'),
            pagination: document.getElementById('channel-pagination'),
            badge: document.getElementById('channel-total-badge')
        };

        if (!els.mount || !els.pagination) return;

        const state = {
            page: 1,
            pageSize: 25,
            search: '',
            platform: 'all',
            status: 'all',
            sort: 'name-asc',
            view: 'cards'
        };

        function debounce(fn, ms) {
            let t;
            return function () {
                const args = arguments;
                clearTimeout(t);
                t = setTimeout(() => fn.apply(this, args), ms);
            };
        }

        function getFiltered() {
            let list = channelsStore.slice();
            const q = state.search.trim().toLowerCase();
            if (q) {
                list = list.filter(function (c) { return c.name.toLowerCase().indexOf(q) !== -1; });
            }
            if (state.platform !== 'all') {
                list = list.filter(function (c) { return c.platform === state.platform; });
            }
            if (state.status === 'active') {
                list = list.filter(function (c) { return c.active; });
            } else if (state.status === 'paused') {
                list = list.filter(function (c) { return !c.active; });
            }

            list.sort(function (a, b) {
                switch (state.sort) {
                    case 'name-asc': return a.name.localeCompare(b.name, 'ru');
                    case 'name-desc': return b.name.localeCompare(a.name, 'ru');
                    case 'members-desc': return b.members - a.members;
                    case 'activity-desc': return b.msgPerDay - a.msgPerDay;
                    case 'added-desc': return b.addedAt - a.addedAt;
                    case 'added-asc': return a.addedAt - b.addedAt;
                    default: return 0;
                }
            });
            return list;
        }

        function fmtNum(n) {
            return n.toLocaleString('ru-RU');
        }

        function iconPlatform(p) {
            if (p === 'vk') {
                return '<div class="icon-box icon-vk"><i class="fa-brands fa-vk"></i></div>';
            }
            return '<div class="icon-box icon-tg"><i class="fa-brands fa-telegram"></i></div>';
        }

        function renderCard(ch) {
            const statusBadge = ch.active
                ? '<span class="badge-inline badge-success">Активен</span>'
                : '<span class="badge-inline badge-gray">Пауза</span>';
            return (
                '<div class="channel-card" data-channel-id="' + ch.id + '">' +
                '<div class="channel-header">' +
                '<div class="channel-info">' + iconPlatform(ch.platform) +
                '<div><div class="channel-title">' + escapeHtml(ch.name) + '</div>' +
                '<div class="channel-meta">' +
                '<span><i class="fa-solid fa-users"></i> ' + fmtNum(ch.members) + '</span>' +
                '<span><i class="fa-solid fa-message"></i> ~' + fmtNum(ch.msgPerDay) + '/день</span>' +
                '</div></div></div>' +
                '<label class="switch">' +
                '<input type="checkbox" class="channel-active-toggle" data-id="' + ch.id + '"' + (ch.active ? ' checked' : '') + '>' +
                '<span class="slider"></span></label></div>' +
                '<div class="channel-footer">' + statusBadge +
                '<button type="button" class="btn btn-ghost channel-more-btn" style="padding: 4px 8px;" data-id="' + ch.id + '">' +
                '<i class="fa-solid fa-ellipsis"></i></button></div></div>'
            );
        }

        function renderRow(ch) {
            const plat = ch.platform === 'vk' ? 'VK' : 'Telegram';
            const statusBadge = ch.active
                ? '<span class="badge-inline badge-success">Активен</span>'
                : '<span class="badge-inline badge-gray">Пауза</span>';
            return (
                '<tr data-channel-id="' + ch.id + '">' +
                '<td>' + iconPlatform(ch.platform) + '</td>' +
                '<td class="cell-title">' + escapeHtml(ch.name) + '<div class="cell-meta">' + plat + '</div></td>' +
                '<td class="cell-meta">' + fmtNum(ch.members) + '</td>' +
                '<td class="cell-meta">~' + fmtNum(ch.msgPerDay) + '/д</td>' +
                '<td>' + statusBadge + '</td>' +
                '<td class="cell-actions">' +
                '<label class="switch"><input type="checkbox" class="channel-active-toggle" data-id="' + ch.id + '"' + (ch.active ? ' checked' : '') + '><span class="slider"></span></label> ' +
                '<button type="button" class="btn btn-ghost channel-more-btn" style="padding: 4px 8px;" data-id="' + ch.id + '"><i class="fa-solid fa-ellipsis"></i></button>' +
                '</td></tr>'
            );
        }

        function escapeHtml(s) {
            return String(s)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
        }

        function getVisiblePageNumbers(totalPages, current) {
            const delta = 2;
            const set = new Set();
            set.add(1);
            set.add(totalPages);
            for (let i = current - delta; i <= current + delta; i++) {
                if (i >= 1 && i <= totalPages) set.add(i);
            }
            return Array.from(set).sort(function (a, b) { return a - b; });
        }

        function renderPageButtons(totalPages) {
            if (totalPages <= 1) return '';

            const cur = state.page;
            const nums = getVisiblePageNumbers(totalPages, cur);
            const parts = [];
            let last = 0;
            for (let i = 0; i < nums.length; i++) {
                const p = nums[i];
                if (last && p - last > 1) {
                    parts.push('<span class="channel-page-ellipsis" aria-hidden="true">…</span>');
                }
                parts.push(
                    '<button type="button" class="channel-page-btn' + (p === cur ? ' is-active' : '') + '" data-page="' + p + '">' + p + '</button>'
                );
                last = p;
            }

            return (
                '<div class="channel-pagination-pages">' +
                '<button type="button" class="channel-page-btn" data-page="prev"' + (cur <= 1 ? ' disabled' : '') + '>Назад</button>' +
                parts.join('') +
                '<button type="button" class="channel-page-btn" data-page="next"' + (cur >= totalPages ? ' disabled' : '') + '>Вперёд</button>' +
                '</div>'
            );
        }

        function render() {
            const filtered = getFiltered();
            const total = filtered.length;
            const activeN = filtered.filter(function (c) { return c.active; }).length;
            const pausedN = total - activeN;

            if (els.badge) {
                els.badge.textContent = fmtNum(channelsStore.length) + ' каналов в проекте';
            }

            const totalPages = total === 0 ? 1 : Math.max(1, Math.ceil(total / state.pageSize));
            if (state.page > totalPages) state.page = totalPages;
            const start = (state.page - 1) * state.pageSize;
            const end = Math.min(start + state.pageSize, total);
            const pageItems = filtered.slice(start, end);

            if (els.summary) {
                let msg = 'По фильтрам: <strong>' + fmtNum(total) + '</strong> из ' + fmtNum(channelsStore.length) + ' · активных <strong>' + fmtNum(activeN) + '</strong>, на паузе <strong>' + fmtNum(pausedN) + '</strong>. ';
                if (total === 0) {
                    msg = 'Ничего не найдено. Измените поиск или фильтры.';
                } else {
                    msg += 'Показаны <strong>' + (start + 1) + '–' + end + '</strong> из ' + fmtNum(total) + ' (страница ' + state.page + ' из ' + totalPages + ').';
                }
                els.summary.innerHTML = msg;
            }

            if (total === 0) {
                els.mount.innerHTML =
                    '<div class="empty-state" style="padding: 48px 24px;">' +
                    '<p style="margin:0; font-size: 15px; color: var(--text-main);">Нет каналов по текущим условиям</p>' +
                    '<p style="margin: 8px 0 0; font-size: 14px;">Попробуйте сбросить фильтр статуса или очистить поиск.</p>' +
                    '</div>';
                els.pagination.innerHTML = '';
                if (typeof lucide !== 'undefined') lucide.createIcons();
                return;
            }

            if (state.view === 'cards') {
                els.mount.innerHTML =
                    '<div class="channel-grid channel-grid--cards">' +
                    pageItems.map(renderCard).join('') +
                    '</div>';
            } else {
                els.mount.innerHTML =
                    '<div class="channel-table-wrap">' +
                    '<table class="channel-table"><thead><tr>' +
                    '<th></th><th>Канал</th><th>Аудитория</th><th>Активность</th><th>Статус</th><th></th>' +
                    '</tr></thead><tbody>' +
                    pageItems.map(renderRow).join('') +
                    '</tbody></table></div>';
            }

            els.pagination.innerHTML =
                '<span class="text-sm" style="color: var(--text-muted);">' +
                'Страница ' + state.page + ' из ' + totalPages +
                '</span>' +
                renderPageButtons(totalPages);

            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        els.mount.addEventListener('change', function (e) {
            const t = e.target;
            if (!t.classList.contains('channel-active-toggle')) return;
            const id = t.getAttribute('data-id');
            const ch = channelsStore.find(function (c) { return c.id === id; });
            if (ch) {
                ch.active = t.checked;
                showToast(ch.active ? 'Канал включён' : 'Канал на паузе', ch.active ? 'success' : 'info');
                render();
            }
        });

        els.mount.addEventListener('click', function (e) {
            const btn = e.target.closest('.channel-more-btn');
            if (!btn) return;
            showToast('Меню канала (демо)', 'info');
        });

        els.pagination.addEventListener('click', function (e) {
            const btn = e.target.closest('.channel-page-btn');
            if (!btn) return;
            const filtered = getFiltered();
            const totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));

            const attr = btn.getAttribute('data-page');
            if (attr === 'prev') state.page = Math.max(1, state.page - 1);
            else if (attr === 'next') state.page = Math.min(totalPages, state.page + 1);
            else {
                const p = parseInt(attr, 10);
                if (!isNaN(p)) state.page = p;
            }
            render();
            els.mount.scrollTop = 0;
        });

        if (els.search) {
            els.search.addEventListener('input', debounce(function () {
                state.search = els.search.value;
                state.page = 1;
                render();
            }, 280));
        }
        ['platform', 'status', 'sort', 'pageSize'].forEach(function (key) {
            const el = els[key];
            if (!el) return;
            el.addEventListener('change', function () {
                if (key === 'platform') state.platform = el.value;
                if (key === 'status') state.status = el.value;
                if (key === 'sort') state.sort = el.value;
                if (key === 'pageSize') {
                    state.pageSize = parseInt(el.value, 10) || 25;
                }
                state.page = 1;
                render();
            });
        });

        if (els.viewToggle) {
            els.viewToggle.querySelectorAll('.toggle-btn').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    const v = btn.getAttribute('data-channel-view');
                    if (!v) return;
                    state.view = v;
                    els.viewToggle.querySelectorAll('.toggle-btn').forEach(function (b) { b.classList.remove('active'); });
                    btn.classList.add('active');
                    render();
                });
            });
        }

        render();
    })();


    // ── 21. Suggest Channel Modal ──
    const suggestModal = document.getElementById('suggest-channel-modal');
    const suggestOpenBtn = document.getElementById('suggest-channel-btn');
    const suggestCloseBtn = document.getElementById('suggest-modal-close');
    const suggestCancelBtn = document.getElementById('suggest-modal-cancel');
    const suggestSubmitBtn = document.getElementById('suggest-modal-submit');
    const suggestInput = document.getElementById('suggest-channel-input');

    function openSuggestModal() {
        if (suggestModal) suggestModal.classList.add('active');
    }
    function closeSuggestModal() {
        if (suggestModal) suggestModal.classList.remove('active');
    }

    if (suggestOpenBtn) suggestOpenBtn.addEventListener('click', openSuggestModal);
    if (suggestCloseBtn) suggestCloseBtn.addEventListener('click', closeSuggestModal);
    if (suggestCancelBtn) suggestCancelBtn.addEventListener('click', closeSuggestModal);
    if (suggestModal) {
        suggestModal.addEventListener('click', (e) => {
            if (e.target === suggestModal) closeSuggestModal();
        });
    }

    if (suggestSubmitBtn) {
        suggestSubmitBtn.addEventListener('click', () => {
            if (suggestInput && !suggestInput.value.trim()) {
                showToast('Пожалуйста, введите ссылку', 'error');
                return;
            }
            showToast('Канал отправлен на модерацию!');
            if (suggestInput) suggestInput.value = '';
            closeSuggestModal();
        });
    }

    // ── 22. Initialize Lucide Icons ──
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

});

// Global showToast for inline onclick handlers
function showToast(message, type) {
    type = type || 'success';
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast' + (type !== 'success' ? ' toast--' + type : '');

    const iconClass = 'toast-icon toast-icon--' + type;
    const iconSymbol = type === 'error' ? '✕' : '✓';

    toast.innerHTML = '<div class="' + iconClass + '">' + iconSymbol + '</div><div><div class="toast-text">' + message + '</div></div>';
    container.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
}
