import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarOpen = false; // Estado para abrir/cerrar la sidebar
  openCategories: Set<string> = new Set(); // Para gestionar las categorías abiertas

  constructor(private router: Router) {
    // Detectar cambios en la ruta y cerrar la sidebar
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isSidebarOpen = false; // Cierra la sidebar
      }
    });
  }
  
  // Función para abrir y cerrar la sidebar
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


  // Función para abrir/cerrar una categoría
  toggleCategory(category: string) {
    if (this.openCategories.has(category)) {
      this.openCategories.delete(category);
    } else {
      this.openCategories.add(category);
    }
  }

  // Verificar si una categoría está abierta
  isCategoryOpen(category: string): boolean {
    return this.openCategories.has(category);
  }
}