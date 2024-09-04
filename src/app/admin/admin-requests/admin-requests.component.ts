// admin-requests.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.scss'],
})
export class AdminRequestsComponent {
  helpRequests = [
    {
      name: 'Ad, Soyad',
      phone: '+994 70-491-65-66',
      region: 'Abşeron',
      address: 'Ünvan',
      shortInfo: 'Qısa məlumat',
      completed: false,
    },
    {
      id: 1,
      name: 'Elvin Məmmədov',
      phone: '+994 55 123 45 67',
      region: 'Bakı',
      address: 'Nizami rayonu, Xətai prospekti',
      description: 'Qida və dərman yardımı tələb olunur.',
      completed: false,
    },
    {
      id: 2,
      name: 'Aysel Qasımova',
      phone: '+994 50 987 65 43',
      region: 'Gəncə',
      address: 'Gəncə şəhəri, Heydər Əliyev prospekti',
      description: 'Tibbi yardım tələb olunur.',
      completed: false,
    },
    {
      id: 3,
      name: 'Samir Həsənov',
      phone: '+994 70 123 45 67',
      region: 'Sumqayıt',
      address: 'Sumqayıt şəhəri, 9-cu mikrorayon',
      description: 'Məişət avadanlıqları üçün yardım tələb olunur.',
    },
    {
      id: 4,
      name: 'Nigar Əliyeva',
      phone: '+994 55 654 32 10',
      region: 'Şəki',
      address: 'Şəki rayonu, M. Əsədov küçəsi',
      description: 'Uşaq paltarları və qida yardımı tələb olunur.',
    },
    {
      id: 5,
      name: 'Orxan İbrahimov',
      phone: '+994 77 321 45 67',
      region: 'Lənkəran',
      address: 'Lənkəran şəhəri, 28 May küçəsi',
      description: 'Evdə təmir və tikinti üçün yardım tələb olunur.',
    },
    {
      id: 6,
      name: 'Leyla Hüseynova',
      phone: '+994 99 987 65 43',
      region: 'Quba',
      address: 'Quba rayonu, İstiqlal küçəsi',
      description: 'Evdə tibbi yardım tələb olunur.',
    },
    {
      id: 7,
      name: 'Ad, Soyad',
      phone: '+994 70-491-65-66',
      region: 'Abşeron',
      address: 'Ünvan',
      shortInfo: 'Qısa məlumat',
    },
    {
      id: 8,
      name: 'Elvin Məmmədov',
      phone: '+994 55 123 45 67',
      region: 'Bakı',
      address: 'Nizami rayonu, Xətai prospekti',
      description: 'Qida və dərman yardımı tələb olunur.',
    },
    {
      id: 9,
      name: 'Aysel Qasımova',
      phone: '+994 50 987 65 43',
      region: 'Gəncə',
      address: 'Gəncə şəhəri, Heydər Əliyev prospekti',
      description: 'Tibbi yardım tələb olunur.',
    },
    {
      id: 10,
      name: 'Samir Həsənov',
      phone: '+994 70 123 45 67',
      region: 'Sumqayıt',
      address: 'Sumqayıt şəhəri, 9-cu mikrorayon',
      description: 'Məişət avadanlıqları üçün yardım tələb olunur.',
    },
    {
      id: 11,
      name: 'Nigar Əliyeva',
      phone: '+994 55 654 32 10',
      region: 'Şəki',
      address: 'Şəki rayonu, M. Əsədov küçəsi',
      description: 'Uşaq paltarları və qida yardımı tələb olunur.',
    },
    {
      id: 12,
      name: 'Orxan İbrahimov',
      phone: '+994 77 321 45 67',
      region: 'Lənkəran',
      address: 'Lənkəran şəhəri, 28 May küçəsi',
      description: 'Evdə təmir və tikinti üçün yardım tələb olunur.',
    },
    {
      id: 13,
      name: 'Leyla Hüseynova',
      phone: '+994 99 987 65 43',
      region: 'Quba',
      address: 'Quba rayonu, İstiqlal küçəsi',
      description: 'Evdə tibbi yardım tələb olunur.',
    },
  ];

  selectedRequest: any = null;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  showConfirmation: boolean = false;
  confirmationMessage: string = '';
  actionConfirmed: boolean = false;

  confirmAction(confirmed: boolean) {}
  showConfirmationModal(message: string, callback: () => void) {
    this.confirmationMessage = message;
    this.showConfirmation = true;

    this.confirmAction = (confirmed: boolean) => {
      if (confirmed) {
        callback();
      }
      this.showConfirmation = false;
    };
  }

  showDetails(request: any): void {
    this.selectedRequest = request;
  }

  closeDetails(): void {
    this.selectedRequest = null;
  }

  deleteRequest(request: any): void {
    this.showConfirmationModal('Silmək istədiyinizdən əminsiz?', () => {
      this.helpRequests = this.helpRequests.filter((r) => r !== request);
      // Pagination üçün səhifəni yenidən hesablamaq
      const totalPages = Math.ceil(
        this.helpRequests.length / this.itemsPerPage
      );
      if (this.currentPage > totalPages) {
        this.currentPage = totalPages;
      }
    });
  }

  get paginatedRequests() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.helpRequests.slice(start, end);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  toggleComplete(request: any): void {
    request.completed = !request.completed;
  }
}
