import { Injectable, signal } from '@angular/core';

export type VoteChoice = 'for' | 'against' | 'abstain';
export type ProposalStatus = 'Brouillon' | 'En attente' | 'Active' | 'Adoptée' | 'Rejetée' | 'Exécutée' | 'Expirée';
export type ProposalCategory = 'Financement' | 'Développement' | 'Communauté' | 'Sécurité' | 'Gouvernance';

export interface Proposal {
  id: string;
  title: string;
  summary: string;
  description: string;
  author: string;
  category: ProposalCategory;
  status: ProposalStatus;
  createdAt: string;
  votingEndsAt: string;
  votesFor: number;
  votesAgainst: number;
  abstentions: number;
  quorum: number;
  participation: number;
  budget?: number;
  objective: string;
  rationale: string;
  userVote?: VoteChoice | null;
}

export interface Member {
  id: string;
  name: string;
  wallet: string;
  tokens: number;
  votingPower: number;
  status: 'Actif' | 'Inactif' | 'Délégué';
  delegation?: string;
  avatar: string;
}

export interface TreasuryMovement {
  id: string;
  date: string;
  type: 'Entrée' | 'Sortie';
  amount: number;
  status: 'Approuvée' | 'En attente' | 'Rejetée';
  description: string;
  category: 'Grants' | 'Marketing' | 'Infra' | 'Community' | 'Treasury';
}

export interface ActivityItem {
  id: string;
  title: string;
  category: 'Proposition' | 'Vote' | 'Trésorerie' | 'Membre' | 'Gouvernance';
  date: string;
  relatedId?: string;
}

export interface UserSettings {
  displayName: string;
  theme: 'Clair' | 'Sombre';
  notifications: boolean;
  demoNetwork: string;
  currency: string;
  contractAddress: string;
  contractDeployed: boolean;
}

