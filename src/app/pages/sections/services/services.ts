import { Component, OnInit, signal } from '@angular/core';
import { ServiceRea } from '../../../core/models/serviceRea';
import { ServiceREAService } from '../../../core/services/serviceRea/service-rea-service';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements OnInit{

  

  services = signal<ServiceRea[] | any>([]);

  constructor(private ServiceReaService: ServiceREAService){

  }
  ngOnInit(): void {
    this.ServiceReaService.getAll().subscribe((response) => {
      console.log(response);
      this.services.set(response.data)

      this.services().forEach((element:ServiceRea) => {
        console.log(element.titre)
      });

    },(error)=>{
      console.log("eror");
    })
  }

}
