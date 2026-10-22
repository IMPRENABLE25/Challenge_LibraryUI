
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

export interface EventCardAvatar {
  initials: string;
  name: string;
  colorClass: string;
}

export type EventCardTrendDirection = 'up' | 'down' | 'flat';
export type EventCardAmountVariant = 'positive' | 'negative' | 'neutral';

export interface EventCardItem {
  id: string;
  date: string;
  time: string;
  title: string;
  location: string;
  isDraft: boolean;
  avatars: EventCardAvatar[];
  extraAttendeesCount: number;
  attendeesStatusLabel: string;
  amount: string;
  amountVariant: EventCardAmountVariant;
  trendPeriodLabel: string;
  trendPercent: string;
  trendDirection: EventCardTrendDirection;
  showPublishAction: boolean;
}

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCardComponent {
  protected readonly cards = signal<EventCardItem[]>([
    {
      id: 'event-1',
      date: 'May 12',
      time: '7:00 PM',
      title: 'Lorem upsum',
      location: 'Abidjan, Côte d\'ivoire',
      isDraft: false,
      avatars: [
        { initials: 'JB', name: 'Jamie Bat', colorClass: 'bg-rose-400' },
        { initials: 'RK', name: 'Rim Kim', colorClass: 'bg-amber-500' },
        { initials: 'TY', name: 'Tom Yot', colorClass: 'bg-violet-500' },
      ],
      extraAttendeesCount: 45,
      attendeesStatusLabel: 'are down',
      amount: '$8,120.00',
      amountVariant: 'positive',
      trendPeriodLabel: 'Today',
      trendPercent: '2.8%',
      trendDirection: 'up',
      showPublishAction: false,
    },
    {
      id: 'event-2',
      date: 'April 1',
      time: '2:00 PM',
      title: 'Lorem upsum',
      location: 'Dabou, Côte d\'ivoire',
      isDraft: true,
      avatars: [],
      extraAttendeesCount: 0,
      attendeesStatusLabel: 'are down',
      amount: '$0.00',
      amountVariant: 'neutral',
      trendPeriodLabel: 'Today',
      trendPercent: '0.0%',
      trendDirection: 'flat',
      showPublishAction: true,
    },
  ]);

  protected amountClasses(variant: EventCardAmountVariant): string {
    switch (variant) {
      case 'positive':
        return 'event-card-amount--positive';
      case 'negative':
        return 'event-card-amount--negative';
      default:
        return 'event-card-amount--neutral';
    }
  }

  protected trendBadgeClasses(direction: EventCardTrendDirection): string {
    switch (direction) {
      case 'up':
        return 'event-card-trend--up';
      case 'down':
        return 'event-card-trend--down';
      default:
        return 'event-card-trend--flat';
    }
  }

  protected onEditEvent(card: EventCardItem): void {
    console.log(`Edit event: ${card.title}`);
  }

  protected onCopyLink(card: EventCardItem): void {
    console.log(`Copy link for: ${card.title}`);
  }

  protected onPublish(card: EventCardItem): void {
    this.cards.update((items) =>
      items.map((item) =>
        item.id === card.id
          ? { ...item, isDraft: false, showPublishAction: false }
          : item,
      ),
    );
  }
}
