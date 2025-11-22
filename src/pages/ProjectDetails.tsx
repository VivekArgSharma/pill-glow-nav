// src/pages/ProjectDetails.tsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL as string;

const fetchProject = async (id: string) => {
  const res = await fetch(`${API_URL}/api/posts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch project");
  return res.json();
};

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["project", id],
    enabled: !!id,
    queryFn: () => fetchProject(id as string),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 px-4 flex justify-center">
        <p>Loading project...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen pt-32 px-4 flex justify-center">
        <p className="text-red-500">Project not found.</p>
      </div>
    );
  }

  const project = data;

  return (
    <div className="min-h-screen bg-background pt-32 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          By {project.profiles?.full_name || "Anonymous Dev"}
        </p>

        {project.cover_image_url && (
          <img
            src={project.cover_image_url}
            alt={project.title}
            className="w-full rounded-xl mb-6 object-cover max-h-80"
          />
        )}

        {project.short_description && (
          <p className="text-gray-700 mb-4">{project.short_description}</p>
        )}

        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-semibold">Details</h2>
          <p className="text-gray-800 whitespace-pre-wrap">
            {project.content}
          </p>
        </div>

        <div className="space-y-2 mb-6">
          {project.project_link && (
            <p>
              <span className="font-semibold">Live site:</span>{" "}
              <a
                href={project.project_link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                {project.project_link}
              </a>
            </p>
          )}
          {project.github_link && (
            <p>
              <span className="font-semibold">GitHub:</span>{" "}
              <a
                href={project.github_link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                {project.github_link}
              </a>
            </p>
          )}
        </div>

        {project.images && project.images.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Screenshots</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.images.map((url: string) => (
                <img
                  key={url}
                  src={url}
                  alt="Screenshot"
                  className="w-full rounded-lg object-cover max-h-64"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
