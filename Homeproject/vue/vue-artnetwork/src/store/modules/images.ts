import { IImagePutDTO } from '@/types/IImageDTO';
import { ResponseDTO } from '@/types/Response/ResponseDTO';
import { ImagesApi } from '@/services/ImagesApi';

interface IState {
  images: Record<string, { imageData: string; exp: number }>;
}

export const ImagesModule = {
  state: { images: {} as Record<string, { imageData: string; exp: number }>, },
  getters: {
    getImageData(context: any): (id: string) => string {
      return (id: string) => {
        if (context.images[id] && !(Date.now() >= context.images[id].exp * 1000)) {
          return context.images[id].imageData;
        }

        return ""
      }
    }
  },
  mutations: {
    setImageData(state: IState, image: { imageData: string; id: string }) {
      state.images[image.id] = { imageData: image.imageData, exp: (Date.now() / 1000) + 60 }
    },

    removeImageData(state: IState, id: string) {
      delete state.images[id]
      delete state.images[id + ":original"]
    }

  },
  actions: {
    async putImageModel(context: any, imageModel: IImagePutDTO): Promise<ResponseDTO> {
      context.commit('removeImageData', imageModel.id)

      const response = await ImagesApi.putImageModel(imageModel.id, imageModel, context.state.jwt)

      return response;
    }
  }
}
