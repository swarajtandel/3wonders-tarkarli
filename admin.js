/**
 * 3 Wonders Tarkarli — Owner Admin Panel Controller
 * Handles Authentication, Real-Time Price Modifications, Reviews CRUD, and Exporting.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // DOM Elements
    const lockScreen = document.getElementById('adminLockScreen');
    const adminApp = document.getElementById('adminApp');
    const loginForm = document.getElementById('adminLoginForm');
    const passInput = document.getElementById('adminPassInput');
    const lockErrorMsg = document.getElementById('lockErrorMsg');
    const pwdToggleBtn = document.getElementById('pwdToggleBtn');
    const logoutBtn = document.getElementById('adminLogoutBtn');

    // Modals
    const roomModalBackdrop = document.getElementById('roomModalBackdrop');
    const roomForm = document.getElementById('roomForm');
    const closeRoomModalBtn = document.getElementById('closeRoomModalBtn');
    const cancelRoomBtn = document.getElementById('cancelRoomBtn');
    const openAddRoomBtn = document.getElementById('openAddRoomBtn');

    const reviewModalBackdrop = document.getElementById('reviewModalBackdrop');
    const reviewForm = document.getElementById('reviewForm');
    const closeReviewModalBtn = document.getElementById('closeReviewModalBtn');
    const cancelReviewBtn = document.getElementById('cancelReviewBtn');
    const openAddReviewBtn = document.getElementById('openAddReviewBtn');

    // Toast Container
    const toastContainer = document.getElementById('adminToastContainer');

    // Utility: Show Floating Toast
    const showToast = (message, type = 'success') => {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = `admin-toast ${type}`;
        toast.innerHTML = `
            <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}" style="width:18px;height:18px;flex-shrink:0;"></i>
            <span>${escapeHtml(message)}</span>
        `;
        toastContainer.appendChild(toast);
        if (typeof lucide !== 'undefined') lucide.createIcons();

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    };

    const escapeHtml = (str) => {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };

    // ============================================================
    // AUTHENTICATION LOGIC
    // ============================================================
    const unlockSubmitBtn = document.getElementById('unlockSubmitBtn');

    const checkAuthState = () => {
        const authed = StorageManager && StorageManager.isLoggedIn && StorageManager.isLoggedIn();
        if (authed) {
            if (lockScreen) lockScreen.style.display = 'none';
            if (adminApp) adminApp.style.display = 'flex';
            renderAllData();
        } else {
            if (lockScreen) lockScreen.style.display = 'flex';
            if (adminApp) adminApp.style.display = 'none';
            if (passInput) setTimeout(() => passInput.focus(), 100);
        }
    };

    const attemptUnlock = () => {
        if (!passInput) return;
        const entered = (passInput.value || '').trim();
        const valid = (StorageManager && typeof StorageManager.verifyPassword === 'function' && StorageManager.verifyPassword(entered)) ||
                      (entered === 'admin3wonders');

        if (valid) {
            if (lockErrorMsg) lockErrorMsg.style.display = 'none';
            if (StorageManager && typeof StorageManager.setLoggedIn === 'function') {
                StorageManager.setLoggedIn(true);
            } else {
                sessionStorage.setItem('3wonders_admin_auth_session', 'true');
            }
            if (lockScreen) lockScreen.style.display = 'none';
            if (adminApp) adminApp.style.display = 'flex';
            renderAllData();
            showToast('Management Portal Unlocked.');
        } else {
            if (lockErrorMsg) {
                lockErrorMsg.style.display = 'block';
                lockErrorMsg.textContent = 'Passcode unrecognized. Default passcode is admin3wonders';
            }
            passInput.select();
            passInput.focus();
        }
    };

    if (pwdToggleBtn && passInput) {
        pwdToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isPassword = passInput.type === 'password';
            passInput.type = isPassword ? 'text' : 'password';
            pwdToggleBtn.innerHTML = isPassword ?
                '<i data-lucide="eye-off" style="width:16px;height:16px;"></i>' :
                '<i data-lucide="eye" style="width:16px;height:16px;"></i>';
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            attemptUnlock();
        });
    }

    if (unlockSubmitBtn) {
        unlockSubmitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            attemptUnlock();
        });
    }

    if (passInput) {
        passInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                attemptUnlock();
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (StorageManager && typeof StorageManager.setLoggedIn === 'function') {
                StorageManager.setLoggedIn(false);
            } else {
                sessionStorage.removeItem('3wonders_admin_auth_session');
            }
            showToast('Logged out securely.');
            setTimeout(() => location.reload(), 300);
        });
    }

    // ============================================================
    // TAB SWITCHING
    // ============================================================
    const tabButtons = document.querySelectorAll('.admin-tab-btn');
    const tabPanes = document.querySelectorAll('.admin-tab-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
                if (targetId === 'tabExport') {
                    renderExportPreview();
                }
            }
        });
    });

    // ============================================================
    // ROOMS & TARIFFS CRUD
    // ============================================================
    const roomsContainer = document.getElementById('adminRoomsContainer');
    const statRoomCount = document.getElementById('statRoomCount');
    const statMinPrice = document.getElementById('statMinPrice');
    const statMaxPrice = document.getElementById('statMaxPrice');

    const renderRooms = () => {
        const rooms = StorageManager.getRooms();

        // Update Statistics
        if (statRoomCount) statRoomCount.textContent = rooms.length;
        if (rooms.length > 0) {
            const prices = rooms.map(r => Number(r.price) || 0).filter(p => p > 0);
            const min = prices.length ? Math.min(...prices) : 0;
            const max = prices.length ? Math.max(...prices) : 0;
            if (statMinPrice) statMinPrice.textContent = `₹${min.toLocaleString('en-IN')}`;
            if (statMaxPrice) statMaxPrice.textContent = `₹${max.toLocaleString('en-IN')}`;
        }

        if (!roomsContainer) return;

        roomsContainer.innerHTML = rooms.map(room => {
            const currentPrice = Number(room.price) || 0;
            return `
                <div class="admin-room-item-card" data-room-id="${room.id}">
                    <div class="admin-room-item-media">
                        <img src="${room.image}" alt="${escapeHtml(room.name)}">
                        <span class="room-card-badge" style="position:absolute; top:1rem; left:1rem;">
                            ${escapeHtml(room.view || 'Resort View')}
                        </span>
                    </div>

                    <div class="admin-room-item-content">
                        <div>
                            <h3 class="admin-room-item-title">${escapeHtml(room.name)}</h3>
                            <p style="font-size:0.86rem; color:var(--color-text-muted); margin-top:0.35rem; line-height:1.5;">
                                ${escapeHtml(room.shortDesc || room.description)}
                            </p>
                        </div>

                        <!-- Nightly Price Quick Editor -->
                        <div class="admin-price-control-group">
                            <div class="admin-price-control-label">
                                <span>Nightly Rate (₹)</span>
                                <span style="font-size:0.72rem; color:var(--color-accent); font-weight:700;">Live On Site</span>
                            </div>

                            <div class="admin-price-input-row">
                                <span class="currency-symbol">₹</span>
                                <input type="number" class="admin-price-input" value="${currentPrice}" min="100" max="50000" step="50" id="input-price-${room.id}">
                                <button type="button" class="admin-step-btn" onclick="stepPrice('${room.id}', -100)" title="Decrease ₹100">-</button>
                                <button type="button" class="admin-step-btn" onclick="stepPrice('${room.id}', 100)" title="Increase ₹100">+</button>
                            </div>
                            <div style="font-size:0.75rem; color:var(--color-text-light); margin-top:0.4rem;">
                                Note: ${escapeHtml(room.priceNote || 'per night + taxes')}
                            </div>
                        </div>

                        <div class="admin-room-actions">
                            <button type="button" class="btn btn-book" style="padding:0.5rem 1rem; font-size:0.8rem; flex:1;" onclick="saveQuickPrice('${room.id}')">
                                <i data-lucide="check" style="width:14px;height:14px;"></i> Save Price
                            </button>
                            <button type="button" class="admin-icon-btn" onclick="openEditRoomModal('${room.id}')" title="Edit Full Details">
                                <i data-lucide="edit-3" style="width:16px;height:16px;"></i>
                            </button>
                            <button type="button" class="admin-icon-btn danger" onclick="deleteRoomItem('${room.id}')" title="Delete Room">
                                <i data-lucide="trash-2" style="width:16px;height:16px;"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        if (typeof lucide !== 'undefined') lucide.createIcons();
    };

    // Quick Price Stepper & Saver
    window.stepPrice = (roomId, delta) => {
        const input = document.getElementById(`input-price-${roomId}`);
        if (!input) return;
        let val = Number(input.value) || 0;
        val = Math.max(100, val + delta);
        input.value = val;
    };

    window.saveQuickPrice = (roomId) => {
        const input = document.getElementById(`input-price-${roomId}`);
        if (!input) return;
        const newPrice = Number(input.value);
        if (newPrice > 0) {
            StorageManager.updateRoomPrice(roomId, newPrice);
            const room = StorageManager.getRooms().find(r => r.id === roomId);
            showToast(`Price for "${room ? room.name : roomId}" updated to ₹${newPrice.toLocaleString('en-IN')}`);
            renderRooms();
            renderExportPreview();
        }
    };

    // Edit Room Modal
    window.openEditRoomModal = (roomId) => {
        const room = StorageManager.getRooms().find(r => r.id === roomId);
        if (!room) return;

        document.getElementById('roomModalTitle').textContent = 'Edit Room Details';
        document.getElementById('rf-id').value = room.id;
        document.getElementById('rf-name').value = room.name || '';
        document.getElementById('rf-price').value = room.price || 2800;
        document.getElementById('rf-priceNote').value = room.priceNote || 'per night + taxes';
        document.getElementById('rf-view').value = room.view || 'Sea View';
        document.getElementById('rf-image').value = room.image || 'photos/SEA VIEW DELUXE.jpeg';
        document.getElementById('rf-shortDesc').value = room.shortDesc || '';
        document.getElementById('rf-description').value = room.description || '';
        document.getElementById('rf-amenities').value = (room.amenities || []).join(', ');

        roomModalBackdrop.classList.add('active');
    };

    if (openAddRoomBtn) {
        openAddRoomBtn.addEventListener('click', () => {
            document.getElementById('roomModalTitle').textContent = 'Add New Room';
            document.getElementById('rf-id').value = '';
            document.getElementById('rf-name').value = '';
            document.getElementById('rf-price').value = '2500';
            document.getElementById('rf-priceNote').value = 'per night + taxes';
            document.getElementById('rf-view').value = 'Sea View';
            document.getElementById('rf-image').value = 'photos/SEA VIEW DELUXE.jpeg';
            document.getElementById('rf-shortDesc').value = '';
            document.getElementById('rf-description').value = '';
            document.getElementById('rf-amenities').value = 'Air Conditioning, TV, Wi-Fi, Attached Bathroom, Room Service';

            roomModalBackdrop.classList.add('active');
        });
    }

    const closeRoomModal = () => {
        roomModalBackdrop.classList.remove('active');
    };

    if (closeRoomModalBtn) closeRoomModalBtn.addEventListener('click', closeRoomModal);
    if (cancelRoomBtn) cancelRoomBtn.addEventListener('click', closeRoomModal);

    if (roomForm) {
        roomForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const existingId = document.getElementById('rf-id').value;
            const name = document.getElementById('rf-name').value.trim();
            const id = existingId || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            const price = Number(document.getElementById('rf-price').value) || 2500;
            const priceNote = document.getElementById('rf-priceNote').value.trim();
            const view = document.getElementById('rf-view').value;
            const image = document.getElementById('rf-image').value.trim() || 'photos/SEA VIEW DELUXE.jpeg';
            const shortDesc = document.getElementById('rf-shortDesc').value.trim();
            const description = document.getElementById('rf-description').value.trim();
            const amenitiesStr = document.getElementById('rf-amenities').value.trim();
            const amenities = amenitiesStr ? amenitiesStr.split(',').map(s => s.trim()).filter(Boolean) : [];

            const roomData = {
                id,
                name,
                price,
                priceUnit: 'night',
                priceNote,
                shortDesc,
                description,
                amenities,
                view,
                category: 'rooms',
                imgLabel: name,
                image
            };

            StorageManager.saveRoom(roomData);
            closeRoomModal();
            renderRooms();
            renderExportPreview();
            showToast(`Room "${name}" saved with tariff ₹${price.toLocaleString('en-IN')}`);
        });
    }

    window.deleteRoomItem = (roomId) => {
        const room = StorageManager.getRooms().find(r => r.id === roomId);
        const name = room ? room.name : roomId;
        if (confirm(`Are you sure you want to delete "${name}"? This will immediately remove it from your website.`)) {
            StorageManager.deleteRoom(roomId);
            renderRooms();
            renderExportPreview();
            showToast(`Room "${name}" deleted.`);
        }
    };

    // ============================================================
    // REVIEWS CRUD
    // ============================================================
    const reviewsContainer = document.getElementById('adminReviewsContainer');
    const statReviewCount = document.getElementById('statReviewCount');
    const statAvgRating = document.getElementById('statAvgRating');
    const stat5StarCount = document.getElementById('stat5StarCount');

    const renderReviews = () => {
        const reviews = StorageManager.getReviews();

        // Update Review Stats
        if (statReviewCount) statReviewCount.textContent = reviews.length;
        if (reviews.length > 0) {
            const sum = reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0);
            const avg = (sum / reviews.length).toFixed(1);
            if (statAvgRating) statAvgRating.textContent = `${avg} ★`;
            const fiveStars = reviews.filter(r => Number(r.rating) === 5).length;
            if (stat5StarCount) stat5StarCount.textContent = fiveStars;
        }

        if (!reviewsContainer) return;

        reviewsContainer.innerHTML = reviews.map(rev => {
            const stars = '★'.repeat(Math.min(5, Math.max(1, rev.rating || 5)));
            return `
                <div class="admin-review-card" data-review-id="${rev.id}">
                    <div class="admin-review-card-main">
                        <div class="admin-review-top-meta">
                            <span class="admin-review-stars" aria-label="${rev.rating} Stars">${stars}</span>
                            <span class="admin-review-author">${escapeHtml(rev.name || 'Verified Guest')}</span>
                            <span class="admin-review-source-tag">${escapeHtml(rev.source || 'Direct')}</span>
                            ${rev.date ? `<span class="admin-review-date">${escapeHtml(rev.date)}</span>` : ''}
                        </div>
                        <p class="admin-review-text">"${escapeHtml(rev.text)}"</p>
                    </div>

                    <div class="admin-review-card-actions">
                        <button type="button" class="admin-icon-btn" onclick="openEditReviewModal('${rev.id}')" title="Edit Review">
                            <i data-lucide="edit-3" style="width:16px;height:16px;"></i>
                        </button>
                        <button type="button" class="admin-icon-btn danger" onclick="deleteReviewItem('${rev.id}')" title="Delete Review">
                            <i data-lucide="trash-2" style="width:16px;height:16px;"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        if (typeof lucide !== 'undefined') lucide.createIcons();
    };

    window.openEditReviewModal = (reviewId) => {
        const rev = StorageManager.getReviews().find(r => r.id === reviewId);
        if (!rev) return;

        document.getElementById('reviewModalTitle').textContent = 'Edit Guest Review';
        document.getElementById('rev-id').value = rev.id;
        document.getElementById('rev-name').value = rev.name || '';
        document.getElementById('rev-rating').value = String(rev.rating || 5);
        document.getElementById('rev-source').value = rev.source || 'Google Review';
        document.getElementById('rev-date').value = rev.date || '';
        document.getElementById('rev-text').value = rev.text || '';

        reviewModalBackdrop.classList.add('active');
    };

    if (openAddReviewBtn) {
        openAddReviewBtn.addEventListener('click', () => {
            document.getElementById('reviewModalTitle').textContent = 'Add New Review';
            document.getElementById('rev-id').value = '';
            document.getElementById('rev-name').value = '';
            document.getElementById('rev-rating').value = '5';
            document.getElementById('rev-source').value = 'Google Review';
            document.getElementById('rev-date').value = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            document.getElementById('rev-text').value = '';

            reviewModalBackdrop.classList.add('active');
        });
    }

    const closeReviewModal = () => {
        reviewModalBackdrop.classList.remove('active');
    };

    if (closeReviewModalBtn) closeReviewModalBtn.addEventListener('click', closeReviewModal);
    if (cancelReviewBtn) cancelReviewBtn.addEventListener('click', closeReviewModal);

    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const existingId = document.getElementById('rev-id').value;
            const name = document.getElementById('rev-name').value.trim();
            const rating = Number(document.getElementById('rev-rating').value) || 5;
            const source = document.getElementById('rev-source').value.trim();
            const date = document.getElementById('rev-date').value.trim();
            const text = document.getElementById('rev-text').value.trim();

            if (existingId) {
                StorageManager.updateReview(existingId, { name, rating, source, date, text });
                showToast(`Review by "${name}" updated.`);
            } else {
                StorageManager.addReview({ name, rating, source, date, text });
                showToast(`New review by "${name}" published.`);
            }

            closeReviewModal();
            renderReviews();
            renderExportPreview();
        });
    }

    window.deleteReviewItem = (reviewId) => {
        const rev = StorageManager.getReviews().find(r => r.id === reviewId);
        const name = rev ? rev.name : 'Review';
        if (confirm(`Delete review from "${name}"? It will be removed immediately from your homepage.`)) {
            StorageManager.deleteReview(reviewId);
            renderReviews();
            renderExportPreview();
            showToast(`Review from "${name}" deleted.`);
        }
    };

    // ============================================================
    // EXPORT & CODE GENERATOR
    // ============================================================
    const previewEl = document.getElementById('dataJsCodePreview');
    const downloadBtn = document.getElementById('downloadDataJsBtn');
    const copyBtn = document.getElementById('copyDataJsBtn');

    const renderExportPreview = () => {
        if (!previewEl) return;
        const code = StorageManager.generateExportCode();
        previewEl.textContent = code;
    };

    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const code = StorageManager.generateExportCode();
            const blob = new Blob([code], { type: 'text/javascript;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.js';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showToast('data.js downloaded! Replace your file and deploy.');
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const code = StorageManager.generateExportCode();
            navigator.clipboard.writeText(code).then(() => {
                showToast('data.js code copied to clipboard!');
            }).catch(() => {
                showToast('Please copy code manually from preview.', 'error');
            });
        });
    }

    // ============================================================
    // SETTINGS: CHANGE PASSWORD & FACTORY RESET
    // ============================================================
    const changePassForm = document.getElementById('changePasswordForm');
    const resetDefaultsBtn = document.getElementById('resetDefaultsBtn');

    if (changePassForm) {
        changePassForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const curr = document.getElementById('currPassInput').value;
            const newP = document.getElementById('newPassInput').value;

            if (!StorageManager.verifyPassword(curr)) {
                alert('Current password incorrect!');
                document.getElementById('currPassInput').focus();
                return;
            }

            if (newP.length < 4) {
                alert('New password must be at least 4 characters.');
                return;
            }

            StorageManager.setAdminPassword(newP);
            changePassForm.reset();
            showToast('Master password successfully updated!');
        });
    }

    if (resetDefaultsBtn) {
        resetDefaultsBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all tariffs and reviews to factory default values? All custom local modifications will be removed.')) {
                StorageManager.resetDefaults();
                renderAllData();
                showToast('Restored original factory default data.');
            }
        });
    }

    // Master render function
    const renderAllData = () => {
        renderRooms();
        renderReviews();
        renderExportPreview();
    };

    // Initial check
    checkAuthState();
});
