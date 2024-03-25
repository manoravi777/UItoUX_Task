import { Component, AfterViewInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent implements AfterViewInit {
  ngAfterViewInit() {
    $('.carousel').carousel();
    console.log('Bootstrap JavaScript initialized');
  }
}
