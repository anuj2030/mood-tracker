import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TherapyToolItem from "@/components/therapy/therapy-tool-item";
import { Circle, Clock, Sparkles, Brain, Heart, PenSquare, Dumbbell, CloudRain } from "lucide-react";

export default function TherapyTools() {
  const toolCategories = [
    {
      id: "breathing",
      title: "Breathing & Relaxation",
      description: "Tools to help you relax and reduce stress",
      tools: [
        {
          id: 1,
          title: "Deep Breathing",
          description: "5-minute guided breathing",
          icon: <Circle className="w-4 h-4 text-indigo-500" />,
          iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
          href: "/therapy-tools/breathing"
        },
        {
          id: 2,
          title: "Box Breathing",
          description: "4-4-4-4 breathing technique",
          icon: <Clock className="w-4 h-4 text-blue-500" />,
          iconBg: "bg-blue-100 dark:bg-blue-900/30",
          href: "/therapy-tools/box-breathing"
        },
        {
          id: 3,
          title: "Progressive Relaxation",
          description: "Release tension in your body",
          icon: <Sparkles className="w-4 h-4 text-purple-500" />,
          iconBg: "bg-purple-100 dark:bg-purple-900/30",
          href: "/therapy-tools/progressive-relaxation"
        }
      ]
    },
    {
      id: "mindfulness",
      title: "Mindfulness & Meditation",
      description: "Practices to help you stay present and focused",
      tools: [
        {
          id: 4,
          title: "Basic Meditation",
          description: "10-minute guided session",
          icon: <Brain className="w-4 h-4 text-purple-500" />,
          iconBg: "bg-purple-100 dark:bg-purple-900/30",
          href: "/therapy-tools/meditation"
        },
        {
          id: 5,
          title: "Body Scan",
          description: "Connect with physical sensations",
          icon: <Dumbbell className="w-4 h-4 text-blue-500" />,
          iconBg: "bg-blue-100 dark:bg-blue-900/30",
          href: "/therapy-tools/body-scan"
        },
        {
          id: 6,
          title: "Visualization",
          description: "Visual imagery for relaxation",
          icon: <CloudRain className="w-4 h-4 text-sky-500" />,
          iconBg: "bg-sky-100 dark:bg-sky-900/30",
          href: "/therapy-tools/visualization"
        }
      ]
    },
    {
      id: "cognitive",
      title: "Cognitive Tools",
      description: "Techniques to challenge negative thought patterns",
      tools: [
        {
          id: 7,
          title: "Thought Journal",
          description: "Challenge negative thoughts",
          icon: <PenSquare className="w-4 h-4 text-emerald-500" />,
          iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
          href: "/therapy-tools/thought-journal"
        },
        {
          id: 8,
          title: "Self-Compassion",
          description: "Practice self-kindness",
          icon: <Heart className="w-4 h-4 text-rose-500" />,
          iconBg: "bg-rose-100 dark:bg-rose-900/30",
          href: "/therapy-tools/self-compassion"
        }
      ]
    }
  ];
  
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold">Therapy Tools</h1>
        <p className="text-slate-500 dark:text-slate-400">Evidence-based techniques to support your mental wellbeing</p>
      </div>
      
      <div className="space-y-6">
        {toolCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {category.tools.map((tool) => (
                  <TherapyToolItem
                    key={tool.id}
                    title={tool.title}
                    description={tool.description}
                    icon={tool.icon}
                    iconBg={tool.iconBg}
                    href={tool.href}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
