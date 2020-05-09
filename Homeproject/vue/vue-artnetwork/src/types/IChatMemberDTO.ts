export interface IChatMemberDTO {
  id: string
  userName: string;
  profileAvatarUrl: string;
  chatRole: string;

  errors: string[];
}