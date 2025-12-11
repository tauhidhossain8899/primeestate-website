import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

export default function PropertyDetail() {
  const { id } = useParams();
  
  // All properties data
  const allProperties = [
    {
      id: 1,
      title: 'Modern Luxury Villa',
      location: 'Beverly Hills, CA',
      fullAddress: '1234 Sunset Boulevard, Beverly Hills, CA 90210',
      price: 2850000,
      type: 'Villa',
      bedrooms: 5,
      bathrooms: 4,
      area: 4500,
      yearBuilt: 2022,
      status: 'Verified',
      seller: {
        name: 'Michael Anderson',
        phone: '+1 (212) 555-0456',
        email: 'michael@primeestate.com',
        verified: true
      },
      description: 'Experience unparalleled luxury in this stunning modern villa located in the heart of Beverly Hills. This architectural masterpiece features soaring ceilings, floor-to-ceiling windows, and an open-concept design that seamlessly blends indoor and outdoor living. The gourmet kitchen is equipped with top-of-the-line appliances, perfect for culinary enthusiasts. The master suite offers a private retreat with a spa-like bathroom and walk-in closet. Outside, enjoy the beautifully landscaped grounds, infinity pool, and outdoor entertainment area with breathtaking views. This property represents the epitome of California luxury living.',
      features: [
        'Smart Home Technology',
        'Infinity Pool',
        'Home Theater',
        'Wine Cellar',
        'Gourmet Kitchen',
        'Walk-in Closets',
        'Spa Bathroom',
        'Outdoor Kitchen',
        'Security System',
        'Solar Panels',
        '3-Car Garage',
        'Landscaped Garden'
      ],
      images: [
        'https://readdy.ai/api/search-image?query=modern%20luxury%20villa%20exterior%20with%20clean%20white%20architecture%2C%20minimalist%20design%2C%20large%20windows%2C%20beautiful%20landscaped%20garden%2C%20bright%20daylight%2C%20professional%20real%20estate%20photography%2C%20simple%20elegant%20background&width=1200&height=800&seq=detail1&orientation=landscape',
        'https://readdy.ai/api/search-image?query=luxury%20villa%20living%20room%20interior%20with%20modern%20furniture%2C%20high%20ceilings%2C%20floor%20to%20ceiling%20windows%2C%20elegant%20design%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=detail2&orientation=landscape',
        'https://readdy.ai/api/search-image?query=modern%20gourmet%20kitchen%20with%20white%20cabinets%2C%20marble%20countertops%2C%20stainless%20steel%20appliances%2C%20island%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=detail3&orientation=landscape',
        'https://readdy.ai/api/search-image?query=luxury%20master%20bedroom%20with%20king%20bed%2C%20elegant%20furniture%2C%20large%20windows%2C%20spa%20bathroom%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=detail4&orientation=landscape',
        'https://readdy.ai/api/search-image?query=infinity%20pool%20with%20outdoor%20lounge%20area%2C%20modern%20landscaping%2C%20sunset%20view%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=detail5&orientation=landscape'
      ]
    },
    {
      id: 2,
      title: 'Downtown Penthouse',
      location: 'Manhattan, NY',
      fullAddress: '789 Park Avenue, Manhattan, NY 10021',
      price: 3200000,
      type: 'Apartment',
      bedrooms: 3,
      bathrooms: 3,
      area: 2800,
      yearBuilt: 2021,
      status: 'Verified',
      seller: {
        name: 'Sarah Williams',
        phone: '+1 (212) 555-0789',
        email: 'sarah@primeestate.com',
        verified: true
      },
      description: 'Discover urban sophistication in this exquisite penthouse apartment offering panoramic city views. Floor-to-ceiling windows flood the space with natural light, highlighting the contemporary design and premium finishes throughout. The open-plan living area flows seamlessly to a private terrace, perfect for entertaining. The chef\'s kitchen features custom cabinetry and state-of-the-art appliances. Each bedroom is a private sanctuary with en-suite bathrooms and custom closets. Building amenities include 24-hour concierge, fitness center, and rooftop lounge.',
      features: [
        'Panoramic City Views',
        'Private Terrace',
        'Chef\'s Kitchen',
        'En-suite Bathrooms',
        'Custom Closets',
        '24-Hour Concierge',
        'Fitness Center',
        'Rooftop Lounge',
        'Smart Home System',
        'Central Air',
        'Hardwood Floors',
        'In-unit Laundry'
      ],
      images: [
        'https://readdy.ai/api/search-image?query=luxurious%20penthouse%20apartment%20interior%20with%20floor%20to%20ceiling%20windows%2C%20modern%20furniture%2C%20city%20skyline%20view%2C%20elegant%20design%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=pent1&orientation=landscape',
        'https://readdy.ai/api/search-image?query=modern%20penthouse%20living%20room%20with%20panoramic%20windows%2C%20contemporary%20furniture%2C%20city%20view%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=pent2&orientation=landscape',
        'https://readdy.ai/api/search-image?query=luxury%20penthouse%20kitchen%20with%20marble%20countertops%2C%20modern%20appliances%2C%20island%20seating%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=pent3&orientation=landscape',
        'https://readdy.ai/api/search-image?query=penthouse%20master%20bedroom%20with%20city%20view%2C%20modern%20design%2C%20elegant%20furniture%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=pent4&orientation=landscape',
        'https://readdy.ai/api/search-image?query=penthouse%20private%20terrace%20with%20outdoor%20furniture%2C%20city%20skyline%20view%2C%20evening%20lighting%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=pent5&orientation=landscape'
      ]
    },
    {
      id: 3,
      title: 'Beachfront Paradise',
      location: 'Malibu, CA',
      fullAddress: '456 Pacific Coast Highway, Malibu, CA 90265',
      price: 4500000,
      type: 'House',
      bedrooms: 4,
      bathrooms: 4,
      area: 3800,
      yearBuilt: 2023,
      status: 'Verified',
      seller: {
        name: 'David Martinez',
        phone: '+1 (310) 555-0234',
        email: 'david@primeestate.com',
        verified: true
      },
      description: 'Wake up to the sound of waves in this stunning beachfront estate. This contemporary coastal home features expansive ocean views from nearly every room. The open-concept design includes a gourmet kitchen, spacious living areas, and a master suite with private balcony overlooking the Pacific. Large sliding glass doors open to a wraparound deck perfect for outdoor dining and entertaining. Direct beach access allows you to enjoy the California lifestyle at its finest. This is truly a rare opportunity to own a piece of paradise.',
      features: [
        'Direct Beach Access',
        'Ocean Views',
        'Wraparound Deck',
        'Outdoor Dining Area',
        'Master Suite Balcony',
        'Gourmet Kitchen',
        'Open Floor Plan',
        'Floor-to-Ceiling Glass',
        'Outdoor Shower',
        'Fire Pit',
        '2-Car Garage',
        'Coastal Landscaping'
      ],
      images: [
        'https://readdy.ai/api/search-image?query=stunning%20beachfront%20house%20with%20ocean%20view%2C%20modern%20coastal%20architecture%2C%20large%20deck%2C%20palm%20trees%2C%20sunset%20lighting%2C%20professional%20real%20estate%20photography%2C%20simple%20clean%20background&width=1200&height=800&seq=beach1&orientation=landscape',
        'https://readdy.ai/api/search-image?query=beachfront%20house%20living%20room%20with%20ocean%20view%2C%20modern%20coastal%20furniture%2C%20large%20windows%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=beach2&orientation=landscape',
        'https://readdy.ai/api/search-image?query=coastal%20kitchen%20with%20white%20cabinets%2C%20ocean%20view%2C%20modern%20appliances%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=beach3&orientation=landscape',
        'https://readdy.ai/api/search-image?query=beachfront%20master%20bedroom%20with%20ocean%20view%2C%20coastal%20design%2C%20balcony%20access%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=beach4&orientation=landscape',
        'https://readdy.ai/api/search-image?query=beachfront%20deck%20with%20outdoor%20furniture%2C%20ocean%20view%2C%20sunset%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=beach5&orientation=landscape'
      ]
    },
    {
      id: 4,
      title: 'Urban Loft Space',
      location: 'Chicago, IL',
      fullAddress: '321 West Loop Street, Chicago, IL 60607',
      price: 1250000,
      type: 'Loft',
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      yearBuilt: 2020,
      status: 'Verified',
      seller: {
        name: 'Jennifer Lee',
        phone: '+1 (312) 555-0567',
        email: 'jennifer@primeestate.com',
        verified: true
      },
      description: 'Experience urban living at its finest in this stunning industrial loft. Soaring 14-foot ceilings, exposed brick walls, and oversized windows create a dramatic and inviting space. The open floor plan is perfect for modern living and entertaining. The chef\'s kitchen features stainless steel appliances and concrete countertops. Two spacious bedrooms offer privacy and comfort. Located in the heart of the West Loop, you\'re steps away from the city\'s best restaurants, galleries, and nightlife.',
      features: [
        'Exposed Brick Walls',
        '14-Foot Ceilings',
        'Oversized Windows',
        'Open Floor Plan',
        'Chef\'s Kitchen',
        'Concrete Countertops',
        'Hardwood Floors',
        'In-unit Washer/Dryer',
        'Central Location',
        'Bike Storage',
        'Rooftop Deck',
        'Pet Friendly'
      ],
      images: [
        'https://readdy.ai/api/search-image?query=industrial%20urban%20loft%20interior%20with%20exposed%20brick%20walls%2C%20high%20ceilings%2C%20modern%20minimalist%20furniture%2C%20large%20windows%2C%20natural%20light%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=loft1&orientation=landscape',
        'https://readdy.ai/api/search-image?query=urban%20loft%20living%20area%20with%20exposed%20brick%2C%20modern%20furniture%2C%20industrial%20design%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=loft2&orientation=landscape',
        'https://readdy.ai/api/search-image?query=industrial%20loft%20kitchen%20with%20stainless%20steel%20appliances%2C%20concrete%20countertops%2C%20modern%20design%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=loft3&orientation=landscape',
        'https://readdy.ai/api/search-image?query=loft%20bedroom%20with%20exposed%20brick%2C%20modern%20furniture%2C%20large%20windows%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=loft4&orientation=landscape',
        'https://readdy.ai/api/search-image?query=urban%20loft%20bathroom%20with%20modern%20fixtures%2C%20industrial%20design%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=loft5&orientation=landscape'
      ]
    },
    {
      id: 5,
      title: 'Mountain Retreat',
      location: 'Aspen, CO',
      fullAddress: '567 Alpine Drive, Aspen, CO 81611',
      price: 3800000,
      type: 'Cabin',
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      yearBuilt: 2021,
      status: 'Verified',
      seller: {
        name: 'Robert Thompson',
        phone: '+1 (970) 555-0890',
        email: 'robert@primeestate.com',
        verified: true
      },
      description: 'Escape to this luxurious mountain retreat offering breathtaking views and world-class amenities. This custom-built cabin combines rustic charm with modern luxury. Vaulted ceilings with exposed beams, a stone fireplace, and floor-to-ceiling windows showcase the stunning mountain vistas. The gourmet kitchen is perfect for après-ski gatherings. Four spacious bedrooms provide comfort for family and guests. Outdoor living spaces include multiple decks and a hot tub. Minutes from world-renowned skiing and hiking trails.',
      features: [
        'Mountain Views',
        'Stone Fireplace',
        'Vaulted Ceilings',
        'Exposed Beams',
        'Gourmet Kitchen',
        'Hot Tub',
        'Multiple Decks',
        'Ski Storage',
        'Heated Floors',
        'Wine Storage',
        '2-Car Garage',
        'Close to Slopes'
      ],
      images: [
        'https://readdy.ai/api/search-image?query=luxury%20mountain%20cabin%20with%20wooden%20architecture%2C%20stone%20fireplace%2C%20panoramic%20mountain%20views%2C%20cozy%20elegant%20interior%2C%20professional%20real%20estate%20photography%2C%20simple%20clean%20background&width=1200&height=800&seq=mount1&orientation=landscape',
        'https://readdy.ai/api/search-image?query=mountain%20cabin%20living%20room%20with%20stone%20fireplace%2C%20vaulted%20ceilings%2C%20rustic%20furniture%2C%20mountain%20view%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=mount2&orientation=landscape',
        'https://readdy.ai/api/search-image?query=mountain%20cabin%20kitchen%20with%20wooden%20cabinets%2C%20modern%20appliances%2C%20rustic%20design%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=mount3&orientation=landscape',
        'https://readdy.ai/api/search-image?query=mountain%20cabin%20bedroom%20with%20wooden%20walls%2C%20cozy%20furniture%2C%20mountain%20view%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=mount4&orientation=landscape',
        'https://readdy.ai/api/search-image?query=mountain%20cabin%20deck%20with%20hot%20tub%2C%20outdoor%20furniture%2C%20mountain%20view%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=mount5&orientation=landscape'
      ]
    },
    {
      id: 6,
      title: 'Garden Estate',
      location: 'Austin, TX',
      fullAddress: '890 Hill Country Road, Austin, TX 78746',
      price: 1850000,
      type: 'House',
      bedrooms: 4,
      bathrooms: 3,
      area: 3500,
      yearBuilt: 2022,
      status: 'Verified',
      seller: {
        name: 'Amanda Garcia',
        phone: '+1 (512) 555-0345',
        email: 'amanda@primeestate.com',
        verified: true
      },
      description: 'Discover this beautiful estate nestled on lush landscaped grounds. This elegant home features a perfect blend of indoor and outdoor living spaces. The open floor plan includes a chef\'s kitchen, formal dining room, and spacious living areas. Large windows throughout provide abundant natural light and garden views. The master suite is a private oasis with spa bathroom and walk-in closet. Outside, enjoy the resort-style pool, outdoor kitchen, and beautifully manicured gardens. Perfect for entertaining or peaceful relaxation.',
      features: [
        'Landscaped Gardens',
        'Resort-Style Pool',
        'Outdoor Kitchen',
        'Chef\'s Kitchen',
        'Formal Dining Room',
        'Master Suite',
        'Spa Bathroom',
        'Walk-in Closets',
        'Home Office',
        'Covered Patio',
        '3-Car Garage',
        'Sprinkler System'
      ],
      images: [
        'https://readdy.ai/api/search-image?query=beautiful%20estate%20house%20with%20lush%20garden%2C%20modern%20architecture%2C%20outdoor%20patio%2C%20swimming%20pool%2C%20professional%20real%20estate%20photography%2C%20bright%20daylight%2C%20simple%20clean%20background&width=1200&height=800&seq=garden1&orientation=landscape',
        'https://readdy.ai/api/search-image?query=estate%20house%20living%20room%20with%20elegant%20furniture%2C%20large%20windows%2C%20garden%20view%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=garden2&orientation=landscape',
        'https://readdy.ai/api/search-image?query=estate%20house%20kitchen%20with%20white%20cabinets%2C%20marble%20countertops%2C%20modern%20appliances%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=garden3&orientation=landscape',
        'https://readdy.ai/api/search-image?query=estate%20master%20bedroom%20with%20elegant%20furniture%2C%20spa%20bathroom%2C%20garden%20view%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=garden4&orientation=landscape',
        'https://readdy.ai/api/search-image?query=estate%20backyard%20with%20swimming%20pool%2C%20outdoor%20kitchen%2C%20landscaped%20garden%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=garden5&orientation=landscape'
      ]
    },
    {
      id: 7,
      title: 'Contemporary Townhouse',
      location: 'San Francisco, CA',
      fullAddress: '234 Market Street, San Francisco, CA 94102',
      price: 2100000,
      type: 'Townhouse',
      bedrooms: 3,
      bathrooms: 2,
      area: 2200,
      yearBuilt: 2022,
      status: 'Verified',
      seller: {
        name: 'Robert Kim',
        phone: '+1 (415) 555-0678',
        email: 'robert@primeestate.com',
        verified: true
      },
      description: 'Modern contemporary townhouse in the heart of San Francisco. This sleek property features an open floor plan with high-end finishes throughout. The gourmet kitchen includes premium appliances and custom cabinetry. Three spacious bedrooms provide comfortable living spaces. Rooftop terrace offers stunning city views. Walking distance to shops, restaurants, and public transportation.',
      features: [
        'Rooftop Terrace',
        'City Views',
        'Gourmet Kitchen',
        'High-End Finishes',
        'Open Floor Plan',
        'Custom Cabinetry',
        'Hardwood Floors',
        'Central Location',
        'Walk Score 95',
        'Private Garage',
        'Smart Home',
        'Energy Efficient'
      ],
      images: [
        'https://readdy.ai/api/search-image?query=modern%20contemporary%20townhouse%20with%20sleek%20facade%2C%20urban%20design%2C%20rooftop%20terrace%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=town1&orientation=landscape',
        'https://readdy.ai/api/search-image?query=contemporary%20townhouse%20living%20room%20with%20modern%20furniture%2C%20high%20ceilings%2C%20large%20windows%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=town2&orientation=landscape',
        'https://readdy.ai/api/search-image?query=modern%20townhouse%20kitchen%20with%20sleek%20cabinets%2C%20premium%20appliances%2C%20island%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=town3&orientation=landscape',
        'https://readdy.ai/api/search-image?query=townhouse%20bedroom%20with%20modern%20design%2C%20large%20windows%2C%20elegant%20furniture%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=town4&orientation=landscape',
        'https://readdy.ai/api/search-image?query=townhouse%20rooftop%20terrace%20with%20outdoor%20furniture%2C%20city%20view%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=town5&orientation=landscape'
      ]
    },
    {
      id: 8,
      title: 'Lakeside Cottage',
      location: 'Seattle, WA',
      fullAddress: '678 Lake Shore Drive, Seattle, WA 98101',
      price: 950000,
      type: 'Cottage',
      bedrooms: 2,
      bathrooms: 2,
      area: 1500,
      yearBuilt: 2021,
      status: 'Verified',
      seller: {
        name: 'Jennifer Lee',
        phone: '+1 (206) 555-0901',
        email: 'jennifer@primeestate.com',
        verified: true
      },
      description: 'Charming lakeside cottage offering peaceful waterfront living. This cozy retreat features a wooden deck with stunning lake views. The interior includes an open living area with fireplace, modern kitchen, and two comfortable bedrooms. Perfect for weekend getaways or year-round living. Private dock access for boating and water activities.',
      features: [
        'Lake Views',
        'Private Dock',
        'Wooden Deck',
        'Fireplace',
        'Modern Kitchen',
        'Open Living Area',
        'Waterfront Access',
        'Peaceful Setting',
        'Boat Storage',
        'Garden Area',
        'Covered Porch',
        'Pet Friendly'
      ],
      images: [
        'https://readdy.ai/api/search-image?query=charming%20lakeside%20cottage%20with%20wooden%20deck%2C%20peaceful%20water%20view%2C%20cozy%20interior%2C%20professional%20real%20estate%20photography%2C%20simple%20clean%20background&width=1200&height=800&seq=lake1&orientation=landscape',
        'https://readdy.ai/api/search-image?query=cottage%20living%20room%20with%20fireplace%2C%20cozy%20furniture%2C%20lake%20view%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=lake2&orientation=landscape',
        'https://readdy.ai/api/search-image?query=cottage%20kitchen%20with%20wooden%20cabinets%2C%20modern%20appliances%2C%20cozy%20design%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=lake3&orientation=landscape',
        'https://readdy.ai/api/search-image?query=cottage%20bedroom%20with%20cozy%20furniture%2C%20lake%20view%2C%20natural%20light%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=lake4&orientation=landscape',
        'https://readdy.ai/api/search-image?query=cottage%20wooden%20deck%20with%20outdoor%20furniture%2C%20lake%20view%2C%20peaceful%20setting%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=lake5&orientation=landscape'
      ]
    },
    {
      id: 9,
      title: 'Luxury Condo',
      location: 'Miami, FL',
      fullAddress: '890 Ocean Drive, Miami, FL 33139',
      price: 1650000,
      type: 'Condo',
      bedrooms: 3,
      bathrooms: 2,
      area: 2000,
      yearBuilt: 2023,
      status: 'Verified',
      seller: {
        name: 'Carlos Martinez',
        phone: '+1 (305) 555-0123',
        email: 'carlos@primeestate.com',
        verified: true
      },
      description: 'Stunning luxury condominium with breathtaking ocean views. This modern unit features floor-to-ceiling windows, elegant finishes, and a spacious balcony overlooking the Atlantic. The open-concept living area flows seamlessly to the gourmet kitchen. Three bedrooms provide ample space for family or guests. Building amenities include pool, fitness center, spa, and 24-hour security.',
      features: [
        'Ocean Views',
        'Private Balcony',
        'Floor-to-Ceiling Windows',
        'Gourmet Kitchen',
        'Elegant Finishes',
        'Building Pool',
        'Fitness Center',
        'Spa Access',
        '24-Hour Security',
        'Concierge Service',
        'Covered Parking',
        'Beach Access'
      ],
      images: [
        'https://readdy.ai/api/search-image?query=luxury%20condominium%20with%20modern%20interior%2C%20ocean%20view%20balcony%2C%20elegant%20finishes%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=condo1&orientation=landscape',
        'https://readdy.ai/api/search-image?query=luxury%20condo%20living%20room%20with%20ocean%20view%2C%20modern%20furniture%2C%20floor%20to%20ceiling%20windows%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=condo2&orientation=landscape',
        'https://readdy.ai/api/search-image?query=luxury%20condo%20kitchen%20with%20modern%20appliances%2C%20elegant%20finishes%2C%20ocean%20view%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=condo3&orientation=landscape',
        'https://readdy.ai/api/search-image?query=luxury%20condo%20bedroom%20with%20ocean%20view%2C%20modern%20design%2C%20elegant%20furniture%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=condo4&orientation=landscape',
        'https://readdy.ai/api/search-image?query=luxury%20condo%20balcony%20with%20ocean%20view%2C%20outdoor%20furniture%2C%20miami%20skyline%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=1200&height=800&seq=condo5&orientation=landscape'
      ]
    }
  ];

  // Find the property based on URL parameter
  const property = allProperties.find(p => p.id === parseInt(id || '1')) || allProperties[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: "I'm interested in this property..."
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendMessage = () => {
    if (formData.name && formData.email && formData.message) {
      // Show success message
      setShowSuccessMessage(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: "I'm interested in this property..."
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-teal-600 cursor-pointer">Home</Link>
            <i className="ri-arrow-right-s-line mx-2"></i>
            <Link to="/properties" className="hover:text-teal-600 cursor-pointer">Properties</Link>
            <i className="ri-arrow-right-s-line mx-2"></i>
            <span className="text-gray-900">{property.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-8">
                <div className="relative w-full h-96">
                  <img
                    src={property.images[selectedImage]}
                    alt={property.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white px-4 py-2 rounded-full font-semibold whitespace-nowrap">
                    {property.status}
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2 p-4">
                  {property.images.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-full h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                        selectedImage === index ? 'ring-4 ring-teal-600' : 'hover:opacity-75'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`View ${index + 1}`}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Details */}
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{property.title}</h1>
                    <p className="text-lg text-gray-600 flex items-center">
                      <i className="ri-map-pin-line mr-2"></i>
                      {property.fullAddress}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-teal-600 mb-2">
                      ${property.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">{property.type}</div>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-gray-200">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <i className="ri-hotel-bed-line text-2xl text-teal-600"></i>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <i className="ri-drop-line text-2xl text-teal-600"></i>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <i className="ri-ruler-line text-2xl text-teal-600"></i>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{property.area}</div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <i className="ri-calendar-line text-2xl text-teal-600"></i>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{property.yearBuilt}</div>
                    <div className="text-sm text-gray-600">Year Built</div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                  <p className="text-gray-600 leading-relaxed">{property.description}</p>
                </div>

                {/* Features */}
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Features & Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <i className="ri-checkbox-circle-fill text-teal-600 mr-2"></i>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
                <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.4537!2d-118.4!3d34.09!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDA1JzI0LjAiTiAxMTjCsDI0JzAwLjAiVw!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Seller Info & Contact Form */}
              <div className="bg-white rounded-xl shadow-lg p-8 mb-6 sticky top-24">
                {/* Seller Profile */}
                <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
                  <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mr-4 text-white text-2xl font-bold">
                    {property.seller.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{property.seller.name}</div>
                    <div className="text-sm text-gray-600">Property Owner</div>
                    {property.seller.verified && (
                      <div className="flex items-center text-sm text-gray-700 mt-1">
                        <i className="ri-checkbox-circle-fill text-teal-600 mr-1"></i>
                        Verified
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center bg-gray-50 px-4 py-3 rounded-lg">
                    <i className="ri-phone-line text-teal-600 text-xl mr-3"></i>
                    <span className="text-sm text-gray-700">{property.seller.phone}</span>
                  </div>
                  <div className="flex items-center bg-gray-50 px-4 py-3 rounded-lg">
                    <i className="ri-mail-line text-teal-600 text-xl mr-3"></i>
                    <span className="text-sm text-gray-700">{property.seller.email}</span>
                  </div>
                </div>

                {/* Send Inquiry Form */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <i className="ri-message-3-line mr-2"></i>
                    Send Inquiry
                  </h3>
                  
                  {/* Success Message */}
                  {showSuccessMessage && (
                    <div className="mb-4 bg-teal-50 border border-teal-200 rounded-lg p-4 flex items-start animate-fade-in">
                      <i className="ri-checkbox-circle-fill text-teal-600 text-xl mr-3 mt-0.5"></i>
                      <div>
                        <p className="text-teal-800 font-semibold text-sm">Message Sent Successfully!</p>
                        <p className="text-teal-700 text-sm mt-1">The property owner will contact you soon.</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm transition-all duration-300"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your Email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm transition-all duration-300"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your Phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm transition-all duration-300"
                    />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="I'm interested in this property..."
                      rows={4}
                      maxLength={500}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm resize-none transition-all duration-300"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
