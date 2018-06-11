import { Directive, Input, Output, OnChanges, EventEmitter, ElementRef } from '@angular/core';

@Directive({
  selector: '[msContenteditable]',
  host: {
    '(blur)': 'onEdit()'
  }
})
export class ContenteditableDirective implements OnChanges {

  @Input('msContenteditable') model: any;
  
  @Output('contenteditableModelChange') update = new EventEmitter();

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnChanges(changes) {
    if (changes.model.isFirstChange())
      this.refreshView();
  }

  onEdit() {
    var value = this.elementRef.nativeElement.innerText;
    this.update.emit(value);
  }

  private refreshView() {
    let model = this.model ? this.model : 'n/a'
    this.elementRef.nativeElement.textContent = model;
  }
}