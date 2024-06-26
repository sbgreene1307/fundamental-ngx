import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

/**
 * Layout Panel level filters that is specific to the data being displayed within the panel.
 *
 * ```html
 * <fd-layout-panel>
 *     <fd-layout-panel-filters>
 *         Some text can go here!
 *     </fd-layout-panel-filters>
 * </fd-layout-panel>
 * ```
 */
@Component({
    selector: 'fd-layout-panel-filters',
    template: `<ng-content></ng-content>`,
    host: {
        '[class.fd-has-display-block]': 'true'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class LayoutPanelFiltersComponent {
    /** @hidden */
    @HostBinding('class.fd-layout-panel__filters')
    fdLayoutPanelFiltersClass = true;
}
