import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button'; 
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CarouselModule,ButtonModule,ImageModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {
  

}



	