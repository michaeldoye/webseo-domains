import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lead-callout',
  templateUrl: './callout.component.html',
  styleUrls: ['./callout.component.css']
})
export class CalloutComponent implements OnInit {

  @Input() message: string;
  @Input() icon: string;
  @Input() class: string;

  constructor() { }

  ngOnInit() {
  }

}
