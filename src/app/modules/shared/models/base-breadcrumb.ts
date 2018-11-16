import { Breadcrumb } from './breadcrumb.model';

export class BaseBreadcrumb implements Breadcrumb {
    constructor(
        public url: string,
        public label: string,
    ) {}
}
