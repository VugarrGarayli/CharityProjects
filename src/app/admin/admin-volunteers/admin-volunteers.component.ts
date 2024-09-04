import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-admin-volunteers',
  templateUrl: './admin-volunteers.component.html',
  styleUrls: ['./admin-volunteers.component.scss'],
})
export class AdminVolunteersComponent implements OnInit {
  volunteers: any[] = [
    {
      id: 1,
      name: 'Ali',
      surname: 'Ahmadov',
      fathersName: 'Rəsul',
      birthDate: '1990-01-01',
      mobile: '+994 50 123-45-67',
      email: 'ali@example.com',
      address: 'Bakı, Azərbaycan',
      imageUrl: '',
    },
    {
      id: 2,
      name: 'Leyla',
      surname: 'Mammadova',
      fathersName: 'İlqar',
      birthDate: '1992-05-15',
      mobile: '+994 50 987-65-43',
      email: 'leyla@example.com',
      address: 'Sumqayıt, Azərbaycan',
      imageUrl: '',
    },
    {
      id: 3,
      name: 'Rauf',
      surname: 'Hüseynov',
      fathersName: 'Məmməd',
      birthDate: '1988-11-23',
      mobile: '+994 55 234-56-78',
      email: 'rauf@example.com',
      address: 'Gəncə, Azərbaycan',
      imageUrl: '',
    },
    {
      id: 4,
      name: 'Nigar',
      surname: 'Həsənova',
      fathersName: 'Vəli',
      birthDate: '1995-09-30',
      mobile: '+994 50 345-67-89',
      email: 'nigar@example.com',
      address: 'Lənkəran, Azərbaycan',
      imageUrl: '',
    },
    {
      id: 5,
      name: 'Elvin',
      surname: 'Rzayev',
      fathersName: 'Əli',
      birthDate: '1985-07-12',
      mobile: '+994 55 456-78-90',
      email: 'elvin@example.com',
      address: 'Şəki, Azərbaycan',
      imageUrl: '',
    },
    {
      id: 6,
      name: 'Gülşən',
      surname: 'Quliyeva',
      fathersName: 'Fərid',
      birthDate: '1993-12-01',
      mobile: '+994 50 567-89-01',
      email: 'gulshen@example.com',
      address: 'Bərdə, Azərbaycan',
      imageUrl: '',
    },
    {
      id: 7,
      name: 'Kamran',
      surname: 'Həsənov',
      fathersName: 'Müslüm',
      birthDate: '1987-03-14',
      mobile: '+994 55 678-90-12',
      email: 'kamran@example.com',
      address: 'Quba, Azərbaycan',
      imageUrl: '',
    },
    {
      id: 8,
      name: 'Zeynəb',
      surname: 'Məmmədova',
      fathersName: 'Kamil',
      birthDate: '1994-06-22',
      mobile: '+994 50 789-01-23',
      email: 'zeynab@example.com',
      address: 'Gəncə, Azərbaycan',
      imageUrl: '',
    },
    {
      id: 9,
      name: 'Samir',
      surname: 'Əliyev',
      fathersName: 'Aslan',
      birthDate: '1983-10-05',
      mobile: '+994 55 890-12-34',
      email: 'samir@example.com',
      address: 'Lənkəran, Azərbaycan',
      imageUrl: '',
    },
    {
      id: 10,
      name: 'Fəridə',
      surname: 'Qasımova',
      fathersName: 'Məhəmməd',
      birthDate: '1991-08-19',
      mobile: '+994 50 901-23-45',
      email: 'farida@example.com',
      address: 'Bakı, Azərbaycan',
      imageUrl: '',
    },
  ];

  showForm: boolean = false;
  selectedImage: string = '';
  currentVolunteerId: number | null = null;
  volunteerForm: FormGroup;

  showConfirmation: boolean = false; // To show/hide the confirmation modal
  confirmationMessage: string = ''; // Message to display in the confirmation modal
  actionToPerform: 'add' | 'edit' | 'delete' | null = null; // Keeps track of the current action
  currentYear: number = new Date().getFullYear();

