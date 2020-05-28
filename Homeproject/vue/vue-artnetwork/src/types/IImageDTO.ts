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
  imageFile: string;
  imageType: number;
  imageFor: string;
}

export interface IImagePostDTO {
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  imageFile: string;
  imageType: number;
  imageFor: string;
}

export interface IImagePutDTO {
  id: string;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  imageFile: string;
}
