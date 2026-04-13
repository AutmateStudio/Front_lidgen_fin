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
    const leadDialogOpenChatBtn = leadDialogOverlay ? leadDialogOverlay.querySelector('.lead-dialog-open-chat') : null;
    const leadDialogTags = leadDialogOverlay ? leadDialogOverlay.querySelector('.lead-dialog-tags') : null;
    const leadDialogTagInput = leadDialogOverlay ? leadDialogOverlay.querySelector('.lead-dialog-tag-input') : null;
    const leadDialogAddTagBtn = leadDialogOverlay ? leadDialogOverlay.querySelector('.lead-dialog-add-tag') : null;
    const leadDialogNotes = leadDialogOverlay ? leadDialogOverlay.querySelector('.lead-dialog-notes') : null;
    const leadDialogSaveNotesBtn = leadDialogOverlay ? leadDialogOverlay.querySelector('.lead-dialog-save-notes') : null;
    const leadDialogClearNotesBtn = leadDialogOverlay ? leadDialogOverlay.querySelector('.lead-dialog-clear-notes') : null;
    const leadDialogSeedTags = ['Новый', 'Требует ответа', 'Квалификация'];
    const leadProfiles = {};
    let currentLeadKey = '';
    let currentLeadChatUrl = '';
    let currentLeadPlatformLabel = '';
    let wasDragged = false;

    function toLeadKey(name, platformTag) {
        return (name + '::' + platformTag).toLowerCase();
    }

    function normalizeTag(tag) {
        return String(tag || '').replace(/\s+/g, ' ').trim();
    }

    function leadEscapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function buildLeadChatUrl(platformTag) {
        const platform = String(platformTag || '').toLowerCase();
        if (platform.indexOf('telegram') !== -1) return 'https://t.me/';
        if (platform.indexOf('vk') !== -1) return 'https://vk.com/im';
        if (platform.indexOf('insta') !== -1 || platform.indexOf('instagram') !== -1) return 'https://www.instagram.com/direct/inbox/';
        return '';
    }

    function renderLeadTags() {
        if (!leadDialogTags || !currentLeadKey || !leadProfiles[currentLeadKey]) return;
        const tags = leadProfiles[currentLeadKey].tags || [];
        if (!tags.length) {
            leadDialogTags.innerHTML = '<span class="lead-dialog-empty">Добавьте хотя бы один тег для классификации лида.</span>';
            return;
        }

        leadDialogTags.innerHTML = tags.map(tag => (
            '<span class="lead-dialog-tag-chip">' +
            '<span>' + leadEscapeHtml(tag) + '</span>' +
            '<button type="button" class="lead-dialog-tag-remove" data-tag="' + leadEscapeHtml(tag) + '" aria-label="Удалить тег">×</button>' +
            '</span>'
        )).join('');
    }

    function ensureLeadProfile(name, platformTag, seedTags) {
        const key = toLeadKey(name, platformTag);
        const preparedTags = (seedTags || [])
            .map(normalizeTag)
            .filter(Boolean);

        if (!leadProfiles[key]) {
            const uniqueTags = Array.from(new Set(leadDialogSeedTags.concat(preparedTags)));
            leadProfiles[key] = { tags: uniqueTags, notes: '' };
        } else if (preparedTags.length) {
            const merged = leadProfiles[key].tags.concat(preparedTags);
            leadProfiles[key].tags = Array.from(new Set(merged.map(normalizeTag).filter(Boolean)));
        }
        return key;
    }

    function openLeadDialog(name, platformTag, seedTags) {
        if (!leadDialogOverlay) return;
        if (leadDialogName) leadDialogName.textContent = name;
        currentLeadPlatformLabel = platformTag || 'платформе';
        currentLeadChatUrl = buildLeadChatUrl(platformTag);
        currentLeadKey = ensureLeadProfile(name, platformTag, seedTags);

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

        if (leadDialogNotes) {
            leadDialogNotes.value = leadProfiles[currentLeadKey].notes || '';
        }
        if (leadDialogTagInput) {
            leadDialogTagInput.value = '';
        }
        renderLeadTags();
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
    if (leadDialogOpenChatBtn) {
        leadDialogOpenChatBtn.addEventListener('click', () => {
            if (!currentLeadChatUrl) {
                showToast('Платформа чата для лида не определена', 'error');
                return;
            }
            window.open(currentLeadChatUrl, '_blank', 'noopener,noreferrer');
            showToast('Переход в чат на ' + currentLeadPlatformLabel, 'info');
        });
    }
    if (leadDialogAddTagBtn && leadDialogTagInput) {
        leadDialogAddTagBtn.addEventListener('click', () => {
            const tag = normalizeTag(leadDialogTagInput.value);
            if (!tag || !currentLeadKey) return;
            const tags = leadProfiles[currentLeadKey].tags;
            if (tags.indexOf(tag) !== -1) {
                showToast('Такой тег уже добавлен', 'info');
                return;
            }
            tags.push(tag);
            leadDialogTagInput.value = '';
            renderLeadTags();
        });
        leadDialogTagInput.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            e.preventDefault();
            leadDialogAddTagBtn.click();
        });
    }
    if (leadDialogTags) {
        leadDialogTags.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.lead-dialog-tag-remove');
            if (!removeBtn || !currentLeadKey) return;
            const rawTag = normalizeTag(removeBtn.getAttribute('data-tag'));
            leadProfiles[currentLeadKey].tags = leadProfiles[currentLeadKey].tags.filter(tag => tag !== rawTag);
            renderLeadTags();
        });
    }
    if (leadDialogSaveNotesBtn && leadDialogNotes) {
        leadDialogSaveNotesBtn.addEventListener('click', () => {
            if (!currentLeadKey) return;
            leadProfiles[currentLeadKey].notes = leadDialogNotes.value.trim();
            showToast('Заметка сохранена');
        });
    }
    if (leadDialogClearNotesBtn && leadDialogNotes) {
        leadDialogClearNotesBtn.addEventListener('click', () => {
            leadDialogNotes.value = '';
            if (currentLeadKey) {
                leadProfiles[currentLeadKey].notes = '';
            }
            showToast('Заметка очищена', 'info');
        });
    }

    document.querySelectorAll('.kanban-card').forEach(card => {
        card.addEventListener('dragstart', () => { wasDragged = true; });
        card.addEventListener('click', (e) => {
            if (wasDragged) { wasDragged = false; return; }
            if (e.target.closest('.lead-link')) return;
            const name = card.querySelector('.card-title') ? card.querySelector('.card-title').textContent : 'Лид';
            const tagEl = card.querySelector('.c-tag--telegram, .c-tag--vk, .c-tag--instagram');
            const platform = tagEl ? tagEl.textContent.trim() : '';
            const extraTags = Array.from(card.querySelectorAll('.card-tags .c-tag'))
                .filter(tag => !tag.classList.contains('c-tag--telegram') && !tag.classList.contains('c-tag--vk') && !tag.classList.contains('c-tag--instagram'))
                .map(tag => normalizeTag(tag.textContent));
            openLeadDialog(name, platform, extraTags);
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
                const addedAt = Date.now() - i * 86400000 * (0.3 + Math.random() * 2);
                const daysActive = Math.max(1, Math.floor((Date.now() - addedAt) / 86400000));
                const messagesProcessed = daysActive * msgPerDay + Math.floor(Math.random() * 500);
                const leadsFound = Math.floor(messagesProcessed * (0.002 + Math.random() * 0.06));
                list.push({
                    id: 'ch-' + id++,
                    name: name,
                    platform: isVk ? 'vk' : 'telegram',
                    members: members,
                    msgPerDay: msgPerDay,
                    active: Math.random() > 0.18,
                    addedAt: addedAt,
                    daysActive: daysActive,
                    messagesProcessed: messagesProcessed,
                    leadsFound: leadsFound
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

        function getConversion(ch) {
            if (!ch.messagesProcessed) return 0;
            return (ch.leadsFound / ch.messagesProcessed) * 100;
        }

        function convColor(pct) {
            if (pct >= 3) return 'green';
            if (pct >= 1) return 'yellow';
            return 'red';
        }

        function renderStatsRow(ch) {
            var conv = getConversion(ch);
            var color = convColor(conv);
            return (
                '<div class="channel-stats-row">' +
                '<span class="ch-stat-chip"><i class="fa-solid fa-calendar-days"></i> ' + ch.daysActive + ' дн.</span>' +
                '<span class="ch-stat-chip"><i class="fa-solid fa-envelope-open-text"></i> ' + fmtNum(ch.messagesProcessed) + '</span>' +
                '<span class="ch-stat-chip"><i class="fa-solid fa-user-check"></i> ' + fmtNum(ch.leadsFound) + '</span>' +
                '<span class="ch-stat-chip ch-conv-chip ch-conv-chip--' + color + '"><i class="fa-solid fa-percent"></i> ' + conv.toFixed(1) + '%</span>' +
                '</div>'
            );
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
                renderStatsRow(ch) +
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
            var conv = getConversion(ch);
            var color = convColor(conv);
            return (
                '<tr data-channel-id="' + ch.id + '" style="cursor:pointer;">' +
                '<td>' + iconPlatform(ch.platform) + '</td>' +
                '<td class="cell-title">' + escapeHtml(ch.name) + '<div class="cell-meta">' + plat + '</div></td>' +
                '<td class="cell-meta">' + fmtNum(ch.members) + '</td>' +
                '<td class="cell-meta">~' + fmtNum(ch.msgPerDay) + '/д</td>' +
                '<td class="cell-meta">' + ch.daysActive + ' дн.</td>' +
                '<td class="cell-meta">' + fmtNum(ch.messagesProcessed) + '</td>' +
                '<td class="cell-meta">' + fmtNum(ch.leadsFound) + '</td>' +
                '<td><span class="ch-conv-chip ch-conv-chip--' + color + '" style="font-size:12px; padding:3px 8px; border-radius:6px;">' + conv.toFixed(1) + '%</span></td>' +
                '<td>' + statusBadge + '</td>' +
                '<td class="cell-actions">' +
                '<label class="switch"><input type="checkbox" class="channel-active-toggle" data-id="' + ch.id + '"' + (ch.active ? ' checked' : '') + '><span class="slider"></span></label> ' +
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
                    '<th></th><th>Канал</th><th>Аудитория</th><th>Сообщ./день</th><th>Дней</th><th>Обработано</th><th>Лиды</th><th>Конв.</th><th>Статус</th><th></th>' +
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

        // Channel detail modal
        var cdOverlay = document.getElementById('channel-detail-overlay');
        var cdClose = document.getElementById('cd-close');
        var cdPauseBtn = document.getElementById('cd-pause-btn');
        var cdGotoLeads = document.getElementById('cd-goto-leads');
        var currentDetailChannel = null;

        function openChannelDetail(ch) {
            if (!cdOverlay || !ch) return;
            currentDetailChannel = ch;

            document.getElementById('cd-name').textContent = ch.name;
            document.getElementById('cd-platform').textContent = ch.platform === 'vk' ? 'VKontakte' : 'Telegram';

            var iconEl = document.getElementById('cd-icon');
            iconEl.className = 'icon-box ' + (ch.platform === 'vk' ? 'icon-vk' : 'icon-tg');
            iconEl.innerHTML = ch.platform === 'vk' ? '<i class="fa-brands fa-vk"></i>' : '<i class="fa-brands fa-telegram"></i>';

            var statusBadge = document.getElementById('cd-status-badge');
            if (ch.active) {
                statusBadge.className = 'badge-inline badge-success';
                statusBadge.textContent = 'Активен';
            } else {
                statusBadge.className = 'badge-inline badge-gray';
                statusBadge.textContent = 'Пауза';
            }

            document.getElementById('cd-days').textContent = ch.daysActive;
            document.getElementById('cd-messages').textContent = fmtNum(ch.messagesProcessed);
            document.getElementById('cd-leads').textContent = fmtNum(ch.leadsFound);

            var conv = getConversion(ch);
            var color = convColor(conv);
            document.getElementById('cd-conversion').textContent = conv.toFixed(1) + '%';

            var convIcon = document.getElementById('cd-conv-icon');
            if (color === 'green') {
                convIcon.style.background = '#dcfce7';
                convIcon.style.color = '#166534';
            } else if (color === 'yellow') {
                convIcon.style.background = '#fef3c7';
                convIcon.style.color = '#92400e';
            } else {
                convIcon.style.background = '#fee2e2';
                convIcon.style.color = '#991b1b';
            }

            var convLabel = document.getElementById('cd-conv-label');
            convLabel.textContent = conv.toFixed(1) + '%';
            convLabel.style.color = color === 'green' ? '#166534' : color === 'yellow' ? '#92400e' : '#991b1b';

            var fill = document.getElementById('cd-conv-fill');
            var fillWidth = Math.min(conv * 10, 100);
            fill.style.width = fillWidth + '%';
            fill.className = 'cd-conv-fill cd-conv-fill--' + color;

            document.getElementById('cd-members').textContent = fmtNum(ch.members);
            document.getElementById('cd-msgperday').textContent = '~' + fmtNum(ch.msgPerDay) + '/день';

            var addedDate = new Date(ch.addedAt);
            document.getElementById('cd-added').textContent = addedDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });

            cdPauseBtn.innerHTML = ch.active
                ? '<i class="fa-solid fa-pause"></i> Поставить на паузу'
                : '<i class="fa-solid fa-play"></i> Включить';

            cdOverlay.classList.add('active');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        function closeChannelDetail() {
            if (cdOverlay) cdOverlay.classList.remove('active');
            currentDetailChannel = null;
        }

        if (cdClose) cdClose.addEventListener('click', closeChannelDetail);
        if (cdOverlay) {
            cdOverlay.addEventListener('click', function (e) {
                if (e.target === cdOverlay) closeChannelDetail();
            });
        }
        if (cdPauseBtn) {
            cdPauseBtn.addEventListener('click', function () {
                if (!currentDetailChannel) return;
                currentDetailChannel.active = !currentDetailChannel.active;
                showToast(currentDetailChannel.active ? 'Канал включён' : 'Канал на паузе', currentDetailChannel.active ? 'success' : 'info');
                render();
                openChannelDetail(currentDetailChannel);
            });
        }
        if (cdGotoLeads) {
            cdGotoLeads.addEventListener('click', function () {
                closeChannelDetail();
                var navItem = document.querySelector('.nav-item[data-tab="inbox"]');
                if (navItem) navItem.click();
            });
        }

        els.mount.addEventListener('click', function (e) {
            if (e.target.closest('.channel-active-toggle') || e.target.closest('.switch')) return;

            var card = e.target.closest('.channel-card');
            var row = e.target.closest('tr[data-channel-id]');
            var target = card || row;
            if (!target) return;

            var chId = target.getAttribute('data-channel-id');
            var ch = channelsStore.find(function (c) { return c.id === chId; });
            if (ch) openChannelDetail(ch);
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


    // ── 20. Manual Channel Input (Discovery Expert Mode) ──
    (function initManualChannelInput() {
        const urlInput = document.getElementById('manual-channel-url');
        const addBtn = document.getElementById('manual-channel-add-btn');
        const listEl = document.getElementById('manual-channels-list');
        const platformBtns = document.querySelectorAll('.manual-platform-btn');
        const tagBtns = document.querySelectorAll('.manual-tag-btn');

        if (!urlInput || !addBtn || !listEl) return;

        let selectedPlatform = 'telegram';
        const manualChannels = [];

        platformBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('disabled')) return;
                platformBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedPlatform = btn.getAttribute('data-platform');
                updatePlaceholder();
            });
        });

        function updatePlaceholder() {
            if (selectedPlatform === 'vk') {
                urlInput.placeholder = 'https://vk.com/group_name';
            } else {
                urlInput.placeholder = 'https://t.me/channel_name';
            }
        }

        tagBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                urlInput.value = btn.getAttribute('data-url');
                urlInput.focus();
            });
        });

        function detectPlatform(url) {
            if (/t\.me|telegram/i.test(url)) return 'telegram';
            if (/vk\.com|vkontakte/i.test(url)) return 'vk';
            return selectedPlatform;
        }

        function extractName(url) {
            let cleaned = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
            const match = cleaned.match(/(?:t\.me|vk\.com)\/(.+)/);
            if (match) return match[1].replace(/[?#].*$/, '');
            return cleaned;
        }

        function escapeHtml(s) {
            return String(s)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
        }

        function addChannel() {
            const rawUrl = urlInput.value.trim();
            if (!rawUrl) {
                showToast('Вставьте ссылку на канал или группу', 'error');
                urlInput.focus();
                return;
            }

            const platform = detectPlatform(rawUrl);
            const name = extractName(rawUrl);

            if (manualChannels.some(c => c.url === rawUrl)) {
                showToast('Этот канал уже добавлен', 'info');
                return;
            }

            const ch = { id: 'mc-' + Date.now(), url: rawUrl, name: name, platform: platform };
            manualChannels.push(ch);
            renderList();
            urlInput.value = '';
            showToast('Канал «' + name + '» добавлен в парсинг!');

            platformBtns.forEach(b => b.classList.remove('active'));
            const matchBtn = document.querySelector('.manual-platform-btn[data-platform="' + platform + '"]');
            if (matchBtn) matchBtn.classList.add('active');
            selectedPlatform = platform;
        }

        function removeChannel(id) {
            const idx = manualChannels.findIndex(c => c.id === id);
            if (idx !== -1) {
                const removed = manualChannels.splice(idx, 1)[0];
                showToast('Канал «' + removed.name + '» удалён', 'info');
                renderList();
            }
        }

        function renderList() {
            if (manualChannels.length === 0) {
                listEl.innerHTML = '';
                return;
            }

            listEl.innerHTML = manualChannels.map(ch => {
                const iconClass = ch.platform === 'vk' ? 'icon-vk' : 'icon-tg';
                const iconFA = ch.platform === 'vk' ? 'fa-brands fa-vk' : 'fa-brands fa-telegram';
                return (
                    '<div class="manual-channel-item" data-id="' + ch.id + '">' +
                    '<div class="icon-box ' + iconClass + '"><i class="' + iconFA + '"></i></div>' +
                    '<div class="manual-channel-item-info">' +
                    '<div class="manual-channel-item-name">' + escapeHtml(ch.name) + '</div>' +
                    '<div class="manual-channel-item-url">' + escapeHtml(ch.url) + '</div>' +
                    '</div>' +
                    '<span class="manual-channel-item-status badge-inline badge-success">На парсинге</span>' +
                    '<button type="button" class="manual-channel-remove-btn" data-id="' + ch.id + '" title="Удалить">' +
                    '<i class="fa-solid fa-xmark"></i></button>' +
                    '</div>'
                );
            }).join('');
        }

        addBtn.addEventListener('click', addChannel);
        urlInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') { e.preventDefault(); addChannel(); }
        });

        urlInput.addEventListener('paste', () => {
            setTimeout(() => {
                const val = urlInput.value.trim();
                if (val) {
                    const detected = detectPlatform(val);
                    platformBtns.forEach(b => b.classList.remove('active'));
                    const matchBtn = document.querySelector('.manual-platform-btn[data-platform="' + detected + '"]');
                    if (matchBtn) matchBtn.classList.add('active');
                    selectedPlatform = detected;
                }
            }, 50);
        });

        listEl.addEventListener('click', e => {
            const btn = e.target.closest('.manual-channel-remove-btn');
            if (!btn) return;
            removeChannel(btn.getAttribute('data-id'));
        });
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
