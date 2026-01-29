import { Component } from '@angular/core';
import { CatalogService } from '../catalog-service';

@Component({
  selector: 'app-ex14',
  standalone: false,
  templateUrl: './ex14.html',
  styleUrl: './ex14.css',
})
export class EX14 {
   categories: any[] = [];

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.categories = this.catalogService.getCategories();
  }
}