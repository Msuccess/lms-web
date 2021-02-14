import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() isDisabled: any;
  @Input() buttonType: string;
  @Output() clicked = new EventEmitter<boolean>();
  constructor() {}

  handleClick(): void {
    this.clicked.emit(true);
  }

  ngOnInit(): void {}
}
