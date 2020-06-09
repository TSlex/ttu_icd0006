import { IResponseDTO } from 'types/Response/IResponseDTO';

export async function parseResponse(response: Response): Promise<IResponseDTO> {
    let obj: IResponseDTO;

    try {
        obj = (await response.json()) as IResponseDTO;
    } catch (e){
        obj = {} as IResponseDTO;
    }

    if ('title' in obj && (obj as any)['title'].indexOf('validation') !== -1) {

        let errors = (obj as any).errors as ModelStateErrors
        let errorsArray: string[] = []

        Object.values(errors).forEach((item: string[]) => {
            item.forEach((error: string) => {
                errorsArray.push(error);
            });
        });

        (obj as IResponseDTO).errors = errorsArray
    }

    return obj;
}

interface ModelStateErrors {
    [propName: string]: string[]
}
