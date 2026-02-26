import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ProductCard } from "@/components/ProductCard";
import { useParams } from "react-router-dom";
import { Bot } from "lucide-react";

const COLLECTION_META: Record<string, { title: string; description: string }> = {
  all: { title: "All Products", description: "Browse our complete catalog of robotics parts, kits, and platforms." },
  parts: { title: "Robot Parts & Components", description: "Essential building blocks for your robot: microcontrollers, sensors, motors, power supplies, and more." },
  microcontrollers: { title: "Microcontrollers & SBC", description: "Arduino, Raspberry Pi, ESP32, and more single-board computers for robotics projects." },
  sensors: { title: "Sensors", description: "Distance, IMU, vision, temperature, force/torque sensors and more." },
  motors: { title: "Motors & Actuators", description: "DC motors, servos, stepper motors, linear actuators for precise robot control." },
  "motor-controllers": { title: "Motor Controllers", description: "H-bridge drivers, ESCs, and motor driver boards for all motor types." },
  power: { title: "Power & Batteries", description: "LiPo batteries, chargers, voltage regulators, and power distribution boards." },
  cables: { title: "Cables & Connectors", description: "Wiring, harnesses, and connectors for clean robot builds." },
  mechanical: { title: "Mechanical Parts", description: "Chassis, wheels, brackets, bearings, and structural components." },
  "ai-compute": { title: "AI Parts & Compute", description: "NVIDIA Jetson, Google Coral, and neural compute modules for edge AI." },
  "robots-kits": { title: "Robots & Kits", description: "Ready-to-build and fully assembled robot platforms and kits." },
  "wheeled-robots": { title: "Wheeled Robots", description: "Mobile robot platforms: 2WD, 4WD, mecanum, and omnidirectional." },
  "robot-arms": { title: "Robot Arms & Grippers", description: "Desktop and industrial robot arms with various DOF and payload capacities." },
  "ros-platforms": { title: "ROS Platforms", description: "Robot Operating System compatible research and development platforms." },
  drones: { title: "Drones / UGV / UUV", description: "Aerial, ground, and underwater unmanned vehicles for research and applications." },
  "competition-kits": { title: "Competition Kits", description: "Kits designed for robotics competitions: FIRST, VEX, RoboCup, and more." },
  "ai-robots": { title: "AI Robots", description: "Robots with built-in AI capabilities for learning, interaction, and autonomy." },
  education: { title: "Robotics Education", description: "Educational robots and kits from preschool to university level." },
  k12: { title: "K-12 Education", description: "Age-appropriate robotics kits for elementary through high school students." },
  "higher-ed": { title: "Higher Education", description: "Advanced platforms for college and university robotics courses." },
  research: { title: "Research Platforms", description: "Professional-grade platforms for graduate research and labs." },
  books: { title: "Books & Learning", description: "Textbooks, guides, and online course materials for robotics." },
  consumer: { title: "Consumer Robots", description: "Personal and home robots for entertainment, cleaning, and companionship." },
  "home-robots": { title: "Home Robots", description: "Vacuum, mop, lawn care, and utility robots for everyday use." },
  companion: { title: "Companion & Pet Robots", description: "Social robots and robotic pets for interaction and entertainment." },
  "smart-home": { title: "Smart Home", description: "Connected devices and automation for the smart home ecosystem." },
  professional: { title: "Professional Service Robots", description: "Robots designed for commercial and professional applications." },
  hospitality: { title: "Hospitality Robots", description: "Delivery, reception, and service robots for hotels and restaurants." },
  logistics: { title: "Logistics Robots", description: "Warehouse automation, sorting, and last-mile delivery robots." },
  inspection: { title: "Inspection & Maintenance", description: "Robots for pipeline, infrastructure, and equipment inspection." },
  security: { title: "Security & Rescue", description: "Surveillance, patrol, and search-and-rescue robotic platforms." },
  "research-platforms": { title: "Research Platforms", description: "Advanced robotic platforms designed for academic and industrial R&D." },
  industrial: { title: "Industrial Robotics", description: "Industrial robot arms, cobots, and factory automation equipment." },
  "industrial-arms": { title: "Industrial Robot Arms", description: "High-payload, high-precision industrial manipulators." },
  eoat: { title: "EOAT / End Effectors", description: "Grippers, suction cups, tool changers, and end-of-arm tooling." },
  tools: { title: "Tools & Equipment", description: "Lab tools, soldering, 3D printers, power supplies, and measuring equipment." },
  "3d-printing": { title: "3D Printing", description: "FDM, SLA, and resin 3D printers for prototyping robot parts." },
  "lab-power": { title: "Lab Power Supplies", description: "Bench power supplies and lab-grade voltage sources." },
  measuring: { title: "Measuring Tools", description: "Multimeters, oscilloscopes, calipers, and precision instruments." },
  soldering: { title: "Soldering", description: "Soldering stations, tips, flux, and accessories." },
  deals: { title: "Deals & Clearance", description: "Special offers, discounts, and clearance items." },
  "new-arrivals": { title: "New Arrivals", description: "The latest products added to our catalog." },
};

const CollectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const meta = COLLECTION_META[slug || "all"] || { title: slug || "Products", description: "" };
  const { data: products, isLoading } = useShopifyProducts(24);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{meta.title}</h1>
        {meta.description && <p className="text-sm text-muted-foreground mt-1">{meta.description}</p>}
      </div>

      {/* Products grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border rounded-md overflow-hidden animate-pulse">
              <div className="aspect-square bg-muted" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map(product => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border rounded-md bg-muted/30">
          <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">No products found</h3>
          <p className="text-muted-foreground text-sm">
            Tell us what products you'd like to add in the chat!
          </p>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