const initialProposals: Proposal[] = [
  {
    id: 'PROP-001',
    title: 'Renforcement du programme de bounties communautaires',
    summary: 'Accroître les récompenses pour les contributeurs techniques et pédagogiques.',
    description: 'Cette proposition vise à élargir le programme de bounties afin d’encourager les contributions de qualité sur les outils communautaires, la documentation et les modules de gouvernance.',
    author: 'Nadia K.',
    category: 'Communauté',
    status: 'Active',
    createdAt: '2026-10-02',
    votingEndsAt: '2026-10-28',
    votesFor: 462,
    votesAgainst: 136,
    abstentions: 42,
    quorum: 30,
    participation: 71,
    budget: 24000,
    objective: 'Stimuler les contributions de la communauté.',
    rationale: 'La DAO gagne en qualité de développement quand les membres sont légitimement récompensés pour leur travail.',
    userVote: null
  },
  {
    id: 'PROP-002',
    title: 'Mise en place d’un module de reporting de trésorerie',
    summary: 'Créer un tableau de bord de transparence et d’audit des allocations.',
    description: 'Le module permettra de suivre les dépenses, les réserves et l’usage des fonds avec un historique clair et des règles de validation explicites.',
    author: 'Sofiane B.',
    category: 'Financement',
    status: 'Adoptée',
    createdAt: '2026-09-15',
    votingEndsAt: '2026-09-30',
    votesFor: 598,
    votesAgainst: 111,
    abstentions: 51,
    quorum: 35,
    participation: 83,
    budget: 18000,
    objective: 'Améliorer la transparence de gestion.',
    rationale: 'La connaissance des dépenses aide à renforcer la confiance des membres.',
    userVote: 'for'
  },
  {
    id: 'PROP-003',
    title: 'V2 du portail de gouvernance communautaire',
    summary: 'Moderniser l’expérience d’adhésion, de vote et d’accès aux dossiers.',
    description: 'La refonte du portail permettrait de simplifier l’accès aux dispositifs de vote et d’améliorer la lecture des décisions en cours.',
    author: 'Amina R.',
    category: 'Développement',
    status: 'En attente',
    createdAt: '2026-10-08',
    votingEndsAt: '2026-10-24',
    votesFor: 294,
    votesAgainst: 196,
    abstentions: 63,
    quorum: 40,
    participation: 64,
    budget: 32000,
    objective: 'Simplifier la participation des membres.',
    rationale: 'Le parcours actuel reste trop technique et pourrait être plus lisible.',
    userVote: null
  },
  {
    id: 'PROP-004',
    title: 'Audit sécurité des smart contracts de gouvernance',
    summary: 'Engager un audit externe sur les modules clés de la DAO.',
    description: 'Cette proposition appelle à vérifier les permissions, les mécanismes de vote, la gestion des jetons et les points d’entrée de la gouvernance.',
    author: 'Tariq M.',
    category: 'Sécurité',
    status: 'Active',
    createdAt: '2026-10-06',
    votingEndsAt: '2026-10-29',
    votesFor: 356,
    votesAgainst: 189,
    abstentions: 78,
    quorum: 45,
    participation: 69,
    budget: 27000,
    objective: 'Réduire les risques de sécurité avant les prochaines décisions critiques.',
    rationale: 'Un audit ciblé renforce la crédibilité de la structure de gouvernance.',
    userVote: null
  },
  {
    id: 'PROP-005',
    title: 'Programme de mentorat pour nouveaux membres',
    summary: 'Développer un accompagnement des nouveaux arriveants dans la DAO.',
    description: 'L’objectif est d’accélérer l’intégration des membres, de clarifier les rôles et d’augmenter la qualité de participation.',
    author: 'Lina D.',
    category: 'Communauté',
    status: 'Rejetée',
    createdAt: '2026-08-18',
    votingEndsAt: '2026-09-02',
    votesFor: 212,
    votesAgainst: 413,
    abstentions: 53,
    quorum: 35,
    participation: 58,
    budget: 16000,
    objective: 'Accélérer l’onboarding des nouveaux venus.',
    rationale: 'L’accompagnement reste utile, mais le coût a été jugé trop élevé au moment de l’évaluation.',
    userVote: 'against'
  },
  {
    id: 'PROP-006',
    title: 'Déploiement du Pool de liquidité communautaire',
    summary: 'Créer un pool de liquidité avec règles de répartition transparentes.',
    description: 'Le pool permettra à la DAO d’accélérer la présence sur les marchés, tout en gardant une politique de sécurisation par étapes.',
    author: 'Youssef C.',
    category: 'Financement',
    status: 'Exécutée',
    createdAt: '2026-07-19',
    votingEndsAt: '2026-08-07',
    votesFor: 710,
    votesAgainst: 94,
    abstentions: 35,
    quorum: 50,
    participation: 88,
    budget: 54000,
    objective: 'Améliorer la liquidité de la trésorerie.',
    rationale: 'Les fonds de la DAO sont mieux répartis lorsqu’une stratégie claire est suivie.',
    userVote: 'for'
  },
  {
    id: 'PROP-007',
    title: 'Amélioration des règles de délégation',
    summary: 'Clarifier le cadre des délégations de vote entre membres.',
    description: 'La proposition introduit une meilleure traçabilité des délégations et un cadrage plus lisible sur les responsabilités associées.',
    author: 'Hajar S.',
    category: 'Gouvernance',
    status: 'Active',
    createdAt: '2026-10-09',
    votingEndsAt: '2026-10-22',
    votesFor: 328,
    votesAgainst: 176,
    abstentions: 48,
    quorum: 38,
    participation: 62,
    objective: 'Renforcer la clarté de la gouvernance.',
    rationale: 'Une gouvernance plus lisible réduit les ambiguïtés autour des délégations et des pouvoirs de vote.',
    userVote: null
  },
  {
    id: 'PROP-008',
    title: 'Subvention de lancement pour la communauté francophone',
    summary: 'Financer les événements et contenus de diffusion locale.',
    description: 'Ce programme soutient la création de contenus éducatifs, d’ateliers et d’évènements pour élargir la communauté DJALAZIN DAO.',
    author: 'Amal E.',
    category: 'Communauté',
    status: 'Expirée',
    createdAt: '2026-08-04',
    votingEndsAt: '2026-08-20',
    votesFor: 233,
    votesAgainst: 277,
    abstentions: 66,
    quorum: 40,
    participation: 52,
    budget: 12000,
    objective: 'Accroître la diffusion locale et la compréhension de la DAO.',
    rationale: 'Le programme a été utile, mais il n’a pas atteint le seuil de soutien requis pour être validé.',
    userVote: null
  }
];

