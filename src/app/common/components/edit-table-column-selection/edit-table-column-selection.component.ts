import { Component, Inject } from '@angular/core';
import { MatTableColDef } from '../../../models/mat-table-col-def';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-table-column-selection',
  imports: [MatDialogModule, MatCheckboxModule, TranslateModule, NgFor, NgClass, FormsModule],
  templateUrl: './edit-table-column-selection.component.html',
  styleUrl: './edit-table-column-selection.component.css'
})
export class EditTableColumnSelectionComponent {
  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<EditTableColumnSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatTableColDef[]) { }

    columns: MatTableColDef[] = [];

  ngOnInit(): void {
    this.columns = this.data;
    if(document.getElementsByClassName('dark-theme').length > 0) this.isInDarkTheme = true;
    else this.isInDarkTheme = false;
  }

  selectAll!: boolean;
  isInDarkTheme: boolean = false;

  save() {
    let x = this.columns.filter(a => a.IsSelected == true);
    if (x.length == 0) {
      //ijt.notificationService.error(ijt.translate.instant('modules.Others.commonTable.Msgs.selectionValidation'));
      return;
    }
    this.dialogRef.close(this.columns);
  }

  setAll(event_data: boolean){
    if(event_data == true){
      this.columns.forEach(c => c.IsSelected = true);
    }
    else{
      this.columns.forEach(c => c.IsSelected = false);
    }

  }

  get allComplete(): boolean{
    var selectedLength = this.columns.filter(c => c.IsSelected == true).length;
    if(selectedLength == this.columns.length) return true;
    return false;
  }



  get someComplete(): boolean{
    var selectedLength = this.columns.filter(c => c.IsSelected == true).length;
    if(selectedLength < this.columns.length && selectedLength > 0) return true;
    return false;
  }
  drop(event: CdkDragDrop<MatTableColDef[]> | any) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }
}
