import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpHeaders,HttpClientModule } from '@angular/common/http';
import { YoutubeComponent } from '../youtube/youtube.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,HttpClientModule,YoutubeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  username: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      });

      this.http.get<any>('http://localhost:3000/user/profiledetails', { headers }).subscribe(
        (response) => {
          this.username = response.user.username;
        },
        (error) => {
          console.error(error);
          // Handle error
        }
      );
    }
  }
}
