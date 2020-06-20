export async function parseErrors(errors: any[]): Promise<string[]> {
    let errorsList: string[] = []

    errors.forEach((error) => {
        if (typeof (error) === 'string') {
            errorsList.push(error)

        } else {
            try {
                Object.values(error as ModelStateErrors).forEach((item: string[]) => {
                    item.forEach((error: string) => {
                        errorsList.push(error);
                    });
                });
            } catch (e) {
                errorsList.push("Server exeption.")
            }
        }
    })

    return errorsList;
}

interface ModelStateErrors {
    [propName: string]: string[]
}
