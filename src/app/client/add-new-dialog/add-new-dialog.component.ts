import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { QuestionService } from '../form/question.service';

@Component({
  selector: 'lead-edit-dialog',
  templateUrl: 'add-new-dialog.component.html', 
  styles: [`:host {position:relative;display:block}`]
})
export class AddNewDialogComponent implements OnInit {

  formFeilds: any[];
  
  constructor(
    public dialogRef: MatDialogRef<AddNewDialogComponent>,
    private feilds: QuestionService) {
      this.formFeilds = feilds.getQuestions();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    //console.log(this.data.data)
  }

}
