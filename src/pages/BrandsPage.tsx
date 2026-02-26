import { Link } from "react-router-dom";

const BRANDS_LIST = [
  { name: "ABB", description: "Global leader in industrial robotics and automation." },
  { name: "Arduino", description: "Open-source microcontroller platforms for makers and educators." },
  { name: "Boston Dynamics", description: "Advanced mobile robots for research and enterprise." },
  { name: "DJI", description: "World's leading commercial drone manufacturer." },
  { name: "Dynamixel", description: "Smart actuators for humanoid and research robots." },
  { name: "FANUC", description: "Industrial robots and CNC systems manufacturer." },
  { name: "Intel", description: "Computing platforms and AI accelerators for robotics." },
  { name: "KUKA", description: "Industrial robot arms and intelligent automation solutions." },
  { name: "NVIDIA", description: "GPU and AI computing platforms for autonomous systems." },
  { name: "Raspberry Pi", description: "Single-board computers powering millions of projects." },
  { name: "ROS", description: "Robot Operating System tools and compatible hardware." },
  { name: "Turtlebot", description: "Open-source mobile robot platform for ROS development." },
  { name: "Universal Robots", description: "Collaborative robot arms for flexible automation." },
  { name: "Unitree", description: "Quadruped and humanoid robots for research and applications." },
];

const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const BrandsPage = () => {
  const brandsByLetter: Record<string, typeof BRANDS_LIST> = {};
  BRANDS_LIST.forEach(b => {
    const letter = b.name[0].toUpperCase();
    if (!brandsByLetter[letter]) brandsByLetter[letter] = [];
    brandsByLetter[letter].push(b);
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Brands</h1>
      <p className="text-muted-foreground mb-6">Browse our curated selection of robotics brands.</p>

      {/* Alpha index */}
      <div className="flex flex-wrap gap-1 mb-8">
        {ALPHA.map(letter => (
          <a
            key={letter}
            href={`#brand-${letter}`}
            className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${
              brandsByLetter[letter] ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-muted text-muted-foreground"
            }`}
          >
            {letter}
          </a>
        ))}
      </div>

      {/* Brand list */}
      <div className="space-y-6">
        {ALPHA.filter(l => brandsByLetter[l]).map(letter => (
          <div key={letter} id={`brand-${letter}`} className="scroll-mt-20">
            <h2 className="text-lg font-bold border-b pb-1 mb-3">{letter}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {brandsByLetter[letter].map(brand => (
                <div key={brand.name} className="border rounded-md p-4 hover:shadow-sm transition-shadow">
                  <h3 className="font-semibold text-sm">{brand.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{brand.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsPage;
