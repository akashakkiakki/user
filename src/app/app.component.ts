import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'user-dashboard';
}
