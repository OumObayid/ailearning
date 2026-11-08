import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { query } from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

interface SettingRow extends RowDataPacket {
  setting_key: string;
  setting_value: string;
}

export async function GET() {
  try {
    const session = await getCurrentUser();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Accès réservé aux administrateurs.' }, { status: 403 });
    }

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
      settings: settingsMap,
    });
  } catch (error) {
    console.error('Erreur API Admin Settings GET:', error);
    return NextResponse.json({ error: 'Erreur récupération des paramètres.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getCurrentUser();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Accès réservé aux administrateurs.' }, { status: 403 });
    }

    const body = await request.json();
    const { settings } = body;

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json({ error: 'Paramètres invalides.' }, { status: 400 });
    }

    for (const [key, value] of Object.entries(settings)) {
      await query<ResultSetHeader>(
        `INSERT INTO system_settings (setting_key, setting_value) 
         VALUES (?, ?) 
         ON DUPLICATE KEY UPDATE setting_value = ?`,
        [key, String(value), String(value)]
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Paramètres système enregistrés avec succès.',
    });
  } catch (error) {
    console.error('Erreur API Admin Settings POST:', error);
    return NextResponse.json({ error: 'Erreur lors de la sauvegarde des paramètres.' }, { status: 500 });
  }
}

