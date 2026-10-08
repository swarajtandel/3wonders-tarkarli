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
                    ${room.image ? `<img src="${room.image}" alt="${room.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit;">` : `<div class="img-placeholder" data-label="${room.imgLabel}"></div>`}
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
                ${exp.image ? `<img src="${exp.image}" alt="${exp.title}" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; border-radius: inherit;">` : `<div class="img-placeholder" data-label="${exp.imgLabel}"></div>`}
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
                    ${attr.image ? `<img src="${attr.image}?v=c1" alt="${attr.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit;">` : `<div class="img-placeholder" data-label="${attr.imgLabel}"></div>`}
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
    const galleryContainer = document.getElementById('galleryContainer');
    if (typeof GALLERY_ITEMS !== 'undefined' && galleryContainer) {
        galleryContainer.innerHTML = ''; // Clear container



        // Render single Gallery Grid for all non-room categories
        const grid = document.createElement('div');
        grid.className = 'gallery-grid';
        grid.dataset.group = 'all-categories';

        GALLERY_ITEMS.forEach((item, index) => {
            if (!item.category.includes('rooms')) {
                const el = document.createElement('div');
                const sizeClass = item.size ? ` gallery-item-${item.size}` : '';
                el.className = `gallery-item category-${item.category.replace(/ /g, '-')}${sizeClass}`;
                el.dataset.category = item.category;
                el.dataset.index = index;
                el.innerHTML = item.image ? `<img src="${item.image}?v=c1" alt="${item.label}" loading="lazy">` : `<div class="img-placeholder" data-label="${item.label}"></div>`;
                grid.appendChild(el);
                galleryElements.push(el);
                el.addEventListener('click', () => openLightbox(index));
            }
        });

        galleryContainer.appendChild(grid);
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
                <div class="review-card-author">- ${review.name} <span style="opacity:0.5; font-size:0.8em;">| ${review.source}</span></div>
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
                ${room.image ? `<img src="${room.image}" alt="${room.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit;">` : `<div class="img-placeholder" data-label="${room.imgLabel}" style="height:100%"></div>`}
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

    if (roomModalClose) roomModalClose.addEventListener('click', closeRoomModal);
    if (roomModalBackdrop) roomModalBackdrop.addEventListener('click', closeRoomModal);

    // 6. Gallery Filter & Lightbox Logic

    if (galleryFilters.length > 0) {
        galleryFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                galleryFilters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                galleryElements.forEach(item => {
                    if (filter === 'all' || (item.dataset.category && item.dataset.category.includes(filter))) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Handle Rooms Wrapper visibility
                const roomsWrapper = document.querySelector('.rooms-gallery-wrapper');
                if (roomsWrapper) {
                    if (filter === 'all' || filter === 'rooms') {
                        roomsWrapper.style.display = 'grid';
                    } else {
                        roomsWrapper.style.display = 'none';
                    }
                }

                // Handle regular grid visibility
                const grids = document.querySelectorAll('.gallery-grid');
                grids.forEach(grid => {
                    if (filter === 'rooms') {
                        grid.style.display = 'none';
                    } else {
                        grid.style.display = 'grid';
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
            if (item.image) {
                lightboxImage.className = '';
                lightboxImage.innerHTML = `<img src="${item.image}?v=c1" alt="${item.label}" style="max-width: 100%; max-height: 80vh; object-fit: contain;">`;
            } else {
                lightboxImage.className = 'img-placeholder lightbox-placeholder';
                lightboxImage.innerHTML = '';
                lightboxImage.setAttribute('data-label', item.label);
            }
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

    // 8. Form Handling via WhatsApp
    const WHATSAPP_NUMBER = "919820049021"; // Can be updated here

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const checkIn = document.getElementById('bf-checkin').value;
            const checkOut = document.getElementById('bf-checkout').value;

            // Validate Check-out >= Check-in
            if (new Date(checkOut) < new Date(checkIn)) {
                alert("Check-out date cannot be earlier than check-in date.");
                return;
            }

            const adults = document.getElementById('bf-adults').value;
            const children = document.getElementById('bf-children').value;
            const rooms = document.getElementById('bf-rooms').value;
            const roomTypeSelect = document.getElementById('bf-room-type');
            const roomType = roomTypeSelect.options[roomTypeSelect.selectedIndex].text;
            const name = document.getElementById('bf-name').value;
            const phone = document.getElementById('bf-phone').value;
            const email = document.getElementById('bf-email').value;
            const requests = document.getElementById('bf-requests').value;

            // Optional: formatting date beautifully (e.g. 15 October 2026)
            const formatDate = (dateStr) => {
                const options = { day: 'numeric', month: 'long', year: 'numeric' };
                return new Date(dateStr).toLocaleDateString('en-GB', options);
            };

            const message = `Hello 3 Wonders Tarkarli,

I would like to make a booking request.

🏨 BOOKING DETAILS

👤 Full Name: ${name}
📞 Phone: ${phone}
📧 Email: ${email || 'N/A'}

📅 Check-in: ${formatDate(checkIn)}
📅 Check-out: ${formatDate(checkOut)}

👨 Adults: ${adults}
👧 Children: ${children}
🏠 Number of Rooms: ${rooms}
🛏 Room Preference: ${roomType}

📝 Special Requests:
${requests || 'None'}

Please confirm availability and pricing.

Thank you.`;

            const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, "_blank");

            bookingForm.style.display = 'none';
            if (bookingSuccess) {
                bookingSuccess.innerHTML = `
                    <div class="success-icon">
                        <i data-lucide="check-circle" class="icon-lg"></i>
                    </div>
                    <p>WhatsApp opened with your booking details. Please press Send to submit your request.</p>
                `;
                bookingSuccess.style.display = 'block';
                lucide.createIcons();
            }
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
                if (checkin) document.getElementById('bf-checkin').value = checkin;
                if (checkout) document.getElementById('bf-checkout').value = checkout;
                if (guests) document.getElementById('bf-adults').value = guests;
                if (rooms) document.getElementById('bf-rooms').value = rooms;
            }, 500);
        });
    }
});
