import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-gallery',
  templateUrl: './admin-gallery.component.html',
  styleUrls: ['./admin-gallery.component.scss'],
})
export class AdminGalleryComponent {
  galleryForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  galleryImages: string[] = []; // Şəkillərin saxlanacağı massiv
  imageError: string | null = null;

  constructor(private fb: FormBuilder) {
    this.galleryForm = this.fb.group({
      image: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Faylın formatını yoxlamaq
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        this.imageError = 'Yalnız .jpg, .jpeg və .png formatları qəbul olunur.';
        this.galleryForm.get('image')?.reset();
        this.previewUrl = null;
        return;
      }

      // Faylın ölçüsünü yoxlamaq (məsələn, maksimum 5MB)
      const maxSizeInMB = 5;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        this.imageError = `Faylın ölçüsü ${maxSizeInMB}MB-dan böyük ola bilməz.`;
        this.galleryForm.get('image')?.reset();
        this.previewUrl = null;
        return;
      }

      this.selectedFile = file;
      this.imageError = null;

      // Şəkilin önizlənməsi üçün URL yarat
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.galleryForm.invalid) {
      this.galleryForm.get('image')?.markAsTouched();
      return;
    }

    if (this.selectedFile) {
      // Şəkil yükləndikdə qalereyaya əlavə et
      this.galleryImages.push(this.previewUrl!);

      // Forma reset et
      this.selectedFile = null;
      this.previewUrl = null;
      this.galleryForm.reset();
    }
  }
}
