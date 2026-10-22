import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Banner } from './components/banner/banner';
import { DashboardPage } from './components/dashboard/dashboard';
import { Dataset } from './components/dataset/dataset';
import { NavbarComponent } from './components/navbar/navbar';
import { AccountMenuComponent } from './components/dropdown/dropdown';
import { DaoStateService, Proposal, VoteChoice } from './dao-demo';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [Banner, CommonModule, RouterLink],
  template: `
    <app-banner />
    <section class="bg-[#1C1B19] px-6 py-8">
      <div class="mx-auto max-w-6xl">
        <div class="mb-8 text-center">
          <p class="text-sm font-semibold uppercase tracking-[0.25em] text-[#E0A458]">DJALAZIN DAO</p>
          <h2 class="mt-4 text-3xl font-black text-[#EDE6DA] md:text-5xl">Une gouvernance claire pour une communauté engagée.</h2>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          <div class="rounded-2xl border border-[#3a352f] bg-[#262421] p-6 shadow-[0_12px_24px_rgba(0,0,0,0.18)]">
            <div class="mb-4 inline-flex rounded-xl bg-[#E0A458]/12 p-3 text-[#E0A458]">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v6m0 0 3-3m-3 3-3-3M4 15c0-4 4-6 8-6s8 2 8 6v1H4v-1Z"/></svg>
            </div>
            <h3 class="text-xl font-bold text-[#EDE6DA]">Transparence</h3>
            <p class="mt-3 text-sm leading-6 text-[#D7CDBE]">Chaque décision, chaque vote et chaque dépense sont visibles. La communauté suit la même source de vérité.</p>
          </div>
          <div class="rounded-2xl border border-[#3a352f] bg-[#262421] p-6 shadow-[0_12px_24px_rgba(0,0,0,0.18)]">
            <div class="mb-4 inline-flex rounded-xl bg-[#E0A458]/12 p-3 text-[#E0A458]">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 12h10M7 7h10M7 17h6"/><path d="M4 4h16v16H4z"/></svg>
            </div>
            <h3 class="text-xl font-bold text-[#EDE6DA]">Participation</h3>
            <p class="mt-3 text-sm leading-6 text-[#D7CDBE]">Les membres peuvent proposer, débattre et voter selon des règles de démonstration simples et compréhensibles.</p>
          </div>
          <div class="rounded-2xl border border-[#3a352f] bg-[#262421] p-6 shadow-[0_12px_24px_rgba(0,0,0,0.18)]">
            <div class="mb-4 inline-flex rounded-xl bg-[#E0A458]/12 p-3 text-[#E0A458]">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h5L10 4l4 16 3-8h4"/></svg>
            </div>
            <h3 class="text-xl font-bold text-[#EDE6DA]">Propositions</h3>
            <p class="mt-3 text-sm leading-6 text-[#D7CDBE]">Les initiatives vont de la trésorerie à la sécurité, en passant par les outils et le développement de la communauté.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-[#1C1B19] px-6 py-10">
      <div class="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.25em] text-[#E0A458]">Comment ça marche</p>
          <h3 class="mt-4 text-3xl font-black text-[#EDE6DA]">Une DAO, c’est une communauté qui décide ensemble.</h3>
          <div class="mt-8 space-y-5 text-[#D7CDBE]">
            <p>Une proposition est créée par un membre de la communauté. Elle est ensuite discutée, puis soumise à un vote.</p>
            <p>Le quorum, les seuils et la répartition des voix sont visibles par tous, ce qui renforce la confiance et l’équité.</p>
            <p>Les décisions les plus importantes sont ensuite exécutées par la DAO, selon les règles validées par la communauté.</p>
          </div>
        </div>
        <div class="rounded-3xl bg-[#262421] p-8 text-[#EDE6DA] shadow-[0_12px_28px_rgba(0,0,0,0.25)] ring-1 ring-[#3a352f]">
          <p class="text-sm uppercase tracking-[0.2em] text-[#E0A458]">Indicateurs de gouvernance</p>
          <div class="mt-8 grid gap-4 sm:grid-cols-2">
            <div class="rounded-2xl bg-[#1C1B19] p-4 ring-1 ring-[#3a352f]">
              <div class="text-2xl font-black text-[#EDE6DA]">1 248</div>
              <div class="text-sm text-[#D7CDBE]">Membres éligibles</div>
            </div>
            <div class="rounded-2xl bg-[#1C1B19] p-4 ring-1 ring-[#3a352f]">
              <div class="text-2xl font-black text-[#EDE6DA]">83%</div>
              <div class="text-sm text-[#D7CDBE]">Participation moyenne</div>
            </div>
            <div class="rounded-2xl bg-[#1C1B19] p-4 ring-1 ring-[#3a352f]">
              <div class="text-2xl font-black text-[#EDE6DA]">8</div>
              <div class="text-sm text-[#D7CDBE]">Propositions actives</div>
            </div>
            <div class="rounded-2xl bg-[#1C1B19] p-4 ring-1 ring-[#3a352f]">
              <div class="text-2xl font-black text-[#EDE6DA]">$2.4M</div>
              <div class="text-sm text-[#D7CDBE]">Trésorerie démonstration</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-[#1C1B19] px-6 py-10">
      <div class="mx-auto max-w-6xl">
        <div class="mb-6 flex items-end justify-between gap-4">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.25em] text-[#E0A458]">Propositions récentes</p>
            <h3 class="mt-3 text-3xl font-black text-[#EDE6DA]">Des décisions qui façonnent la DAO</h3>
          </div>
          <a routerLink="/proposals" class="rounded-full border border-[#3A3733] bg-transparent px-4 py-2 text-sm font-semibold text-[#EDE6DA] transition hover:bg-[#2E2B27]">Voir toutes</a>
        </div>
        <div class="grid gap-4 lg:grid-cols-3">
          @for (proposal of dashboardProposals; track proposal.id) {
            <article class="rounded-2xl border border-[#3a352f] bg-[#262421] p-5 shadow-[0_12px_24px_rgba(0,0,0,0.18)]">
              <div class="flex items-center justify-between gap-2">
                <span class="inline-flex rounded-full bg-[#E0A458]/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E0A458]">{{ proposal.category }}</span>
                <span class="text-xs text-[#D7CDBE]">{{ proposal.status }}</span>
              </div>
              <h4 class="mt-4 text-lg font-bold text-[#EDE6DA]">{{ proposal.title }}</h4>
              <p class="mt-3 text-sm leading-6 text-[#D7CDBE]">{{ proposal.summary }}</p>
              <div class="mt-5 flex items-center justify-between text-xs text-[#D7CDBE]">
                <span>{{ proposal.author }}</span>
                <span>{{ proposal.participation }}% de participation</span>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="bg-[#1C1B19] px-6 py-10">
      <div class="mx-auto flex max-w-4xl flex-col items-center text-center">
        <h3 class="text-3xl font-black text-[#EDE6DA]">Prêt à participer à la prochaine décision ?</h3>
        <p class="mt-4 max-w-2xl text-[#D7CDBE]">Explorez le dashboard, consultez les propositions et voyez comment la DAO prend des décisions de manière transparente.</p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <a routerLink="/dashboard" class="rounded-xl bg-[#E0A458] px-6 py-3 font-semibold text-[#1C1B19] transition hover:bg-[#EBB46B]">Accéder au dashboard</a>
          <a routerLink="/proposals" class="rounded-xl border border-[#3A3733] bg-transparent px-6 py-3 font-semibold text-[#EDE6DA] transition hover:bg-[#2E2B27]">Explorer les propositions</a>
        </div>
      </div>
    </section>

    <footer class="border-t border-[#3a352f] bg-[#1C1B19] px-6 py-10">
      <div class="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-[#D7CDBE] md:flex-row md:items-center md:justify-between">
        <div>
          <span class="text-base font-black text-[#EDE6DA]">DJALAZIN DAO</span>
        </div>
        <div class="flex flex-wrap gap-5">
          <a routerLink="/dashboard" class="hover:text-[#E0A458]">Dashboard</a>
          <a routerLink="/proposals" class="hover:text-[#E0A458]">Propositions</a>
          <a routerLink="/governance" class="hover:text-[#E0A458]">Gouvernance</a>
          <a routerLink="/help" class="hover:text-[#E0A458]">Aide</a>
        </div>
      </div>
    </footer>
  `,
})
export class LandingPageComponent {
  protected readonly dashboardProposals = inject(DaoStateService).proposals().slice(0, 3);
}

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [NavbarComponent, DashboardPage, CommonModule],
  template: `
    <app-navbar>
      <div class="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-8">
        <app-dashboard />
      </div>
    </app-navbar>
  `,
})
export class DashboardPageComponent {}

