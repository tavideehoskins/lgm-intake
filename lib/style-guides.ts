import type { StyleGuide } from "@/types";

export const STYLE_GUIDES: Partial<Record<string, StyleGuide>> = {
  family: {
    shootType: "family",
    colorPalettes: [
      {
        name: "Earth Tones",
        colors: ["#C4956A", "#8B7355", "#D4C5A9", "#6B7C4F", "#F5EDD6"],
        description: "Rust, olive, cream, and warm tan. Timeless and cohesive outdoors.",
      },
      {
        name: "Navy & Neutrals",
        colors: ["#1B2B4B", "#F5F0E8", "#B8A99A", "#E8D5C4", "#2C3E50"],
        description: "Classic navy anchored with cream and soft neutrals. Always sharp.",
      },
      {
        name: "Jewel Tones",
        colors: ["#6B2D3E", "#2D5016", "#4A1A5C", "#1A3D5C", "#8B4513"],
        description: "Burgundy, forest green, plum — rich and dramatic for fall.",
      },
      {
        name: "Soft Neutrals",
        colors: ["#E8E0D5", "#C9B99A", "#A89880", "#F2EEE8", "#8C7B6B"],
        description: "Warm whites, taupes, and sandy beiges. Light, airy, and clean.",
      },
    ],
    outfitTips: [
      "Coordinate colors — everyone doesn't need to match exactly, but should complement each other.",
      "Pick one 'anchor color' and build everyone else's outfits around it.",
      "Layers add depth — denim jackets, cardigans, and scarves photograph well.",
      "Neutral shoes keep the focus on faces and outfits.",
    ],
    whatToAvoid: [
      "Matching outfits (identical clothing looks dated in photos)",
      "Busy patterns and large logos",
      "Neon or very bright colors that overpower the image",
      "Socks with sandals (visible in seated/ground poses)",
    ],
    whatToBring: [
      "A light blanket or throw for seated poses (especially outdoors)",
      "Comfortable shoes — we'll be moving around",
      "Any meaningful props (letters, signs, flowers)",
      "Touch-up kit (lip balm, powder, hair ties)",
    ],
    proTips: [
      "Dress everyone the night before to avoid morning chaos.",
      "Golden hour (1 hour before sunset) is the most flattering light for outdoor family sessions.",
      "Kids under 5 do best at their natural energy peak — morning sessions are often smoother.",
    ],
  },

  headshot: {
    shootType: "headshot",
    colorPalettes: [
      {
        name: "Corporate Classic",
        colors: ["#1B2B4B", "#2C3E50", "#F5F0E8", "#8B7355", "#4A4A4A"],
        description: "Navy, charcoal, and white. Authoritative and professional.",
      },
      {
        name: "Creative Professional",
        colors: ["#6B2D3E", "#2D5016", "#E8940A", "#1A3D5C", "#F5EDD6"],
        description: "A pop of your personality — jewel tones work great for creatives.",
      },
      {
        name: "Clean & Light",
        colors: ["#FFFFFF", "#F0EDE8", "#C9B99A", "#A89880", "#E0D8D0"],
        description: "White and soft neutrals for a bright, approachable look.",
      },
    ],
    outfitTips: [
      "Solid colors photograph best — they keep the focus on your face.",
      "A blazer or structured jacket elevates your look instantly.",
      "Bring 2–3 outfit options to give variety.",
      "V-necks and open collars are generally more flattering on camera than high necklines.",
    ],
    whatToAvoid: [
      "Logos, slogans, or busy patterns",
      "Overly casual clothing (sweatshirts, athletic wear)",
      "Shiny or reflective fabrics",
      "Bright white — it can blow out under certain lighting",
    ],
    whatToBring: [
      "2–3 outfit options (we can switch during the session)",
      "Any industry-specific items that tell your story",
      "Touch-up kit — powder, lip color, hair products",
    ],
    proTips: [
      "Get a fresh haircut or style 1–2 days before the shoot.",
      "Avoid trying a dramatically new look right before — stick with your signature style.",
      "Rest well the night before — it shows in your eyes.",
    ],
  },

  branding: {
    shootType: "branding",
    colorPalettes: [
      {
        name: "Match Your Brand",
        colors: ["#AB830A", "#040606", "#F9F7F4", "#6B7C4F", "#C4956A"],
        description: "Bring your brand colors into your wardrobe for a cohesive visual story.",
      },
      {
        name: "Clean & Editorial",
        colors: ["#1B2B4B", "#FFFFFF", "#F5EDD6", "#C9B99A", "#040606"],
        description: "High contrast, minimal, and timeless — works across any industry.",
      },
    ],
    outfitTips: [
      "Think about how your outfit will look alongside your brand colors.",
      "Plan 2–3 looks: one power/professional, one approachable/casual, one expressive.",
      "Textures (linen, leather, denim) add visual interest in branding imagery.",
    ],
    whatToAvoid: [
      "Outfits that compete with or clash against your brand palette",
      "Anything you wouldn't wear to meet a client",
    ],
    whatToBring: [
      "Your products, tools of the trade, or branded materials",
      "Laptop, notebook, or props that represent your work",
      "Multiple outfit options for range of content",
      "Any props that tell your brand story",
    ],
    proTips: [
      "Think about where these images will live — website hero, Instagram, LinkedIn — and dress accordingly.",
      "Branding sessions benefit from lifestyle poses (working, laughing, in action) not just posed headshots.",
      "Bring a vision board or Pinterest board to share on shoot day.",
    ],
  },

  graduation: {
    shootType: "graduation",
    colorPalettes: [
      {
        name: "Classic Cap & Gown",
        colors: ["#040606", "#F5F0E8", "#AB830A", "#C9B99A", "#FFFFFF"],
        description: "Let the regalia speak — clean neutrals underneath keep focus on the milestone.",
      },
      {
        name: "School Colors Pop",
        colors: ["#4B1F8C", "#F5C518", "#FFFFFF", "#1B2B4B", "#C9B99A"],
        description: "Incorporate your school colors into your non-cap-and-gown look.",
      },
    ],
    outfitTips: [
      "Steam or press your gown the day before — wrinkles are very visible in photos.",
      "Wear an outfit underneath you feel great in for non-gown shots.",
      "Coordinate your tassel to the correct side before the session.",
      "Heel height matters — you'll be walking and posing outdoors.",
    ],
    whatToAvoid: [
      "Strapless tops under gowns (the gown often slips and shows)",
      "Flip flops (even if covered by the gown, you'll feel it outdoors)",
    ],
    whatToBring: [
      "Your cap, gown, and any honor cords or stoles",
      "A change of outfit for casual/lifestyle shots",
      "Diploma cover if available",
      "Any personal milestone items (acceptance letter, jersey, etc.)",
    ],
    proTips: [
      "Golden hour sessions make graduation photos glow — book late afternoon when possible.",
      "Bring a friend or parent — candid interaction shots are some of the best.",
    ],
  },

  maternity: {
    shootType: "maternity",
    colorPalettes: [
      {
        name: "Soft & Romantic",
        colors: ["#F2D5D5", "#E8C4B8", "#C4956A", "#F5EDD6", "#D4B896"],
        description: "Blush, ivory, and dusty rose — soft and feminine.",
      },
      {
        name: "Earth & Organic",
        colors: ["#8B7355", "#6B7C4F", "#D4C5A9", "#C4956A", "#F5EDD6"],
        description: "Warm earth tones that photograph beautifully outdoors.",
      },
      {
        name: "Clean White",
        colors: ["#FFFFFF", "#F5F0E8", "#E8D5C4", "#C9B99A", "#A89880"],
        description: "White and cream give a timeless, ethereal look.",
      },
    ],
    outfitTips: [
      "Flowy, stretchy fabrics drape beautifully and show the bump elegantly.",
      "Form-fitting is also stunning — it honors the shape you're in right now.",
      "Empire waist and wrap-style dresses are universally flattering.",
      "Comfort matters — you'll be posing for 45–90 minutes.",
    ],
    whatToAvoid: [
      "Busy patterns near the belly area (draws the eye away from the bump)",
      "Stiff or structured clothing that doesn't move naturally",
      "Uncomfortable footwear",
    ],
    whatToBring: [
      "Any milestone items — ultrasound photos, baby shoes, name reveal",
      "Partner's outfit if doing couples shots",
      "Sibling's outfit if including other children",
      "Touch-up kit",
    ],
    proTips: [
      "The sweet spot for maternity sessions is 28–34 weeks — bump is full but you're still comfortable.",
      "Golden hour light is especially flattering for maternity portraits.",
    ],
  },

  engagement: {
    shootType: "engagement",
    colorPalettes: [
      {
        name: "Classic Romance",
        colors: ["#1B2B4B", "#F5EDD6", "#C4956A", "#8B7355", "#E8D5C4"],
        description: "Navy + cream + warm tan — timeless couple coordination.",
      },
      {
        name: "Earthy & Natural",
        colors: ["#6B7C4F", "#C4956A", "#F5EDD6", "#8B7355", "#D4C5A9"],
        description: "Earthy greens and warm neutrals blend beautifully with outdoor settings.",
      },
      {
        name: "Bold & Editorial",
        colors: ["#040606", "#6B2D3E", "#F5F0E8", "#4A1A5C", "#E8D5C4"],
        description: "Dramatic and fashion-forward for a more editorial feel.",
      },
    ],
    outfitTips: [
      "Coordinate with your partner — you should complement, not clash.",
      "Plan 2 looks: one casual and one dressy for variety.",
      "If one person wears a pattern, the other should wear a solid.",
    ],
    whatToAvoid: [
      "Identical outfits (looks stiff in photos)",
      "Very busy patterns on both people at once",
    ],
    whatToBring: [
      "Props that are meaningful to your relationship (books, coffee mugs, flowers)",
      "Your engagement ring — make sure it's clean for close-up shots",
      "Any sentimental items",
    ],
    proTips: [
      "Golden hour is the most romantic light — plan your session 1–2 hours before sunset.",
      "Relax and interact naturally — the best shots come from genuine moments, not posed looks.",
    ],
  },

  birthday: {
    shootType: "birthday",
    colorPalettes: [
      {
        name: "Glam Gold",
        colors: ["#AB830A", "#040606", "#F5EDD6", "#C4956A", "#FFFFFF"],
        description: "Rich gold tones for a luxurious, celebratory feel.",
      },
      {
        name: "Fun & Festive",
        colors: ["#E8940A", "#6B2D3E", "#2D5016", "#1A3D5C", "#F5F0E8"],
        description: "Bold, joyful colors that match the energy of the occasion.",
      },
    ],
    outfitTips: [
      "Dress for the vibe you want — glamorous, casual, themed, or anything in-between.",
      "Milestone birthdays (30, 40, 50+) deserve a look that feels special.",
      "A pop of color or a standout accessory makes the photos pop.",
    ],
    whatToAvoid: [
      "Anything you don't feel amazing in — this is YOUR day",
    ],
    whatToBring: [
      "Balloons, flowers, or a number prop for milestone birthdays",
      "A cake or dessert for styled shots",
      "Any themed items or accessories",
      "Confetti or streamers if you want playful action shots",
    ],
    proTips: [
      "A 'getting ready' series is a beautiful addition to birthday sessions.",
      "Have a look you love for your first outfit — energy is highest at the start.",
    ],
  },

  holiday: {
    shootType: "holiday",
    colorPalettes: [
      {
        name: "Classic Holiday",
        colors: ["#6B2D3E", "#2D5016", "#F5EDD6", "#C4956A", "#FFFFFF"],
        description: "Deep red and green with warm neutrals — timeless holiday palette.",
      },
      {
        name: "Winter Neutrals",
        colors: ["#E8E0D5", "#C9B99A", "#1B2B4B", "#040606", "#FFFFFF"],
        description: "Sophisticated and clean — works for any holiday or winter theme.",
      },
    ],
    outfitTips: [
      "Coordinate the family — warm neutrals or deep jewel tones work great.",
      "Layering (scarves, cardigans) adds a cozy holiday feel.",
    ],
    whatToAvoid: [
      "Overly busy patterns or clashing colors between family members",
      "Literal holiday costumes unless intentionally themed",
      "Too many competing props — keep it simple and intentional",
    ],
    whatToBring: [
      "Any holiday props: ornaments, wrapped gifts, garland",
      "Pets are welcome with proper handling",
      "Matching pajamas or sweaters if doing a cozy/themed look",
    ],
    proTips: [
      "Book early — holiday mini sessions fill up fast in October/November.",
    ],
  },

  event: {
    shootType: "event",
    colorPalettes: [],
    outfitTips: ["Dress code is typically set by the event host."],
    whatToAvoid: ["Overly distracting patterns that compete with the environment"],
    whatToBring: ["Comfortable shoes for hours of walking/standing"],
    proTips: [
      "Share the event schedule so key moments can be captured.",
      "Group shots are best arranged at a specific time vs. improvised.",
    ],
  },
};

export function getStyleGuide(shootType: string): StyleGuide | null {
  return STYLE_GUIDES[shootType] ?? null;
}
