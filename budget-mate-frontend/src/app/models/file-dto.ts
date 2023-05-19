export class FileDto {
  constructor(public fileId: string,
              public category: string,
              public name: string,
              public type: string,
              public content: any[],
              public url: string,
              public size: number) {
  }
}
