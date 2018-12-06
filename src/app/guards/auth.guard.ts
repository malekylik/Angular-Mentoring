import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthorizationService } from '../modules/core/services/authorization/authorization.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authorizationService: AuthorizationService,
    ) { }

    canActivate(): Observable<boolean> {
        if (this.authorizationService.isAuthenticated()) {
            this.router.navigateByUrl('');
        }

        return this.authorizationService.getAuthStatus()
            .pipe(map((status: boolean) => !status));
    }
}
