import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthorizationService } from '../modules/core/services/authorization/authorization.service';

@Injectable()
export class NoAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authorizationService: AuthorizationService,
    ) { }

    canActivate(): Observable<boolean> {
        if (!this.authorizationService.isAuthenticated()) {
            this.router.navigateByUrl('auth');
        }

        return this.authorizationService.getAuthStatus();
    }
}
