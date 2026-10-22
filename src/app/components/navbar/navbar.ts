
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DaoStateService } from '../../dao-demo';
import { AccountMenuComponent } from '../dropdown/dropdown';

interface NavItem {
  icon: string;
  label: string;
  route: string;
  separator?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, AccountMenuComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  private readonly dao = inject(DaoStateService);
  private readonly router = inject(Router);
  sidebarOpen = signal(false);
  sidebarCollapsed = signal(false);

  networkOptions = ['Ethereum Mainnet', 'Polygon', 'Arbitrum', 'Base', 'Solana'];

  navItems: NavItem[] = [
    { icon: 'grid', label: 'Dashboard', route: '/dashboard' },
    { icon: 'layers', label: 'Propositions', route: '/proposals' },
    { icon: 'wallet', label: 'Créer une proposition', route: '/proposals/new' },
    { icon: 'network', label: 'Gouvernance', route: '/governance', separator: true },
    { icon: 'activity', label: 'Trésorerie', route: '/treasury' },
    { icon: 'settings', label: 'Membres', route: '/members', separator: true },
    { icon: 'help-circle', label: 'Activité', route: '/activity' },
    { icon: 'help-circle', label: 'Paramètres', route: '/settings' },
    { icon: 'help-circle', label: 'Aide', route: '/help' }
  ];

  user = {
    name: 'Joachim IMPRENABLE',
    role: 'Gouvernance · Demo',
    location: 'Testnet',
    wallet: '0xA1B2...89F0',
    avatar: '/471762680_3481571462146602_4891427984609582087_n.jpg'
  };

  get selectedNetwork(): string {
    return this.dao.settings().demoNetwork;
  }

  set selectedNetwork(value: string) {
    this.dao.updateSetting('demoNetwork', value);
  }

  setActive(label: string): void {
    // L’état actif est dérivé de la route active dans le template.
    console.log(label);
  }

  toggleSidebar(): void {
    this.sidebarOpen.update(value => !value);
  }

  toggleSidebarCollapse(): void {
    this.sidebarCollapsed.update(value => !value);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  logout(): void {
    this.dao.disconnect();
    this.closeSidebar();
    void this.router.navigateByUrl('/');
  }
}
