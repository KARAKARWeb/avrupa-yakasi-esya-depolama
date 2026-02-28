'use server';

import fs from 'fs/promises';
import path from 'path';

const HOMEPAGE_SETTINGS_PATH = path.join(process.cwd(), 'data', 'homepage-settings.json');

export async function getHomepageSettings() {
  try {
    const data = await fs.readFile(HOMEPAGE_SETTINGS_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading homepage settings:', error);
    return null;
  }
}

export async function updateHomepageSettings(settings: any) {
  try {
    await fs.writeFile(HOMEPAGE_SETTINGS_PATH, JSON.stringify(settings, null, 2), 'utf-8');
    return { success: true };
  } catch (error) {
    console.error('Error updating homepage settings:', error);
    return { success: false, error: 'Failed to update settings' };
  }
}
