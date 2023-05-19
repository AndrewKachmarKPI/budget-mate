import {Component, Input, OnInit} from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";
import {FileDto} from "../../models/file-dto";
import {UserService} from "../services/user.service";
import {UserDto} from "../../auth/models/user-dto";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  @Input() files: FileDto[] = [];
  public userDto: UserDto;

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
      }
    })
  }
}
