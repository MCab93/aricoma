import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MATERIAL_MODULES } from '../../../shared/material.imports';

export interface SnackbarData {
  message: string;
  actionText: string;
}

@Component({
  selector: 'app-snackbar',
  imports: [MATERIAL_MODULES],
  template: `
    <div class="flex items-center justify-between gap-4">
      <span>{{ data.message }}</span>
      <button mat-button (click)="snackBarRef.dismissWithAction()">{{ data.actionText }}</button>
    </div>
  `,
})
export class SnackbarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData
  ) {}
}
