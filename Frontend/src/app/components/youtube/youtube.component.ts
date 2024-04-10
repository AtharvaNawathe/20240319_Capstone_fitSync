import { Component } from '@angular/core';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-youtube',
  standalone: true,
  imports: [YouTubePlayerModule,CommonModule,CarouselModule],
  templateUrl: './youtube.component.html',
  styleUrl: './youtube.component.css'
})
export class YoutubeComponent {

}
