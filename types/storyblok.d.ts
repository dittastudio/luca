import {StoryblokStory} from 'storyblok-generate-ts'

export type MultilinkStoryblok =
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "story";
      target?: "_self" | "_blank";
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "asset" | "url";
      target?: "_self" | "_blank";
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: "email";
      target?: "_self" | "_blank";
      [k: string]: any;
    };

export interface BlockButtonStoryblok {
  title: string;
  link: Exclude<MultilinkStoryblok, {linktype?: "asset"}>;
  connecting_line?: boolean;
  _uid: string;
  component: "block_button";
  [k: string]: any;
}

export interface AssetStoryblok {
  _uid?: string;
  id: number;
  alt?: string;
  name: string;
  focus?: string;
  source?: string;
  title?: string;
  filename: string;
  copyright?: string;
  fieldtype?: string;
  meta_data?: null | {
    [k: string]: any;
  };
  is_external_url?: boolean;
  [k: string]: any;
}

export interface BlockCardStoryblok {
  title: string;
  headline: string;
  media: AssetStoryblok;
  ratio: number | string;
  link: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  column_start: number | string;
  column_span: number | string;
  connecting_line?: boolean;
  _uid: string;
  component: "block_card";
  [k: string]: any;
}

export interface BlockCardEditorialStoryblok {
  title: string;
  media: AssetStoryblok;
  ratio: number | string;
  link: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  column_start: number | string;
  column_span: number | string;
  connecting_line?: boolean;
  _uid: string;
  component: "block_card_editorial";
  [k: string]: any;
}

export interface BlockCarouselStoryblok {
  slides: SlideStoryblok[];
  autoplay?: boolean;
  connecting_line?: boolean;
  _uid: string;
  component: "block_carousel";
  [k: string]: any;
}

export interface BlockMediaStoryblok {
  media: AssetStoryblok;
  ratio: number | string;
  column_start: number | string;
  column_span: number | string;
  connecting_line?: boolean;
  _uid: string;
  component: "block_media";
  [k: string]: any;
}

export interface BlockMenusStoryblok {
  menus?: MenuStoryblok[];
  _uid: string;
  component: "block_menus";
  [k: string]: any;
}

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface BlockSplitStoryblok {
  media: AssetStoryblok;
  ratio: number | string;
  text: RichtextStoryblok;
  reversed?: boolean;
  connecting_line?: boolean;
  _uid: string;
  component: "block_split";
  [k: string]: any;
}

export interface BlockTextStoryblok {
  text: RichtextStoryblok;
  connecting_line?: boolean;
  _uid: string;
  component: "block_text";
  [k: string]: any;
}

export interface BlockTextEditorialStoryblok {
  title?: string;
  text: RichtextStoryblok;
  connecting_line?: boolean;
  _uid: string;
  component: "block_text_editorial";
  [k: string]: any;
}

export interface ImageVideoStoryblok {
  media: AssetStoryblok;
  _uid: string;
  component: "image_video";
  [k: string]: any;
}

export interface LinkStoryblok {
  title: string;
  link: Exclude<MultilinkStoryblok, {linktype?: "asset"}>;
  _uid: string;
  component: "link";
  [k: string]: any;
}

export interface LinkListStoryblok {
  items: LinkStoryblok[];
  _uid: string;
  component: "link_list";
  [k: string]: any;
}

export type MultiassetStoryblok = {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  [k: string]: any;
}[];

export interface MenuStoryblok {
  title: string;
  images: MultiassetStoryblok;
  pdf: AssetStoryblok;
  _uid: string;
  component: "menu";
  [k: string]: any;
}

export interface PageStoryblok {
  seo: SeoStoryblok[];
  themes?: ThemeStoryblok[];
  blocks?: (
    | BlockButtonStoryblok
    | BlockCardStoryblok
    | BlockCardEditorialStoryblok
    | BlockCarouselStoryblok
    | BlockMediaStoryblok
    | BlockMenusStoryblok
    | BlockSplitStoryblok
    | BlockTextStoryblok
    | BlockTextEditorialStoryblok
  )[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface SeoStoryblok {
  title: string;
  description: string;
  image: AssetStoryblok;
  _uid: string;
  component: "seo";
  [k: string]: any;
}

export interface SettingsStoryblok {
  cover_message: string;
  navigation?: LinkListStoryblok[];
  opening_times_title?: string;
  opening_times?: RichtextStoryblok;
  contact_title?: string;
  contact?: RichtextStoryblok;
  reservations_title?: string;
  reservations?: RichtextStoryblok;
  newsletter_title?: string;
  newsletter?: RichtextStoryblok;
  footer?: LinkListStoryblok[];
  social_facebook?: string;
  social_tiktok?: string;
  social_instagram?: string;
  _uid: string;
  component: "settings";
  [k: string]: any;
}

export interface SlideStoryblok {
  media: ImageVideoStoryblok[];
  _uid: string;
  component: "slide";
  [k: string]: any;
}

export interface ThemeStoryblok {
  _uid: string;
  component: "theme";
  [k: string]: any;
}
