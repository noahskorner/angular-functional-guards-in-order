import {
  inject,
  EnvironmentInjector,
  runInInjectionContext,
} from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

type CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => Promise<boolean>;

export const runGuardsInOrder = (...guards: Array<CanActivateFn>) => {
  return async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const injector = inject(EnvironmentInjector);
    let result = true;

    // Loop through the guards in order
    for (let i = 0; i < guards.length; i++) {
      // Short-circuit if the previous guard returned false
      if (result === false) break;

      const currentGuard = guards[i];
      // Run the current guard in the injection context
      const currentGuardResult = runInInjectionContext(injector, () => {
        return currentGuard(route, state);
      });

      // Update our result
      result = await currentGuardResult;
    }

    return result;
  };
};
