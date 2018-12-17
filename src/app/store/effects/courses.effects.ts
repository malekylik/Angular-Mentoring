import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { tap, switchMap, map, catchError, finalize } from "rxjs/operators";

import { CoursesActionTypes, GetCourses, Error as CoursesError, StoreCourses } from "../actions/courses.actions";
import { CoursesService } from "src/app/modules/course/services/courses.service";
import { LoadingBlockService } from "src/app/modules/core/services/loading-block/loading-block.service";
import { HttpErrorHandlingService } from "src/app/modules/core/services/http-error-handling/http-error-handling.service";
import { Course } from "src/app/modules/course/models/course.model";

@Injectable()
export class CoursesEffects {

    @Effect()
    login$: Observable<Action> = this.actions$.pipe(
        ofType(CoursesActionTypes.GetCourses),
        tap(() => this.loadingBlockService.showLoadingBlock(true)),
        switchMap((action: GetCourses) => this.coursesService.getCourses(action.payload.start, action.payload.count, action.payload.textFragment)
            .pipe(
                map((courses: Course[]) => new StoreCourses(courses)),
                catchError(error => {
                    this.httpErrorHandlingService.handlingError(error);
                    return of(new CoursesError(error));
                }),
                finalize(() => this.loadingBlockService.showLoadingBlock(false)),
            )
        ),
    );

    constructor(
        private httpErrorHandlingService: HttpErrorHandlingService,
        private loadingBlockService: LoadingBlockService,
        private actions$: Actions,
        private coursesService: CoursesService,
    ) { }
}
