import { Injectable } from '@angular/core';
import { FocusableItemPosition } from '@fundamental-ngx/cdk/utils';
import { Observable, Subject } from 'rxjs';
import { convertTreeLikeToFlatList, createGroupedTableRowsTree, sortTreeLikeGroupedRows } from '../helpers';
import { CollectionGroup } from '../interfaces';
import { TableRow } from '../models';
import { TableCellActivateEvent } from '../models/table-cell-activate-event.model';
import { EditableTableCell } from '../table-cell.class';

export type ToggleRowModel =
    | {
          type: 'toggleRow';
          row: TableRow;
      }
    | {
          type: 'toggleSingleSelectableRow';
          row: TableRow;
      }
    | {
          type: 'toggleMultiSelectRow';
          row: TableRow;
          event?: Event;
      };

export interface CellClickedModel {
    index: number;
    row: TableRow;
}

@Injectable()
export class TableRowService<T = any> {
    /** Stream that emits when toggling all selectable rows is needed. */
    readonly toggleAllSelectableRows$: Observable<boolean>;

    /** Stream that emits when table cell being clicked. */
    readonly cellClicked$: Observable<CellClickedModel>;

    /** Stream that emits when scrolling to overlapped cell is needed. */
    readonly scrollToOverlappedCell$: Observable<void>;

    /** Stream that emits when the table cell being focused. */
    readonly cellFocused$: Observable<FocusableItemPosition>;

    /** Stream that emits when the table cell being focused. */
    readonly cellActivate$: Observable<TableCellActivateEvent<any>>;

    /** Toggle row stream. */
    readonly toggleRow$: Observable<ToggleRowModel>;

    /** Editable cells map. */
    readonly editableCells = new Map<TableRow<any>, EditableTableCell[]>();

    /** @hidden */
    readonly childRowsAdded$ = new Subject<{ row: TableRow; rowIndex: number; items: T[] }>();

    /** Stream to load child items for a particular rows. */
    readonly loadChildRows$ = new Subject<TableRow<T>[]>();

    /** @hidden */
    private readonly _toggleRowSubject = new Subject<ToggleRowModel>();

    /** @hidden */
    private readonly _scrollToOverlappedCellSubject = new Subject<void>();

    /** @hidden */
    private readonly _cellClickedSubject = new Subject<CellClickedModel>();

    /** @hidden */
    private readonly _cellActivateSubject = new Subject<TableCellActivateEvent<any>>();

    /** @hidden */
    private readonly _cellFocusedSubject = new Subject<FocusableItemPosition>();

    /** @hidden */
    private readonly _toggleAllSelectableRowsSubject = new Subject<boolean>();

    /** @hidden */
    constructor() {
        this.toggleAllSelectableRows$ = this._toggleAllSelectableRowsSubject.asObservable();
        this.cellClicked$ = this._cellClickedSubject.asObservable();
        this.scrollToOverlappedCell$ = this._scrollToOverlappedCellSubject.asObservable();
        this.cellFocused$ = this._cellFocusedSubject.asObservable();
        this.cellActivate$ = this._cellActivateSubject.asObservable();
        this.toggleRow$ = this._toggleRowSubject.asObservable();
    }

    /** `toggleRow$` stream trigger. */
    toggleRow(evt: ToggleRowModel): void {
        this._toggleRowSubject.next(evt);
    }

    /** `scrollToOverlappedCell$` stream trigger. */
    scrollToOverlappedCell(): void {
        this._scrollToOverlappedCellSubject.next();
    }

    /** `cellClicked$` stream trigger. */
    cellClicked(evt: CellClickedModel): void {
        this._cellClickedSubject.next(evt);
    }

    /** @hidden */
    cellActivate(columnIndex: number, row: TableRow): void {
        this._cellActivateSubject.next({ columnIndex, row: row.value });
    }

    /** `cellFocused$` stream trigger. */
    cellFocused(evt: FocusableItemPosition): void {
        this._cellFocusedSubject.next(evt);
    }

    /** `toggleAllSelectableRows$` stream trigger. */
    toggleAllSelectableRows(selectAll: boolean): void {
        this._toggleAllSelectableRowsSubject.next(selectAll);
    }

    /** Groups the table rows. */
    groupTableRows(
        sourceRows: TableRow[],
        groups: Iterable<CollectionGroup>,
        groupRulesMap: Map<string, CollectionGroup>
    ): TableRow[] {
        const groupRules = Array.from(groups);

        if (!groupRules.length) {
            /**
             * In case if previously we had groups with collapsed items
             * but now we don't have it we need to reset row.hidden flag
             * in order to avoid empty table after groups settings removing
             */
            sourceRows.forEach((row) => {
                row.hidden = false;
            });
            return sourceRows;
        }

        // Build tree like groups
        const treeLikeGroupedRows = createGroupedTableRowsTree(groupRules, sourceRows);

        // Sort tree like groups
        const sortedTreeLikeGroupedRows = sortTreeLikeGroupedRows(treeLikeGroupedRows, groupRulesMap);

        // Convert tree like list to a flat list
        return convertTreeLikeToFlatList(sortedTreeLikeGroupedRows);
    }

    /** Sets editable cells for particular row. */
    updateEditableCells(row: TableRow, cells: EditableTableCell[]): void {
        this.editableCells.set(row, cells);
    }

    /** Removes editable cells of particular row. */
    removeEditableCells(row: TableRow): void {
        this.editableCells.delete(row);
    }

    /** Triggers stream to load child items for a particular rows. */
    loadChildRows(rows: TableRow<T> | TableRow<T>[]): void {
        const expandableRows: TableRow<T>[] = [];
        if (Array.isArray(rows)) {
            expandableRows.push(...rows.filter((r) => !r.childItemsLoading$.value));
        } else {
            if (rows.childItemsLoading$.value) {
                return;
            }
            expandableRows.push(rows);
        }
        this.loadChildRows$.next(expandableRows);
    }
}
