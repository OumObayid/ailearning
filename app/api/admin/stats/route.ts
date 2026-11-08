import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { query } from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

export async function GET() {
  try {
    const session = await getCurrentUser();
    if (!session || session.role !== 'admin') {
      return NextResponse.json(
        { error: 'Accès réservé aux administrateurs.' },
        { status: 403 }
      );
    }

    // 1. Stats Utilisateurs
    const userStats = await query<RowDataPacket[]>(
      `SELECT 
        COUNT(*) as total_users,
        SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) as total_admins,
        SUM(CASE WHEN role != 'admin' THEN 1 ELSE 0 END) as total_students
       FROM users`
    );

    // 2. Stats Examens
    const examStats = await query<RowDataPacket[]>(
      `SELECT 
        COUNT(*) as total_attempts,
        SUM(CASE WHEN passed = 1 THEN 1 ELSE 0 END) as passed_attempts,
        AVG(score) as avg_score,
        AVG(time_spent_seconds) as avg_time_spent
       FROM user_exams`
    );

    // 3. Stats par Cursus
    const courseStats = await query<RowDataPacket[]>(
      `SELECT 
        course_id,
        COUNT(*) as total_attempts,
        SUM(CASE WHEN passed = 1 THEN 1 ELSE 0 END) as passed_attempts,
        ROUND(AVG(score), 1) as avg_score
       FROM user_exams
       GROUP BY course_id`
    );

    // 4. Activité récente (10 dernières épreuves)
    const recentActivity = await query<RowDataPacket[]>(
      `SELECT 
        ue.id,
        ue.user_id,
        COALESCE(u.name, 'Utilisateur supprimé') as user_name,
        COALESCE(u.email, '-') as user_email,
        ue.course_id,
        ue.module_id,
        ue.score,
        ue.passed,
        ue.time_spent_seconds,
        ue.created_at
       FROM user_exams ue
       LEFT JOIN users u ON ue.user_id = u.id
       ORDER BY ue.created_at DESC
       LIMIT 10`
    );

    // 5. Paramètres système actuels
    const settingsRows = await query<RowDataPacket[]>(
      `SELECT setting_key, setting_value FROM system_settings`
    );
    const settingsMap: Record<string, string> = {
      default_passing_score: '80',
      default_duration_minutes: '40',
      max_anti_cheat_strikes: '3',
      maintenance_mode: 'false',
    };
    for (const row of settingsRows) {
      if (row.setting_key && row.setting_value !== undefined) {
        settingsMap[row.setting_key] = String(row.setting_value);
      }
    }

    const totalAttempts = Number(examStats[0]?.total_attempts || 0);
    const passedAttempts = Number(examStats[0]?.passed_attempts || 0);
    const passRate = totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0;

    // Assurer la présence des 4 cursus officiels dans les statistiques
    const ALL_COURSE_IDS = ['ai-engineering', 'backend-ia', 'prompt-engineering-ide', 'debugging'];
    const dbCourseMap = new Map(courseStats.map((c) => [c.course_id, c]));

    const formattedCourseStats = ALL_COURSE_IDS.map((cId) => {
      const row = dbCourseMap.get(cId);
      const attempts = Number(row?.total_attempts || 0);
      const passed = Number(row?.passed_attempts || 0);
      const avgScore = Number(row?.avg_score || 0);
      const rate = attempts > 0 ? Math.round((passed / attempts) * 100) : 0;
      return {
        courseId: cId,
        totalAttempts: attempts,
        passedAttempts: passed,
        avgScore,
        passRate: rate,
      };
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers: Number(userStats[0]?.total_users || 0),
        totalAdmins: Number(userStats[0]?.total_admins || 0),
        totalStudents: Number(userStats[0]?.total_students || 0),
        totalAttempts,
        passedAttempts,
        passRate,
        avgScore: Math.round(Number(examStats[0]?.avg_score || 0)),
        avgTimeSpent: Math.round(Number(examStats[0]?.avg_time_spent || 0)),
      },
      courseStats: formattedCourseStats,
      systemSettings: settingsMap,
      recentActivity: recentActivity.map((a) => ({
        id: a.id,
        userId: a.user_id,
        userName: a.user_name,
        userEmail: a.user_email,
        courseId: a.course_id,
        moduleId: a.module_id,
        score: Number(a.score),
        passed: Boolean(a.passed),
        timeSpentSeconds: Number(a.time_spent_seconds),
        createdAt: a.created_at,
      })),
    });
  } catch (error) {
    console.error('Erreur API Admin Stats:', error);
    return NextResponse.json(
      { error: 'Erreur interne lors de la récupération des statistiques administratives.' },
      { status: 500 }
    );
  }
}