const initialMembers: Member[] = [
  { id: 'm-1', name: 'Nadia K.', wallet: '0xA8F2...12C4', tokens: 1480, votingPower: 18, status: 'Actif', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?...' },
  { id: 'm-2', name: 'Sofiane B.', wallet: '0x91D3...C900', tokens: 1260, votingPower: 14, status: 'Actif', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?...' },
  { id: 'm-3', name: 'Amina R.', wallet: '0x7F44...0A1D', tokens: 980, votingPower: 11, status: 'Délégué', delegation: 'Mairie DAO', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?...' },
  { id: 'm-4', name: 'Tariq M.', wallet: '0x51B7...991F', tokens: 820, votingPower: 9, status: 'Actif', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?...' },
  { id: 'm-5', name: 'Lina D.', wallet: '0x13A5...B42E', tokens: 760, votingPower: 8, status: 'Actif', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?...' },
  { id: 'm-6', name: 'Youssef C.', wallet: '0xF21C...8E44', tokens: 690, votingPower: 7, status: 'Inactif', avatar: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?...' },
  { id: 'm-7', name: 'Hajar S.', wallet: '0x22A1...9CD4', tokens: 560, votingPower: 6, status: 'Actif', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?...' }
];

const initialTreasury: TreasuryMovement[] = [
  { id: 't-1', date: '2026-10-18', type: 'Entrée', amount: 42000, status: 'Approuvée', description: 'Contribution de la communauté', category: 'Treasury' },
  { id: 't-2', date: '2026-10-16', type: 'Sortie', amount: 18000, status: 'Approuvée', description: 'Bounties communautaires', category: 'Community' },
  { id: 't-3', date: '2026-10-14', type: 'Sortie', amount: 26000, status: 'En attente', description: 'Audit sécurité DAO', category: 'Infra' },
  { id: 't-4', date: '2026-10-11', type: 'Entrée', amount: 15000, status: 'Approuvée', description: 'Subvention opérationnelle', category: 'Grants' },
  { id: 't-5', date: '2026-10-09', type: 'Sortie', amount: 12000, status: 'Rejetée', description: 'Campagne de communication', category: 'Marketing' }
];

const initialActivities: ActivityItem[] = [
  { id: 'a-1', title: 'Nouvelle proposition créée : bounties communautaires', category: 'Proposition', date: 'Il y a 12 min', relatedId: 'PROP-001' },
  { id: 'a-2', title: 'Vote enregistré sur la proposition d’audit sécurité', category: 'Vote', date: 'Il y a 42 min', relatedId: 'PROP-004' },
  { id: 'a-3', title: 'Mouvement de trésorerie validé : 18 000 USDC', category: 'Trésorerie', date: 'Il y a 2 h', relatedId: 't-2' },
  { id: 'a-4', title: 'Délégation confirmée pour Amina R.', category: 'Membre', date: 'Hier', relatedId: 'm-3' },
  { id: 'a-5', title: 'Seuil de quorum mis à jour', category: 'Gouvernance', date: 'Le 15 oct.', relatedId: 'gov' }
];

const initialSettings: UserSettings = {
  displayName: 'Joachim IMPRENABLE',
  theme: 'Clair',
  notifications: true,
  demoNetwork: 'Ethereum Mainnet',
  currency: 'USDC',
  contractAddress: '0x0000000000000000000000000000000000000000',
  contractDeployed: false
};

@Injectable({ providedIn: 'root' })
export class DaoStateService {
  readonly connected = signal(true);
  readonly proposals = signal<Proposal[]>(initialProposals);
  readonly members = signal<Member[]>(initialMembers);
  readonly treasury = signal<TreasuryMovement[]>(initialTreasury);
  readonly activities = signal<ActivityItem[]>(initialActivities);
  readonly settings = signal<UserSettings>(initialSettings);

  getProposalById(id: string): Proposal | undefined {
    return this.proposals().find((proposal) => proposal.id === id);
  }

  getTotalTreasury(): number {
    const movements = this.treasury();
    return movements.reduce((sum, item) => sum + (item.type === 'Entrée' ? item.amount : -item.amount), 0);
  }

  voteOnProposal(id: string, choice: VoteChoice): boolean {
    const proposals = this.proposals();
    const index = proposals.findIndex((proposal) => proposal.id === id);
    if (index === -1) return false;
    const current = proposals[index];
    if (current.status !== 'Active' || current.userVote) return false;

    const updated = [...proposals];
    const next = { ...current, userVote: choice } as Proposal;

    if (choice === 'for') next.votesFor = current.votesFor + 1;
    if (choice === 'against') next.votesAgainst = current.votesAgainst + 1;
    if (choice === 'abstain') next.abstentions = current.abstentions + 1;

    updated[index] = next;
    this.proposals.set(updated);
    return true;
  }

  createProposal(input: Partial<Proposal>): Proposal {
    const created: Proposal = {
      id: `PROP-${(this.proposals().length + 1).toString().padStart(3, '0')}`,
      title: input.title ?? 'Nouvelle proposition',
      summary: input.summary ?? 'Résumé de la proposition',
      description: input.description ?? 'Détail de la proposition',
      author: input.author ?? 'Vous',
      category: input.category ?? 'Gouvernance',
      status: 'En attente',
      createdAt: new Date().toISOString().slice(0, 10),
      votingEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      votesFor: 0,
      votesAgainst: 0,
      abstentions: 0,
      quorum: 35,
      participation: 0,
      budget: input.budget ?? 0,
      objective: input.objective ?? 'Objectif de la proposition',
      rationale: input.rationale ?? 'Justification de la proposition',
      userVote: null,
    };

    this.proposals.set([created, ...this.proposals()]);
    this.activities.set([
      { id: `a-${Date.now()}`, title: `Nouvelle proposition créée : ${created.title}`, category: 'Proposition', date: 'À l’instant', relatedId: created.id },
      ...this.activities(),
    ]);
    return created;
  }

  updateSetting<K extends keyof UserSettings>(key: K, value: UserSettings[K]): void {
    this.settings.set({ ...this.settings(), [key]: value });
  }

  toggleConnection(): void {
    this.connected.set(!this.connected());
  }

  disconnect(): void {
    this.connected.set(false);
  }

  resetDemo(): void {
    this.connected.set(true);
    this.proposals.set(initialProposals);
    this.members.set(initialMembers);
    this.treasury.set(initialTreasury);
    this.activities.set(initialActivities);
    this.settings.set(initialSettings);
  }
}
