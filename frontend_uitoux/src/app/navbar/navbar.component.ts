import { Component } from '@angular/core';
import { faSearch, faCar } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../service/ApiService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  faSearch = faSearch;
  faCar = faCar;
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
