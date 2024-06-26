export class TableRowActivateEvent<T> {
    /**
     * Table row activate event
     * @param index Index of the activated row
     * @param row Row that was activated
     */
    constructor(
        public index: number,
        public row: T
    ) {}
}
