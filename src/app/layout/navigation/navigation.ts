import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/app/dashboard',
        classes: 'nav-item',
        icon: 'feather icon-home',
      },
      {
        id: 'student',
        title: 'Student',
        type: 'collapse',
        icon: 'feather icon-users',
        children: [
          {
            id: 'list-student',
            title: 'Students',
            type: 'item',
            url: '/app/student/list',
          },
          {
            id: 'add-student',
            title: 'Add Student',
            type: 'item',
            url: '/app/student/add',
          },
        ],
      },
      {
        id: 'teacher',
        title: 'Teacher',
        type: 'collapse',
        icon: 'feather icon-layers',
        children: [
          {
            id: 'list-teacher',
            title: 'Teachers',
            type: 'item',
            url: '/app/teacher/list',
          },
          {
            id: 'add-teacher',
            title: 'Add Teacher',
            type: 'item',
            url: '/app/teacher/add',
          },
        ],
      },
      {
        id: 'class',
        title: 'Class',
        type: 'collapse',
        icon: 'feather icon-book',
        children: [
          {
            id: 'list-class',
            title: 'Classes',
            type: 'item',
            url: '/app/class/list',
          },
          {
            id: 'add-class',
            title: 'Add Class',
            type: 'item',
            url: '/app/class/add',
          },
        ],
      },
      {
        id: 'document',
        title: 'Document',
        type: 'collapse',
        icon: 'feather icon-folder',
        children: [
          {
            id: 'list-document',
            title: 'Documents',
            type: 'item',
            url: '/app/document/list',
          },
          {
            id: 'add-document',
            title: 'Add Document',
            type: 'item',
            url: '/app/document/add',
          },
        ],
      },
      {
        id: 'course',
        title: 'Course',
        type: 'collapse',
        icon: 'feather icon-book',
        children: [
          {
            id: 'list-course',
            title: 'Courses',
            type: 'item',
            url: '/app/course/list',
          },
          {
            id: 'add-course',
            title: 'Add Course',
            type: 'item',
            url: '/app/course/add',
          },
        ],
      },

      {
        id: 'settings',
        title: 'Settings',
        type: 'item',
        url: '/app/settings',
        classes: 'nav-item',
        icon: 'feather icon-settings',
      },
    ],
  },
];

@Injectable()
export class NavigationItem {
  public get(): any {
    return NavigationItems;
  }
}
