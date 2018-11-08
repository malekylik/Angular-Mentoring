import { Injectable } from '@angular/core';
import { Router, CanActivate } from "@angular/router";

import { AuthorizationService } from '../modules/core/services/authorization/authorization.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authorizationService: AuthorizationService,
    ) { }

    canActivate(): boolean {
        const isAuth: boolean = this.authorizationService.isAuthenticated();

        if (isAuth) {
            this.router.navigateByUrl('');
        }

        return !isAuth;
    }
}
