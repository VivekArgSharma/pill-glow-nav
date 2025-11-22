// src/pages/Blogs.tsx
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

const fetchBlogs = async (): Promise<Post[]> => {
  const res = await fetch(`${API_URL}/api/posts?type=blog`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
};

const Blogs = () => {
  const [visible, setVisible] = useState(12);
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", "blogs"],
    queryFn: fetchBlogs,
  });

  const blogs = data || [];

  return (
    <div className="min-h-screen bg-background pt-32 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-foreground">
          Dev Blogs
        </h1>
        <p className="text-muted-foreground mb-10">
          Read and share blogs from developers in the community.
        </p>

        {isLoading && <p>Loading blogs...</p>}
        {error && (
          <p className="text-red-500 text-sm">
            Failed to load blogs. Please try again.
          </p>
        )}

        <div className="space-y-6">
          {blogs.slice(0, visible).map((item) => (
            <ProjectCard
              key={item.id}
              image={
                item.cover_image_url ||
                "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800"
              }
              title={item.title}
              author={item.profiles?.full_name || "Anonymous Dev"}
              techStack={
                item.tags && item.tags.length > 0
                  ? item.tags.join(", ")
                  : "Blog"
              }
              description={
                item.short_description ||
                (item.content
                  ? item.content.slice(0, 160) + "..."
                  : "No description")
              }
              onClick={() => navigate(`/blogs/${item.id}`)}
            />
          ))}

          {blogs.length === 0 && !isLoading && !error && (
            <p className="text-sm text-muted-foreground">
              No blogs yet. Be the first to post!
            </p>
          )}
        </div>

        {blogs.length > visible && (
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

export default Blogs;
