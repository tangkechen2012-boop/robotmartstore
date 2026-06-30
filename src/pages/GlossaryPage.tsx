import { Seo } from "@/components/Seo";

const TERMS: { term: string; def: string }[] = [
  { term: "Actuator", def: "The motor or drive unit that converts electrical power into joint motion. Common types include brushless DC, harmonic drive, and quasi-direct-drive (QDD)." },
  { term: "AGV / AMR", def: "Automated Guided Vehicle / Autonomous Mobile Robot. AGVs follow fixed paths; AMRs navigate dynamically using SLAM." },
  { term: "DOF", def: "Degrees of Freedom — the number of independent joints a robot can move. A human-like arm has 7 DOF; a full humanoid usually has 23+." },
  { term: "End-effector", def: "The tool mounted at the end of a robotic arm — gripper, suction cup, welder, or custom fixture." },
  { term: "IP Rating", def: "Ingress Protection rating. The first digit (0–6) covers solids/dust; the second (0–9) covers water. IP66 = dust-tight, high-pressure water resistant." },
  { term: "IK / FK", def: "Inverse Kinematics solves for joint angles given a target pose; Forward Kinematics computes the end-effector pose from joint angles." },
  { term: "LiDAR", def: "Light Detection and Ranging sensor. Provides 2D or 3D point clouds used for mapping, navigation, and obstacle avoidance." },
  { term: "Payload", def: "Maximum mass a robot can carry while maintaining rated performance. Always check whether the figure includes the end-effector mount." },
  { term: "Quadruped", def: "A four-legged robot, typically used for inspection, delivery, and research into legged locomotion." },
  { term: "Reach", def: "The maximum distance an arm's end-effector can travel from its base. Critical spec for workcell layout." },
  { term: "ROS / ROS 2", def: "Robot Operating System — the de facto middleware for robotics R&D. ROS 2 (Humble, Iron, Jazzy) is the actively maintained line." },
  { term: "SLAM", def: "Simultaneous Localization and Mapping — algorithms that build a map and localize the robot inside it at the same time." },
  { term: "Teleoperation", def: "Real-time remote control of a robot by a human operator, often via VR or haptic device." },
  { term: "Torque", def: "Rotational force at a joint. Higher torque enables greater payload and more dynamic motion." },
  { term: "UN3481", def: "UN dangerous-goods classification for lithium-ion batteries packed with equipment. Affects shipping documentation and carrier choice." },
];

const GlossaryPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Robotics Glossary",
    hasDefinedTerm: TERMS.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.def,
    })),
  };

  return (
    <div className="min-h-screen">
      <Seo
        title="Robotics Glossary — Key Terms Explained | RobotMart"
        description="A plain-English glossary of robotics terms: DOF, IP rating, ROS 2, SLAM, payload, teleoperation, and more. For buyers, students, and engineers."
        path="/resources/robotics-glossary"
        jsonLd={jsonLd}
      />
      <section className="bg-gradient-to-br from-primary to-accent/20 text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Robotics Glossary</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Plain-English definitions for the terms buyers, students, and engineers run into when evaluating robots.
          </p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-12">
        <dl className="space-y-6">
          {TERMS.map((t) => (
            <div key={t.term} className="border-b pb-5">
              <dt className="text-lg font-bold text-foreground">{t.term}</dt>
              <dd className="text-muted-foreground leading-relaxed mt-1">{t.def}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
};

export default GlossaryPage;
