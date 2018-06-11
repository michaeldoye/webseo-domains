import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SearchService } from '../../search/search.service';
import { Domain } from '../../../core/domain.service';


@Component({
  selector: 'app-panels',
  templateUrl: './panels.component.html',
  styleUrls: ['./panels.component.css']
})
export class PanelsComponent implements OnInit {

  @Input() 
  public panelItems: Domain[];

  @Output() 
  public onDelete = new EventEmitter();
  
  @Output()
  public onUpdate = new EventEmitter();

  public filter: string = '';

  public step: number = 0;

  constructor(public s: SearchService) { }

  public ngOnInit(): void {
    this.s.onSearch.subscribe(q => this.filter = q);
  }

  public delete(id: string): void {
    this.onDelete.emit(id);
  }

  public nodeChange(value: string, id: string, node: string): void {
    const obj = {}; obj[node] = value;
    this.onUpdate.emit({data: obj, id: id});
  }

  public setStep(index: number) {
    this.step = index;
  }

  public nextStep() {
    this.step++;
  }

  public prevStep() {
    this.step--;
  }    
}
