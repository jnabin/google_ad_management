import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { navItemsDO } from './nav-items-config';
import { Utility } from '../../common/utility';
import { jwtDecode } from "jwt-decode";
import $ from 'jquery';
import { ReminderNotiIconComponent } from '../reminder-noti-icon/reminder-noti-icon.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, CommonModule, ReminderNotiIconComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  brandUrl: string = '';
  brand: string = 'Sky service'
  NewNotificationCount = 1;
  version = '1.0.1.2';
  navItems: navItemsDO[] = [];
  menuList: any[] = [];
  decodedToken: any;
  constructor(public router: Router) {
    
  }

  async ngOnInit(): Promise<void> {
    this.decodedToken = jwtDecode(Utility.menuToken);
    this.menuList = JSON.parse(this.decodedToken.UserMenus);
    this.navItems = Utility.mapMenuToNavItems(this.menuList);
    console.log(this.navItems);
    $(document).ready(function () {

      $("#close-sidebar").click(function () {
        $(".page-wrapper").removeClass("toggled");
      });
      $("#show-sidebar").click(function () {
        $(".page-wrapper").addClass("toggled");
      });

    });
  }

  onNotificationIconClicked(event:any){

  }

  toggleItem(item: navItemsDO) {
    item.expanded = !item.expanded;
  }

  menuClick(item: navItemsDO, event: any = null) {
    console.log('menuClick', item);
    if(item.disabled) return;
    // if (!UserBC.getInstance().IsOriginalBranch) {
    //   if (item.route.includes('sales') || (item.route.includes('sti-report') && !item.route.includes('pricing-report'))) {
    //     if (event) {
    //       event.preventDefault();
    //     }
    //     ijt.notificationService.error('Access restricted for the current branch');
    //     return;
    //   }
    // }
    // ijt.router.navigate([item.route]);
    // let s = ScreenMasterBC.getInstance().getByIdentifier(item.identifier);
    //console.log('current screen', s);
    //ScreenMasterBC.getInstance().CurrentScreen = s;
  }
}
