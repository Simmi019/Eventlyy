import React, { useState } from "react";

const VendorDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "venue", name: "Venues" },
    { id: "catering", name: "Catering" },
    { id: "photography", name: "Photography & Videography" },
    { id: "decor", name: "Decor & Flowers" },
    { id: "entertainment", name: "Entertainment" },
    { id: "planning", name: "Event Planning" },
    { id: "rentals", name: "Rentals & Equipment" },
  ];

  const priceRanges = [
    { id: "all", name: "All Price Ranges" },
    { id: "$", name: "Budget (₹10,000 - ₹30,000)" },
    { id: "$$", name: "Moderate (₹30,000 - ₹70,000)" },
    { id: "$$$", name: "Premium (₹70,000 - ₹1,50,000)" },
    { id: "$$$$", name: "Luxury (₹1,50,000 and above)" },
  ];

  const locations = [
    { id: "all", name: "All Locations" },
    { id: "downtown", name: "Downtown" },
    { id: "uptown", name: "Uptown" },
    { id: "west", name: "West Side" },
    { id: "east", name: "East Side" },
    { id: "north", name: "North Side" },
    { id: "south", name: "South Side" },
    { id: "suburbs", name: "Suburbs" },
  ];

  const vendors = [
    {
      id: 1,
      name: "Grand Ballroom",
      category: "venue",
      description: "Elegant ballroom venue with capacity for up to 300 guests",
      priceRange: "$$$$",
      location: "downtown",
      priceDetails: "₹2,00,000 to ₹4,00,000",
      contact: {
        phone: "555-123-4567",
        email: "events@grandballroom.com",
        website: "www.grandballroom.com",
      },
      rating: 4.8,
      reviewCount: 156,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Garden Estate",
      category: "venue",
      description: "Beautiful outdoor venue with gardens and indoor facilities",
      priceRange: "$$$",
      location: "suburbs",
      priceDetails: "₹80,000 to ₹1,50,000",
      contact: {
        phone: "555-234-5678",
        email: "bookings@gardenestate.com",
        website: "www.gardenestate.com",
      },
      rating: 4.7,
      reviewCount: 124,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Gourmet Delights",
      category: "catering",
      description: "Premium catering service specializing in international cuisine",
      priceRange: "$$$",
      location: "west",
      priceDetails: "₹50,000 to ₹1,00,000",
      contact: {
        phone: "555-345-6789",
        email: "info@gourmetdelights.com",
        website: "www.gourmetdelights.com",
      },
      rating: 4.9,
      reviewCount: 203,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "Elegant Eats",
      category: "catering",
      description: "Affordable catering options with elegant presentation",
      priceRange: "$$",
      location: "east",
      priceDetails: "₹30,000 to ₹60,000",
      contact: {
        phone: "555-456-7890",
        email: "orders@eleganteats.com",
        website: "www.eleganteats.com",
      },
      rating: 4.5,
      reviewCount: 178,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      name: "Timeless Images",
      category: "photography",
      description: "Award-winning photography and videography services",
      priceRange: "$$$",
      location: "downtown",
      priceDetails: "₹70,000 to ₹1,20,000",
      contact: {
        phone: "555-567-8901",
        email: "book@timelessimages.com",
        website: "www.timelessimages.com",
      },
      rating: 4.8,
      reviewCount: 142,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      name: "Floral Fantasy",
      category: "decor",
      description: "Creative floral arrangements and event decoration",
      priceRange: "$$",
      location: "north",
      priceDetails: "₹25,000 to ₹50,000",
      contact: {
        phone: "555-678-9012",
        email: "orders@floralfantasy.com",
        website: "www.floralfantasy.com",
      },
      rating: 4.6,
      reviewCount: 98,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 7,
      name: "Rhythm DJs",
      category: "entertainment",
      description: "Professional DJ services for all types of events",
      priceRange: "$$",
      location: "south",
      priceDetails: "₹30,000 to ₹60,000",
      contact: {
        phone: "555-789-0123",
        email: "bookings@rhythmdjs.com",
        website: "www.rhythmdjs.com",
      },
      rating: 4.7,
      reviewCount: 115,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 8,
      name: "Event Experts",
      category: "planning",
      description: "Full-service event planning and coordination",
      priceRange: "$$$",
      location: "downtown",
      priceDetails: "₹1,00,000 to ₹2,00,000",
      contact: {
        phone: "555-890-1234",
        email: "plan@eventexperts.com",
        website: "www.eventexperts.com",
      },
      rating: 4.9,
      reviewCount: 167,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 9,
      name: "Party Equipment Rentals",
      category: "rentals",
      description: "Tables, chairs, tents, and equipment for any event",
      priceRange: "$",
      location: "west",
      priceDetails: "₹10,000 to ₹30,000",
      contact: {
        phone: "555-901-2345",
        email: "rentals@partyequipment.com",
        website: "www.partyequipment.com",
      },
      rating: 4.4,
      reviewCount: 89,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 10,
      name: "Lux Lighting",
      category: "rentals",
      description: "Premium lighting solutions for events and productions",
      priceRange: "$$",
      location: "east",
      priceDetails: "₹30,000 to ₹80,000",
      contact: {
        phone: "555-012-3456",
        email: "info@luxlighting.com",
        website: "www.luxlighting.com",
      },
      rating: 4.6,
      reviewCount: 76,
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  // Filter vendors based on search and filters
  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || vendor.category === selectedCategory;
    const matchesPriceRange = selectedPriceRange === "all" || vendor.priceRange === selectedPriceRange;
    const matchesLocation = selectedLocation === "all" || vendor.location === selectedLocation;

    return matchesSearch && matchesCategory && matchesPriceRange && matchesLocation;
  });

  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-500">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-500">
          ★
        </span>
      );
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Vendor Directory</h2>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              {priceRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.length > 0 ? (
          filteredVendors.map((vendor) => (
            <div key={vendor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={vendor.image || "/placeholder.svg"} alt={vendor.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-purple-800">{vendor.name}</h3>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    {priceRanges.find((range) => range.id === vendor.priceRange)?.name || vendor.priceRange}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">{vendor.description}</p>

                <div className="flex items-center mb-3">
                  <div className="flex mr-1">{renderStars(vendor.rating)}</div>
                  <span className="text-sm text-gray-500">
                    {vendor.rating} ({vendor.reviewCount} reviews)
                  </span>
                </div>

                <div className="text-sm text-gray-600 mb-3">
                  <div>
                    <strong>Category:</strong> {categories.find((cat) => cat.id === vendor.category)?.name}
                  </div>
                  <div>
                    <strong>Location:</strong> {locations.find((loc) => loc.id === vendor.location)?.name}
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <div>
                    <strong>Price Range:</strong> {vendor.priceDetails}
                  </div>
                  <div>
                    <strong>Phone:</strong> {vendor.contact.phone}
                  </div>
                  <div>
                    <strong>Email:</strong> {vendor.contact.email}
                  </div>
                  <div>
                    <strong>Website:</strong> {vendor.contact.website}
                  </div>
                </div>

                <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors">
                  Contact Vendor
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No vendors found matching your criteria. Try adjusting your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDirectory;
