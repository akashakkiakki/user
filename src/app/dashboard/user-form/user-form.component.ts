import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;

  roles = ['Admin', 'Editor', 'Viewer'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserFormComponent>
  ) {}

  ngOnInit(): void {
    this.initilizeForm();
  }

  initilizeForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.userService.addUser(this.form.value);
      this.dialogRef.close();
    }
  }
}
