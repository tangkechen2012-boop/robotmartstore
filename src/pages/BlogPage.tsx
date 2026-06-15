import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Seo } from "@/components/Seo";

const BLOG_POSTS = [
  {
    slug: "getting-started-ros2",
    title: "Getting Started with ROS 2: A Beginner's Guide",
    category: "Tutorial",
    excerpt: "Learn how to set up your first ROS 2 workspace, create nodes, and build a basic robot application from scratch.",
    date: "2026-02-20",
  },
  {
    slug: "choosing-robot-arm",
    title: "How to Choose the Right Robot Arm for Your Application",
    category: "Buying Guide",
    excerpt: "Compare DOF, payload, reach, and price across desktop and industrial robot arms to find your perfect match.",
    date: "2026-02-15",
  },
  {
    slug: "lidar-vs-camera-navigation",
    title: "LiDAR vs Camera-Based Navigation: Pros & Cons",
    category: "Guide",
    excerpt: "A deep dive into sensor fusion approaches for autonomous mobile robots and when to use each.",
    date: "2026-02-10",
  },
  {
    slug: "robotics-education-2026",
    title: "State of Robotics Education in 2026",
    category: "News",
    excerpt: "How schools and universities are integrating robotics into STEM curricula worldwide.",
    date: "2026-02-05",
  },
  {
    slug: "jetson-orin-projects",
    title: "5 AI Robotics Projects You Can Build with NVIDIA Jetson Orin",
    category: "Use Case",
    excerpt: "From object detection drones to autonomous delivery bots — real projects with step-by-step guides.",
    date: "2026-01-28",
  },
  {
    slug: "industrial-cobot-safety",
    title: "Collaborative Robot Safety Standards Explained",
    category: "Guide",
    excerpt: "Understanding ISO 15066 and how to safely deploy cobots alongside human workers.",
    date: "2026-01-20",
  },
];

const BlogPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Seo
        title="Robotics Blog & Buying Guides — RobotMart"
        description="Tutorials, buying guides, use cases, and robotics industry news from RobotMart's engineering team."
        path="/blog"
      />
      <h1 className="text-3xl font-bold mb-2">Blog & Guides</h1>
      <p className="text-muted-foreground mb-8">Tutorials, buying guides, use cases, and robotics industry news.</p>

      <div className="grid md:grid-cols-2 gap-5">
        {BLOG_POSTS.map(post => (
          <Card key={post.slug} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
              <h2 className="font-semibold text-base mb-2 leading-tight">{post.title}</h2>
              <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
