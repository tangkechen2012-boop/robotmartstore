// Buying-guide content. AI-drafted starting copy — review and replace specifics before treating as authoritative.
// Each guide renders via BuyingGuidePage. Add new entries by appending to BUYING_GUIDES.

export interface GuideSection {
  heading: string;
  body: string[]; // paragraphs
  bullets?: string[];
}

export interface GuideFaq {
  q: string;
  a: string;
}

export interface BuyingGuide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: "Humanoid" | "Quadruped" | "Robotic Arm" | "General";
  readingMinutes: number;
  intro: string;
  tldr: string[];
  sections: GuideSection[];
  faqs: GuideFaq[];
  relatedCollection?: { label: string; href: string };
}

export const BUYING_GUIDES: BuyingGuide[] = [
  {
    slug: "how-to-choose-a-humanoid-robot",
    title: "How to Choose a Humanoid Robot for Research & Education",
    metaTitle: "How to Choose a Humanoid Robot — Buyer's Guide 2026",
    metaDescription:
      "Compare humanoid robot platforms by payload, DOF, SDK, locomotion, sensors, and budget. A practical procurement guide for labs, universities, and integrators.",
    category: "Humanoid",
    readingMinutes: 8,
    intro:
      "Choosing a humanoid robot is rarely about the spec sheet alone. The right platform depends on your research question, your team's software stack, and the operating envelope (indoor lab, demo floor, outdoor pilot). This guide walks through the decisions that matter and the questions to ask before issuing a purchase order.",
    tldr: [
      "Define the research goal first — locomotion, manipulation, HRI, or whole-body control all favor different platforms.",
      "Match SDK and OS support to your team. ROS 2 + Python coverage shortens ramp-up dramatically.",
      "Budget the full system: spare battery, charging dock, safety cage, training, and a service contract.",
      "Plan logistics early: lithium battery air freight, customs HS codes, and warranty repair turnaround.",
    ],
    sections: [
      {
        heading: "1. Start with the research question",
        body: [
          "Humanoid platforms specialize. A robot tuned for dynamic bipedal locomotion (e.g. Unitree G1, Booster T1) is not the best choice for tabletop manipulation studies, and vice versa. Write down the experimental task in one sentence before comparing brands.",
        ],
        bullets: [
          "Locomotion research → prioritize joint torque, control-loop frequency, and access to low-level motor APIs.",
          "Manipulation / teleop → prioritize arm DOF, end-effector options, and stereo / wrist camera availability.",
          "Human–robot interaction → prioritize quiet actuators, expressive head, and microphone / speaker quality.",
        ],
      },
      {
        heading: "2. Specifications that actually matter",
        body: [
          "Marketing pages emphasize height and weight, but the decision usually comes down to four numbers: total degrees of freedom, peak joint torque, battery runtime under load, and control-loop latency. Ask the vendor for measured values, not theoretical maxima.",
        ],
        bullets: [
          "Degrees of freedom (DOF): 23+ for whole-body research, 12–18 for locomotion-only studies.",
          "Battery runtime: typical labs need ≥90 min of mixed-load operation, plus one swappable spare.",
          "IP rating: most humanoids are IP54 or unrated — confirm before any outdoor pilot.",
          "SDK: ROS 2 (Humble or Jazzy), Python bindings, and a documented low-level motor interface.",
        ],
      },
      {
        heading: "3. Total cost of ownership",
        body: [
          "Headline price covers the robot only. A realistic deployment budget adds 20–35% on top for accessories, safety, and the first year of operation.",
        ],
        bullets: [
          "Spare battery + fast charger: 8–15% of robot price.",
          "Safety harness, gantry, or fall-arrest hardware for biped testing.",
          "Onboarding / training: 1–3 days on-site or remote, factor into project timeline.",
          "Extended warranty or service contract — especially important for EDU-grade platforms.",
        ],
      },
      {
        heading: "4. Logistics, customs, and lead time",
        body: [
          "Humanoid robots ship as dangerous goods because of their lithium batteries (UN3481). This affects carrier choice, packaging, and import documentation. Plan for 2–6 weeks of lead time on most platforms, longer for new EDU releases.",
        ],
      },
    ],
    faqs: [
      {
        q: "What's the entry price for a research-grade humanoid in 2026?",
        a: "Compact bipeds with research SDK access start around USD 16,000–25,000. Full-size EDU platforms with dexterous hands and stereo vision range from USD 80,000 to 200,000+.",
      },
      {
        q: "Do humanoid robots support ROS 2?",
        a: "Most current research platforms ship a ROS 2 bridge (Humble or Jazzy). Confirm whether low-level motor control is exposed or only high-level pose commands.",
      },
      {
        q: "Can I run my own policies on the robot?",
        a: "Yes on EDU-grade and developer-tier robots. Consumer-tier robots usually restrict low-level control. Verify SDK scope before purchase.",
      },
      {
        q: "How long does shipping take?",
        a: "From confirmation of stock, plan 2–6 weeks for international air freight including customs clearance. Hazmat handling for the lithium battery adds 3–5 business days.",
      },
    ],
    relatedCollection: { label: "Browse humanoid robots", href: "/products/humanoid-robots" },
  },
  {
    slug: "quadruped-robot-buyers-guide",
    title: "Quadruped Robot Buyer's Guide: Payload, IP Rating, and SDK",
    metaTitle: "Quadruped Robot Buyer's Guide — Payload, IP, SDK | RobotMart",
    metaDescription:
      "Pick the right quadruped robot: payload capacity, IP rating, terrain handling, runtime, and ROS 2 support. Decision checklist for inspection, research, and security teams.",
    category: "Quadruped",
    readingMinutes: 7,
    intro:
      "Quadruped robots have moved from research curiosities to deployable inspection tools. The selection criteria differ sharply between an EDU lab and a substation inspection contractor. This guide focuses on the practical specs that decide whether a platform survives its first six months on the job.",
    tldr: [
      "Payload, IP rating, and runtime are the three specs that decide deployability.",
      "EDU and Industrial variants of the same robot differ in SDK access — pick the right SKU.",
      "Sensor payloads (LiDAR, thermal, gas) are usually integrator-installed, not stock.",
      "Plan for a docking station and at least one spare battery from day one.",
    ],
    sections: [
      {
        heading: "Payload and chassis class",
        body: [
          "Quadrupeds split into three rough classes: micro (≤4 kg payload, lab use), mid (5–10 kg, inspection), and heavy (>14 kg, industrial). The right class depends on the sensor stack you'll mount, not the brand.",
        ],
      },
      {
        heading: "IP rating and operating envelope",
        body: [
          "Outdoor deployments need IP54 minimum; substation and oilfield work usually require IP66 or paired weatherproof enclosures. Verify the joint, body, and connector ratings separately — manufacturers sometimes quote the highest rating on the body only.",
        ],
      },
      {
        heading: "SDK and autonomy stack",
        body: [
          "Most platforms expose a velocity / pose control API out of the box. Autonomy (waypoint navigation, return-to-dock, missions) is often a paid add-on or a separate integration. Confirm what's bundled before estimating project timeline.",
        ],
        bullets: [
          "Velocity / pose API: always included.",
          "ROS 2 bridge: usually included on EDU and Industrial SKUs.",
          "Mission autonomy / fleet manager: paid add-on, often subscription-based.",
        ],
      },
      {
        heading: "Battery, charging, and dock",
        body: [
          "Plan for ≥2 hours of mixed-mission runtime per shift. Most platforms ship one battery; a second battery and a fast or auto-dock charger are essential for any sustained deployment.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which quadruped is best for substation inspection?",
        a: "Look for IP66 body rating, thermal and visible-light payload options, an auto-dock, and a published mission planner. Industrial-class platforms from Unitree, Deep Robotics, and Boston Dynamics are typical candidates.",
      },
      {
        q: "Do I need a separate computer for autonomy?",
        a: "Most platforms ship an onboard compute module sufficient for navigation. Custom perception pipelines (e.g. defect detection) usually require an additional NVIDIA Jetson or equivalent.",
      },
      {
        q: "What's the warranty on a quadruped robot?",
        a: "Standard is 12 months parts and labor on the EDU and Industrial SKUs. Extended service plans cover wear items (joints, batteries) for an additional 12–24 months.",
      },
    ],
    relatedCollection: { label: "Browse quadruped robots", href: "/products/quadruped-robots" },
  },
];

export const getGuide = (slug: string) => BUYING_GUIDES.find((g) => g.slug === slug);
