import { NgModule } from '@angular/core';
import { FundamentalNgxComponent } from './fundamental-ngx.component';
import { ActionBarModule } from './action-bar/action-bar.module';
import { AlertModule } from './alert/alert.module';
import { BadgeLabelModule } from './badge-label/badge-label.module';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { ButtonModule } from './button/button.module';
import { ButtonGroupModule } from './button-group/button-group.module';
import { DropdownModule } from './dropdown/dropdown.module';
import { FormModule } from './form/form.module';
import { IconModule } from './icon/icon.module';
import { IdentifierModule } from './identifier/identifier.module';
import { ImageModule } from './image/image.module';
import { InlineHelpModule } from './inline-help/inline-help.module';
import { InputGroupModule } from './input-group/input-group.module';
import { ListModule } from './list/list.module';
import { MegaMenuModule } from './mega-menu/mega-menu.module';
import { ModalModule } from './modal/modal.module';
import { NavbarModule } from './navbar/navbar.module';
import { PaginationModule } from './pagination/pagination.module';
import { PanelModule } from './panel/panel.module';
import { SideNavigationModule } from './side-navigation/side-navigation.module';
import { TableModule } from './table/table.module';
import { TabsModule } from './tabs/tabs.module';
import { TileModule } from './tile/tile.module';
import { TreeModule } from './tree/tree.module';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './modal/modal.service';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, NgbModule.forRoot()],
    declarations: [FundamentalNgxComponent],
    exports: [
        FundamentalNgxComponent,
        ActionBarModule,
        AlertModule,
        BadgeLabelModule,
        BreadcrumbModule,
        ButtonModule,
        ButtonGroupModule,
        DropdownModule,
        FormModule,
        IconModule,
        IdentifierModule,
        ImageModule,
        InlineHelpModule,
        IdentifierModule,
        InputGroupModule,
        ListModule,
        MegaMenuModule,
        ModalModule,
        NavbarModule,
        PaginationModule,
        PanelModule,
        SideNavigationModule,
        TableModule,
        TabsModule,
        TileModule,
        TreeModule
    ],
    providers: [ModalService]
})
export class FundamentalNgxModule {}
