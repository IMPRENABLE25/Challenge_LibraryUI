import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { DaoStateService } from '../../dao-demo';

export type MenuItemIcon =
  | 'profile'
  | 'wallet'
  | 'network'
  | 'help'
  | 'sign-out';

export interface AccountMenuItem {
  id: string;
  label: string;
  icon: MenuItemIcon;
  badge?: string;
  dividerBefore?: boolean;
  route?: string;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountMenuComponent {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly router = inject(Router);
  private readonly dao = inject(DaoStateService);

  protected readonly avatarUrl = '/471762680_3481571462146602_4891427984609582087_n.jpg';

  protected readonly isOpen = signal(false);
  protected readonly activeId = signal<string>('profile');

  protected readonly menuItems = signal<AccountMenuItem[]>([
    { id: 'profile', label: 'Mon profil', icon: 'profile', route: '/settings' },
    { id: 'wallet', label: 'Portefeuille', icon: 'wallet', badge: '0xA1B2...89F0', route: '/treasury' },
    { id: 'network', label: 'Réseau actif', icon: 'network', route: '/settings' },
    {
      id: 'help-center',
      label: 'Centre d’aide',
      icon: 'help',
      route: '/help',
      dividerBefore: true,
    },
    { id: 'logout', label: 'Déconnexion', icon: 'sign-out', route: '/' },
  ]);

  @HostListener('document:click', ['$event.target'])
  protected onDocumentClick(target: EventTarget | null): void {
    if (
      this.isOpen() &&
      target instanceof HTMLElement &&
      !this.elementRef.nativeElement.contains(target)
    ) {
      this.isOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.isOpen.set(false);
  }

  protected toggleMenu(): void {
    this.isOpen.update((open) => !open);
  }

  protected selectItem(item: AccountMenuItem): void {
    this.activeId.set(item.id);
    this.isOpen.set(false);

    if (item.id === 'logout') {
      this.dao.disconnect();
    }

    if (item.route) {
      this.router.navigateByUrl(item.route);
    }
  }
}
