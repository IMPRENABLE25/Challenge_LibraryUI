
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface DataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  type?: 'text' | 'number' | 'date' | 'currency' | 'badge' | 'progress' | 'actions';
  badgeColors?: { [key: string]: string };
}

export interface DataTableRow {
  [key: string]: any;
  selected?: boolean;
}

export interface FilterConfig {
  key: string;
  label: string;
  options?: { value: string; label: string }[];
  value?: any;
}

@Component({
  selector: 'app-dataset',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dataset.html',
  styleUrl: './dataset.css'
})
export class Dataset implements OnInit {
  columns: DataTableColumn[] = [
    { key: 'hash', label: 'Transaction', sortable: true },
    { key: 'type', label: 'Type', sortable: true, type: 'badge',
      badgeColors: { 'Réception': 'success', 'Envoi': 'primary' } },
    { key: 'address', label: 'Adresse', sortable: true },
    { key: 'amount', label: 'Montant', sortable: true },
    { key: 'status', label: 'Statut', sortable: true, type: 'badge',
      badgeColors: { 'Confirmée': 'success', 'En attente': 'warning', 'Échouée': 'danger' } },
    { key: 'date', label: 'Date', sortable: true, type: 'date' }
  ];

  allData: DataTableRow[] = [
    { id: 1, hash: '0x8f2a...c91d', type: 'Réception', address: '0x71C7...9A23', amount: '0.45 ETH', status: 'Confirmée', date: '2026-10-20' },
    { id: 2, hash: '0x3b91...a2e7', type: 'Envoi', address: '0xA32f...18D4', amount: '0.12 ETH', status: 'Confirmée', date: '2026-10-19' },
    { id: 3, hash: '0x7c14...f802', type: 'Réception', address: '0x92B1...4C62', amount: '1.20 ETH', status: 'En attente', date: '2026-10-19' },
    { id: 4, hash: '0xa620...d5b1', type: 'Envoi', address: '0x5D31...7E09', amount: '0.08 ETH', status: 'Échouée', date: '2026-10-18' },
    { id: 5, hash: '0x1e48...b6c3', type: 'Réception', address: '0xF413...2B85', amount: '2.00 ETH', status: 'Confirmée', date: '2026-10-17' },
    { id: 6, hash: '0x9d72...c310', type: 'Envoi', address: '0xB8D4...6F12', amount: '0.25 ETH', status: 'Confirmée', date: '2026-10-16' }
  ];

  filteredData: DataTableRow[] = [];
  displayedData: DataTableRow[] = [];
  searchQuery = '';

  filters: FilterConfig[] = [
    {
      key: 'type',
      label: 'Type',
      options: [
        { value: '', label: 'Tous les types' },
        { value: 'Réception', label: 'Réception' },
        { value: 'Envoi', label: 'Envoi' }
      ],
      value: ''
    },
    {
      key: 'status',
      label: 'Statut',
      options: [
        { value: '', label: 'Tous les statuts' },
        { value: 'Confirmée', label: 'Confirmée' },
        { value: 'En attente', label: 'En attente' },
        { value: 'Échouée', label: 'Échouée' }
      ],
      value: ''
    }
  ];

  currentPage = 1;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 50];
  totalItems = 0;
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectAll = false;

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let result = [...this.allData];

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(row =>
        String(row['hash']).toLowerCase().includes(q) ||
        String(row['address']).toLowerCase().includes(q) ||
        String(row['type']).toLowerCase().includes(q) ||
        String(row['status']).toLowerCase().includes(q)
      );
    }

    this.filters.forEach(filter => {
      if (filter.value) {
        result = result.filter(row => row[filter.key] === filter.value);
      }
    });

    if (this.sortColumn) {
      result.sort((a, b) => {
        const va = a[this.sortColumn];
        const vb = b[this.sortColumn];
        const cmp = va < vb ? -1 : va > vb ? 1 : 0;
        return this.sortDirection === 'asc' ? cmp : -cmp;
      });
    }

    this.filteredData = result;
    this.totalItems = result.length;
    this.currentPage = 1;
    this.updateDisplayedData();
  }

  onSearch(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.filters.forEach(filter => filter.value = '');
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return this.filters.some(filter => filter.value !== '');
  }

  sortBy(column: DataTableColumn): void {
    if (!column.sortable) return;

    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }

    this.applyFilters();
  }

  getSortState(column: DataTableColumn): 'none' | 'asc' | 'desc' {
    if (!column.sortable || this.sortColumn !== column.key) return 'none';
    return this.sortDirection;
  }

  updateDisplayedData(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.displayedData = this.filteredData.slice(start, start + this.pageSize);
    this.updateSelectAll();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.updateDisplayedData();
    }
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.updateDisplayedData();
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  getPageNumbers(): number[] {
    const total = this.getTotalPages();
    const cur = this.currentPage;
    let start = Math.max(1, cur - 2);
    let end = Math.min(total, cur + 2);

    if (end - start < 4) {
      if (start === 1) end = Math.min(total, start + 4);
      else start = Math.max(1, end - 4);
    }

    const pages: number[] = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }

  getStartIndex(): number {
    return this.totalItems === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  toggleSelectAll(): void {
    this.displayedData.forEach(row => row['selected'] = this.selectAll);
  }

  onRowSelect(): void {
    this.updateSelectAll();
  }

  updateSelectAll(): void {
    this.selectAll = this.displayedData.length > 0 &&
      this.displayedData.every(row => row['selected']);
  }

  getSelectedCount(): number {
    return this.filteredData.filter(row => row['selected']).length;
  }

  getBadgeColor(column: DataTableColumn, value: string): string {
    return column.badgeColors?.[value] || 'secondary';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  getStockPercentage(stock: number): number {
    return Math.min(100, stock);
  }

  getStockColor(stock: number): string {
    if (stock === 0) return '#ef4444';
    if (stock < 30) return '#f59e0b';
    return '#10b981';
  }

  onView(row: DataTableRow): void {
    console.log('View transaction:', row);
  }

  onEdit(row: DataTableRow): void {
    console.log('Edit transaction:', row);
  }

  onDelete(row: DataTableRow): void {
    this.allData = this.allData.filter(item => item['id'] !== row['id']);
    this.applyFilters();
  }

  exportData(): void {
    const headers = this.columns
      .filter(column => column.key !== 'actions')
      .map(column => column.label);

    const rows = this.filteredData.map(row =>
      this.columns
        .filter(column => column.key !== 'actions')
        .map(column => String(row[column.key] ?? ''))
    );

    const csv = [headers, ...rows]
      .map(row => row.map(value => `"${value.replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob(['\uFEFF' + csv], {
      type: 'text/csv;charset=utf-8;'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'chainscope-transactions.csv';
    link.click();
    URL.revokeObjectURL(url);
  }
}

