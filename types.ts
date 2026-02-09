
export enum UserRole {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  DEVELOPER = 'DEVELOPER',
  PUBLIC = 'PUBLIC'
}

export enum ProjectStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface ProjectSubmission {
  id: string;
  clientName: string;
  clientEmail: string;
  projectType: string;
  requirements: string;
  budget: string;
  timeline: string;
  status: ProjectStatus;
  submittedAt: string;
  assignedDeveloperId?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorId: string;
  publishedAt: string;
  category: string;
  imageUrl: string;
  isPublished: boolean;
  slug: string;
  requestStatus?: 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED';
}

export interface SiteSettings {
  logoText: string;
  heroTitle: string;
  heroSubtitle: string;
  accentColor: string;
  contactEmail: string;
  heroImage: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
}
