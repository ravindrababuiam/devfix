export type ContentType = "problems" | "scripts" | "lessons" | "notes";

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  environment?: string[];
  errorMessage?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  draft?: boolean;
}

export interface Post {
  slug: string;
  type: ContentType;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
  url: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export interface CategoryInfo {
  slug: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export const CATEGORIES: Record<string, { name: string; description: string; icon: string }> = {
  azure: {
    name: "Azure",
    description: "Azure cloud services, automation, and infrastructure",
    icon: "☁️",
  },
  devops: {
    name: "DevOps",
    description: "CI/CD pipelines, deployment, and infrastructure as code",
    icon: "🔄",
  },
  automation: {
    name: "Automation",
    description: "Scripts, runbooks, and workflow automation",
    icon: "⚙️",
  },
  powershell: {
    name: "PowerShell",
    description: "PowerShell scripting and module development",
    icon: "💻",
  },
  python: {
    name: "Python",
    description: "Python scripting, APIs, and data engineering",
    icon: "🐍",
  },
  cloud: {
    name: "Cloud",
    description: "Multi-cloud architecture and services",
    icon: "🌐",
  },
  debugging: {
    name: "Debugging",
    description: "Troubleshooting techniques and diagnostic tools",
    icon: "🔍",
  },
  "system-design": {
    name: "System Design",
    description: "Architecture patterns and design decisions",
    icon: "📐",
  },
  docker: {
    name: "Docker",
    description: "Containers, images, and orchestration",
    icon: "🐳",
  },
  kubernetes: {
    name: "Kubernetes",
    description: "K8s cluster management and deployments",
    icon: "☸️",
  },
  terraform: {
    name: "Terraform",
    description: "Infrastructure as code with HashiCorp Terraform",
    icon: "🏗️",
  },
};
