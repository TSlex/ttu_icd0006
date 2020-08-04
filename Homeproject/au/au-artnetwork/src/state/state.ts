import JwtDecode from "jwt-decode";

import { IPostComments } from 'types/IPostComments';
import { IRoomMessages } from "types/IRoomMessages";
import { IMessageGetDTO } from "types/IMessageDTO";
import { ICommentGetDTO } from "types/ICommentDTO";
import { IPostGetDTO } from "types/IPostDTO";

export class AppState {
    constructor() {
    }

    public readonly baseUrl = 'https://localhost:5001/api/v1';

    // messages
    public roomMessages: Record<string, IRoomMessages> = {}
    public selectedMessage: IMessageGetDTO | null = null

    // posts
    public posts: IPostGetDTO[] = []
    public selectedPost: IPostGetDTO | null = null

    // comments
    public postComments: Record<string, IPostComments> = {}
    public selectedComment: ICommentGetDTO | null = null

    // component loading
    private _isComponentLoading: boolean = false

    // images
    public imagesData: Record<string, string> = {}

    // profile image
    public profileImageId: string | null = null;

    get isComponentLoading() {
        return this._isComponentLoading;
    }

    set isComponentLoading(value: boolean) {
        this._isComponentLoading = value;
    }

    // JWT
    get jwt(): string | null {
        return localStorage.getItem('jwt');
    }

    set jwt(value: string | null) {
        if (value) {
            localStorage.setItem('jwt', value);
        } else {
            localStorage.removeItem('jwt');
        }
        this.resetState()
    }

    get isAuthenticated() {
        return this.jwt != null;
    }

    get userId() {
        if (this.isAuthenticated) {
            const decoded = JwtDecode(this.jwt!) as Record<string, string>;
            return decoded[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ];
        }
        return "null";
    }

    get userName() {
        if (this.isAuthenticated) {
            const decoded = JwtDecode(this.jwt!) as Record<string, string>;
            return decoded[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
            ];
        }
        return "null";
    }

    get isAdmin() {
        var result: boolean = false
        this.userRoles.forEach((element: string) => {
            if (element.toLowerCase().indexOf("admin") !== -1) {
                result = true;
            }
        });

        return result;
    }

    get userRoles() {
        if (this.isAuthenticated) {
            const decoded = JwtDecode(this.jwt!) as Record<string, string>;
            return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].toString().split(',') as string[]
        }
        return [];
    }

    resetState() {
        this.roomMessages = {}
        this.selectedMessage = null

        this.posts = []
        this.selectedPost = null

        this.postComments = {}
        this.selectedComment = null

        this.profileImageId = null;
    }
}
