/**
 * 3 Wonders Tarkarli — Core Application Logic
 * Handles UI interactions, data injection, and animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons
    lucide.createIcons();

    // 2. DOM Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavClose = document.getElementById('mobileNavClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    
    const roomsShowcase = document.getElementById('roomsShowcase');
    const roomModal = document.getElementById('roomModal');
    const roomModalBackdrop = document.getElementById('roomModalBackdrop');
    const roomModalClose = document.getElementById('roomModalClose');
    const roomModalBody = document.getElementById('roomModalBody');

    const amenitiesGrid = document.getElementById('amenitiesGrid');
    const experiencesGrid = document.getElementById('experiencesGrid');
    const attractionsGrid = document.getElementById('attractionsGrid');
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    const reviewsCarousel = document.getElementById('reviewsCarousel');

    // Forms
    const bookingForm = document.getElementById('bookingForm');
    const bookingSuccess = document.getElementById('bookingSuccess');
    const callbackForm = document.getElementById('callbackForm');
    const callbackSuccess = document.getElementById('callbackSuccess');
    const quickBookingForm = document.getElementById('quickBookingForm');

    // 3. Navigation Logic
    // Handle Sticky Nav
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init

    // Mobile Menu
    const toggleMobileNav = () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        mobileNav.classList.toggle('active');
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    };

    navToggle.addEventListener('click', toggleMobileNav);
    mobileNavClose.addEventListener('click', toggleMobileNav);
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMobileNav);
    });

    // 4. Data Injection
    
    // Inject Rooms
    if (typeof ROOMS !== 'undefined' && roomsShowcase) {
        ROOMS.forEach(room => {
            const card = document.createElement('div');
            card.className = 'room-card';
            card.innerHTML = `
                <div class="room-card-image">
                    <div class="img-placeholder" data-label="${room.imgLabel}"></div>
                    <div class="room-card-badge">${room.view}</div>
                </div>
                <div class="room-card-body">
                    <h3 class="room-card-title">${room.name}</h3>
                    <p class="room-card-desc">${room.shortDesc}</p>
                    <div class="room-card-amenities">
                        ${room.amenities.slice(0, 3).map(a => `<span class="room-amenity-tag">${a}</span>`).join('')}
                        ${room.amenities.length > 3 ? `<span class="room-amenity-tag">+${room.amenities.length - 3}</span>` : ''}
                    </div>
                    <button class="btn-outline room-card-cta" style="border:none; padding:0; background:none; cursor:pointer;" onclick="openRoomModal('${room.id}')">
                        View Details <i data-lucide="arrow-right" class="icon-xs"></i>
                    </button>
                </div>
            `;
            roomsShowcase.appendChild(card);
        });
    }

    // Inject Amenities
    if (typeof AMENITIES !== 'undefined' && amenitiesGrid) {
        AMENITIES.forEach(amenity => {
            const el = document.createElement('div');
            el.className = 'amenity-card';
            el.innerHTML = `
                <div class="amenity-icon-wrap">
                    <i data-lucide="${amenity.icon}" class="icon"></i>
                </div>
                <h4 class="amenity-label">${amenity.label}</h4>
                <p class="amenity-desc">${amenity.desc}</p>
            `;
            amenitiesGrid.appendChild(el);
        });
    }

    // Inject Experiences
    if (typeof EXPERIENCES !== 'undefined' && experiencesGrid) {
        EXPERIENCES.forEach(exp => {
            const el = document.createElement('div');
            el.className = 'experience-card';
            el.innerHTML = `
                <div class="img-placeholder" data-label="${exp.imgLabel}"></div>
                <div class="experience-card-overlay">
                    <i data-lucide="${exp.icon}" class="experience-card-icon"></i>
                    <h3 class="experience-card-title">${exp.title}</h3>
                    <p class="experience-card-desc">${exp.desc}</p>
                </div>
            `;
            experiencesGrid.appendChild(el);
        });
    }

    // Inject Attractions
    if (typeof ATTRACTIONS !== 'undefined' && attractionsGrid) {
        ATTRACTIONS.forEach(attr => {
            const el = document.createElement('div');
            el.className = 'attraction-card';
            el.innerHTML = `
                <div class="attraction-card-image">
                    <div class="img-placeholder" data-label="${attr.imgLabel}"></div>
                </div>
                <div class="attraction-card-body">
                    <h3 class="attraction-card-title">${attr.name}</h3>
                    <p class="attraction-card-desc">${attr.desc}</p>
                    <div class="attraction-card-meta">
                        <span class="attraction-distance">
                            <i data-lucide="map-pin" class="icon-xs"></i> ${attr.distance}
                        </span>
                        <a href="https://www.google.com/maps/search/${attr.mapsQuery}" target="_blank" rel="noopener" class="attraction-direction">
                            Directions <i data-lucide="arrow-up-right" class="icon-xs"></i>
                        </a>
                    </div>
                </div>
            `;
            attractionsGrid.appendChild(el);
        });
    }

    // Inject Gallery
    let galleryElements = [];
    if (typeof GALLERY_ITEMS !== 'undefined' && galleryGrid) {
        GALLERY_ITEMS.forEach((item, index) => {
            const el = document.createElement('div');
            el.className = `gallery-item category-${item.category}`;
            el.dataset.category = item.category;
            el.dataset.index = index;
            el.innerHTML = `<div class="img-placeholder" data-label="${item.label}"></div>`;
            galleryGrid.appendChild(el);
            galleryElements.push(el);

            el.addEventListener('click', () => openLightbox(index));
        });
    }

    // Inject Reviews
    if (typeof REVIEWS !== 'undefined' && reviewsCarousel) {
        REVIEWS.forEach(review => {
            const el = document.createElement('div');
            el.className = 'review-card';
            const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
            el.innerHTML = `
                <div class="review-card-stars">${stars}</div>
                <p class="review-card-text">"${review.text}"</p>
                <div class="review-card-author">— ${review.name} <span style="opacity:0.5; font-size:0.8em;">| ${review.source}</span></div>
            `;
            reviewsCarousel.appendChild(el);
        });
    }

    // Re-initialize icons for dynamically added content
    lucide.createIcons();

    // 5. Room Modal Logic
    window.openRoomModal = (roomId) => {
        const room = ROOMS.find(r => r.id === roomId);
        if (!room) return;

        roomModalBody.innerHTML = `
            <div class="modal-room-image">
                <div class="img-placeholder" data-label="${room.imgLabel}" style="height:100%"></div>
            </div>
            <div class="modal-room-body">
                <h2 class="modal-room-title">${room.name}</h2>
                <p class="modal-room-desc">${room.description}</p>
                <div class="modal-room-amenities">
                    ${room.amenities.map(a => `
                        <div class="modal-amenity">
                            <i data-lucide="check" class="icon-sm"></i>
                            <span>${a}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="modal-room-actions">
                    <a href="#booking" class="btn btn-primary" onclick="closeModalAndBook('${room.id}')">Book This Room</a>
                    <a href="https://wa.me/${HOTEL.whatsapp}?text=I am interested in booking the ${room.name}." target="_blank" class="btn btn-whatsapp">
                        <i data-lucide="message-circle" class="icon-sm"></i> WhatsApp Us
                    </a>
                </div>
            </div>
        `;
        
        lucide.createIcons();
        roomModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeRoomModal = () => {
        roomModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    window.closeModalAndBook = (roomId) => {
        closeRoomModal();
        const roomSelect = document.getElementById('bf-room-type');
        if (roomSelect) {
            roomSelect.value = roomId;
        }
    };

    if(roomModalClose) roomModalClose.addEventListener('click', closeRoomModal);
    if(roomModalBackdrop) roomModalBackdrop.addEventListener('click', closeRoomModal);

    // 6. Gallery Filter & Lightbox Logic
    if (galleryFilters.length > 0) {
        galleryFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                galleryFilters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;
                
                galleryElements.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    let currentLightboxIndex = 0;

    const openLightbox = (index) => {
        currentLightboxIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    const updateLightboxContent = () => {
        const item = GALLERY_ITEMS[currentLightboxIndex];
        if (item) {
            lightboxImage.setAttribute('data-label', item.label);
            lightboxCaption.textContent = item.label;
        }
    };

    const prevImage = () => {
        currentLightboxIndex = (currentLightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
        updateLightboxContent();
    };

    const nextImage = () => {
        currentLightboxIndex = (currentLightboxIndex + 1) % GALLERY_ITEMS.length;
        updateLightboxContent();
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);

    // Keyboard navigation for lightbox
    window.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });

    // 7. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 8. Form Handling (Mock Submissions)
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            bookingForm.style.display = 'none';
            if (bookingSuccess) bookingSuccess.style.display = 'block';
        });
    }

    if (callbackForm) {
        callbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            callbackForm.style.display = 'none';
            if (callbackSuccess) callbackSuccess.style.display = 'block';
        });
    }

    if (quickBookingForm) {
        quickBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const checkin = document.getElementById('bb-checkin').value;
            const checkout = document.getElementById('bb-checkout').value;
            const guests = document.getElementById('bb-guests').value;
            const rooms = document.getElementById('bb-rooms').value;
            
            // Redirect to main booking form and populate
            document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
            
            setTimeout(() => {
                if(checkin) document.getElementById('bf-checkin').value = checkin;
                if(checkout) document.getElementById('bf-checkout').value = checkout;
                if(guests) document.getElementById('bf-adults').value = guests;
                if(rooms) document.getElementById('bf-rooms').value = rooms;
            }, 500);
        });
    }
});
