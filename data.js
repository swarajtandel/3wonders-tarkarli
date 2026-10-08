/**
 * 3 Wonders Tarkarli - Hotel Data Layer
 * All hotel content separated from UI for easy updates.
 * Only verified information is included.
 */

const HOTEL = {
    name: "Wairkar's 3 Wonders Tarkarli",
    fullName: "Wairkar's 3 Wonders Tarkarli",
    tagline: 'Your Coastal Escape in Tarkarli',
    phone: '+919820049021',
    phoneDisplay: '+91 98200 49021',
    whatsapp: '919820049021',
    address: {
        street: 'House No. 892/893, Tarkarli Kalethar',
        road: 'Tarkarli Devbag Road',
        city: 'Malvan',
        district: 'Sindhudurg',
        state: 'Maharashtra',
        pin: '416606',
        country: 'India',
        full: 'House No. 892/893, Tarkarli Kalethar, Tarkarli Devbag Road, Malvan, Sindhudurg, Maharashtra - 416606'
    },
    geo: {
        lat: 16.0204705,
        lng: 73.4889806
    },
    checkin: '12:00 PM',
    checkout: '11:00 AM',
    mapsUrl: 'https://www.google.com/maps/place/3+Wonders+Tarkarli+Hotel+and+Restaurant/@16.0204705,73.4864057,915m/data=!3m1!1e3!4m9!3m8!1s0x3bc003861dfbf90d:0x4dc95bb93ea03dc8!5m2!4m1!1i2!8m2!3d16.0204705!4d73.4889806!16s%2Fg%2F11wxf_b6r6?hl=en-US&entry=ttu&g_ep=EgoyMDI2MTAwNS4wIKXMDSoASAFQAw%3D%3D',
    websiteUrl: 'https://sites.google.com/view/3-wonders-tarkarli'
};

const ROOMS = [
    {
        id: 'ac-sea-view',
        name: 'AC Sea View Room',
        shortDesc: 'Wake up to the sound of the Arabian Sea with panoramic ocean views from your window.',
        description: 'Our Sea View rooms offer a stunning panorama of the Arabian Sea. Thoughtfully designed with comfort in mind, each room features air conditioning, a comfortable bed, private bathroom, and modern amenities. Fall asleep to the gentle sound of waves and wake up to breathtaking ocean sunrises.',
        amenities: ['Air Conditioning', 'Sea View', 'TV', 'Wi-Fi', 'Private Bathroom', 'Room Service'],
        view: 'Sea View',
        category: 'rooms',
        imgLabel: 'AC Sea View Room',
        image: 'photos/SEA VIEW DELUXE.jpeg'
    },
    {
        id: 'ac-mountain-view-premium',
        name: 'AC Mountain View Premium Room',
        shortDesc: 'Relax with serene views of the lush Western Ghats and surrounding greenery.',
        description: 'Surrounded by tropical greenery, our Mountain View rooms offer a peaceful retreat from the world. Each room comes equipped with air conditioning, comfortable bedding, a private bathroom, and all modern conveniences. Ideal for couples and families looking for a tranquil getaway.',
        amenities: ['Air Conditioning', 'Mountain/Garden View', 'TV', 'Wi-Fi', 'Private Bathroom', 'Room Service'],
        view: 'Mountain View',
        category: 'rooms',
        imgLabel: 'AC Mountain View Premium Room',
        image: 'photos/PREMIUM ROOM.jpeg'
    },
    {
        id: 'ac-family-suites',
        name: 'AC Family Suites',
        shortDesc: 'Our most spacious rooms offering premium comfort for families and groups.',
        description: 'The Family Suites at Wairkar\'s 3 Wonders are our most spacious offerings, designed for those who appreciate extra room and comfort. Featuring air conditioning, modern furnishings, a well-appointed private bathroom, and all essential amenities. Perfect for families and longer stays.',
        amenities: ['Air Conditioning', 'TV', 'Wi-Fi', 'Private Bathroom', 'Room Service', 'Electric Kettle'],
        view: 'Resort View',
        category: 'rooms',
        imgLabel: 'AC Family Suites',
        image: 'photos/FAMILY ROOM.jpeg'
    }
];

