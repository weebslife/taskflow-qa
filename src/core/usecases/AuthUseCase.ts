import { User } from '@/core/entities/User';
import { DUMMY_CREDENTIALS, DUMMY_USER } from '@/shared/constants';
import { LocalStorageManager } from '@/infrastructure/storage/localStorage';

export class AuthUseCase {
  login(email: string, password: string): { success: boolean; user?: User; error?: string } {
    if (email !== DUMMY_CREDENTIALS.email || password !== DUMMY_CREDENTIALS.password) {
      return { success: false, error: 'Invalid email or password. Please try again.' };
    }

    const user: User = {
      ...DUMMY_USER,
      email: DUMMY_CREDENTIALS.email,
    };

    LocalStorageManager.setAuth(true);
    LocalStorageManager.setUser(user);

    return { success: true, user };
  }

  logout(): void {
    LocalStorageManager.setAuth(false);
    LocalStorageManager.setUser(null);
  }

  checkAuth(): { isAuthenticated: boolean; user: User | null } {
    const isAuth = LocalStorageManager.getAuth();
    const user = LocalStorageManager.getUser();
    return { isAuthenticated: isAuth, user };
  }
}
