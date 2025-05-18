// export default BudgetPlanner;
import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

const BudgetPlanner = () => {
  const [budget, setBudget] = useState("")
  const [eventType, setEventType] = useState("wedding")
  const [guestCount, setGuestCount] = useState("")
  const [budgetBreakdown, setBudgetBreakdown] = useState(null)
  const [showVendors, setShowVendors] = useState(false)

  const COLORS = ["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe", "#7c3aed", "#6d28d9"]

  const eventTypes = [
    { value: "wedding", label: "Wedding" },
    { value: "corporate", label: "Corporate Event" },
    { value: "birthday", label: "Birthday Party" },
    { value: "conference", label: "Conference" },
    { value: "other", label: "Other" },
  ]

  const calculateBudget = () => {
    if (!budget || !guestCount) return

    const totalBudget = Number.parseFloat(budget)
    const guests = Number.parseInt(guestCount)

    let breakdown = []

    // Different budget allocations based on event type
    switch (eventType) {
      case "wedding":
        breakdown = [
          { name: "Venue", value: totalBudget * 0.4, description: "Ceremony and reception location" },
          { name: "Catering", value: totalBudget * 0.25, description: "Food and beverages" },
          { name: "Photography", value: totalBudget * 0.1, description: "Professional photography services" },
          { name: "Decor", value: totalBudget * 0.1, description: "Flowers, centerpieces, and decorations" },
          { name: "Attire", value: totalBudget * 0.08, description: "Wedding dress, suits, and accessories" },
          { name: "Entertainment", value: totalBudget * 0.05, description: "DJ or live music" },
          { name: "Miscellaneous", value: totalBudget * 0.02, description: "Favors, gifts, and unexpected expenses" },
        ]
        break
      case "corporate":
        breakdown = [
          { name: "Venue", value: totalBudget * 0.35, description: "Event space rental" },
          { name: "Catering", value: totalBudget * 0.3, description: "Food and beverages" },
          {
            name: "Technology",
            value: totalBudget * 0.15,
            description: "AV equipment, presentations, and tech support",
          },
          { name: "Speakers", value: totalBudget * 0.1, description: "Guest speakers and presenters" },
          { name: "Marketing", value: totalBudget * 0.05, description: "Promotional materials and advertising" },
          { name: "Decor", value: totalBudget * 0.03, description: "Stage design and branding elements" },
          { name: "Miscellaneous", value: totalBudget * 0.02, description: "Unexpected expenses and contingency" },
        ]
        break
      case "birthday":
        breakdown = [
          { name: "Venue", value: totalBudget * 0.3, description: "Party location" },
          { name: "Food & Drinks", value: totalBudget * 0.35, description: "Catering, cake, and beverages" },
          { name: "Entertainment", value: totalBudget * 0.15, description: "Music, games, or performers" },
          { name: "Decor", value: totalBudget * 0.1, description: "Balloons, banners, and themed decorations" },
          { name: "Gifts", value: totalBudget * 0.05, description: "Party favors for guests" },
          { name: "Photography", value: totalBudget * 0.03, description: "Professional photos or photo booth" },
          { name: "Miscellaneous", value: totalBudget * 0.02, description: "Unexpected expenses" },
        ]
        break
      case "conference":
        breakdown = [
          { name: "Venue", value: totalBudget * 0.3, description: "Conference center or hotel" },
          { name: "Catering", value: totalBudget * 0.25, description: "Meals, coffee breaks, and refreshments" },
          { name: "Speakers", value: totalBudget * 0.2, description: "Keynote and session speakers" },
          {
            name: "Technology",
            value: totalBudget * 0.15,
            description: "AV equipment, streaming, and app development",
          },
          { name: "Marketing", value: totalBudget * 0.05, description: "Promotion and attendee acquisition" },
          { name: "Staff", value: totalBudget * 0.03, description: "Event coordinators and on-site support" },
          { name: "Miscellaneous", value: totalBudget * 0.02, description: "Unexpected expenses and contingency" },
        ]
        break
      default:
        breakdown = [
          { name: "Venue", value: totalBudget * 0.35, description: "Event location" },
          { name: "Catering", value: totalBudget * 0.3, description: "Food and beverages" },
          { name: "Entertainment", value: totalBudget * 0.15, description: "Music and activities" },
          { name: "Decor", value: totalBudget * 0.1, description: "Decorations and setup" },
          { name: "Staff", value: totalBudget * 0.05, description: "Event coordinators and helpers" },
          { name: "Marketing", value: totalBudget * 0.03, description: "Invitations and promotion" },
          { name: "Miscellaneous", value: totalBudget * 0.02, description: "Unexpected expenses" },
        ]
    }

    // Calculate per guest cost
    const perGuestCost = totalBudget / guests

    // Round values and add per guest info
    breakdown = breakdown.map((item) => ({
      ...item,
      value: Math.round(item.value),
      perGuest: Math.round(item.value / guests),
    }))

    setBudgetBreakdown({
      breakdown,
      totalBudget,
      perGuestCost: Math.round(perGuestCost),
      guests,
    })
  }

  const vendorData = {
    wedding: [
      { category: "Venue", name: "Grand Ballroom", contact: "contact@grandballroom.com", priceRange: "₹₹₹" },
      { category: "Venue", name: "Garden Estate", contact: "events@gardenestate.com", priceRange: "₹₹₹₹" },
      { category: "Catering", name: "Gourmet Delights", contact: "555-123-4567", priceRange: "₹₹₹" },
      { category: "Catering", name: "Elegant Eats", contact: "info@eleganteats.com", priceRange: "₹₹" },
      { category: "Photography", name: "Timeless Images", contact: "book@timelessimages.com", priceRange: "₹₹₹" },
      { category: "Decor", name: "Floral Fantasy", contact: "orders@floralfantasy.com", priceRange: "₹₹" },
      { category: "Entertainment", name: "Rhythm DJs", contact: "555-987-6543", priceRange: "₹₹" },
    ],
    corporate: [
      { category: "Venue", name: "Business Center", contact: "events@businesscenter.com", priceRange: "₹₹₹" },
      { category: "Venue", name: "Downtown Hotel", contact: "corporate@downtownhotel.com", priceRange: "₹₹₹₹" },
      { category: "Catering", name: "Executive Catering", contact: "555-234-5678", priceRange: "₹₹₹" },
      { category: "Technology", name: "Tech Solutions", contact: "support@techsolutions.com", priceRange: "₹₹" },
      { category: "Speakers", name: "Speaker Bureau", contact: "talent@speakerbureau.com", priceRange: "₹₹₹-₹₹₹₹" },
    ],
    birthday: [
      { category: "Venue", name: "Fun Zone", contact: "parties@funzone.com", priceRange: "₹₹" },
      { category: "Food & Drinks", name: "Party Platters", contact: "orders@partyplatters.com", priceRange: "₹₹" },
      { category: "Entertainment", name: "Happy Entertainers", contact: "555-345-6789", priceRange: "₹₹" },
      { category: "Decor", name: "Party Paradise", contact: "sales@partyparadise.com", priceRange: "₹" },
    ],
    conference: [
      { category: "Venue", name: "Convention Center", contact: "booking@conventioncenter.com", priceRange: "₹₹₹₹" },
      { category: "Catering", name: "Conference Cuisine", contact: "555-456-7890", priceRange: "₹₹₹" },
      { category: "Technology", name: "AV Experts", contact: "service@avexperts.com", priceRange: "₹₹₹" },
      {
        category: "Speakers",
        name: "Keynote Connections",
        contact: "speakers@keynoteconnections.com",
        priceRange: "₹₹₹₹",
      },
    ],
    other: [
      { category: "Venue", name: "Versatile Venues", contact: "info@versatilevenues.com", priceRange: "₹₹₹" },
      { category: "Catering", name: "Custom Catering", contact: "555-567-8901", priceRange: "₹₹-₹₹₹" },
      {
        category: "Entertainment",
        name: "Event Entertainment",
        contact: "book@evententertainment.com",
        priceRange: "₹₹",
      },
      { category: "Decor", name: "Decor Designs", contact: "create@decordesigns.com", priceRange: "₹₹" },
    ],
  }

  // Format currency for Indian Rupees
  const formatIndianRupees = (value) => {
    return `₹${value.toLocaleString('en-IN')}`
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Event Budget Planner</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          >
            {eventTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Budget (₹)</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter your total budget"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
          <input
            type="number"
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
            placeholder="Enter number of guests"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={calculateBudget}
            className="w-full p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Calculate Budget Breakdown
          </button>
        </div>
      </div>

      {budgetBreakdown && (
        <div className="mt-8">
          <div className="bg-purple-50 p-4 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-purple-800 mb-2">Budget Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-sm text-gray-500">Total Budget</p>
                <p className="text-2xl font-bold text-purple-700">{formatIndianRupees(budgetBreakdown.totalBudget)}</p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-sm text-gray-500">Number of Guests</p>
                <p className="text-2xl font-bold text-purple-700">{budgetBreakdown.guests}</p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-sm text-gray-500">Cost per Guest</p>
                <p className="text-2xl font-bold text-purple-700">{formatIndianRupees(budgetBreakdown.perGuestCost)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-purple-800 mb-4">Budget Allocation</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetBreakdown.breakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {budgetBreakdown.breakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatIndianRupees(value)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-purple-800 mb-4">Detailed Breakdown</h3>
              <div className="overflow-y-auto max-h-64">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Per Guest
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {budgetBreakdown.breakdown.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.description}</div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-gray-900">{formatIndianRupees(item.value)}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-gray-900">{formatIndianRupees(item.perGuest)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-purple-800">Recommended Vendors</h3>
              <button
                onClick={() => setShowVendors(!showVendors)}
                className="text-sm text-purple-600 hover:text-purple-800"
              >
                {showVendors ? "Hide Vendors" : "Show Vendors"}
              </button>
            </div>

            {showVendors && (
              <div className="bg-white p-4 rounded-lg shadow-sm overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vendor Name
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price Range
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {vendorData[eventType].map((vendor, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2 whitespace-nowrap text-gray-900">{vendor.category}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-gray-900">{vendor.name}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-gray-500">{vendor.contact}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-gray-500">{vendor.priceRange}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default BudgetPlanner