  constructor(private fb: FormBuilder) {
    this.volunteerForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^[a-zA-ZƏəÜüĞğÖöŞşÇçİı\s]+$/), // Rəqəm və simvollara icazə vermir
        ],
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^[a-zA-ZƏəÜüĞğÖöŞşÇçİı\s]+$/), // Rəqəm və simvollara icazə vermir
        ],
      ],
      fathersName: [
        '',
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^[a-zA-ZƏəÜüĞğÖöŞşÇçİı\s]+$/), // Rəqəm və simvollara icazə vermir
        ],
      ],
      birthDate: ['', [Validators.required]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{2}\s\d{3}\s\d{2}\s\d{2}$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      imageUrl: [''],
    });
  }

  currentPage = 1;
  itemsPerPage = 3; // Adjust the number of items per page as needed
  isPageChanging = false;

  // Calculate total pages
  get totalPages(): number {
    return Math.max(Math.ceil(this.volunteers.length / this.itemsPerPage), 1);
  }

  get paginatedVolunteers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.volunteers.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.animatePageChange(() => {
        this.currentPage++;
      });
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.animatePageChange(() => {
        this.currentPage--;
      });
    }
  }

  animatePageChange(callback: () => void) {
    this.isPageChanging = true;
    setTimeout(() => {
      callback();
      this.isPageChanging = false;
    }, 300);
  }

  get pageNumbers(): number[] {
    const totalPages = this.totalPages;
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  ngOnInit(): void {
    console.log('Admin Volunteers Component initialized');
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.volunteerForm.reset();
      this.selectedImage = '';
      this.currentVolunteerId = null;
    }
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (this.isValidImage(file)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.selectedImage = reader.result as string;
          this.volunteerForm.patchValue({ imageUrl: file });
        };
        reader.readAsDataURL(file);
      } else {
        this.volunteerForm
          .get('imageUrl')
          ?.setErrors({ invalidFileType: true });
      }
    }
  }

  onSubmit(): void {
    if (this.volunteerForm.valid) {
      const volunteerData = this.volunteerForm.value;
      if (this.selectedImage) {
        volunteerData.imageUrl = this.selectedImage;
      }

      if (this.currentVolunteerId) {
        this.showConfirmationDialog(
          'edit',
          'Redaktə etmək istədiyinizdən əminsiniz?'
        );
      } else {
        this.showConfirmationDialog(
          'add',
          'Yeni könüllü əlavə etmək istədiyinizdən əminsiniz?'
        );
      }
      console.log('Form müvəffəqiyyətlə təqdim edildi');
    } else {
      console.log('Formda səhvlər var');
    }
  }

  editVolunteer(volunteer: any): void {
    this.currentVolunteerId = volunteer.id;
    this.showForm = true;
    this.volunteerForm.patchValue(volunteer);
    this.selectedImage = volunteer.imageUrl;
  }

  deleteVolunteer(id: number): void {
    this.currentVolunteerId = id;
    this.showConfirmationDialog('delete', 'Silmək istədiyinizdən əminsiniz?');
    
  }

  showConfirmationDialog(action: 'add' | 'edit' | 'delete', message: string) {
    this.confirmationMessage = message;
    this.actionToPerform = action;
    this.showConfirmation = true;
  }

  onConfirm(confirmed: boolean) {
    if (confirmed) {
      switch (this.actionToPerform) {
        case 'add':
          this.addVolunteer();
          break;
        case 'edit':
          this.updateVolunteer();
          break;
        case 'delete':
          this.performDelete();
          break;
      }
      this.navigateToVolunteerList();
    }
    this.showConfirmation = false;
    this.actionToPerform = null;
  }

  addVolunteer() {
    const volunteerData = this.volunteerForm.value;
    volunteerData.id = this.volunteers.length + 1;
    if (this.selectedImage) {
      volunteerData.imageUrl = this.selectedImage;
    }
    this.volunteers.push(volunteerData);
    this.toggleForm();
  }

  updateVolunteer() {
    const volunteerData = this.volunteerForm.value;
    if (this.selectedImage) {
      volunteerData.imageUrl = this.selectedImage;
    }
    const index = this.volunteers.findIndex(
      (volunteer) => volunteer.id === this.currentVolunteerId
    );
    if (index !== -1) {
      this.volunteers[index] = volunteerData;
    }
    this.toggleForm();
  }

  performDelete() {
    this.volunteers = this.volunteers.filter(
      (volunteer) => volunteer.id !== this.currentVolunteerId
    );
  }

  navigateToVolunteerList() {
    this.currentVolunteerId = null;
    this.showForm = false;
  }

  nameValidator(control: AbstractControl): ValidationErrors | null {
    const namePattern = /^[a-zA-ZƏəÜüĞğÖöŞşÇçİı\s]+$/; // Azərbaycan dilinə uyğun simvollar, rəqəm/simvol icazə verilmir
    return namePattern.test(control.value) ? null : { invalidName: true };
  }

  // Mobil nömrə üçün xüsusi validator
  mobileValidator(control: AbstractControl): ValidationErrors | null {
    const mobilePattern = /^\d{2}\s\d{3}\s\d{2}\s\d{2}$/; // +994 avtomatik görünəcək, istifadəçi yalnız nömrəni daxil edəcək
    return mobilePattern.test(control.value) ? null : { invalidMobile: true };
  }

  // Doğum tarixi üçün xüsusi validator
  birthDateValidator(control: AbstractControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const minDate = new Date('1930-01-01');
    const maxDate = new Date(); // İndiki tarix
    return inputDate >= minDate && inputDate <= maxDate
      ? null
      : { invalidDate: true };
  }
  isValidImage(file: File): boolean {
    const allowedExtensions = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/bmp',
    ];
    const maxSizeInMB = 2; // Maksimum 2 MB
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    return allowedExtensions.includes(file.type) && file.size <= maxSizeInBytes;
  }
  imageValidator(control: AbstractControl): ValidationErrors | null {
    const file = control.value;
    if (!file) return null;

    const allowedExtensions = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/bmp',
    ];
    const maxSizeInMB = 4; // Maksimum 2 MB
    const maxSizeInBytes = maxSizeInMB * 2048 * 2048;

    if (file) {
      if (!allowedExtensions.includes(file.type)) {
        return { invalidFileType: true };
      }
      if (file.size > maxSizeInBytes) {
        return { fileTooLarge: true };
      }
    }

    return null;
  }
}
