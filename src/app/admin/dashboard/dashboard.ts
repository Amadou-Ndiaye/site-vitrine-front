import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  search = '';
  selectedPeriod = '7 derniers jours';

  stats = [
    {
      title: "Chiffre d'affaires",
      value: '2 845 000 FCFA',
      change: '+12,5%',
      icon: 'wallet',
      color: 'blue'
    },
    {
      title: 'Commandes',
      value: '248',
      change: '+8,2%',
      icon: 'shopping-cart',
      color: 'green'
    },
    {
      title: 'Clients',
      value: '1 256',
      change: '+15,3%',
      icon: 'users',
      color: 'purple'
    },
    {
      title: 'Produits',
      value: '86',
      change: '+4,9%',
      icon: 'package',
      color: 'orange'
    }
  ];

  products = [
    {
      name: 'Baskets Sport',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
      sales: 56,
      revenue: '672 000 FCFA'
    },
    {
      name: 'Smartphone X1',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop',
      sales: 42,
      revenue: '1 008 000 FCFA'
    },
    {
      name: 'Sac à dos',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
      sales: 38,
      revenue: '456 000 FCFA'
    },
    {
      name: 'Casque Bluetooth',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      sales: 35,
      revenue: '420 000 FCFA'
    },
    {
      name: 'Montre connectée',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
      sales: 28,
      revenue: '336 000 FCFA'
    }
  ];

  orders = [
    {
      id: '#CMD-1024',
      customer: 'Mariama Diallo',
      amount: '45 000 FCFA',
      date: '02/04/2025',
      status: 'Livrée'
    },
    {
      id: '#CMD-1023',
      customer: 'Ibrahima Sy',
      amount: '78 500 FCFA',
      date: '02/04/2025',
      status: 'En cours'
    },
    {
      id: '#CMD-1022',
      customer: 'Aminata Fall',
      amount: '26 000 FCFA',
      date: '01/04/2025',
      status: 'Expédiée'
    },
    {
      id: '#CMD-1021',
      customer: 'Cheikh Mbaye',
      amount: '112 000 FCFA',
      date: '01/04/2025',
      status: 'Livrée'
    },
    {
      id: '#CMD-1020',
      customer: 'Fatou Diop',
      amount: '59 500 FCFA',
      date: '01/04/2025',
      status: 'En attente'
    }
  ];

  activities = [
    {
      icon: 'shopping-cart',
      title: 'Nouvelle commande',
      detail: 'Mariama Diallo · 45 000 FCFA',
      time: 'Il y a 12 min',
      color: 'green'
    },
    {
      icon: 'users',
      title: 'Nouveau client inscrit',
      detail: 'Ousmane Ndiaye',
      time: 'Il y a 35 min',
      color: 'blue'
    },
    {
      icon: 'package',
      title: 'Produit ajouté',
      detail: 'Casque Bluetooth',
      time: 'Il y a 1 h',
      color: 'purple'
    },
    {
      icon: 'tag',
      title: 'Promotion créée',
      detail: '-20% sur les accessoires',
      time: 'Il y a 2 h',
      color: 'orange'
    },
    {
      icon: 'clock',
      title: 'Commande annulée',
      detail: '#CMD-1018',
      time: 'Il y a 3 h',
      color: 'red'
    }
  ];

  categories = [
    { name: 'Électronique', percent: 28, color: '#2684ff' },
    { name: 'Mode', percent: 22, color: '#9360ed' },
    { name: 'Maison & Déco', percent: 18, color: '#16a6b2' },
    { name: 'Beauté & Santé', percent: 12, color: '#ffad36' },
    { name: 'Sport & Loisirs', percent: 10, color: '#ec5bb3' },
    { name: 'Autres', percent: 10, color: '#a8bad1' }
  ];
navItems = [
    { label: 'Tableau de bord', icon: 'layout-dashboard' },
    { label: 'Produits', icon: 'package' },
    { label: 'Commandes', icon: 'shopping-bag' },
    { label: 'Clients', icon: 'users' },
    { label: 'Catégories', icon: 'layers' },
    { label: 'Promotions', icon: 'tag' },
    { label: 'Rapports', icon: 'file-text' }
  ];

  activePage = 'Tableau de bord';

  calendarMonth = 3;
  calendarYear = 2025;
  selectedDay = 2;

  get monthName(): string {
    return new Date(
      this.calendarYear,
      this.calendarMonth
    ).toLocaleDateString('fr-FR', { month: 'long' });
  }

  get calendarDays(): number[] {
    const firstDay = new Date(
      this.calendarYear,
      this.calendarMonth,
      1
    ).getDay();

    const offset = (firstDay + 6) % 7;

    const daysInMonth = new Date(
      this.calendarYear,
      this.calendarMonth + 1,
      0
    ).getDate();

    const previousMonthDays = new Date(
      this.calendarYear,
      this.calendarMonth,
      0
    ).getDate();

    const days: number[] = [];

    for (let i = offset - 1; i >= 0; i--) {
      days.push(-(previousMonthDays - i));
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    let nextDay = 1;
    while (days.length % 7 !== 0) {
      days.push(-100 - nextDay++);
    }

    return days;
  }

  previousMonth(): void {
    this.calendarMonth--;

    if (this.calendarMonth < 0) {
      this.calendarMonth = 11;
      this.calendarYear--;
    }

    this.selectedDay = 1;
  }

  nextMonth(): void {
    this.calendarMonth++;

    if (this.calendarMonth > 11) {
      this.calendarMonth = 0;
      this.calendarYear++;
    }

    this.selectedDay = 1;
  }

  selectDay(day: number): void {
    if (day > 0) {
      this.selectedDay = day;
    }
  }

  setPage(page: string): void {
    this.activePage = page;
  }

  get filteredProducts() {
    const query = this.search.toLowerCase().trim();

    return this.products.filter(product =>
      product.name.toLowerCase().includes(query)
    );
  }

  get filteredOrders() {
    const query = this.search.toLowerCase().trim();

    return this.orders.filter(order =>
      order.id.toLowerCase().includes(query) ||
      order.customer.toLowerCase().includes(query)
    );
  }
}