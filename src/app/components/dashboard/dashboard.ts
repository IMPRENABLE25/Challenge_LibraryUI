import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface DashboardKPI {
  label: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  iconBg: 'primary' | 'success' | 'warning' | 'info';
  format: 'number' | 'currency' | 'percentage';
}

interface DashboardActivity {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  type: 'create' | 'update' | 'delete' | 'comment' | 'complete';
}

interface DashboardTask {
  id: number;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignee: string;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardPage {

  selectedTimeRange = '30days';

  timeRanges = [
    { value: '7days', label: '7 jours' },
    { value: '30days', label: '30 jours' },
    { value: '90days', label: '90 jours' },
    { value: 'year', label: '1 an' }
  ];

  kpis: DashboardKPI[] = [
    {
      label: 'Transactions',
      value: 1284,
      change: 12.5,
      changeType: 'increase',
      iconBg: 'primary',
      format: 'number'
    },
    {
      label: 'Volume transféré',
      value: 8452,
      change: 8.2,
      changeType: 'increase',
      iconBg: 'success',
      format: 'number'
    },
    {
      label: 'Adresses actives',
      value: 563,
      change: -4.3,
      changeType: 'decrease',
      iconBg: 'warning',
      format: 'number'
    },
    {
      label: 'Transactions confirmées',
      value: 96.8,
      change: 2.7,
      changeType: 'increase',
      iconBg: 'info',
      format: 'percentage'
    }
  ];

  chartLabels = ['Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.'];

  chartValues = [1250, 1820, 1580, 2240, 1960, 2450];

  chartPrev = [1020, 1480, 1320, 1860, 1640, 2010];

  get activityPoints() {
    const max = Math.max(...this.chartValues);
    const width = 100;
    const height = 58;
    const padding = 8;

    return this.chartValues.map((value, index) => {
      const x = padding + (index * (width - padding * 2)) / (this.chartValues.length - 1);
      const y = height - ((value / max) * (height - 12)) - 6;
      return { x, y };
    });
  }

  get activityPath(): string {
    const points = this.activityPoints;
    if (!points.length) {
      return '';
    }

    if (points.length === 1) {
      return `M ${points[0].x} ${points[0].y}`;
    }

    return points.reduce((path, point, index) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }

      const previous = points[index - 1];
      const beforePrevious = points[index - 2] ?? previous;
      const next = points[index + 1] ?? point;
      const control1X = previous.x + (point.x - beforePrevious.x) / 6;
      const control1Y = previous.y + (point.y - beforePrevious.y) / 6;
      const control2X = point.x - (next.x - previous.x) / 6;
      const control2Y = point.y - (next.y - previous.y) / 6;

      return `${path} C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${point.x} ${point.y}`;
    }, '');
  }

  categoryData: CategoryData[] = [
    { name: 'Réception', value: 45, color: '#E0A458' },
    { name: 'Envoi', value: 28, color: '#A39B8C' },
    { name: 'Contrats', value: 15, color: '#D7B38A' },
    { name: 'Échecs', value: 12, color: '#EF4444' }
  ];

  activities: DashboardActivity[] = [
    {
      id: 1,
      user: 'Wallet 0x7A3F…',
      action: 'a reçu une transaction',
      target: '0.45 BNB · 0x8c2…a91',
      time: 'Il y a 5 min',
      type: 'create'
    },
    {
      id: 2,
      user: 'Wallet 0x91B2…',
      action: 'a envoyé une transaction',
      target: '0.12 BNB · 0x4d7…e20',
      time: 'Il y a 15 min',
      type: 'update'
    },
    {
      id: 3,
      user: 'Wallet 0x3C8D…',
      action: 'a interagi avec le contrat',
      target: '0xA12…F45',
      time: 'Il y a 30 min',
      type: 'comment'
    },
    {
      id: 4,
      user: 'Transaction 0xF62…',
      action: 'a été confirmée',
      target: 'Bloc #42 891 205',
      time: 'Il y a 1 h',
      type: 'complete'
    },
    {
      id: 5,
      user: 'Transaction 0xB14…',
      action: 'a échoué',
      target: 'Solde insuffisant',
      time: 'Il y a 2 h',
      type: 'delete'
    },
    {
      id: 6,
      user: 'Wallet 0xD5A1…',
      action: 'a reçu une transaction',
      target: '0.08 BNB · 0x91f…b32',
      time: 'Il y a 3 h',
      type: 'create'
    }
  ];

  tasks: DashboardTask[] = [
    {
      id: 1,
      title: 'Vérifier la connexion RPC',
      status: 'done',
      priority: 'high',
      dueDate: 'Terminé',
      assignee: 'CS'
    },
    {
      id: 2,
      title: 'Examiner les transactions en attente',
      status: 'in-progress',
      priority: 'high',
      dueDate: 'Aujourd’hui',
      assignee: 'CS'
    },
    {
      id: 3,
      title: 'Vérifier les adresses suivies',
      status: 'todo',
      priority: 'medium',
      dueDate: 'Demain',
      assignee: 'CS'
    },
    {
      id: 4,
      title: 'Contrôler les transactions échouées',
      status: 'todo',
      priority: 'low',
      dueDate: 'Cette semaine',
      assignee: 'CS'
    }
  ];

  formatKPI(kpi: DashboardKPI): string {
    if (kpi.format === 'currency') {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
      }).format(kpi.value);
    }

    if (kpi.format === 'percentage') {
      return `${kpi.value}%`;
    }

    return new Intl.NumberFormat('fr-FR').format(kpi.value);
  }

  barHeight(value: number): number {
    return (value / Math.max(...this.chartValues)) * 100;
  }

  prevBarHeight(value: number): number {
    return (value / Math.max(...this.chartValues)) * 100;
  }

  onTimeRangeChange(): void {
    // Le filtrage sera ajouté lors de la connexion au backend.
  }
}
