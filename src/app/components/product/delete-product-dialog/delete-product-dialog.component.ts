import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MATERIAL_MODULES } from '../../../shared/material.imports';

@Component({
  selector: 'app-delete-product-dialog',
  imports: [MATERIAL_MODULES],
  template: `
    <h2 mat-dialog-title>Opravdu chcete smazat tento produkt?</h2>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Ne</button>
      <button mat-raised-button color="warn" (click)="confirm()">Ano</button>
    </mat-dialog-actions>
  `,
})
export class DeleteProductDialogComponent {
  private dialogRef = inject(MatDialogRef<DeleteProductDialogComponent>);

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