@Component({
  selector: 'app-proposals-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink, FormsModule],
  template: `
    <app-navbar>
      <div class="mx-auto w-full max-w-7xl py-6 md:py-8">
        <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#E0A458]">Propositions</p>
            <h1 class="mt-2 text-2xl font-black leading-tight text-[#EDE6DA] sm:text-3xl">Décisions ouvertes et en cours</h1>
          </div>
          <a routerLink="/proposals/new" class="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#E0A458] px-5 py-3 text-center font-semibold text-[#1C1B19] transition hover:bg-[#EBB46B]">Créer une proposition</a>
        </div>

        <div class="mb-6 grid min-w-0 grid-cols-1 gap-3 rounded-2xl border border-[#3A3733] bg-[#262421] p-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(10rem,auto)_minmax(12rem,auto)] lg:items-center">
          <input [(ngModel)]="search" placeholder="Rechercher par titre ou identifiant" class="min-w-0 w-full rounded-xl border border-[#3A3733] bg-[#1C1B19] px-4 py-3 text-sm text-[#EDE6DA] placeholder-[#A39B8C] outline-none focus:border-[#E0A458] sm:col-span-2 lg:col-span-1" />
          <select [(ngModel)]="statusFilter" class="min-w-0 w-full rounded-xl border border-[#3A3733] bg-[#1C1B19] px-4 py-3 text-sm text-[#EDE6DA] outline-none focus:border-[#E0A458]">
            <option value="">Tous les statuts</option>
            <option value="Active">Active</option>
            <option value="En attente">En attente</option>
            <option value="Adoptée">Adoptée</option>
            <option value="Rejetée">Rejetée</option>
          </select>
          <select [(ngModel)]="categoryFilter" class="min-w-0 w-full rounded-xl border border-[#3A3733] bg-[#1C1B19] px-4 py-3 text-sm text-[#EDE6DA] outline-none focus:border-[#E0A458]">
            <option value="">Toutes les catégories</option>
            @for (category of categories; track category) {
              <option [value]="category">{{ category }}</option>
            }
          </select>
        </div>

        <div class="grid min-w-0 grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
          @for (proposal of filteredProposals; track proposal.id) {
            <article class="flex min-w-0 flex-col rounded-2xl border border-[#3A3733] bg-[#262421] p-5 sm:p-6">
              <div class="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div class="min-w-0">
                  <div class="mb-3 inline-flex rounded-full bg-[#E0A458]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E0A458]">{{ proposal.category }}</div>
                  <h2 class="break-words text-xl font-bold leading-snug text-[#EDE6DA]">{{ proposal.title }}</h2>
                </div>
                <span class="w-fit shrink-0 rounded-full border border-[#3A3733] px-2.5 py-1 text-xs font-semibold" [ngClass]="statusClass(proposal.status)">{{ proposal.status }}</span>
              </div>

              <p class="mt-4 min-w-0 text-sm leading-6 text-[#D7CDBE]">{{ proposal.summary }}</p>

              <div class="mt-5 grid min-w-0 gap-3 text-xs text-[#A39B8C] sm:grid-cols-2">
                <div>Par <span class="font-semibold text-[#EDE6DA]">{{ proposal.author }}</span></div>
                <div>Fin du vote <span class="font-semibold text-[#EDE6DA]">{{ proposal.votingEndsAt }}</span></div>
                <div>Votes pour <span class="font-semibold text-[#EDE6DA]">{{ proposal.votesFor }}</span></div>
                <div>Participation <span class="font-semibold text-[#EDE6DA]">{{ proposal.participation }}%</span></div>
              </div>

              <div class="mt-5 h-2.5 overflow-hidden rounded-full bg-[#1C1B19]">
                <div class="h-full rounded-full bg-[#E0A458]" [style.width.%]="Math.min(100, proposal.votesFor / Math.max(proposal.votesFor + proposal.votesAgainst + proposal.abstentions, 1) * 100)"></div>
              </div>

              <div class="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                <span class="text-xs text-[#A39B8C]">{{ proposal.id }}</span>
                <a [routerLink]="['/proposals', proposal.id]" class="rounded-lg border border-[#3A3733] bg-transparent px-3 py-2 text-sm font-semibold text-[#EDE6DA] transition hover:bg-[#2E2B27]">Voir les détails</a>
              </div>
            </article>
          }
        </div>

        @if (filteredProposals.length === 0) {
          <div class="mt-6 rounded-2xl border border-dashed border-[#3A3733] bg-[#262421] p-8 text-center text-[#A39B8C]">Aucune proposition ne correspond à vos filtres.</div>
        }
      </div>
    </app-navbar>
  `,
})
export class ProposalsPageComponent {
  protected readonly dao = inject(DaoStateService);
  protected readonly proposals = this.dao.proposals();
  protected readonly categories = ['Financement', 'Développement', 'Communauté', 'Sécurité', 'Gouvernance'];
  protected search = '';
  protected statusFilter = '';
  protected categoryFilter = '';
  protected readonly Math = Math;

