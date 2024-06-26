import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { DateRange } from '@fundamental-ngx/core/calendar';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FdDatetimeModule
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-date-picker-range-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ` <fd-date-picker type="range" [(ngModel)]="selectedRange"> </fd-date-picker>
        <br />
        <div>Selected First Date: {{ this.selectedRange?.start?.toDateString() || 'null' }}</div>
        <br />
        <div>Selected Last Date: {{ this.selectedRange?.end?.toDateString() || 'null' }}</div>`,
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: DATE_TIME_FORMATS,
            useValue: FD_DATETIME_FORMATS
        }
    ],
    standalone: true,
    imports: [DatePickerComponent, FormsModule, FdDatetimeModule]
})
export class DatePickerRangeExampleComponent {
    selectedRange: Nullable<DateRange<FdDate>>;

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {
        const today = this.datetimeAdapter.today();
        this.selectedRange = new DateRange(today, this.datetimeAdapter.addCalendarDays(today, 1));
    }
}
