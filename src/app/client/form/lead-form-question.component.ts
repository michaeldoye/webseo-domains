import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from './question-base';

@Component({
  selector: 'app-question',
  templateUrl: './lead-form-question.component.html',
  styles: [`:host{width:95%}`]
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }
}