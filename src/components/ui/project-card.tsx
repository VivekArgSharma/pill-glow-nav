// src/components/ui/project-card.tsx
import React from "react";

interface ProjectCardProps {
  image: string;
  title: string;
  author: string;
  techStack: string;
  description: string;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  title,
  author,
  techStack,
  description,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="
        w-full 
        bg-white 
        rounded-xl 
        shadow-md 
        overflow-hidden 
        border 
        border-gray-200
        hover:shadow-lg
        transition-all 
        duration-200 
        flex 
        flex-col
        sm:flex-row
        cursor-pointer
      "
    >
      <div className="sm:w-1/3 h-48 sm:h-auto relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="sm:w-2/3 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {title}
          </h3>

          <p className="text-sm text-gray-500 mb-2">
            {techStack}
          </p>

          <p className="text-gray-700 text-sm line-clamp-3">
            {description}
          </p>
        </div>

        <p className="text-sm text-gray-600 mt-3">
          <span className="font-semibold">By:</span> {author}
        </p>
      </div>
    </div>
  );
};
