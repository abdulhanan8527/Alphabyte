import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/industries",
    "/process",
    "/insights",
    "/contact",
    "/privacy-policy",
    "/terms",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: (path === "" ? "weekly" : "monthly") as
      | "weekly"
      | "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${site.url}/portfolio/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postRoutes = posts.map((p) => ({
    url: `${site.url}/insights/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
