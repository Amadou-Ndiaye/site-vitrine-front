import { Component, OnInit, signal } from '@angular/core';
import { ServiceRea } from '../../../core/models/serviceRea';
import { ServiceREAService } from '../../../core/services/serviceRea/service-rea-service';

@Component({
  selector: 'app-work',
  imports: [],
  templateUrl: './work.html',
  styleUrl: './work.css',
})
export class Work implements OnInit {

  services = signal<ServiceRea[]>([]);

  constructor(
    private serviceReaService: ServiceREAService
  ) {}

  ngOnInit(): void {
    this.serviceReaService.getAll().subscribe({
      next: (response) => {
        this.services.set(response.data);
        console.log('Données récupérées :', response.data);
      },
      error: (error) => {
        console.error('Erreur de récupération :', error);
      }
    });
  }
}