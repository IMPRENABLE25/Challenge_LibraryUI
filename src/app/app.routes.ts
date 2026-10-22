import { Routes } from '@angular/router';
import {
  ActivityPageComponent,
  CreateProposalPageComponent,
  DashboardPageComponent,
  GovernancePageComponent,
  HelpPageComponent,
  LandingPageComponent,
  MembersPageComponent,
  NotFoundPageComponent,
  ProposalDetailPageComponent,
  ProposalsPageComponent,
  SettingsPageComponent,
  TreasuryPageComponent
} from './dao-pages';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingPageComponent },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'proposals', component: ProposalsPageComponent },
  { path: 'proposals/new', component: CreateProposalPageComponent },
  { path: 'proposals/:id', component: ProposalDetailPageComponent },
  { path: 'governance', component: GovernancePageComponent },
  { path: 'treasury', component: TreasuryPageComponent },
  { path: 'members', component: MembersPageComponent },
  { path: 'activity', component: ActivityPageComponent },
  { path: 'settings', component: SettingsPageComponent },
  { path: 'help', component: HelpPageComponent },
  { path: '**', component: NotFoundPageComponent }
];
