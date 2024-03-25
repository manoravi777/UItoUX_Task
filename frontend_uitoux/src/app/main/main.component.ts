import { Component } from '@angular/core';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../service/ApiService';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  faStar = faStar;
  faStarHalf = faStarHalf;
  data:any;
  allFeatures:any;
  TopRatedproduct:any;
  specialProduct:any;
  getOneFeature:any;
  BestProduct:any;
  showAllFeatures: boolean = true;
  selectedItemId: string | null = null;
  rating: number = 3.5; // Example rating
  totalStars: number = 5;
  fullStars: number = Math.floor(this.rating); // Number of full stars
  halfStar: boolean = this.rating % 1 !== 0; // Whether to display a half 
  
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

    this.apiService.getAllProduct().subscribe(
      (response) => {
        this.allFeatures = response;
        console.log(response , 'Products');
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    this.apiService.getTopRatedProduct().subscribe(
      (response) => {
        this.TopRatedproduct = response;
        console.log(response , 'toprated_Products');
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    this.apiService.getSpecialOfferProduct().subscribe(
      (response) => {
        this.specialProduct = response;
        console.log(response , 'special_Products');
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    this.apiService.getBestSellerProduct().subscribe(
      (response) => {
        this.BestProduct = response;
        console.log(response , 'best_Products');
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    
  }
  getAllFeatures(): void {
    this.showAllFeatures = true;
    this.selectedItemId = null; 
    this.apiService.getAllProduct().subscribe(
      (response) => {
        this.allFeatures = response;
        console.log(response , 'Products');
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

  
  }

  // getoneProduct():
  getoneProduct(_id: string): void {
    // Call the appropriate method from ApiService to fetch data by ID
    this.showAllFeatures = false;
    this.selectedItemId = _id; 
    this.apiService.getOneProductFromFeature(_id).subscribe(
      (response) => {
        this.getOneFeature=response;
        // Handle the response data as needed
        console.log('Data for ID', _id, ':', response);
      },
      (error) => {
        console.error('Error fetching data by ID:', error);
      }
    );
  }
 
   
  
} 