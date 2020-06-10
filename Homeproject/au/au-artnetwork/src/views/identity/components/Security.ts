import { IFetchResponse } from 'types/Response/IFetchResponseDTO';
import { autoinject } from 'aurelia-framework';
import { ViewBase } from 'components/ViewBase';
import { AccountApi } from 'servises/AccountApi';
import { AppState } from 'state/state';
import { IProfileDataDTO } from 'types/Identity/IProfileDataDTO';

@autoinject
export class ManageSecurity extends ViewBase {

    constructor(private accountApi: AccountApi, appState: AppState) {
        super(appState);
    }

    downloadData() {
        this.accountApi.getProfileData().then(
            (response: IFetchResponse<IProfileDataDTO>) => {
                let dataStr =
                    "data:text/json;charset=utf-8," +
                    encodeURIComponent(JSON.stringify(response.data, null, ' '));
                let downloadAnchorNode = document.createElement("a");
                downloadAnchorNode.setAttribute("href", dataStr);
                downloadAnchorNode.setAttribute("download", "personal.json");
                document.body.appendChild(downloadAnchorNode); // required for firefox
                downloadAnchorNode.click();
                downloadAnchorNode.remove();
            }
        );
    }

}
