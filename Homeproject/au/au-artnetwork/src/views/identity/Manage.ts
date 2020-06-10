import { ManageNav } from './ManageNav';

export class Manage {

    private currentPage: ManageNav = ManageNav.ProfileData;

    get ManageNavs() {
        return ManageNav;
    }

    resolveStartup(page: string): ManageNav {
        let result: ManageNav = ManageNav.ProfileData

        for (let key in ManageNav) {
            let value: string = ManageNav[key as keyof typeof ManageNav];
            if (value === page) {
                result = value as ManageNav;
            }
        }

        return result;
    }

    activate(params: any) {
        // bind properties
        if (params.page && typeof (params.page) == 'string') {
            this.currentPage = this.resolveStartup(params.page)
        }
    }

    setPage(page: ManageNav) {
        this.currentPage = page;
    }
}
