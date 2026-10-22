import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner {
  pills = ['GOUVERNANCE DÉCENTRALISÉE', 'Construisons ensemble'];

  headline = [
    'Votre voix.',
    'Votre DAO.'
  ];

  sub = 'Participez aux décisions, proposez des initiatives et contribuez à l’avenir de DJALAZIN DAO grâce à une gouvernance transparente et communautaire.';

  primaryButton = 'Accéder au dashboard';
  secondaryButton = 'Accéder au dashboard';
  primaryRoute = '/dashboard';
  secondaryRoute = '/dashboard';
}

