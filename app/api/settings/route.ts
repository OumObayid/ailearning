import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

interface SettingRow extends RowDataPacket {
  setting_key: string;
  setting_value: string;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const rows = await query<SettingRow[]>(
      'SELECT setting_key, setting_value FROM system_settings'
    );

    const settingsMap: Record<string, string> = {
      default_passing_score: '80',
      default_duration_minutes: '40',
      max_anti_cheat_strikes: '3',
      maintenance_mode: 'false',
    };

    rows.forEach((r) => {
      settingsMap[r.setting_key] = r.setting_value;
    });

    return NextResponse.json({
      success: true,
      maintenance_mode: settingsMap.maintenance_mode === 'true',
      settings: {
        maintenance_mode: settingsMap.maintenance_mode,
      },
    });
  } catch (error) {
    console.error('Erreur API Settings public GET:', error);
    // En cas d'erreur de base de données, ne pas bloquer par défaut
    return NextResponse.json({
      success: true,
      maintenance_mode: false,
      settings: {
        maintenance_mode: 'false',
      },
    });
  }
}

