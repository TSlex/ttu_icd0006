export interface IImageDTO {
  id: string;
  imageUrl: string;
  originalImageUrl: string;
  heightPx: number;
  widthPx: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  imageFile: File | null;
  imageType: number;
  imageFor: string;
}

export interface IImagePostDTO {
  heightPx: number;
  widthPx: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  imageFile: File | null;
  imageType: number;
  imageFor: string;
}

export interface IImagePutDTO {
  id: string;
  heightPx: number;
  widthPx: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  imageFile: File | null;
}
