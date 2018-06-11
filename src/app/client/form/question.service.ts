import { Injectable } from '@angular/core';
import { DropdownQuestion } from './question-dropdown';
import { QuestionBase } from './question-base';
import { TextboxQuestion } from './question-textbox';
import { DateQuestion } from './question-date';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getQuestions() {

    let questions: QuestionBase<any>[] = [

      new TextboxQuestion({
        value: '',
        key: 'client',
        label: 'Client Name',
        required: true,
        order: 1
      }),
      
      new TextboxQuestion({
        value: '',
        key: 'contact',
        label: 'Client Email',
        required: false,
        order: 2
      }),      

      new DropdownQuestion({
        key: 'status',
        label: 'Status',
        options: [
          {key: 'hosting',  value: 'Hosting'},
          {key: 'email',  value: 'Email'},
          {key: 'parked',   value: 'Parked'},
        ],
        required: true,
        order: 4
      }),

      new TextboxQuestion({
        value: '',
        key: 'cost',
        label: 'Cost',
        required: true,
        order: 6
      }),      

      new TextboxQuestion({
        value: '',
        key: 'name',
        label: 'Domain Name',
        required: true,
        order: 3
      }),

      new DropdownQuestion({
        key: 'domain',
        label: 'Domain Registered with WebSEO',
        options: [
          {key: 'yes',  value: 'Yes'},
          {key: 'no',  value: 'No'}
        ],
        required: true,
        order: 5,
        hint: 'Did we register this domain?'
      }),

    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}