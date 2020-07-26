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
  },
  actions: {}
}