const AMENITIES = [
    { icon: 'wifi', label: 'Free Wi-Fi', desc: 'High-speed internet throughout the property' },
    { icon: 'car', label: 'Free Parking', desc: 'Secure private parking for guests' },
    { icon: 'utensils', label: 'Restaurant', desc: 'In-house restaurant with Malvani cuisine' },
    { icon: 'bell', label: 'Room Service', desc: 'Convenient in-room dining' },
    { icon: 'snowflake', label: 'Air Conditioning', desc: 'All rooms fully air conditioned' },
    { icon: 'tv', label: 'Television', desc: 'Flat-screen TV in every room' },
    { icon: 'user-check', label: '24hr Front Desk', desc: 'Round-the-clock assistance' },
    { icon: 'bath', label: 'Private Bathroom', desc: 'Attached bathroom in every room' }
];

const EXPERIENCES = [
    {
        id: 'beach-days',
        title: 'Beach Days',
        desc: 'Relax on the pristine white sand of Tarkarli Beach, just steps from the resort. Soak in the sun, take a dip in the crystal-clear Arabian Sea, and unwind.',
        icon: 'umbrella',
        category: 'experiences',
        imgLabel: 'Tarkarli Beach',
        image: 'photos/tarkarli_beach.jpeg'
    },
    {
        id: 'water-adventures',
        title: 'Water Adventures',
        desc: 'Experience scuba diving, snorkelling, and water sports at Tarkarli - one of the best diving spots on India\'s west coast.',
        icon: 'waves',
        category: 'experiences',
        imgLabel: 'Scuba Diving',
        image: 'photos/scuba_diving.jpeg'
    },
    {
        id: 'malvani-food',
        title: 'Malvani Food Trail',
        desc: 'Discover authentic coastal cuisine - from fiery Malvani fish curry to kokum sherbet. A culinary journey you won\'t forget.',
        icon: 'chef-hat',
        category: 'food',
        imgLabel: 'Malvani Cuisine',
        image: 'photos/malvani_cuisine.jpeg'
    },
    {
        id: 'sindhudurg-fort',
        title: 'Sindhudurg Fort',
        desc: 'Explore the majestic sea fort built by Chhatrapati Shivaji Maharaj - a living piece of Maratha history rising from the Arabian Sea.',
        icon: 'landmark',
        category: 'experiences',
        imgLabel: 'Sindhudurg Fort',
        image: 'photos/sindhudurg_fort.jpeg'
    },
    {
        id: 'sunset-backwaters',
        title: 'Sunset & Backwaters',
        desc: 'Experience magical sunsets over the Karli river backwaters. Take a boat ride through mangroves as the sky turns golden.',
        icon: 'sunset',
        category: 'experiences',
        imgLabel: 'Tarkarli Sunset',
        image: 'photos/tarkarli_sunset.jpeg'
    },
    {
        id: 'local-culture',
        title: 'Local Culture',
        desc: 'Immerse yourself in the warm Malvani culture - visit local temples, explore fishing villages, and discover the stories of the Konkan coast.',
        icon: 'heart',
        category: 'experiences',
        imgLabel: 'Local Culture',
        image: 'photos/tarkarli_culture.jpeg'
    }
];

