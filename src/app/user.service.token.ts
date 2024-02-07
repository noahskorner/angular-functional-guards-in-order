import { InjectionToken } from '@angular/core';
import { UserService } from './user.service';

const singleton = new UserService();

export const USER_SERVICE = new InjectionToken('USER_SERVICE', {
  factory: () => {
    return singleton;
  },
});
