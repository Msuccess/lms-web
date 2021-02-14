import { NextConfig } from './../../app-config';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public windowWidth: number;
  public nextConfig: any;
  @Output() onNavMobCollapse = new EventEmitter();

  constructor() {
    this.nextConfig = NextConfig.config;
    this.windowWidth = window.innerWidth;
  }

  ngOnInit(): void {}

  navMobCollapse(): void {
    if (this.windowWidth < 992) {
      this.onNavMobCollapse.emit();
    }
  }
}
