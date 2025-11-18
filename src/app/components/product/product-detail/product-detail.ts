import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductBasicComponent } from '../product-basic/product-basic.component';
import { DeleteProductDialogComponent } from '../delete-product-dialog/delete-product-dialog.component';
import { SnackbarComponent } from '../../ui/snackbar/snackbar.component';
import { Product } from '../../../models/product.model';
import { MATERIAL_MODULES } from '../../../shared/material.imports';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, MATERIAL_MODULES],
  templateUrl: './product-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail extends ProductBasicComponent implements OnInit {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  product?: Product 

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        const products = this.productService.products();
        this.product = products?.find((p) => p.id === id);
      }
    });
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent);
    
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed && this.product) {
        this.productService.deleteProduct(this.product.id);
        this.snackBar.openFromComponent(SnackbarComponent, {
          duration: 3000,
          verticalPosition: 'top',
          data: {
            message: 'Produkt byl smazán',
            actionText: 'Zavřít'
          }
        });
        this.goBack();
      }
    });
  }

  editProduct(): void {
    if (this.product) {
      this.router.navigate(['/product-edit', this.product.id]);
    }
  }
}
