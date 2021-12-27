export interface Board {
  id?: number;
  title: string;
  content: string;
  created?: string;
  updated?: string;
  user?: User;
}
export interface Comment {
    id?: number;
    content: string;
    created?: string;
    updated?: string;
    board_id?: number;
    user?: User;
  }
  
export interface User {
    id?: number;
    email?: string;
    password?: string;
    username?: string;
    created?: string;
    updated?: string;
  }