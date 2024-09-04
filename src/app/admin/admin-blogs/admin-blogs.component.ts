import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.scss'],
})
export class AdminBlogsComponent {
  blogs: any[] = [
    {
      id: 1,
      title: 'Blog Title 1',
      imageUrl: 'https://via.placeholder.com/300x200',
      description: 'Lorem ipsum dolor sit amet.',
      isExpanded: false,
    },
    {
      id: 2,
      title: 'Blog Title 2',
      imageUrl: 'https://via.placeholder.com/300x200',
      description: 'Lorem ipsum dolor sit amet.',
      isExpanded: false,
    },
    {
      id: 3,
      title: 'Blog Title 1',
      imageUrl: 'https://via.placeholder.com/300x200',
      description: 'Lorem ipsum dolor sit amet.',
      isExpanded: false,
    },
    {
      id: 4,
      title: 'Blog Title 2',
      imageUrl: 'https://via.placeholder.com/300x200',
      description: 'Lorem ipsum dolor sit amet.',
      isExpanded: false,
    },
    {
      id: 5,
      title: 'Blog Title 1',
      imageUrl: 'https://via.placeholder.com/300x200',
      description: 'Lorem ipsum dolor sit amet.',
      isExpanded: false,
    },
    {
      id: 6,
      title: 'Blog Title 2',
      imageUrl: 'https://via.placeholder.com/300x200',
      description: 'Lorem ipsum dolor sit amet.',
      isExpanded: false,
    },
  ];

  showForm: boolean = false;
  selectedImage: string = '';
  currentBlogId: number | null = null;
  blogForm: FormGroup;

  showConfirmation: boolean = false;
  confirmationMessage: string = '';
  actionToPerform: 'add' | 'edit' | 'delete' | null = null;

  currentPage = 1;
  itemsPerPage = 3;
  isPageChanging = false;

  constructor(private fb: FormBuilder) {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      imageUrl: [''],
      description: ['', Validators.required],
    });
  }

  isExpanded: boolean[] = [];

  ngOnInit() {
    // Hər blog üçün isExpanded array-i inisializasiya edin
    this.blogs.forEach(() => this.isExpanded.push(false));
  }

  // Məzmunu qısaltmaq və ya tam göstərmək
  getShortContent(content: string, index: number): string {
    return this.isExpanded[index] ? content : content.slice(0, 100) + '...';
  }

  // Məzmunu genişlətmək və ya qısaltmaq üçün toggle metodu
  toggleContent(index: number) {
    this.isExpanded[index] = !this.isExpanded[index];
  }

  // Pagination ilə bağlı metodlar
  get totalPages(): number {
    return Math.max(Math.ceil(this.blogs.length / this.itemsPerPage), 1);
  }

  get paginatedBlogs() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.blogs.slice(start, end);
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

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.blogForm.reset();
      this.selectedImage = '';
      this.currentBlogId = null;
    }
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (this.isValidImage(file)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.selectedImage = reader.result as string;
          this.blogForm.patchValue({ imageUrl: file });
        };
        reader.readAsDataURL(file);
      } else {
        this.blogForm.get('imageUrl')?.setErrors({ invalidFileType: true });
      }
    }
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      const blogData = this.blogForm.value;
      if (this.selectedImage) {
        blogData.imageUrl = this.selectedImage;
      }

      if (this.currentBlogId !== null) {
        this.showConfirmationDialog(
          'edit',
          'Redaktə etmək istədiyinizdən əminsiniz?'
        );
      } else {
        this.showConfirmationDialog(
          'add',
          'Yeni blog əlavə etmək istədiyinizdən əminsiniz?'
        );
      }
    } else {
      console.log('Formda səhvlər var');
    }
  }

  editBlog(blog: any): void {
    this.currentBlogId = blog.id;
    this.showForm = true;
    this.blogForm.patchValue(blog);
    this.selectedImage = blog.imageUrl;
  }

  deleteBlog(id: number): void {
    this.currentBlogId = id;
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
          this.addBlog();
          break;
        case 'edit':
          this.updateBlog();
          break;
        case 'delete':
          this.performDelete();
          break;
      }
      this.navigateToBlogList();
    }
    this.showConfirmation = false;
    this.actionToPerform = null;
  }

  addBlog() {
    const blogData = this.blogForm.value;
    blogData.id = this.blogs.length + 1;
    if (this.selectedImage) {
      blogData.imageUrl = this.selectedImage;
    }
    this.blogs.push(blogData);
    this.toggleForm();
    this.updatePagination();
  }

  updateBlog() {
    const blogData = this.blogForm.value;
    if (this.selectedImage) {
      blogData.imageUrl = this.selectedImage;
    }
    const index = this.blogs.findIndex(
      (blog) => blog.id === this.currentBlogId
    );
    if (index !== -1) {
      this.blogs[index] = { ...this.blogs[index], ...blogData };
    }
    this.toggleForm();
    this.updatePagination();
  }

  performDelete() {
    this.blogs = this.blogs.filter((blog) => blog.id !== this.currentBlogId);
    this.updatePagination();
  }

  updatePagination() {
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  navigateToBlogList() {
    this.currentBlogId = null;
    this.showForm = false;
  }

  isValidImage(file: File): boolean {
    const allowedExtensions = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/bmp',
    ];
    const maxSizeInMB = 2;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    return allowedExtensions.includes(file.type) && file.size <= maxSizeInBytes;
  }
}
