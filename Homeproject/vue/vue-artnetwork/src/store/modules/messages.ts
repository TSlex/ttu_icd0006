import { IChatRoleDTO } from '@/types/IChatRoleDTO';
import { IChatMemberDTO } from '@/types/IChatMemberDTO';
import { IChatRoomDTO } from '@/types/IChatRoomDTO';
import { IMessageDTO, IMessagePostDTO } from '@/types/IMessageDTO';
import { ChatRoomsApi } from '@/services/ChatRoomsApi';
import { MessagesApi } from '@/services/MessagesApi';
import { ResponseDTO } from '@/types/Response/ResponseDTO';
import { ChatMembersApi } from '@/services/ChatMembersApi';
import { ChatRolesApi } from '@/services/ChatRolesApi';

interface IState {
  selectedMemberRole: IChatRoleDTO | null;
  selectedChatMember: IChatMemberDTO | null;
  selectedChatRoom: IChatRoomDTO | null;
  chatRooms: IChatRoomDTO[];
  messages: IMessageDTO[];
  messagesLoadedCount: number;
  members: IChatMemberDTO[];
  chatRoles: IChatRoleDTO[];
}

export const MessagesModule = {
  state: {
    selectedMemberRole: null as IChatRoleDTO | null,
    selectedChatMember: null as IChatMemberDTO | null,
    selectedChatRoom: null as IChatRoomDTO | null,
    chatRooms: [] as IChatRoomDTO[],
    messages: [] as IMessageDTO[],
    messagesLoadedCount: -1,
    members: [] as IChatMemberDTO[],
    chatRoles: [] as IChatRoleDTO[],
  },
  getters: {
    getCurrentChatMember(context: any, getters: any): IChatMemberDTO | null {
      let current: IChatMemberDTO | null = null;

      context.members.forEach((member: IChatMemberDTO) => {
        if (member.userName === getters.getUserName) {
          current = member;
        }
      });

      return current;
    },
  },
  mutations: {
    selectChatMember(state: IState, chatMember: IChatMemberDTO | null) {
      state.selectedChatMember = chatMember;

      if (!chatMember) return;

      state.chatRoles.forEach((chatRole: IChatRoleDTO) => {
        if (chatMember.chatRole === chatRole.roleTitle) {
          state.selectedMemberRole = chatRole;
        }
      });
    },
    selectChatRoom(state: IState, chatRoom: IChatRoomDTO | null) {
      state.selectedChatRoom = chatRoom;
    },
    setChatRooms(state: IState, chatRooms: IChatRoomDTO[]) {
      state.chatRooms = chatRooms;
    },
    setMessages(state: IState, messages: IMessageDTO[]) {
      state.messages = messages;
    },
    deleteMessage(state: IState, message: IMessageDTO) {
      state.messages.forEach((element: IMessageDTO, index: number) => {
        if (element.id === message.id) {
          state.messages.splice(index, 1)
        }
      });
    },
    setMembers(state: IState, members: IChatMemberDTO[]) {
      state.members = members;
    },
    deleteChatMember(state: IState, member: IChatMemberDTO) {
      state.members.forEach((element: IChatMemberDTO, index: number) => {
        if (element.id === member.id) {
          state.members.splice(index, 1)
        }
      });
    },
    getChatRoles(state: IState, roles: IChatRoleDTO[]) {
      state.chatRoles = roles;
    },

  },
  actions: {
    async selectChatRoom(context: any, chatRoom: IChatRoomDTO) {
      context.commit("selectChatRoom", chatRoom)

      context.dispatch("getMessages", {
        chatRoomId: chatRoom.id,
        pageNumber: 1
      });

      context.dispatch("getChatMembers", chatRoom.id);
    },
    async getChatRooms(context: any): Promise<IChatRoomDTO[]> {
      const response = await ChatRoomsApi.getChatRooms(context.state.jwt);
      context.commit('setChatRooms', response)
      return response;
    },
    async getMessages(context: any, params: { chatRoomId: string; pageNumber: number }): Promise<IMessageDTO[]> {
      const response = await ChatRoomsApi.getMessages(params.chatRoomId, params.pageNumber, context.state.jwt);
      context.commit('setMessages', response)
      return response;
    },
    async sendMessage(context: any, message: IMessagePostDTO): Promise<ResponseDTO> {
      const response = await MessagesApi.postMessage(message, context.state.jwt);
      context.dispatch('getMessages', { chatRoomId: message.chatRoomId, pageNumber: 1 });
      return response;
    },
    async deleteMessage(context: any, message: IMessageDTO): Promise<ResponseDTO> {
      const response = await MessagesApi.deleteMessage(message.id, context.state.jwt);
      context.commit('deleteMessage', message);
      return response;
    },

    //Chat members
    async getChatMembers(context: any, chatRoomId: string): Promise<IChatMemberDTO[]> {
      const response = await ChatMembersApi.getChatMembers(chatRoomId, context.state.jwt);
      context.commit('setMembers', response)
      return response;
    },
    async deleteChatMember(context: any, member: IChatMemberDTO): Promise<ResponseDTO> {
      const response = await ChatMembersApi.deleteChatMember(member.id, context.state.jwt);
      context.commit('deleteChatMember', member);
      return response;
    },

    // Chat roles
    async getChatRoles(context: any): Promise<IChatRoleDTO[]> {
      const response = await ChatRolesApi.getChatRoles(context.state.jwt);
      context.commit('getChatRoles', response)
      return response;
    },
  }
}