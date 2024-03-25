import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../../services/user-details.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],

})
export class DetailsComponent {
  // formData: any = {};

  // constructor(private userService: UserService) {}

  // onSubmit(form: NgForm) {
  //   console.log("fooorrrmm",form);
    
  //   const formData = form.value; // Capture form data from the form object
  //   console.log("Submit", formData); // Check if formData is populated correctly
  //   this.userService.submitDetails(formData).subscribe(
  //     (response) => {
  //       console.log(response); // Handle success response
  //     },
  //     (error) => {
  //       console.error(error); // Handle error response
  //     }
  //   );
  // }
  userForm: FormGroup = new FormGroup({});


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      weight: ['', Validators.required],
      height: [''],
      age: [''],
      gender: ['', Validators.required],
      goal: ['', Validators.required],
      veg: ['', Validators.required],
      workout_loc: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Form Group:', this.userForm);

  }
}