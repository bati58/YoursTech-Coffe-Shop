// Central place for business details.
// Only fill in real information here — empty values are simply hidden in the UI.
const brandName = "YoursTech";
const businessType = "Coffee Shop";

export const site = {
  name: brandName,
  businessType,
  fullName: `${brandName} ${businessType}`,
  currency: "ETB",
  tagline: "Crafted with Passion. Served with Warmth.",
  announcement: "Freshly brewed, every cup — order online and pick up with ease.",
  openingHours: [], // e.g. [{ days: "Mon – Fri", hours: "7:00 – 19:00" }]
  contact: {
    address: "Ethiopia, Addis Ababa",
    phone: "+251 96 248 9700",
    email: "Info@yourstech.academy",
    website: "https://yourstech.net/",
  },
  social: {
    instagram: "",
    facebook: "https://www.facebook.com/YoursTechlso/",
    telegram: "https://t.me/yourstechacademy",
    tiktok: "",
    x: "",
  },
};

// Order charges. Leave at 0 to hide the line at checkout.
export const charges = {
  taxRate: 0, // e.g. 0.15 for 15%
  serviceFee: 0, // flat amount, e.g. 0.5
};
