import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpHeaders,HttpClientModule } from '@angular/common/http';
import { BlogsComponent } from '../blogs/blogs.component';
import { SidebarComponent } from '../sidebar/sidebar.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,HttpClientModule,BlogsComponent,SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  username: string = '';

  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
}
