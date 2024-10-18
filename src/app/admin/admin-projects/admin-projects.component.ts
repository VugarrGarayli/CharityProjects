import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Project {
  title: string;
  image: string;
  content: string;
}

@Component({
  selector: 'app-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.scss'],
})
export class AdminProjectsComponent {
  projectForm: FormGroup;
  imageError: boolean = false;
  showForm: boolean = false;
  editingIndex: number | null = null;
  showConfirmation: boolean = false;
  confirmationMessage: string = '';
  actionConfirmed: boolean = false;
  project: Project = { title: '', image: '', content: '' };
  isExpanded: boolean[] = [];

  projects: Project[] = [];
  page = 1;
  pageSize = 5;

  constructor(private fb: FormBuilder, private http: HttpClient) { // HttpClient əlavə edildi
    this.projectForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZüÜəƏıİöÖğĞçÇşŞ\s]+$/),
        ],
      ],
      image:  ['', Validators.required],
      content: ['', Validators.required],
    });
  }

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

  onSubmit() {
    if (this.projectForm.invalid) {
      return;
    }
  
    const updatedProject = this.projectForm.value;
  
    if (this.editingIndex !== null) {
      this.showConfirmationModal('Dəyişikliklər yadda saxlanılsın?', () => {
        const globalIndex = (this.page - 1) * this.pageSize + this.editingIndex;
        this.projects[globalIndex] = updatedProject;
        this.editingIndex = null;
        this.projectForm.reset();
        this.closeForm();
  
    
        this.http.put(`https://localhost:44366/api/Project/${globalIndex}`, updatedProject)
          .subscribe(response => {
            console.log('Project updated', response);
          }, error => {
            console.error('Error updating project', error);
          });
      });
    } else {
      this.showConfirmationModal('Məlumatlar əlavə edilsin?', () => {
        this.projects.push(updatedProject);
        this.projectForm.reset();
        this.closeForm();
  
       
        this.http.post('https://localhost:44366/api/Project', updatedProject)
          .subscribe(response => {
            console.log('Project added', response);
          }, error => {
            console.error('Error adding project', error);
          });
      });
    }
  }

  deleteProject(index: number) {
    this.showConfirmationModal('Silmək istədiyinizdən əminsiz?', () => {
      const globalIndex = (this.page - 1) * this.pageSize + index;
      this.projects.splice(globalIndex, 1);

      if (this.paginatedProjects.length === 0 && this.page > 1) {
        this.previousPage();
      }

     
      this.http.delete(`https://localhost:44366/api/Project/${globalIndex}`)
        .subscribe(response => {
          console.log('Project deleted', response);
        });
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (allowedTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
         
          this.projectForm.patchValue({ image: e.target.result });
        };
        reader.readAsDataURL(file);
      } else {
       
        alert('Yalnız şəkil formatlarında fayllar əlavə edilə bilər (.jpg, .png, .jpeg)');
        this.projectForm.get('image')?.reset(); 
      }
    }
  }
  

  confirmAction(confirmed: boolean) {}

  ngOnInit(): void {
    for (let i = 1; i <= 6; i++) {
      this.projects.push({
        title: `Layihə ${i}`,
        image: '',
        content: `Məzmun ${i}`,
      });
      this.isExpanded.push(false);
    }
  }

  get paginatedProjects() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.projects.slice(startIndex, endIndex);
  }

  nextPage() {
    this.page++;
    if (this.paginatedProjects.length === 0) {
      this.previousPage();
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  getShortContent(content: string, index: number) {
    return this.isExpanded[index] ? content : content.slice(0, 100) + '...';
  }

  toggleContent(index: number) {
    this.isExpanded[index] = !this.isExpanded[index];
  }

  openEditForm(index: number) {
    const globalIndex = (this.page - 1) * this.pageSize + index;
    this.editingIndex = index;
    this.projectForm.patchValue(this.projects[globalIndex]);
    this.showForm = true;
  }

  openAddForm() {
    this.resetForm();
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.projectForm.reset();
  }

  resetForm() {
    this.projectForm.reset();
    this.editingIndex = null;
  }

  onCancel() {
    this.showForm = false;
    this.projectForm.reset();
    this.editingIndex = null;
  }
}
