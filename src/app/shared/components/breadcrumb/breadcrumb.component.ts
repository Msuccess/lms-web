import { Component, Input, OnInit } from '@angular/core';
import { NavigationItem } from '../../../layout/navigation/navigation';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserRoles } from 'src/app/layout/navigation/nav-content/navbar.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() type: string;
  currentNavigation: string;

  public navigation: any;
  breadcrumbList: Array<any> = [];
  public navigationList: Array<any> = [];

  constructor(
    private route: Router,
    public nav: NavigationItem,
    private titleService: Title
  ) {
    this.getCurrentUrl();
    this.navigation = this.nav.get();
    this.type = 'theme2';
    this.setBreadcrumb();
  }

  ngOnInit(): void {
    let routerUrl: string;
    routerUrl = this.route.url;
    if (routerUrl && typeof routerUrl === 'string') {
      this.filterNavigation(routerUrl);
    }
  }

  getCurrentUrl(): void {
    if (this.route.url.indexOf(UserRoles.Institution) > -1) {
      this.currentNavigation = UserRoles.Institution;
    }
    if (this.route.url.indexOf(UserRoles.Student) > -1) {
      this.currentNavigation = UserRoles.Student;
    }
    if (this.route.url.indexOf(UserRoles.Teacher) > -1) {
      this.currentNavigation = UserRoles.Teacher;
    }
  }

  setBreadcrumb(): void {
    let routerUrl: string;
    this.route.events.subscribe((router: any) => {
      routerUrl = router.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === 'string') {
        this.breadcrumbList.length = 0;
        const activeLink = router.url;
        this.filterNavigation(activeLink);
      }
    });
  }

  filterNavigation(activeLink: string): void {
    let result = [];
    let title = 'Welcome';
    this.navigation?.forEach((a: any) => {
      if (a.type === 'item' && 'url' in a && a.url === activeLink) {
        result = [
          {
            url: 'url' in a ? a.url : false,
            title: a.title,
            breadcrumbs: 'breadcrumbs' in a ? a.breadcrumbs : true,
            type: a.type,
          },
        ];
        title = a.title;
      } else {
        if (a.type === 'group' && 'children' in a) {
          a.children?.forEach((b: any) => {
            if (b.type === 'item' && 'url' in b && b.url === activeLink) {
              result = [
                {
                  url: 'url' in b ? b.url : false,
                  title: b.title,
                  breadcrumbs: 'breadcrumbs' in b ? b.breadcrumbs : true,
                  type: b.type,
                },
              ];
              title = b.title;
            } else {
              if (b.type === 'collapse' && 'children' in b) {
                b.children?.forEach((c: any) => {
                  if (c.type === 'item' && 'url' in c && c.url === activeLink) {
                    result = [
                      {
                        url: 'url' in b ? b.url : false,
                        title: b.title,
                        breadcrumbs: 'breadcrumbs' in b ? b.breadcrumbs : true,
                        type: b.type,
                      },
                      {
                        url: 'url' in c ? c.url : false,
                        title: c.title,
                        breadcrumbs: 'breadcrumbs' in c ? c.breadcrumbs : true,
                        type: c.type,
                      },
                    ];
                    title = c.title;
                  } else {
                    if (c.type === 'collapse' && 'children' in c) {
                      c.children?.forEach((d: any) => {
                        if (
                          d.type === 'item' &&
                          'url' in d &&
                          d.url === activeLink
                        ) {
                          result = [
                            {
                              url: 'url' in b ? b.url : false,
                              title: b.title,
                              breadcrumbs:
                                'breadcrumbs' in b ? b.breadcrumbs : true,
                              type: b.type,
                            },
                            {
                              url: 'url' in c ? c.url : false,
                              title: c.title,
                              breadcrumbs:
                                'breadcrumbs' in c ? c.breadcrumbs : true,
                              type: c.type,
                            },
                            {
                              url: 'url' in d ? d.url : false,
                              title: d.title,
                              breadcrumbs:
                                'breadcrumbs' in c ? d.breadcrumbs : true,
                              type: d.type,
                            },
                          ];
                          title = d.title;
                        }
                      });
                    }
                  }
                });
              }
            }
          });
        }
      }
    });
    this.navigationList = result;
    this.titleService.setTitle(title + ' | Able Pro Angular 8+ Admin Template');
  }
}
