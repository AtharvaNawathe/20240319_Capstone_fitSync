import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule, SlickCarouselModule,CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  slides = [
    { img: "https://www.shutterstock.com/image-photo/happy-new-year-20242024-symbolizes-start-2396942295" },
    { img: "https://www.shutterstock.com/image-photo/happy-new-year-20242024-symbolizes-start-2396942295" },
    { img: "https://www.shutterstock.com/image-photo/happy-new-year-20242024-symbolizes-start-2396942295" },
    { img: "https://www.shutterstock.com/image-photo/happy-new-year-20242024-symbolizes-start-2396942295" },
  ];

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "autoplay": true, // Enable autoplay
    "autoplaySpeed": 2500 // Slide every 3 seconds (3000 milliseconds)
  };

  addSlide() {
    this.slides.push({ img: "http://placehold.it/350x150/777777" })
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
}