  protected get filteredProposals() {
    return this.proposals.filter((proposal) => {
      const matchesStatus = this.statusFilter ? proposal.status === this.statusFilter : true;
      const matchesCategory = this.categoryFilter ? proposal.category === this.categoryFilter : true;
      const query = this.search.trim().toLowerCase();
      const matchesSearch = !query || proposal.title.toLowerCase().includes(query) || proposal.id.toLowerCase().includes(query);
      return matchesStatus && matchesCategory && matchesSearch;
    });
  }

  protected statusClass(status: string): string {
    switch (status) {
      case 'Active': return 'bg-[#E0A458]/15 text-[#E0A458] border-[#E0A458]/30';
      case 'Adoptée':
      case 'Exécutée': return 'bg-[#22C55E]/15 text-[#4ADE80] border-[#22C55E]/35';
      case 'Rejetée':
      case 'Expirée': return 'bg-[#EF4444]/15 text-[#F87171] border-[#EF4444]/35';
      case 'En attente': return 'bg-[#6B4F2C]/30 text-[#EDE6DA] border-[#6B4F2C]/50';
      default: return 'bg-[#1C1B19] text-[#A39B8C] border-[#3A3733]';
    }
  }
}

@Component({
  selector: 'app-proposal-detail-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink],
  template: `
    <app-navbar>
      @if (proposal) {
        <div class="mx-auto max-w-6xl px-4 py-8 md:px-8">
          <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#E0A458]">{{ proposal.id }}</p>
              <h1 class="mt-2 text-3xl font-black text-[#EDE6DA]">{{ proposal.title }}</h1>
            </div>
            <div class="flex gap-3">
              <a routerLink="/proposals" class="rounded-xl border border-[#3A3733] bg-transparent px-4 py-2.5 font-semibold text-[#EDE6DA] transition hover:bg-[#2E2B27]">Retour</a>
              <button type="button" [disabled]="proposal.status !== 'Active' || userHasVoted" (click)="vote('for')" class="rounded-xl border border-[#22C55E]/35 bg-[#22C55E]/15 px-4 py-2.5 font-semibold text-[#4ADE80] transition hover:bg-[#22C55E]/25 disabled:cursor-not-allowed disabled:opacity-50">Voter pour</button>
              <button type="button" [disabled]="proposal.status !== 'Active' || userHasVoted" (click)="vote('against')" class="rounded-xl border border-[#EF4444]/35 bg-[#EF4444]/15 px-4 py-2.5 font-semibold text-[#F87171] transition hover:bg-[#EF4444]/25 disabled:cursor-not-allowed disabled:opacity-50">Voter contre</button>
              <button type="button" [disabled]="proposal.status !== 'Active' || userHasVoted" (click)="vote('abstain')" class="rounded-xl border border-[#3A3733] bg-transparent px-4 py-2.5 font-semibold text-[#EDE6DA] transition hover:bg-[#2E2B27] disabled:cursor-not-allowed disabled:opacity-50">S’abstenir</button>
            </div>
          </div>

          @if (feedback) {
            <div class="mb-6 rounded-xl border border-[#3A3733] bg-[#262421] px-4 py-3 text-sm text-[#EDE6DA]">{{ feedback }}</div>
          }

          <div class="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <div class="space-y-6">
              <div class="rounded-2xl border border-[#3A3733] bg-[#262421] p-6">
                <p class="text-sm uppercase tracking-[0.2em] text-[#A39B8C]">Description</p>
                <p class="mt-4 text-[#D7CDBE]">{{ proposal.description }}</p>
                <div class="mt-6 grid gap-4 md:grid-cols-2">
                  <div><span class="text-xs uppercase tracking-[0.2em] text-[#A39B8C]">Objectif</span><p class="mt-2 text-sm text-[#EDE6DA]">{{ proposal.objective }}</p></div>
                  <div><span class="text-xs uppercase tracking-[0.2em] text-[#A39B8C]">Justification</span><p class="mt-2 text-sm text-[#EDE6DA]">{{ proposal.rationale }}</p></div>
                </div>
              </div>

              <div class="rounded-2xl border border-[#3A3733] bg-[#262421] p-6">
                <p class="text-sm uppercase tracking-[0.2em] text-[#A39B8C]">Résultats</p>
                <div class="mt-5 space-y-4">
                  <div>
                    <div class="mb-2 flex items-center justify-between text-sm"><span class="text-[#EDE6DA]">Pour</span><span class="font-bold text-[#4ADE80]">{{ proposal.votesFor }}</span></div>
                    <div class="h-2.5 rounded-full bg-[#1C1B19]"><div class="h-full rounded-full bg-[#22C55E]" [style.width.%]="Math.min(100, (proposal.votesFor / totalVotes) * 100)"></div></div>
                  </div>
                  <div>
                    <div class="mb-2 flex items-center justify-between text-sm"><span class="text-[#EDE6DA]">Contre</span><span class="font-bold text-[#F87171]">{{ proposal.votesAgainst }}</span></div>
                    <div class="h-2.5 rounded-full bg-[#1C1B19]"><div class="h-full rounded-full bg-[#EF4444]" [style.width.%]="Math.min(100, (proposal.votesAgainst / totalVotes) * 100)"></div></div>
                  </div>
                  <div>
                    <div class="mb-2 flex items-center justify-between text-sm"><span class="text-[#EDE6DA]">Abstentions</span><span class="font-bold text-[#A39B8C]">{{ proposal.abstentions }}</span></div>
                    <div class="h-2.5 rounded-full bg-[#1C1B19]"><div class="h-full rounded-full bg-[#3A3733]" [style.width.%]="Math.min(100, (proposal.abstentions / totalVotes) * 100)"></div></div>
                  </div>
                </div>
              </div>
            </div>

            <aside class="space-y-6">
              <div class="rounded-2xl border border-[#3A3733] bg-[#262421] p-6">
                <p class="text-sm uppercase tracking-[0.2em] text-[#A39B8C]">Informations</p>
                <dl class="mt-4 space-y-3 text-sm text-[#D7CDBE]">
                  <div class="flex justify-between gap-4"><dt>Auteur</dt><dd class="font-semibold text-[#EDE6DA]">{{ proposal.author }}</dd></div>
                  <div class="flex justify-between gap-4"><dt>Catégorie</dt><dd class="font-semibold text-[#EDE6DA]">{{ proposal.category }}</dd></div>
                  <div class="flex justify-between gap-4"><dt>Statut</dt><dd class="font-semibold text-[#EDE6DA]">{{ proposal.status }}</dd></div>
                  <div class="flex justify-between gap-4"><dt>Début</dt><dd class="font-semibold text-[#EDE6DA]">{{ proposal.createdAt }}</dd></div>
                  <div class="flex justify-between gap-4"><dt>Fin du vote</dt><dd class="font-semibold text-[#EDE6DA]">{{ proposal.votingEndsAt }}</dd></div>
                  <div class="flex justify-between gap-4"><dt>Quorum</dt><dd class="font-semibold text-[#EDE6DA]">{{ proposal.quorum }}%</dd></div>
                  <div class="flex justify-between gap-4"><dt>Participation</dt><dd class="font-semibold text-[#EDE6DA]">{{ proposal.participation }}%</dd></div>
                </dl>
              </div>
              <div class="rounded-2xl border border-[#3A3733] bg-[#262421] p-6">
                <p class="text-sm uppercase tracking-[0.2em] text-[#A39B8C]">Historique</p>
                <ul class="mt-4 space-y-3 text-sm text-[#D7CDBE]">
                  <li>• Proposition publiée le {{ proposal.createdAt }}</li>
                  <li>• Début du vote {{ proposal.createdAt }}</li>
                  <li>• Résultat de démonstration non enregistré sur blockchain</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      } @else {
        <div class="mx-auto max-w-5xl px-4 py-16 text-center text-[#EDE6DA]">
          <h1 class="text-3xl font-black text-[#EDE6DA]">Proposition introuvable</h1>
          <p class="mt-3 text-[#D7CDBE]">La page demandée n’existe pas dans cette démonstration.</p>
          <a routerLink="/proposals" class="mt-6 inline-block rounded-xl bg-[#E0A458] px-5 py-3 font-semibold text-[#1C1B19] transition hover:bg-[#EBB46B]">Retourner aux propositions</a>
        </div>
      }
    </app-navbar>
  `,
})
export class ProposalDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dao = inject(DaoStateService);
  protected readonly Math = Math;
  protected feedback = '';
  protected proposal: Proposal | undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id') ?? '';
      this.proposal = this.dao.getProposalById(id) ?? undefined;
    });
  }

  protected get totalVotes() {
    return Math.max(1, (this.proposal?.votesFor ?? 0) + (this.proposal?.votesAgainst ?? 0) + (this.proposal?.abstentions ?? 0));
  }

  protected get userHasVoted(): boolean {
    return !!this.proposal?.userVote;
  }

  protected vote(choice: VoteChoice): void {
    if (!this.proposal) return;
    const success = this.dao.voteOnProposal(this.proposal.id, choice);
    if (success) {
      this.proposal = this.dao.getProposalById(this.proposal.id);
      this.feedback = `Vote de démonstration enregistré : ${choice === 'for' ? 'pour' : choice === 'against' ? 'contre' : 'abstention'}.`;
    } else {
      this.feedback = 'Cette proposition n’accepte plus de votes ou vous avez déjà voté.';
    }
  }
}

