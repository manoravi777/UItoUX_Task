import { Component } from '@angular/core';
import { ApiService } from './service/ApiService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'uitoux';
  data: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getShopCategory().subscribe(
      (response) => {
        this.data = response;
        console.log(response);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

}
