import { dateSeparator } from '../constants';

export function joinDate(...dates: number[] | string[]): string {
    if (!dates.length) return '';

    let date: string = '';
    let i: number = 0;

    for (i = 0; i < dates.length - 1; i++) {
        date += `${dates[i]}${dateSeparator}`;
    }

    return date + dates[i];
}
