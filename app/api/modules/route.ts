import { NextResponse } from 'next/server';
import { CourseService } from '@/services/courseService';
import { ApiResponse } from '@/types/api';
import { CourseModule } from '@/types/course';

export async function GET(): Promise<NextResponse<ApiResponse<CourseModule[]>>> {
  const modules = CourseService.getAllModules();
  
  return NextResponse.json({
    success: true,
    data: modules,
    timestamp: new Date().toISOString(),
  });
}

