'use client';

import { useEffect } from 'react';
import { LocalStorageManager } from '@/infrastructure/storage/localStorage';

export function StoreInitializer() {
  useEffect(() => {
    LocalStorageManager.initializeTasks();
  }, []);

  return null;
}
