export interface FontItem {
  id: string;
  nameArabic: string;
  nameEnglish: string;
  fontFamily: string;
  description: string;
  previewText?: string;
  category: 'arabic-traditional' | 'arabic-modern' | 'kufi-ruqaa' | 'standard';
  isGoogleFont?: boolean;
}

export type KeyboardMode = 'arabic' | 'english' | 'symbols' | 'numpad';

export type KeyboardTheme = 'standard101' | 'classicLight' | 'darkPro' | 'ocean' | 'modernSlate';

export interface KeyboardSettings {
  soundEnabled: boolean;
  hapticEnabled: boolean;
  showTashkeelBar: boolean;
  showSuggestionsBar: boolean;
  showTopControlBar?: boolean;
  showEditorPaper: boolean; // Control whether the big document paper is shown or hidden
  keyboardSize: 'compact' | 'normal' | 'large' | 'samsungDefault';
  samsungDeviceModel: 'note10plus' | 's24ultra' | 'genericSamsung';
  keyboardDisplayMode: 'docked' | 'floating' | 'oneHanded';
  autoSyncClipboard: boolean; // Auto-copy to Android clipboard to control any app
  fontSize: number; // in pixels
  fontColor: string;
  fontFamily: string;
  fontFamilyName: string;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  textAlign: 'right' | 'center' | 'left' | 'justify';
  lineHeight: number;
  activeLayout: 'standard101' | 'gboard' | 'compact';
  isFloating: boolean;
  isMinimized: boolean;
}

export interface DocImage {
  id: string;
  url: string;
  name: string;
  caption?: string;
  widthPercent: number; // e.g. 50, 75, 100
  align: 'right' | 'center' | 'left';
}

export interface DocTable {
  id: string;
  rows: string[][];
  headers: string[];
  hasHeader: boolean;
  caption?: string;
}

export type InsertModalTab = 'image' | 'shape' | 'emoji' | 'symbol' | 'table';

export type TargetAppType =
  | 'whatsapp'
  | 'samsungNotes'
  | 'telegram'
  | 'wordDoc'
  | 'excelSheet'
  | 'messages'
  | 'browser'
  | 'email'
  | 'systemSettings';

export type ActiveKeyboardType = 'attached' | 'native';

export interface VirtualKeyboardState {
  isOpen: boolean;
  preferredInputMode?: 'virtual' | 'native';
  autoSwitch?: boolean;
  language: 'ar' | 'en';
  shiftActive?: boolean;
  altActive?: boolean;
  ctrlActive?: boolean;
  layoutMode?: 'standard' | 'rtl';
  numberType?: 'eastern' | 'western';
  isMinimized?: boolean;
}