const ATTRACTIONS = [
    {
        name: 'Tarkarli Beach',
        desc: 'Crystal-clear waters and white sand - one of Maharashtra\'s most pristine beaches.',
        distance: 'Walking distance',
        time: '2 min walk',
        category: 'beach',
        imgLabel: 'Tarkarli Beach',
        image: 'photos/tarkarli_beach2.png',
        mapsQuery: 'Tarkarli+Beach+Maharashtra'
    },
    {
        name: 'Devbag Beach',
        desc: 'Where the Karli river meets the Arabian Sea - a breathtaking confluence of water and sand.',
        distance: '~5 km',
        time: '~10 min',
        category: 'beach',
        imgLabel: 'Devbag Beach',
        image: 'photos/devbaug_beach.jpeg',
        mapsQuery: 'Devbag+Beach+Tarkarli'
    },
    {
        name: 'Sindhudurg Fort',
        desc: 'Historic sea fort built by Chhatrapati Shivaji Maharaj in 1664. Accessible by boat from Malvan.',
        distance: '~30 km',
        time: '~45 min',
        category: 'heritage',
        imgLabel: 'Sindhudurg Fort',
        image: 'photos/sindhudurg_fort.jpeg',
        mapsQuery: 'Sindhudurg+Fort+Malvan'
    },
    {
        name: 'Malvan Town',
        desc: 'The bustling coastal town known for its seafood markets, Malvani cuisine, and vibrant culture.',
        distance: '~25 km',
        time: '~35 min',
        category: 'town',
        imgLabel: 'Malvan Town',
        image: 'photos/malvan_town.jpeg',
        mapsQuery: 'Malvan+Maharashtra'
    },
    {
        name: 'Tsunami Island',
        desc: 'A naturally formed island offering exciting water sports - jet skiing, banana rides, and more.',
        distance: '~8 km',
        time: '~15 min',
        category: 'adventure',
        imgLabel: 'Tsunami Island',
        image: 'photos/tsunami_island.jpeg',
        mapsQuery: 'Tsunami+Island+Devbag'
    },
    {
        name: 'Karli Backwaters',
        desc: 'Scenic backwater boat rides through mangrove forests - perfect for birdwatching and sunset cruises.',
        distance: '~3 km',
        time: '~5 min',
        category: 'nature',
        imgLabel: 'Karli Backwaters',
        image: 'photos/karli_backwaters.jpeg',
        mapsQuery: 'Karli+River+Backwaters+Tarkarli'
    }
];

