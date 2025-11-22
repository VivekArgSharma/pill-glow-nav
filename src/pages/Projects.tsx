// src/pages/Projects.tsx
import { ProjectCard } from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL as string;

interface Post {
  id: string;
  title: string;
  short_description: string | null;
  content: string | null;
  cover_image_url: string | null;
  tags: string[] | null;
  profiles?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

const fetchProjects = async (): Promise<Post[]> => {
  const res = await fetch(`${API_URL}/api/posts?type=project`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};

const Projects = () => {
  const [visible, setVisible] = useState(12);
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", "projects"],
    queryFn: fetchProjects,
  });

  const projects = data || [];

  return (
    <div className="min-h-screen bg-background pt-32 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-foreground">
          Dev Projects
        </h1>
        <p className="text-muted-foreground mb-10">
          Discover projects shared by developers on DevConnect.
        </p>

        {isLoading && <p>Loading projects...</p>}
        {error && (
          <p className="text-red-500 text-sm">
            Failed to load projects. Please try again.
          </p>
        )}

        <div className="space-y-6">
          {projects.slice(0, visible).map((item) => (
            <ProjectCard
              key={item.id}
              image={
                item.cover_image_url ||
                "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800"
              }
              title={item.title}
              author={item.profiles?.full_name || "Anonymous Dev"}
              techStack={
                item.tags && item.tags.length > 0
                  ? item.tags.join(", ")
                  : "Project"
              }
              description={
                item.short_description ||
                (item.content
                  ? item.content.slice(0, 160) + "..."
                  : "No description")
              }
              onClick={() => navigate(`/projects/${item.id}`)}
            />
          ))}

          {projects.length === 0 && !isLoading && !error && (
            <p className="text-sm text-muted-foreground">
              No projects yet. Be the first to post!
            </p>
          )}
        </div>

        {projects.length > visible && (
          <div className="flex justify-center mt-10">
            <Button
              onClick={() => setVisible(visible + 12)}
              className="px-8 py-6 text-lg"
            >
              See more
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
