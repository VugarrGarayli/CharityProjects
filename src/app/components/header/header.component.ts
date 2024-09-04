import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('formPopupAnimation', [
      state('closed', style({
        opacity: 0,
        transform: 'scale(0.8)'
      })),
      state('open', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('closed => open', [
        animate('300ms ease-out')
      ]),
      transition('open => closed', [
        animate('200ms ease-in')
      ])
    ])
  ]
})
export class HeaderComponent {
  isMenuCollapsed = true;
  showModal: boolean = false;
  showForm = false;

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  regions: string[] = [
    'Abşeron',
    'Ağcabədi',
    'Ağdam',
    'Ağdaş',
    'Ağstafa',
    'Ağsu',
    'Astara',
    'Babək',
    'Bakı',
    'Balakən',
    'Beyləqan',
    'Biləsuvar',
    'Cəbrayıl',
    'Cəlilabad',
    'Daşkəsən',
    'Füzuli',
    'Gədəbəy',
    'Gəncə',
    'Goranboy',
    'Göyçay',
    'Göygöl',
    'Hacıqabul',
    'İmişli',
    'İsmayıllı',
    'Kəlbəcər',
    'Kürdəmir',
    'Qax',
    'Qazax',
    'Qəbələ',
    'Qobustan',
    'Quba',
    'Qubadlı',
    'Qusar',
    'Laçın',
    'Lənkəran',
    'Lerik',
    'Masallı',
    'Mingəçevir',
    'Naftalan',
    'Naxçıvan',
    'Neftçala',
    'Oğuz',
    'Ordubad',
    'Saatlı',
    'Sabirabad',
    'Şabran',
    'Salyan',
    'Şamaxı',
    'Şəki',
    'Şəmkir',
    'Şərur',
    'Şirvan',
    'Siyəzən',
    'Sumqayıt',
    'Şuşa',
    'Tərtər',
    'Tovuz',
    'Ucar',
    'Yardımlı',
    'Yevlax',
    'Zaqatala',
    'Zəngilan',
    'Zərdab',
  ];

  validateNumber(event: KeyboardEvent) {
    const charCode = event.charCode;
    // Yalnız rəqəmlərin daxil edilməsinə icazə verilir (48-57 ASCII kodları)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
