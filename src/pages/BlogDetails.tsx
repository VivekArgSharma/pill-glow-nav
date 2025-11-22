// src/pages/BlogDetails.tsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL as string;

const fetchBlog = async (id: string) => {
  const res = await fetch(`${API_URL}/api/posts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch blog");
  return res.json();
};

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", id],
    enabled: !!id,
    queryFn: () => fetchBlog(id as string),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 px-4 flex justify-center">
        <p>Loading blog...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen pt-32 px-4 flex justify-center">
        <p className="text-red-500">Blog not found.</p>
      </div>
    );
  }

  const blog = data;

  return (
    <div className="min-h-screen bg-background pt-32 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          By {blog.profiles?.full_name || "Anonymous Dev"}
        </p>

        {blog.images && blog.images.length > 0 && (
          <img
            src={blog.images[0]}
            alt={blog.title}
            className="w-full rounded-xl mb-6 object-cover max-h-80"
          />
        )}

        {blog.short_description && (
          <p className="text-gray-700 mb-4">{blog.short_description}</p>
        )}

        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-semibold">Blog Content</h2>
          <p className="text-gray-800 whitespace-pre-wrap">{blog.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
