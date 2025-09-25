export interface Tags {
  tag: Tag;
  transactions: number;
  scheduledTransactions:number;
}

export interface Tag {
  id: string;
  name: string;
}

export interface UpdateTagData {
  name: string;
}

export interface MergeTagData {
  tagId: string;
}

export interface PaginatedTags {
  content: Tags[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}


export interface TagWithTransactions {
  tag: Tag;
  transactions: number;
  scheduledTransactions:number;
}