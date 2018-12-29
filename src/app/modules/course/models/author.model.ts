export interface Author {
    id: string;
    name: string;
}

export interface AuthorWithSplitedName {
    id: string;
    firstName: string;
    lastName: string;
}

export function isAuthors(authors: Author[] | AuthorWithSplitedName[]): authors is Author[] {
    return Boolean(authors.length) && (<Author[]>authors)[0].name !== undefined;
}
