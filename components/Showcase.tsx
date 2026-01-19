import React from "react";
import styles from "./showcase.module.css";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl: string;
  sourceCodeUrl: string;
  category: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "React Bangla Tutorial Website",
    description:
      "Banglay React শেখার জন্য তৈরি করা একটি সম্পূর্ণ লার্নিং প্ল্যাটফর্ম, যেখানে রয়েছে ইন্টারঅ্যাকটিভ উদাহরণ, কুইজ এবং প্রজেক্ট-ভিত্তিক শেখা।",
    technologies: ["Next.js", "Nextra", "React", "TypeScript", "MDX"],
    imageUrl: "/images/projects/react-bangla-platform.png",
    liveUrl: "https://react-bangla.vercel.app",
    sourceCodeUrl: "https://github.com/codedbymojnu/react-bangla-tutorial",
    category: "Education",
    featured: true,
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "একটি রেসপন্সিভ আবহাওয়া অ্যাপ যেখানে OpenWeather API ব্যবহার করে বর্তমান আবহাওয়া ও ৫ দিনের পূর্বাভাস দেখানো হয়।",
    technologies: ["React", "OpenWeather API", "CSS Modules"],
    imageUrl: "/images/projects/weather-dashboard.png",
    liveUrl: "https://weather-dashboard-demo.vercel.app",
    sourceCodeUrl: "https://github.com/codedbymojnu/weather-dashboard",
    category: "Frontend",
    featured: true,
  },
];

const Showcase: React.FC = () => {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section className={styles.featuredSection}>
      <div className={styles.featuredGrid}>
        {featuredProjects.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <div className={styles.imageContainer}>
              <img
                src={project.imageUrl}
                alt={project.title}
                className={styles.projectImage}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/images/projects/placeholder.png";
                }}
              />
            </div>
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>

              <div className={styles.techStack}>
                {project.technologies.map((tech, i) => (
                  <span key={i} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className={styles.projectActions}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.liveButton}
                >
                  🌐 Demo
                </a>
                <a
                  href={project.sourceCodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.codeButton}
                >
                  💻 Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Showcase;
