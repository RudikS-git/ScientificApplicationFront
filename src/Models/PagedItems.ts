export interface PagedItems<T> {
    pageIndex:          number
    totalPages:         number,
    totalCount:	        number,
    hasPreviousPage:    boolean,
    hasNextPage:        boolean,
    items:              T[]
}
