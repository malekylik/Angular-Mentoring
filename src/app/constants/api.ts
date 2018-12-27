const SERVE_URL: string = 'http://localhost:3004';
const NOT_FOUND_STATUS: number = 404;
const DEBOUNCE_TIME: number = 500;

type Params = { [param: string]: string | string[]; };

export {
    SERVE_URL,
    Params,
    NOT_FOUND_STATUS,
    DEBOUNCE_TIME,
};
