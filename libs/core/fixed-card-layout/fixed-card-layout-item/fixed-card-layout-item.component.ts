import { FocusableOption } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';

@Component({
    selector: 'fd-fixed-card-layout-item',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[style.display]': '"block"'
    },
    standalone: true
})
export class FixedCardLayoutItemComponent implements FocusableOption {
    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** Set focus on the element. */
    focus(): void {
        const header = this._elementRef.nativeElement.querySelector('.fd-card__header');
        if (header) {
            header.focus();
        }
    }
}
