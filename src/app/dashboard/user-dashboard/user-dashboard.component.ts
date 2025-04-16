import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent {
  users: any[] = [];
  chartLib: any;
  chart: any;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  async ngOnInit() {
    this.userService.users$.subscribe((users) => {
      this.users = users;
      this.updateChart();
    });

    const { Chart } = await import('chart.js/auto');
    this.chartLib = Chart;
    this.initChart();
  }

  initChart() {
    const ctx = document.getElementById('roleChart') as HTMLCanvasElement;
    this.chart = new this.chartLib(ctx, {
      type: 'pie',
      data: {
        labels: ['Admin', 'Editor', 'Viewer'],
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: ['#1c4980', '#5b8cd1', '#a3c2f0'],
          },
        ],
      },
    });
  }

  updateChart() {
    if (!this.chart || !this.chart.data || !this.chart.data.datasets?.[0]) {
      return;
    }
  
    const roleCount: any = { Admin: 0, Editor: 0, Viewer: 0 };
  
    this.users.forEach((u) => {
      if (roleCount[u.role] !== undefined) {
        roleCount[u.role]++;
      }
    });
  
    this.chart.data.datasets[0].data = [
      roleCount.Admin,
      roleCount.Editor,
      roleCount.Viewer,
    ];
  
    this.chart.update();
  }

  openUserForm() {
    import('../user-form/user-form.component').then(({ UserFormComponent }) => {
      this.dialog.open(UserFormComponent, {
        width: '400px',
      });
    });
  }
}
