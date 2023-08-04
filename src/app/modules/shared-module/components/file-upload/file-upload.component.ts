import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
    selectedFiles?: FileList;
    currentFile?: File;

    @Output()
    upload: EventEmitter<File> = new EventEmitter<File>();

    constructor() {
    }

    ngOnInit(): void {

    }

    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }

    doUpload(): void {
        if (this.selectedFiles) {
            const file: File | null = this.selectedFiles.item(0);

            if (file) {
                this.currentFile = file;

                this.upload.emit(file);
            }

            this.selectedFiles = undefined;
        }
    }
}
