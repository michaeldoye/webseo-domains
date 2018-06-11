import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from './question-base';
import { QuestionControlService } from './question-control.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { DomainService } from '../../core/domain.service';
import { AddNewDialogComponent } from '../add-new-dialog/add-new-dialog.component';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './lead-form.component.html',
  providers: [ QuestionControlService ],
  styles: [`
    .spinner-form {
      position: absolute;
      top: 45%;
      left: 45%;
    }`
  ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';
  isLoading: boolean = false;

  constructor(
    private qcs: QuestionControlService,
    private domains: DomainService,
    private dialogRef: MatDialogRef<AddNewDialogComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.domains.addNew(this.form.value)
      .subscribe(d => this.addKey(d.key));
  }

  addKey(key: string) {
    this.domains.updateNode(key, {id: key}).then(() => {
      this.dialogRef.close();
      this.openSnackBar('Domain Added', 'OK');
      this.isLoading = false;
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, 
      {duration: 3000, horizontalPosition: 'left'}
    );
  }  

}