/**
 * 3 Wonders Tarkarli — Hotel Data Layer
 * All hotel content separated from UI for easy updates.
 * Only verified information is included.
 */

const HOTEL = {
    name: '3 Wonders Tarkarli',
    fullName: '3 Wonders Tarkarli Hotel and Restaurant',
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
        full: 'House No. 892/893, Tarkarli Kalethar, Tarkarli Devbag Road, Malvan, Sindhudurg, Maharashtra — 416606'
    },
    geo: {
        lat: 16.0170,
        lng: 73.4680
    },
    checkin: '12:00 PM',
    checkout: '11:00 AM',
    mapsUrl: 'https://www.google.com/maps/search/3+Wonders+Tarkarli+Hotel+and+Restaurant',
    websiteUrl: 'https://sites.google.com/view/3-wonders-tarkarli'
};

const ROOMS = [
    {
        id: 'ac-sea-view',
        name: 'AC Room — Sea View',
        shortDesc: 'Wake up to the sound of the Arabian Sea with panoramic ocean views from your window.',
        description: 'Our Sea View rooms offer a stunning panorama of the Arabian Sea. Thoughtfully designed with comfort in mind, each room features air conditioning, a comfortable bed, private bathroom, and modern amenities. Fall asleep to the gentle sound of waves and wake up to breathtaking ocean sunrises.',
        amenities: ['Air Conditioning', 'Sea View', 'TV', 'Wi-Fi', 'Private Bathroom', 'Room Service'],
        view: 'Sea View',
        category: 'rooms',
        imgLabel: 'AC Sea View Room'
    },
    {
        id: 'ac-mountain-view',
        name: 'AC Room — Mountain View',
        shortDesc: 'Relax with serene views of the lush Western Ghats and surrounding greenery.',
        description: 'Surrounded by tropical greenery, our Mountain View rooms offer a peaceful retreat from the world. Each room comes equipped with air conditioning, comfortable bedding, a private bathroom, and all modern conveniences. Ideal for couples and families looking for a tranquil getaway.',
        amenities: ['Air Conditioning', 'Mountain/Garden View', 'TV', 'Wi-Fi', 'Private Bathroom', 'Room Service'],
        view: 'Mountain View',
        category: 'rooms',
        imgLabel: 'AC Mountain View Room'
    },
    {
        id: 'ac-deluxe',
        name: 'AC Deluxe Room',
        shortDesc: 'Our most spacious rooms offering premium comfort for families and groups.',
        description: 'The Deluxe rooms at 3 Wonders are our most spacious offerings, designed for those who appreciate extra room and comfort. Featuring air conditioning, modern furnishings, a well-appointed private bathroom, and all essential amenities. Perfect for families and longer stays.',
        amenities: ['Air Conditioning', 'TV', 'Wi-Fi', 'Private Bathroom', 'Room Service', 'Electric Kettle'],
        view: 'Resort View',
        category: 'rooms',
        imgLabel: 'AC Deluxe Room'
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
        imgLabel: 'Tarkarli Beach'
    },
    {
        id: 'water-adventures',
        title: 'Water Adventures',
        desc: 'Experience scuba diving, snorkelling, and water sports at Tarkarli — one of the best diving spots on India\'s west coast.',
        icon: 'waves',
        category: 'experiences',
        imgLabel: 'Scuba Diving'
    },
    {
        id: 'malvani-food',
        title: 'Malvani Food Trail',
        desc: 'Discover authentic coastal cuisine — from fiery Malvani fish curry to kokum sherbet. A culinary journey you won\'t forget.',
        icon: 'chef-hat',
        category: 'food',
        imgLabel: 'Malvani Cuisine'
    },
    {
        id: 'sindhudurg-fort',
        title: 'Sindhudurg Fort',
        desc: 'Explore the majestic sea fort built by Chhatrapati Shivaji Maharaj — a living piece of Maratha history rising from the Arabian Sea.',
        icon: 'landmark',
        category: 'experiences',
        imgLabel: 'Sindhudurg Fort'
    },
    {
        id: 'sunset-backwaters',
        title: 'Sunset & Backwaters',
        desc: 'Experience magical sunsets over the Karli river backwaters. Take a boat ride through mangroves as the sky turns golden.',
        icon: 'sunset',
        category: 'experiences',
        imgLabel: 'Tarkarli Sunset'
    },
    {
        id: 'local-culture',
        title: 'Local Culture',
        desc: 'Immerse yourself in the warm Malvani culture — visit local temples, explore fishing villages, and discover the stories of the Konkan coast.',
        icon: 'heart',
        category: 'experiences',
        imgLabel: 'Local Culture'
    }
];