@Component({
  selector: 'app-create-proposal-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <app-navbar>
      <div class="mx-auto max-w-5xl px-4 py-8 md:px-8">
        <div class="mb-6 flex items-center justify-between gap-3">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#E0A458]">Créer une proposition</p>
            <h1 class="mt-2 text-3xl font-black text-[#EDE6DA]">Soumettre une idée à la DAO</h1>
          </div>
          <a routerLink="/proposals" class="rounded-xl border border-[#3A3733] bg-transparent px-4 py-2.5 font-semibold text-[#EDE6DA] transition hover:bg-[#2E2B27]">Retour</a>
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()" class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div class="space-y-6 rounded-2xl border border-[#3A3733] bg-[#262421] p-6">
            <div>
              <label class="mb-2 block text-sm font-semibold text-[#EDE6DA]">Titre</label>
              <input formControlName="title" class="w-full rounded-xl border border-[#3A3733] bg-[#1C1B19] px-4 py-3 text-[#EDE6DA] placeholder-[#A39B8C] outline-none focus:border-[#E0A458]" />
              @if (form.controls.title.invalid && form.controls.title.touched) {
                <p class="mt-2 text-sm text-[#D97D5D]">Le titre est obligatoire et doit contenir au moins 12 caractères.</p>
              }
            </div>
            <div class="grid gap-5 md:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-semibold text-[#EDE6DA]">Catégorie</label>
                <select formControlName="category" class="w-full rounded-xl border border-[#3A3733] bg-[#1C1B19] px-4 py-3 text-[#EDE6DA] outline-none focus:border-[#E0A458]">
                  <option value="Financement">Financement</option>
                  <option value="Développement">Développement</option>
                  <option value="Communauté">Communauté</option>
                  <option value="Sécurité">Sécurité</option>
                  <option value="Gouvernance">Gouvernance</option>
                </select>
              </div>
              <div>
                <label class="mb-2 block text-sm font-semibold text-[#EDE6DA]">Budget demandé</label>
                <input type="number" formControlName="budget" class="w-full rounded-xl border border-[#3A3733] bg-[#1C1B19] px-4 py-3 text-[#EDE6DA] outline-none focus:border-[#E0A458]" />
              </div>
            </div>
            <div>
              <label class="mb-2 block text-sm font-semibold text-[#EDE6DA]">Description</label>
              <textarea formControlName="description" rows="5" class="w-full rounded-xl border border-[#3A3733] bg-[#1C1B19] px-4 py-3 text-[#EDE6DA] outline-none focus:border-[#E0A458]"></textarea>
              @if (form.controls.description.invalid && form.controls.description.touched) {
                <p class="mt-2 text-sm text-[#D97D5D]">La description doit contenir au moins 60 caractères.</p>
              }
            </div>
            <div>
              <label class="mb-2 block text-sm font-semibold text-[#EDE6DA]">Justification</label>
              <textarea formControlName="rationale" rows="4" class="w-full rounded-xl border border-[#3A3733] bg-[#1C1B19] px-4 py-3 text-[#EDE6DA] outline-none focus:border-[#E0A458]"></textarea>
            </div>
            <div>
              <label class="mb-2 block text-sm font-semibold text-[#EDE6DA]">Objectif attendu</label>
              <input formControlName="objective" class="w-full rounded-xl border border-[#3A3733] bg-[#1C1B19] px-4 py-3 text-[#EDE6DA] outline-none focus:border-[#E0A458]" />
            </div>
          </div>

          <aside class="space-y-6 rounded-2xl border border-[#3A3733] bg-[#262421] p-6">
            <div>
              <p class="text-sm uppercase tracking-[0.2em] text-[#A39B8C]">Aperçu</p>
              <h3 class="mt-3 text-xl font-bold text-[#EDE6DA]">{{ form.value.title || 'Titre de la proposition' }}</h3>
              <p class="mt-2 text-sm text-[#D7CDBE]">{{ form.value.summary || 'Résumé de la proposition' }}</p>
            </div>
            <div class="rounded-xl border border-[#3A3733] bg-[#1C1B19] p-4 text-sm text-[#D7CDBE]">Cette publication est une démonstration frontend. Aucune transaction blockchain réelle n’est envoyée.</div>
            <button type="submit" [disabled]="form.invalid" class="w-full rounded-xl bg-[#E0A458] px-5 py-3 font-semibold text-[#1C1B19] transition hover:bg-[#EBB46B] disabled:cursor-not-allowed disabled:opacity-50">Publier la proposition</button>
            <a routerLink="/proposals" class="block w-full rounded-xl border border-[#3A3733] bg-transparent px-5 py-3 text-center font-semibold text-[#EDE6DA] transition hover:bg-[#2E2B27]">Annuler</a>
          </aside>
        </form>
      </div>
    </app-navbar>
  `,
})
export class CreateProposalPageComponent {
  private readonly dao = inject(DaoStateService);
  private readonly router = inject(Router);

  protected readonly form = new FormBuilder().group({
    title: ['', [Validators.required, Validators.minLength(12)]],
    category: ['Gouvernance', Validators.required],
    budget: [0, [Validators.min(0)]],
    description: ['', [Validators.required, Validators.minLength(60)]],
    rationale: ['', Validators.required],
    objective: ['', Validators.required],
    summary: ['Proposition de démonstration', Validators.required],
  });

  protected submit(): void {
    if (this.form.invalid) return;
    const created = this.dao.createProposal({
      title: this.form.value.title ?? '',
      summary: this.form.value.summary ?? '',
      description: this.form.value.description ?? '',
      rationale: this.form.value.rationale ?? '',
      objective: this.form.value.objective ?? '',
      category: (this.form.value.category as any) ?? 'Gouvernance',
      budget: this.form.value.budget ?? 0,
      author: 'Vous',
    });
    this.router.navigate(['/proposals', created.id]);
  }
}

@Component({
  selector: 'app-governance-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  template: `
    <app-navbar>
      <div class="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div class="mb-6">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#E0A458]">Gouvernance</p>
          <h1 class="mt-2 text-3xl font-black text-[#EDE6DA]">Règles et participation de la communauté</h1>
        </div>
        <div class="grid gap-5 md:grid-cols-4">
          <div class="rounded-2xl border border-[#3A3733] bg-[#262421] p-5"><div class="text-sm text-[#A39B8C]">Membres éligibles</div><div class="mt-3 text-3xl font-black text-[#EDE6DA]">1 248</div></div>
          <div class="rounded-2xl border border-[#3A3733] bg-[#262421] p-5"><div class="text-sm text-[#A39B8C]">Propositions actives</div><div class="mt-3 text-3xl font-black text-[#EDE6DA]">8</div></div>
          <div class="rounded-2xl border border-[#3A3733] bg-[#262421] p-5"><div class="text-sm text-[#A39B8C]">Votes exprimés</div><div class="mt-3 text-3xl font-black text-[#EDE6DA]">4 890</div></div>
          <div class="rounded-2xl border border-[#3A3733] bg-[#262421] p-5"><div class="text-sm text-[#A39B8C]">Participation moyenne</div><div class="mt-3 text-3xl font-black text-[#EDE6DA]">83%</div></div>
        </div>
        <div class="mt-8 grid gap-6 lg:grid-cols-2">
          <div class="rounded-2xl border border-[#3A3733] bg-[#262421] p-6">
            <h3 class="text-xl font-bold text-[#EDE6DA]">Règles de gouvernance</h3>
            <ul class="mt-4 space-y-3 text-[#D7CDBE]">
              <li>• Quorum minimum : 30% des votes éligibles pour valider une proposition.</li>
              <li>• Seuil de décision : 55% de votes favorables pour l’adoption.</li>
              <li>• Délégation possible entre membres éligibles.</li>
              <li>• Période d’examen : 7 jours pour chaque proposition active.</li>
            </ul>
          </div>
          <div class="rounded-2xl border border-[#3A3733] bg-[#262421] p-6">
            <h3 class="text-xl font-bold text-[#EDE6DA]">Derniers résultats</h3>
            <ul class="mt-4 space-y-3 text-[#D7CDBE]">
              <li>• Proposition de reporting de trésorerie : adoptée.</li>
              <li>• Programme de mentorat : rejeté.</li>
              <li>• Audit sécurité : toujours en cours.</li>
            </ul>
          </div>
        </div>
      </div>
    </app-navbar>
  `,
})
export class GovernancePageComponent {}

@Component({
  selector: 'app-treasury-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  template: `
    <app-navbar>
      <div class="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#E0A458]">Trésorerie</p>
            <h1 class="mt-2 text-3xl font-black text-[#EDE6DA]">Fonds et mouvements de la DAO</h1>
          </div>
          <button type="button" (click)="approveExpense()" class="rounded-xl bg-[#E0A458] px-5 py-3 font-semibold text-[#1C1B19] transition hover:bg-[#EBB46B]">Approuver une dépense</button>
        </div>
        <div class="grid gap-5 md:grid-cols-4">
          <div class="rounded-2xl border border-[#3A3733] bg-[#262421] p-5">
            <div class="text-sm text-[#A39B8C]">Solde</div>
            <div class="mt-3 text-3xl font-black text-[#EDE6DA]">{{ totals.balance | currency:'USD':'symbol':'1.0-0' }}</div>
          </div>
          <div class="rounded-2xl border border-[#3A3733] bg-[#262421] p-5">
            <div class="text-sm text-[#A39B8C]">Token</div>
            <div class="mt-3 text-3xl font-black text-[#EDE6DA]">USDC</div>
          </div>
          <div class="rounded-2xl border border-[#3A3733] bg-[#262421] p-5">
            <div class="text-sm text-[#A39B8C]">Dépenses approuvées</div>
            <div class="mt-3 text-3xl font-black text-[#EDE6DA]">{{ totals.approved | currency:'USD':'symbol':'1.0-0' }}</div>
          </div>
          <div class="rounded-2xl border border-[#3A3733] bg-[#262421] p-5">
            <div class="text-sm text-[#A39B8C]">Valeur indicative</div>
            <div class="mt-3 text-3xl font-black text-[#EDE6DA]">$2.4M</div>
          </div>
        </div>

        <div class="mt-8 rounded-2xl border border-[#3A3733] bg-[#262421] p-6">
          <div class="mb-5 flex items-center justify-between gap-3">
            <h3 class="text-xl font-bold text-[#EDE6DA]">Historique des mouvements</h3>
            <select [(ngModel)]="filter" class="rounded-xl border border-[#3A3733] bg-[#1C1B19] px-4 py-2 text-sm text-[#EDE6DA]">
              <option value="">Tous</option>
              <option value="Entrée">Entrées</option>
              <option value="Sortie">Sorties</option>
              <option value="Approuvée">Approuvées</option>
            </select>
          </div>

          <div class="space-y-3">
            @for (movement of filteredTreasury; track movement.id) {
              <div class="flex flex-col gap-2 rounded-xl border border-[#3A3733] bg-[#1C1B19] p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div class="text-sm font-semibold text-[#EDE6DA]">{{ movement.description }}</div>
                  <div class="mt-1 text-xs text-[#A39B8C]">{{ movement.date }} · {{ movement.category }}</div>
                </div>
                <div class="flex items-center gap-3">
                  <span class="rounded-full px-2.5 py-1 text-xs font-semibold" [ngClass]="movement.type === 'Entrée' ? 'bg-[#22C55E]/15 text-[#4ADE80]' : 'bg-[#EF4444]/15 text-[#F87171]'">{{ movement.type }}</span>
                  <span class="text-sm font-bold" [class.text-[#4ADE80]]="movement.type === 'Entrée'" [class.text-[#F87171]]="movement.type === 'Sortie'">{{ movement.type === 'Entrée' ? '+' : '-' }}{{ movement.amount | currency:'USD':'symbol':'1.0-0' }}</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </app-navbar>
  `,
})
export class TreasuryPageComponent {
  protected readonly dao = inject(DaoStateService);
  protected filter = '';
  protected readonly treasury = this.dao.treasury();

  protected get totals() {
    const approved = this.treasury.filter((item) => item.status === 'Approuvée' && item.type === 'Sortie').reduce((sum, item) => sum + item.amount, 0);
    const balance = this.dao.getTotalTreasury();
    return { balance, approved };
  }

  protected get filteredTreasury() {
    return this.treasury.filter((movement) => !this.filter || movement.type === this.filter || movement.status === this.filter);
  }

  protected approveExpense(): void {
    this.dao.treasury.set([
      {
        id: `t-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        type: 'Sortie',
        amount: 14000,
        status: 'Approuvée',
        description: 'Dépense de démonstration validée',
        category: 'Infra',
      },
      ...this.dao.treasury(),
    ]);
  }
}

@Component({
  selector: 'app-members-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  template: `
    <app-navbar>
      <div class="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div class="mb-6">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#E0A458]">Membres</p>
          <h1 class="mt-2 text-3xl font-black text-[#EDE6DA]">Communauté et délégations</h1>
        </div>
        <div class="grid gap-5 md:grid-cols-4">
          <div class="rounded-2xl border border-[#3A3733] bg-[#262421] p-5"><div class="text-sm text-[#A39B8C]">Total</div><div class="mt-3 text-3xl font-black text-[#EDE6DA]">{{ members.length }}</div></div>
          <div class="rounded-2xl border border-[#3A3733] bg-[#262421] p-5"><div class="text-sm text-[#A39B8C]">Actifs</div><div class="mt-3 text-3xl font-black text-[#EDE6DA]">{{ activeMembers }}</div></div>
          <div class="rounded-2xl border border-[#3A3733] bg-[#262421] p-5"><div class="text-sm text-[#A39B8C]">Détenteurs</div><div class="mt-3 text-3xl font-black text-[#EDE6DA]">{{ holders }}</div></div>
          <div class="rounded-2xl border border-[#3A3733] bg-[#262421] p-5"><div class="text-sm text-[#A39B8C]">Délégations</div><div class="mt-3 text-3xl font-black text-[#EDE6DA]">{{ delegationCount }}</div></div>
        </div>

        <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          @for (member of members; track member.id) {
            <article class="rounded-2xl border border-[#3A3733] bg-[#262421] p-5">
              <div class="flex items-center gap-3">
                <img [src]="member.avatar" [alt]="member.name" class="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div class="text-lg font-bold text-[#EDE6DA]">{{ member.name }}</div>
                  <div class="text-xs text-[#A39B8C]">{{ member.wallet }}</div>
                </div>
              </div>
              <div class="mt-5 space-y-2 text-sm text-[#D7CDBE]">
                <div class="flex justify-between"><span>Tokens</span><span class="font-semibold text-[#EDE6DA]">{{ member.tokens }}</span></div>
                <div class="flex justify-between"><span>Pouvoir de vote</span><span class="font-semibold text-[#EDE6DA]">{{ member.votingPower }}%</span></div>
                <div class="flex justify-between"><span>Statut</span><span class="font-semibold" [ngClass]="memberStatusClass(member.status)">{{ member.status }}</span></div>
              </div>
            </article>
          }
        </div>
      </div>
    </app-navbar>
  `,
})
export class MembersPageComponent {
  protected readonly dao = inject(DaoStateService);
  protected readonly members = this.dao.members();
  protected get activeMembers() { return this.members.filter((m) => m.status === 'Actif').length; }
  protected get holders() { return this.members.filter((m) => m.tokens >= 500).length; }
  protected get delegationCount() { return this.members.filter((m) => m.delegation).length; }
  protected memberStatusClass(status: string): string {
    switch (status) {
      case 'Actif': return 'text-[#4ADE80]';
      case 'Inactif': return 'text-[#F87171]';
      case 'Délégué': return 'text-[#E0A458]';
      default: return 'text-[#A39B8C]';
    }
  }
}

@Component({
  selector: 'app-activity-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  template: `
    <app-navbar>
      <div class="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div class="mb-6">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#E0A458]">Activité</p>
          <h1 class="mt-2 text-3xl font-black text-[#EDE6DA]">Historique de la DAO</h1>
        </div>
        <div class="space-y-4">
          @for (item of activity; track item.id) {
            <div class="rounded-2xl border border-[#3A3733] bg-[#262421] p-5">
              <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <div class="text-sm font-semibold text-[#EDE6DA]">{{ item.title }}</div>
                  <div class="mt-1 text-xs uppercase tracking-[0.18em] text-[#E0A458]">{{ item.category }}</div>
                </div>
                <span class="text-xs text-[#A39B8C]">{{ item.date }}</span>
              </div>
            </div>
          }
        </div>
      </div>
    </app-navbar>
  `,
})
export class ActivityPageComponent {
  protected readonly dao = inject(DaoStateService);
  protected readonly activity = this.dao.activities();
}

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  template: `
    <app-navbar>
      <div class="mx-auto max-w-5xl px-4 py-8 md:px-8">
        <div class="mb-6">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#E0A458]">Paramètres</p>
          <h1 class="mt-2 text-3xl font-black text-[#EDE6DA]">Préférences de démonstration</h1>
        </div>
        <div class="grid gap-6">
          <div class="rounded-2xl border border-[#3A3733] bg-[#262421] p-6">
            <h3 class="text-xl font-bold text-[#EDE6DA]">Profil utilisateur</h3>
            <div class="mt-4 grid gap-4 md:grid-cols-1">
              <div>
                <label class="mb-2 block text-sm font-semibold text-[#EDE6DA]">Nom affiché</label>
                <input [(ngModel)]="settings.displayName" (ngModelChange)="save('displayName', $event)" class="w-full rounded-xl border border-[#3A3733] bg-[#1C1B19] px-4 py-3 text-[#EDE6DA] outline-none focus:border-[#E0A458]" />
              </div>
            </div>
          </div>
          <div class="rounded-2xl border border-[#3A3733] bg-[#262421] p-6">
            <h3 class="text-xl font-bold text-[#EDE6DA]">Réseau de démonstration</h3>
            <div class="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-semibold text-[#EDE6DA]">Réseau</label>
                <input [(ngModel)]="settings.demoNetwork" (ngModelChange)="save('demoNetwork', $event)" class="w-full rounded-xl border border-[#3A3733] bg-[#1C1B19] px-4 py-3 text-[#EDE6DA] outline-none focus:border-[#E0A458]" />
              </div>
              <div>
                <label class="mb-2 block text-sm font-semibold text-[#EDE6DA]">Contrat de gouvernance</label>
                <input [(ngModel)]="settings.contractAddress" (ngModelChange)="save('contractAddress', $event)" class="w-full rounded-xl border border-[#3A3733] bg-[#1C1B19] px-4 py-3 text-[#EDE6DA] outline-none focus:border-[#E0A458]" />
              </div>
            </div>
            <div class="mt-4 text-sm text-[#D7CDBE]">Le contrat est indiqué comme non déployé dans cette démonstration.</div>
          </div>
        </div>
      </div>
    </app-navbar>
  `,
})
export class SettingsPageComponent {
  private readonly dao = inject(DaoStateService);
  protected readonly settings = this.dao.settings();

  protected save<K extends keyof typeof this.settings>(key: K, value: typeof this.settings[K]): void {
    this.dao.updateSetting(key, value);
  }
}

@Component({
  selector: 'app-help-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  template: `
    <app-navbar>
      <div class="mx-auto w-full max-w-7xl py-6 md:py-8">
        <div class="mb-6">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#E0A458]">Aide</p>
          <h1 class="mt-2 text-2xl font-black text-[#EDE6DA] sm:text-3xl">Documentation DJALAZIN DAO</h1>
        </div>
        <div class="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3 lg:gap-5">
          <article class="min-w-0 rounded-2xl border border-[#3A3733] bg-[#262421] p-5 sm:p-6">
            <h2 class="text-lg font-bold text-[#EDE6DA] sm:text-xl">Qu’est-ce qu’une DAO ?</h2>
            <p class="mt-3 leading-7 text-[#D7CDBE]">Une DAO est une organisation décentralisée qui prend des décisions par vote collectif. Ici, la démonstration simule ce mécanisme sans envoyer de transaction blockchain.</p>
          </article>
          <article class="min-w-0 rounded-2xl border border-[#3A3733] bg-[#262421] p-5 sm:p-6">
            <h2 class="text-lg font-bold text-[#EDE6DA] sm:text-xl">Comment voter ?</h2>
            <p class="mt-3 leading-7 text-[#D7CDBE]">Ouvrez une proposition active, choisissez votre vote et confirmez. La démonstration enregistre la préférence localement dans l’interface.</p>
          </article>
          <article class="min-w-0 rounded-2xl border border-[#3A3733] bg-[#262421] p-5 sm:p-6">
            <h2 class="text-lg font-bold text-[#EDE6DA] sm:text-xl">Comment créer une proposition ?</h2>
            <p class="mt-3 leading-7 text-[#D7CDBE]">Passez par la page de création, remplissez les champs obligatoires puis publiez votre proposition. Elle apparaît immédiatement dans les listes.</p>
          </article>
        </div>
      </div>
    </app-navbar>
  `,
})
export class HelpPageComponent {}

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-[#1C1B19] px-6 text-[#EDE6DA]">
      <div class="text-center">
        <div class="text-6xl font-black text-[#E0A458]">404</div>
        <h1 class="mt-4 text-3xl font-black text-[#EDE6DA]">Page introuvable</h1>
        <p class="mt-3 text-[#D7CDBE]">La route que vous demandez n’existe pas dans cette démonstration.</p>
        <a routerLink="/" class="mt-6 inline-block rounded-xl bg-[#E0A458] px-5 py-3 font-semibold text-[#1C1B19] transition hover:bg-[#EBB46B]">Retour à l’accueil</a>
      </div>
    </div>
  `,
})
export class NotFoundPageComponent {}
