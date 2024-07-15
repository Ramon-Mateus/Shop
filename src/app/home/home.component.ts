import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../types';
import { ProductComponent } from "../components/product/product.component";
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}
  
  base_url = "http://localhost:3000"
  products: Product[] = [];

  totalRecords: number = 0;
  rows: number = 5;

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts(`${this.base_url}/clothes`, {page, perPage})
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  editProduct(product: Product, id: number) {
    this.productsService.editProduct(`${this.base_url}/clothes/${id}`, product).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows)
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(`${this.base_url}/clothes/${id}`).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows)
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  addProduct(product: Product) {
    this.productsService.editProduct(`${this.base_url}/clothes`, product).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows)
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  ngOnInit() { // função chamada quando o componente é inicializado pela primeira vez
    this.fetchProducts(0, this.rows)
  }
}
