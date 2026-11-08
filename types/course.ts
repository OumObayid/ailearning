export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
  modulesCount: number;
  chaptersCount?: number;
  iconName?: string;
  isAvailable: boolean;
  href: string;
}

export interface CourseModule {
  id: string;
  order: number;
  title: string;
  description: string;
  badge?: string;
  category?: string;
  iconName?: string;
  courseId?: string;
  courseTitle?: string;
  courseHref?: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  order: number;
  title: string;
  description?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  enrolledAt: string;
}
