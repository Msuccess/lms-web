import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  view = 'grid';

  selectedView(view: string): string {
    return (this.view = view);
  }

  constructor() {}

  ngOnInit(): void {}
}
