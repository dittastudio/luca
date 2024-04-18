import {StoryblokStory} from 'storyblok-generate-ts'

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

export interface BlockImageStoryblok {
  image: AssetStoryblok;
  column_start: number | string;
  column_span: number | string;
  _uid: string;
  component: "block_image";
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

export interface BlockTextStoryblok {
  text: RichtextStoryblok;
  _uid: string;
  component: "block_text";
  [k: string]: any;
}

export interface BlockTextEditorialStoryblok {
  title?: string;
  text: RichtextStoryblok;
  _uid: string;
  component: "block_text_editorial";
  [k: string]: any;
}

export interface ColourStoryblok {
  _uid: string;
  component: "colour";
  [k: string]: any;
}

export interface ColoursStoryblok {
  colours: ColourStoryblok[];
  _uid: string;
  component: "colours";
  [k: string]: any;
}

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

export interface PageStoryblok {
  seo: SeoStoryblok[];
  blocks?: (BlockTextStoryblok | BlockImageStoryblok | BlockTextEditorialStoryblok)[];
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
  navigation?: LinkListStoryblok[];
  opening_times_title?: string;
  opening_times?: RichtextStoryblok;
  contact_title?: string;
  contact?: RichtextStoryblok;
  reservations_title?: string;
  reservations?: RichtextStoryblok;
  newsletter_title?: string;
  newsletter?: RichtextStoryblok;
  _uid: string;
  component: "settings";
  [k: string]: any;
}