const ATTRACTIONS = [
    {
        name: 'Tarkarli Beach',
        desc: 'Crystal-clear waters and white sand — one of Maharashtra\'s most pristine beaches.',
        distance: 'Walking distance',
        time: '2 min walk',
        category: 'beach',
        imgLabel: 'Tarkarli Beach',
        mapsQuery: 'Tarkarli+Beach+Maharashtra'
    },
    {
        name: 'Devbag Beach',
        desc: 'Where the Karli river meets the Arabian Sea — a breathtaking confluence of water and sand.',
        distance: '~5 km',
        time: '~10 min',
        category: 'beach',
        imgLabel: 'Devbag Beach',
        mapsQuery: 'Devbag+Beach+Tarkarli'
    },
    {
        name: 'Sindhudurg Fort',
        desc: 'Historic sea fort built by Chhatrapati Shivaji Maharaj in 1664. Accessible by boat from Malvan.',
        distance: '~30 km',
        time: '~45 min',
        category: 'heritage',
        imgLabel: 'Sindhudurg Fort',
        mapsQuery: 'Sindhudurg+Fort+Malvan'
    },
    {
        name: 'Malvan Town',
        desc: 'The bustling coastal town known for its seafood markets, Malvani cuisine, and vibrant culture.',
        distance: '~25 km',
        time: '~35 min',
        category: 'town',
        imgLabel: 'Malvan Town',
        mapsQuery: 'Malvan+Maharashtra'
    },
    {
        name: 'Tsunami Island',
        desc: 'A naturally formed island offering exciting water sports — jet skiing, banana rides, and more.',
        distance: '~8 km',
        time: '~15 min',
        category: 'adventure',
        imgLabel: 'Tsunami Island',
        mapsQuery: 'Tsunami+Island+Devbag'
    },
    {
        name: 'Karli Backwaters',
        desc: 'Scenic backwater boat rides through mangrove forests — perfect for birdwatching and sunset cruises.',
        distance: '~3 km',
        time: '~5 min',
        category: 'nature',
        imgLabel: 'Karli Backwaters',
        mapsQuery: 'Karli+River+Backwaters+Tarkarli'
    }
];

const GALLERY_ITEMS = [
    { label: 'Resort Exterior', category: 'property' },
    { label: 'Sea View Room', category: 'rooms' },
    { label: 'Tarkarli Beach Sunset', category: 'beach' },
    { label: 'Malvani Fish Curry', category: 'food' },
    { label: 'Room Interior', category: 'rooms' },
    { label: 'Garden Area', category: 'property' },
    { label: 'Seafood Thali', category: 'food' },
    { label: 'Beach View from Property', category: 'beach' },
    { label: 'Scuba Diving at Tarkarli', category: 'experiences' },
    { label: 'Mountain View Room', category: 'rooms' },
    { label: 'Restaurant Seating', category: 'property' },
    { label: 'Devbag Beach', category: 'beach' },
    { label: 'Sindhudurg Fort', category: 'experiences' },
    { label: 'Coconut Palms', category: 'property' },
    { label: 'Boat Ride on Backwaters', category: 'experiences' },
    { label: 'Fresh Seafood', category: 'food' }
];

const REVIEWS = [
    {
        name: 'Guest',
        text: 'The location is fantastic — just steps from Tarkarli Beach. Rooms were clean and air-conditioned. The Malvani food at their restaurant was absolutely delicious.',
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
        text: 'Loved the food — especially the fish curry and sol kadhi. The beach is literally a 2-minute walk. Good value for money and very peaceful.',
        rating: 4,
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
        rating: 4,
        source: 'Booking Platform'
    }
];
