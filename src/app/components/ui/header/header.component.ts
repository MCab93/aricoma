import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MATERIAL_MODULES } from '../../../shared/material.imports';

@Component({
  selector: 'app-header',
  imports: [MATERIAL_MODULES],
  template: `
    <mat-toolbar class="!bg-blue-500 text-white flex justify-start">
      <button mat-icon-button [matMenuTriggerFor]="menu">
        <mat-icon>menu</mat-icon>
      </button>
      <span class="text-2xl font-bold ml-4">Data Management Dashboard</span>
      
      <mat-menu #menu="matMenu">
        <button mat-menu-item (click)="navigate('/')">
          <span>Produkty</span>
        </button>
      </mat-menu>
    </mat-toolbar>
  `,
})
export class HeaderComponent {
  private router = inject(Router);

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
