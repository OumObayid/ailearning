import {
  COURSE_MODULES,
  COURSES_CATALOG,
  AI_ENGINEERING_MODULES,
  BACKEND_IA_MODULES,
  PROMPT_ENGINEERING_IDE_MODULES,
  DEBUGGING_MODULES,
  ORCHESTRATION_AGENTS_IDE_MODULES,
} from '@/lib/constants';
import { Course, CourseModule } from '@/types/course';

export class CourseService {
  /**
   * Récupère la liste de tous les cours disponibles sur la plateforme
   */
  static getAllCourses(): Course[] {
    return COURSES_CATALOG;
  }

  /**
   * Récupère un cours par son slug ou son id
   */
  static getCourseBySlug(slug: string): Course | undefined {
    return COURSES_CATALOG.find(
      (c) => c.slug.toLowerCase() === slug.toLowerCase() || c.id.toLowerCase() === slug.toLowerCase()
    );
  }

  /**
   * Récupère la liste de tous les modules de formation (tous cursus confondus)
   */
  static getAllModules(): CourseModule[] {
    return COURSE_MODULES;
  }

  /**
   * Récupère les modules du cursus AI Engineering (8 modules)
   */
  static getAiEngineeringModules(): CourseModule[] {
    return AI_ENGINEERING_MODULES;
  }

  /**
   * Récupère les modules du cursus Backend IA (7 modules)
   */
  static getBackendIaModules(): CourseModule[] {
    return BACKEND_IA_MODULES;
  }

  /**
   * Récupère les modules du cursus Prompt Engineering dans les IDE
   */
  static getPromptEngineeringModules(): CourseModule[] {
    return PROMPT_ENGINEERING_IDE_MODULES;
  }

  /**
   * Récupère les modules du cursus Ingénierie du Débogage
   */
  static getDebuggingModules(): CourseModule[] {
    return DEBUGGING_MODULES;
  }

  /**
   * Récupère les modules filtrés par identifiant de cours
   */
  static getModulesByCourse(courseId: string): CourseModule[] {
    const normalized = courseId.toLowerCase();
    if (normalized === 'backend-ia') {
      return BACKEND_IA_MODULES;
    }
    if (normalized === 'ai-engineering') {
      return AI_ENGINEERING_MODULES;
    }
    if (normalized === 'prompt-engineering-ide') {
      return PROMPT_ENGINEERING_IDE_MODULES;
    }
    if (normalized === 'debugging') {
      return DEBUGGING_MODULES;
    }
    if (normalized === 'orchestration-agents-ide') {
      return ORCHESTRATION_AGENTS_IDE_MODULES;
    }
    return COURSE_MODULES.filter((m) => m.courseId?.toLowerCase() === normalized);
  }

  /**
   * Récupère les modules du cursus Orchestration d'une équipe d'agents IA (10 modules)
   */
  static getOrchestrationAgentsModules(): CourseModule[] {
    return ORCHESTRATION_AGENTS_IDE_MODULES;
  }

  /**
   * Récupère un module par son identifiant unique
   */
  static getModuleById(moduleId: string): CourseModule | undefined {
    const normalized = moduleId.toLowerCase();
    return COURSE_MODULES.find(
      (m) => m.id.toLowerCase() === normalized
    );
  }

  /**
   * Vérifie si un module existe
   */
  static exists(moduleId: string): boolean {
    const normalized = moduleId.toLowerCase();
    return COURSE_MODULES.some(
      (m) => m.id.toLowerCase() === normalized
    );
  }
}
