import {Component, Input, OnInit} from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";
import {FileDto} from "../../models/file-dto";
import {UserService} from "../services/user.service";
import {UserDto} from "../../auth/models/user-dto";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileDto} from "../../auth/models/profile-dto";

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  @Input() files: FileDto[] = [];
  public userDto: UserDto;
  public profileGroup: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.compose([
      Validators.required
    ])),
    lastName: new FormControl('', Validators.compose([
      Validators.required
    ])),
    email: new FormControl('', Validators.compose([
      Validators.required, Validators.email
    ])),
    phoneNumber: new FormControl('', Validators.compose([
      Validators.required
    ])),
    currency: new FormControl('', Validators.compose([
      Validators.required
    ]))
  })

  constructor(private userService: UserService, private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getProfile();
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  clearImage() {
    this.imageChangedEvent = "";
  }

  get controls() {
    return this.profileGroup.controls;
  }

  public changeAvatar(fileId: string) {
    this.userService.changeAvatar(fileId).subscribe({
      next: (fileId) => {
        this.userService.updateAvatar(fileId);
        this.toast.success("Avatar changed!");
        this.userDto.avatarId = fileId;
      }
    })
  }

  public getProfile() {
    this.userService.myProfile().subscribe({
      next: (userDto) => {
        this.userDto = userDto;
        if (this.userDto.firstName) this.controls['firstName'].setValue(this.userDto.firstName);
        if (this.userDto.lastName) this.controls['lastName'].setValue(this.userDto.lastName);
        if (this.userDto.email) this.controls['email'].setValue(this.userDto.email);
        if (this.userDto.phoneNumber) this.controls['phoneNumber'].setValue(this.userDto.phoneNumber);
        if (this.userDto.currency) this.controls['currency'].setValue(this.userDto.currency);
      }
    })
  }

  public saveProfile() {
    if (this.profileGroup.valid) {
      const dto: ProfileDto = new ProfileDto(this.controls['firstName'].value,
        this.controls['lastName'].value,
        this.controls['email'].value,
        this.controls['phoneNumber'].value,
        this.controls['currency'].value);
      this.userService.changeProfile(dto).subscribe({
        next: () => {
          this.toast.success("Profile updated");
        }
      })
    }
  }
}
