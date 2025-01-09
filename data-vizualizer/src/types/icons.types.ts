type TIcons =
  | {
      size: number;
      width?: never;
      height?: never;
      className?: string;
    }
  | {
      size?: never;
      width: number;
      height: number;
      className?: string;
    };

export type { TIcons };
