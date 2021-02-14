import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleFullScreenDirective } from '../shared/full-screen/toggle-full-screen';
import { LayoutComponent } from './layout.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavLeftComponent } from './nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './nav-bar/nav-left/nav-search/nav-search.component';

import { NavCollapseComponent } from './navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavContentComponent } from './navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from './navigation/nav-content/nav-item/nav-item.component';
import { NavigationComponent } from './navigation/navigation.component';
import {
  NgbButtonsModule,
  NgbDropdownModule,
  NgbTabsetModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NavigationItem } from './navigation/navigation';
import { RouterModule } from '@angular/router';
import { NavRightComponent } from './nav-bar/nav-right/nav-right.component';

@NgModule({
  declarations: [
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavRightComponent,
    NavSearchComponent,
    ToggleFullScreenDirective,
    LayoutComponent,
  ],
  exports: [
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavRightComponent,
    NavSearchComponent,
    ToggleFullScreenDirective,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule,
    SharedModule,
    RouterModule,
  ],
  providers: [NavigationItem],
})
export class LayoutModule {}
