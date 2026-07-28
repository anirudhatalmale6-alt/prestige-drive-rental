/* Demo fleet data — real makes/models from the client.
   Photos are elegant placeholders for now; the client's real photos drop straight in. */
window.FLEET = [
  {
    id: "bentley-bentayga-2017",
    make: "Bentley", model: "Bentayga", year: 2017,
    className: "Ultra Luxury SUV",
    photo: "assets/cars/bentley.jpg",
    price: 895,
    seats: 5, doors: 4, transmission: "Automatic", fuel: "Petrol", drive: "AWD",
    features: ["Nappa leather interior", "Panoramic roof", "Naim premium audio", "Heated & cooled seats", "Adaptive cruise", "22\" alloy wheels"],
    desc: "The Bentayga blends hand-crafted British luxury with genuine SUV capability. A statement car for weddings, executive travel, or an unforgettable weekend.",
    accent: "#1b3d2f",
    booked: [["2026-08-02","2026-08-05"]]
  },
  {
    id: "bmw-x6-2021",
    make: "BMW", model: "X6", year: 2021,
    className: "Sports Activity Coupe",
    photo: "assets/cars/x6.jpg",
    price: 320,
    seats: 5, doors: 4, transmission: "Automatic", fuel: "Petrol", drive: "AWD",
    features: ["M Sport package", "Harman Kardon audio", "Panoramic roof", "Wireless CarPlay", "Heated seats", "360° camera"],
    desc: "Coupe styling on a commanding SUV frame. The X6 is the perfect blend of aggressive looks and everyday comfort.",
    accent: "#1c2a3a",
    booked: []
  },
  {
    id: "cadillac-ct4-2023",
    make: "Cadillac", model: "CT4", year: 2023,
    className: "Luxury Sport Sedan",
    photo: "assets/cars/ct4.jpg",
    price: 175,
    seats: 5, doors: 4, transmission: "Automatic", fuel: "Petrol", drive: "RWD",
    features: ["Leather seating", "Bose audio", "Wireless charging", "Apple CarPlay", "Lane assist", "Remote start"],
    desc: "A nimble, refined sport sedan that punches above its class. Ideal for business trips and city driving in style.",
    accent: "#2a2320",
    booked: []
  },
  {
    id: "cadillac-escalade-2021",
    make: "Cadillac", model: "Escalade", year: 2021,
    className: "Full-Size Luxury SUV",
    photo: "assets/cars/escalade.jpg",
    price: 425,
    seats: 7, doors: 4, transmission: "Automatic", fuel: "Petrol", drive: "4WD",
    features: ["7-seat leather cabin", "38\" curved OLED display", "AKG 36-speaker audio", "Super Cruise", "Rear entertainment", "Power running boards"],
    desc: "The definition of American luxury. Seven seats of leather and tech — the go-to for group travel, airport runs, and events.",
    accent: "#20222a",
    booked: [["2026-07-30","2026-08-01"]]
  },
  {
    id: "gmc-terrain-2026",
    make: "GMC", model: "Terrain", year: 2026,
    className: "Compact SUV",
    photo: "assets/cars/terrain.jpg",
    price: 135,
    seats: 5, doors: 4, transmission: "Automatic", fuel: "Petrol", drive: "AWD",
    features: ["Latest-gen infotainment", "Wireless CarPlay/Android Auto", "Heated seats", "Adaptive cruise", "Wireless charging", "Roof rails"],
    desc: "Brand-new, efficient and comfortable. A great-value everyday rental with all the modern tech and a smooth ride.",
    accent: "#25292c",
    booked: []
  },
  {
    id: "mazda-cx90-2024",
    make: "Mazda", model: "CX-90", year: 2024,
    className: "3-Row Premium SUV",
    photo: "assets/cars/cx90.jpg",
    price: 165,
    seats: 7, doors: 4, transmission: "Automatic", fuel: "Petrol", drive: "AWD",
    features: ["3-row seating", "Nappa leather", "Bose audio", "Panoramic roof", "360° camera", "Adaptive cruise"],
    desc: "Premium three-row comfort with a driver-focused feel. Perfect for families or groups who don't want to compromise on style.",
    accent: "#2a1e24",
    booked: []
  },
  {
    id: "mercedes-gt53-amg-2020",
    make: "Mercedes-AMG", model: "GT 53", year: 2020,
    className: "4-Door Performance Coupe",
    price: 545,
    seats: 4, doors: 4, transmission: "Automatic", fuel: "Petrol", drive: "AWD",
    features: ["AMG 3.0L turbo", "Burmester surround sound", "AMG Ride Control", "Ambient lighting", "Head-up display", "Performance exhaust"],
    desc: "A genuine AMG with four doors and serious pace. Turns heads everywhere while staying comfortable enough for daily use.",
    accent: "#1a1a1d",
    booked: []
  },
  {
    id: "mercedes-glc-2020",
    make: "Mercedes-Benz", model: "GLC-Class", year: 2020,
    className: "Luxury Compact SUV",
    photo: "assets/cars/glc.jpg",
    price: 210,
    seats: 5, doors: 4, transmission: "Automatic", fuel: "Petrol", drive: "AWD",
    features: ["MBUX infotainment", "Leather interior", "Burmester audio", "Panoramic roof", "Heated seats", "Wireless CarPlay"],
    desc: "The benchmark luxury compact SUV. Quiet, refined and beautifully finished — a reliable premium choice for any trip.",
    accent: "#232628",
    booked: []
  },
  {
    id: "mercedes-s580-2022",
    make: "Mercedes-Benz", model: "S 580", year: 2022,
    className: "Flagship Luxury Sedan",
    photo: "assets/cars/s580.jpg",
    price: 675,
    seats: 5, doors: 4, transmission: "Automatic", fuel: "Petrol", drive: "AWD",
    features: ["Executive rear seats", "Burmester 4D audio", "Rear-seat screens", "Massage seats", "MBUX Hyperscreen", "Air suspension"],
    desc: "The pinnacle of the S-Class line. First-class rear seating and cutting-edge tech — the ultimate for VIP transport and special occasions.",
    accent: "#191b1f",
    booked: [["2026-08-10","2026-08-14"]]
  }
];
