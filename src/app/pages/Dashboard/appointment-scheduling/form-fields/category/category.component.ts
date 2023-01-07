import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../../core/store/_services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {EventEmitterService} from '../../../../../core/store/_services/event-emitter.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  @Output() myEvent = new EventEmitter();
  locations = [];
  categories = [];
  categoryForm: FormGroup;
  constructor(private fb: FormBuilder,  private userService: UserService) {
  }

  ngOnInit(): void {
    this.initCategoryForm();
    this.getAllCategories();
    this.getAllLocations();
  }
  callData(){
    this.getAllLocations();
  }
  initCategoryForm(){
    this.categoryForm = this.fb.group({
      category_name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      location_id: ['', Validators.compose([
        Validators.required,
      ])
      ],
    });
  }
  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isCategoryControlHasError(controlName: string, validationType: string): boolean {
    const control = this.categoryForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  getAllLocations(){
    this.userService.getLocations().subscribe(res => {
       if (res){
          this.locations = res.locations;
        }
    });
  }
  getAllCategories(){
    this.userService.getCategories().subscribe(res => {
      if (res){
        this.categories = res.categories;
      }
    });
  }

  deleteCategory(catId){
    this.userService.deleteCategory(catId).subscribe(res => {
        this.categoryDelete();
    });
  }
  addCategory(){
    const controls = this.categoryForm.controls;
    // check form
    if (this.categoryForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    const CategoryForm = {
      category_name: controls.category_name.value,
      location_id: controls.location_id.value,
      type: 'category'
    };

    this.userService.addCategory(CategoryForm).subscribe(res => {
      if (res.success === 'true'){
        this.CategoryAlert();
      }
    });
  }
  CategoryAlert()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Category Added Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
        this.getAllCategories();
        this.categoryForm.reset();
      }
    });
  }
  categoryDelete()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Category Deleted Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
        this.getAllCategories();
      }
    });
  }
}
