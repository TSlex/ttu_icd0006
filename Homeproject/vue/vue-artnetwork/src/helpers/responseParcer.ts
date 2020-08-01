export async function parseResponse(response: any): Promise<any> {
  let obj: any = { ...response };

  if ('title' in obj && (obj as any).title.indexOf('validation') !== -1) {
    let errors = (obj as any).errors as IModelStateErrors
    let errorsArray: string[] = []

    Object.values(errors).forEach((item: string[]) => {
      item.forEach((error: string) => {
        errorsArray.push(error);
      });
    });

    (obj as any).errors = errorsArray
  }

  return obj;
}

interface IModelStateErrors {
  [propName: string]: string[];
}
