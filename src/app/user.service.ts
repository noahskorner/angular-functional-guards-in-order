import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private authenticated = false;
  private role = 'teacher';
  private superAdmin = false;

  public async isLoggedIn() {
    if (!this.authenticated) await this.login();

    return this.authenticated;
  }

  public isInRole(role: string) {
    return Promise.resolve(role === this.role);
  }

  public isSuperAdmin() {
    return Promise.resolve(this.superAdmin);
  }

  private login(): Promise<void> {
    return Promise.resolve().then(() => {
      this.authenticated = true;
    });
  }
}
