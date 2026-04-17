import type { Location } from "@/types";

export const LOCATIONS: Location[] = [
  // ─── BATON ROUGE — Natural ────────────────────────────────────────────
  {
    id: "br-burden-gardens",
    name: "LSU Burden Gardens & Rural Life Museum",
    city: "baton_rouge",
    category: "natural",
    description:
      "Mossy oaks, a rose garden blooming nearly year-round, winding gravel paths, and a quaint historic church. One of Baton Rouge's most versatile outdoor backdrops.",
    address: "4560 Essen Ln, Baton Rouge, LA 70809",
    tags: ["trees", "gardens", "rustic", "lush", "historic"],
    imageUrl: "/locations/br-burden-gardens.jpg",
    bestFor: ["family", "maternity", "engagement", "graduation", "branding"],
  },
  {
    id: "br-arsenal-park",
    name: "Arsenal Park & Capitol Grounds",
    city: "baton_rouge",
    category: "natural",
    description:
      "Downtown park lined with sweeping live oaks, open green space, and the State Capitol as a stunning backdrop. Great for moving through multiple looks in one session.",
    address: "State Capitol Dr, Baton Rouge, LA 70801",
    tags: ["oaks", "open", "landmark", "downtown", "iconic"],
    imageUrl: "/locations/br-arsenal-park.jpg",
    bestFor: ["family", "graduation", "headshot", "engagement", "birthday"],
  },
  {
    id: "br-city-park",
    name: "City Park / Dalrymple Drive",
    city: "baton_rouge",
    category: "natural",
    description:
      "Canopied live oaks, open lakeside paths, and golden light filtering through Spanish moss. A classic Louisiana portrait setting beloved by photographers.",
    address: "City Park, Baton Rouge, LA 70808",
    tags: ["oaks", "lake", "golden hour", "Spanish moss", "romantic"],
    imageUrl: "/locations/br-city-park.jpg",
    bestFor: ["family", "engagement", "maternity", "graduation", "birthday"],
  },
  {
    id: "br-bluebonnet-swamp",
    name: "Bluebonnet Swamp Nature Center",
    city: "baton_rouge",
    category: "natural",
    description:
      "Elevated boardwalks through lush Louisiana swamp, cypress trees, and reflective water. A uniquely moody, cinematic South Louisiana setting.",
    address: "10503 N Oak Hills Pkwy, Baton Rouge, LA 70810",
    tags: ["swamp", "moody", "water", "cypress", "cinematic"],
    imageUrl: "/locations/br-bluebonnet-swamp.jpg",
    bestFor: ["branding", "engagement", "maternity"],
  },

  // ─── BATON ROUGE — Urban ──────────────────────────────────────────────
  {
    id: "br-downtown",
    name: "Downtown Baton Rouge",
    city: "baton_rouge",
    category: "urban",
    description:
      "Historic architecture, colorful murals, brick streets, and the Mississippi River waterfront. Endlessly varied for an editorial look.",
    address: "Downtown Baton Rouge, LA 70801",
    tags: ["murals", "brick", "historic", "waterfront", "editorial"],
    imageUrl: "/locations/br-downtown.jpg",
    bestFor: ["headshot", "branding", "graduation", "birthday", "engagement"],
  },
  {
    id: "br-electric-depot",
    name: "Electric Depot / Mid City Arts District",
    city: "baton_rouge",
    category: "urban",
    description:
      "Converted warehouse complex with industrial textures, wall murals, and the beloved Achroma Studio on-site. A creative hub with authentic Mid City character.",
    address: "1509 Government St, Baton Rouge, LA 70802",
    tags: ["industrial", "murals", "warehouse", "creative", "textured"],
    imageUrl: "/locations/br-electric-depot.jpg",
    bestFor: ["branding", "headshot", "birthday", "graduation"],
  },
  {
    id: "br-old-state-capitol",
    name: "Old State Capitol",
    city: "baton_rouge",
    category: "urban",
    description:
      "Gothic Revival castle with iconic stained glass interiors and manicured grounds. One of Baton Rouge's most photographed buildings — inside and out.",
    address: "100 North Blvd, Baton Rouge, LA 70801",
    tags: ["castle", "stained glass", "gothic", "landmark", "dramatic"],
    imageUrl: "/locations/br-old-state-capitol.jpg",
    bestFor: ["graduation", "engagement", "headshot", "birthday"],
  },

  // ─── BATON ROUGE — Hybrid ─────────────────────────────────────────────
  {
    id: "br-library",
    name: "Main Library at Goodwood",
    city: "baton_rouge",
    category: "hybrid",
    description:
      "Architecture meets greenery — exterior gardens, architectural details, and clean modern lines blend beautifully for a polished look.",
    address: "7711 Goodwood Blvd, Baton Rouge, LA 70806",
    tags: ["architecture", "gardens", "clean", "modern", "polished"],
    imageUrl: "/locations/br-library.jpg",
    bestFor: ["headshot", "graduation", "branding", "family"],
  },
  {
    id: "br-lsu-campus",
    name: "LSU Campus",
    city: "baton_rouge",
    category: "hybrid",
    description:
      "Grand oak alleys, collegiate architecture, open quads, and iconic Memorial Tower. Perfect for graduation and academic milestones.",
    address: "Baton Rouge, LA 70803",
    tags: ["oaks", "collegiate", "historic", "graduation", "grand"],
    imageUrl: "/locations/br-lsu-campus.jpg",
    bestFor: ["graduation", "headshot", "family", "branding"],
  },

  // ─── BATON ROUGE — Studios ────────────────────────────────────────────
  {
    id: "br-achroma",
    name: "Achroma Studio",
    city: "baton_rouge",
    category: "studio",
    description:
      "Located in the Electric Depot complex in Mid City. Features a classic white seamless backdrop and rustic set pieces. Versatile, clean, and centrally located.",
    address: "1509 Government St, Baton Rouge, LA 70802",
    priceNote: "$75/hr — added to session total",
    tags: ["white seamless", "rustic", "versatile", "mid city", "indoor"],
    imageUrl: "/locations/br-achroma.jpg",
    bestFor: ["headshot", "branding", "birthday", "family", "maternity"],
  },
  {
    id: "br-exprosures",
    name: "exPROsures Studio 2",
    city: "baton_rouge",
    category: "studio",
    description:
      "Luxury studio with 5 custom themed sets plus seamless backdrops in multiple colors. Includes a hair/MUA station. Ideal for clients who want multiple distinct looks in one session.",
    address: "4592 S Sherwood Forest Blvd #128, Baton Rouge, LA 70816",
    priceNote: "$90/hr — added to session total",
    tags: ["themed sets", "luxury", "multiple looks", "MUA station", "seamless"],
    imageUrl: "/locations/br-exprosures.jpg",
    bestFor: ["headshot", "branding", "birthday", "family", "maternity"],
  },
  {
    id: "br-geaux-create",
    name: "Geaux Create Studios",
    city: "baton_rouge",
    category: "studio",
    description:
      "Themed studio rooms ranging from rustic to elegant, with props available on-site. You can also bring your own items. Great for themed portrait sessions.",
    address: "2320 Drusilla Ln, Baton Rouge, LA 70809",
    priceNote: "$78/hr — added to session total",
    tags: ["themed rooms", "props", "rustic", "elegant", "creative"],
    imageUrl: "/locations/br-geaux-create.jpg",
    bestFor: ["birthday", "branding", "headshot", "family", "holiday"],
  },

  // ─── LAFAYETTE ────────────────────────────────────────────────────────
  {
    id: "laf-moncus-park",
    name: "Moncus Park",
    city: "lafayette",
    category: "natural",
    description:
      "Lafayette's beloved midtown gem. Rolling hills, ponds, native wildflower trails, and a variety of scenic spots that give every session a fresh look.",
    address: "201 Moncus Park Dr, Lafayette, LA 70503",
    tags: ["park", "trails", "pond", "hills", "wildflowers"],
    imageUrl: "/locations/laf-moncus-park.jpg",
    bestFor: ["family", "engagement", "maternity", "birthday", "graduation"],
  },
  {
    id: "laf-downtown",
    name: "Downtown Lafayette",
    city: "lafayette",
    category: "urban",
    description:
      "Colorful murals, a charming mix of historic and modern buildings, tree-lined streets, and authentic Acadiana character. Free to shoot with no travel fees.",
    address: "Downtown Lafayette, LA 70501",
    tags: ["murals", "colorful", "historic", "walkable", "Cajun"],
    imageUrl: "/locations/laf-downtown.jpg",
    bestFor: ["headshot", "branding", "graduation", "birthday"],
  },
  {
    id: "laf-buhlow-lake",
    name: "Buhlow Lake / Riverside Area",
    city: "lafayette",
    category: "hybrid",
    description:
      "Diverse backdrops in one location: lake and dock, rocks over water, railroad ties, dense forest, tall grass, and open wildflower fields.",
    address: "Pineville, LA 71360",
    tags: ["lake", "dock", "railroad", "tall grass", "wildflowers"],
    imageUrl: "/locations/laf-buhlow-lake.jpg",
    bestFor: ["engagement", "family", "maternity", "birthday"],
  },

  // ─── NEW ORLEANS ──────────────────────────────────────────────────────
  {
    id: "nola-city-park",
    name: "City Park — Dueling Oaks & NOMA",
    city: "new_orleans",
    category: "natural",
    description:
      "Ancient live oaks draped in Spanish moss, tranquil lagoon paths, and the grand New Orleans Museum of Art as a backdrop. Timeless and breathtaking.",
    address: "1 Palm Dr, New Orleans, LA 70124",
    tags: ["oaks", "Spanish moss", "NOMA", "lagoon", "timeless"],
    imageUrl: "/locations/nola-city-park.jpg",
    bestFor: ["engagement", "family", "maternity", "graduation", "birthday"],
  },
  {
    id: "nola-audubon",
    name: "Audubon Park",
    city: "new_orleans",
    category: "natural",
    description:
      "1,300-acre urban park with centuries-old oaks, lush green meadows, and beautiful lagoon views. One of New Orleans' most beloved portrait locations.",
    address: "6500 Magazine St, New Orleans, LA 70118",
    tags: ["oaks", "meadow", "lagoon", "serene", "uptown"],
    imageUrl: "/locations/nola-audubon.jpg",
    bestFor: ["family", "engagement", "maternity", "branding"],
  },
  {
    id: "nola-french-quarter",
    name: "French Quarter & Jackson Square",
    city: "new_orleans",
    category: "urban",
    description:
      "Vibrant wrought-iron balconies, colorful Creole architecture, flagstone streets, and the iconic St. Louis Cathedral. Pure New Orleans energy.",
    address: "French Quarter, New Orleans, LA 70116",
    tags: ["balconies", "colorful", "historic", "iconic", "NOLA"],
    imageUrl: "/locations/nola-french-quarter.jpg",
    bestFor: ["branding", "birthday", "graduation", "headshot", "engagement"],
  },
  {
    id: "nola-marigny",
    name: "Faubourg Marigny",
    city: "new_orleans",
    category: "urban",
    description:
      "A neighborhood of vibrant shotgun houses, street art, live oak corridors, and authentic New Orleans personality. Colorful, photogenic, and one-of-a-kind.",
    address: "Faubourg Marigny, New Orleans, LA 70117",
    tags: ["shotgun houses", "colorful", "street art", "artsy", "unique"],
    imageUrl: "/locations/nola-marigny.jpg",
    bestFor: ["branding", "birthday", "headshot", "engagement"],
  },
  {
    id: "nola-garden-district",
    name: "Garden District",
    city: "new_orleans",
    category: "hybrid",
    description:
      "Antebellum mansions, lush magnolia trees, wrought-iron fences, and Magazine Street. Upscale, elegant, and beautifully lush.",
    address: "Garden District, New Orleans, LA 70130",
    tags: ["mansions", "magnolia", "elegant", "upscale", "Magazine St"],
    imageUrl: "/locations/nola-garden-district.jpg",
    bestFor: ["engagement", "family", "branding", "maternity", "birthday"],
  },
];

export function getLocationById(id: string): Location | undefined {
  return LOCATIONS.find((l) => l.id === id);
}

export function getLocationsByCity(city: string): Location[] {
  return LOCATIONS.filter((l) => l.city === city);
}

export const CITY_LABELS: Record<string, string> = {
  baton_rouge: "Baton Rouge",
  lafayette: "Lafayette",
  new_orleans: "New Orleans",
  flexible: "I'm Flexible",
  other: "Out of Town / Custom",
};

export const CATEGORY_LABELS: Record<string, string> = {
  natural: "Natural",
  urban: "Urban",
  hybrid: "Urban + Nature",
  studio: "Indoor Studio",
};