const GALLERY_ITEMS = [
    // ROOMS - AC SEA VIEW
    { label: 'AC Sea View', category: 'rooms-ac-sea-view', image: 'photos/SEA VIEW DELUXE.jpeg', size: 'large' },
    { label: 'AC Sea View', category: 'rooms-ac-sea-view', image: 'photos/SEA VIEW DELUXE 2.jpeg', size: 'wide' },
    { label: 'AC Sea View', category: 'rooms-ac-sea-view', image: 'photos/SEA VIEW DELUXE 3.jpeg' },
    { label: 'AC Sea View', category: 'rooms-ac-sea-view', image: 'photos/SEA VIEW DELUXE 4.jpeg', size: 'tall' },
    { label: 'AC Sea View', category: 'rooms-ac-sea-view', image: 'photos/SEA VIEW DELUXE 5.jpeg' },
    { label: 'AC Sea View', category: 'rooms-ac-sea-view', image: 'photos/SEA VIEW DELUXE 6.jpeg', size: 'wide' },
    { label: 'AC Sea View', category: 'rooms-ac-sea-view', image: 'photos/SEA VIEW DELUXE 7.jpeg' },
    { label: 'AC Sea View', category: 'rooms-ac-sea-view', image: 'photos/SEA VIEW DELUXE ROOM 1.jpeg', size: 'tall' },
    { label: 'AC Sea View', category: 'rooms-ac-sea-view', image: 'photos/BATHROOM SEA VIEW DELUXE.jpeg' },
    { label: 'AC Sea View', category: 'rooms-ac-sea-view', image: 'photos/BATHROOM SEA VIEW DELUXE 2.jpeg', size: 'large' },

    // ROOMS - AC MOUNTAIN VIEW
    { label: 'AC Mountain View', category: 'rooms-ac-mountain-view', image: 'photos/PREMIUM ROOM.jpeg', size: 'large' },
    { label: 'AC Mountain View', category: 'rooms-ac-mountain-view', image: 'photos/PREMIUM ROOM 1.jpeg', size: 'tall' },
    { label: 'AC Mountain View', category: 'rooms-ac-mountain-view', image: 'photos/PREMIUM ROOM 2.jpeg' },
    { label: 'AC Mountain View', category: 'rooms-ac-mountain-view', image: 'photos/PREMIUM ROOM 3.jpeg', size: 'wide' },
    { label: 'AC Mountain View', category: 'rooms-ac-mountain-view', image: 'photos/PREMIUM ROOM 4.jpeg' },
    { label: 'AC Mountain View', category: 'rooms-ac-mountain-view', image: 'photos/PREMIUM ROOM 5.jpeg', size: 'tall' },
    { label: 'AC Mountain View', category: 'rooms-ac-mountain-view', image: 'photos/PREMIUM  BATHROOM 2.jpeg' },

    // ROOMS - AC FAMILY
    { label: 'AC Family', category: 'rooms-ac-family', image: 'photos/FAMILY ROOM.jpeg', size: 'wide' },
    { label: 'AC Family', category: 'rooms-ac-family', image: 'photos/FAMILY ROOM1.jpeg', size: 'large' },
    { label: 'AC Family', category: 'rooms-ac-family', image: 'photos/FAMILY ROOM 2.jpeg' },
    { label: 'AC Family', category: 'rooms-ac-family', image: 'photos/BATHROOM FAMILY ROOM.jpeg', size: 'tall' },
    { label: 'AC Family', category: 'rooms-ac-family', image: 'photos/BATHROOM FAMILY ROOM1.jpeg' },

    // PARKING
    { label: 'Parking', category: 'parking', image: 'photos/PARKING.jpeg', size: 'wide' },
    { label: 'Parking', category: 'parking', image: 'photos/PARKING 1.jpeg', size: 'tall' },
    { label: 'Parking', category: 'parking', image: 'photos/PARKING 2.jpeg' },
    { label: 'Parking', category: 'parking', image: 'photos/PARKING 4.jpeg', size: 'large' },

    // FOOD
    { label: 'Food', category: 'food', image: 'photos/RESTAURANT.jpeg', size: 'large' },
    { label: 'Food', category: 'food', image: 'photos/RESTAURANT1.jpeg', size: 'wide' },

    // RECEPTION
    { label: 'Reception', category: 'reception', image: 'photos/RECEPTION.jpeg', size: 'large' },
    { label: 'Reception', category: 'reception', image: 'photos/RECEPTION WAITING AREA.jpeg' },
    { label: 'Reception', category: 'reception', image: 'photos/RECEPTION WATING AREA 1.jpeg', size: 'wide' },
    { label: 'Reception', category: 'reception', image: 'photos/RECEPTION WAITING AREA 2.jpeg' },
    { label: 'Reception', category: 'reception', image: 'photos/RECEPTION WATING AREA 4.jpeg', size: 'tall' },

    // LOBBY / COMMON AREAS
    { label: 'Lobby / Common Areas', category: 'lobby', image: 'photos/LOBBY.jpeg', size: 'wide' },
    { label: 'Lobby / Common Areas', category: 'lobby', image: 'photos/LOBBY2.jpeg' },
    { label: 'Lobby / Common Areas', category: 'lobby', image: 'photos/LOBBY 3.jpeg', size: 'large' },
    { label: 'Lobby / Common Areas', category: 'lobby', image: 'photos/WATING AREA.jpeg', size: 'tall' }
];

const REVIEWS = [
    {
        name: 'Guest',
        text: 'The location is fantastic - just steps from Tarkarli Beach. Rooms were clean and air-conditioned. The Malvani food at their restaurant was absolutely delicious.',
        rating: 5,
        source: 'Booking Platform'
    },
    {
        name: 'Guest',
        text: 'Great hospitality and warm staff. The sea view from the room was breathtaking. Perfect for a family vacation. Will definitely visit again.',
        rating: 5,
        source: 'Booking Platform'
    },
    {
        name: 'Guest',
        text: 'Loved the food - especially the fish curry and sol kadhi. The beach is literally a 2-minute walk. Good value for money and very peaceful.',
        rating: 5,
        source: 'Booking Platform'
    },
    {
        name: 'Guest',
        text: 'Clean rooms with all basic amenities. Free parking was a plus. The staff helped us arrange scuba diving and boat rides. Highly recommended for a coastal getaway.',
        rating: 5,
        source: 'Booking Platform'
    },
    {
        name: 'Guest',
        text: 'Beautiful property near the beach. We enjoyed the authentic Malvani food. The check-in was smooth and the front desk was very helpful throughout our stay.',
        rating: 5,
        source: 'Booking Platform'
    }
];
