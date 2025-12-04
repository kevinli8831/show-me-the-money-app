import { Platform } from "react-native";    

/**
 * 響應式設計斷點常數 (Breakpoints)
 * 
 * 用途：
 * 1. 定義不同螢幕尺寸的斷點值
 * 2. 用於響應式佈局和組件顯示邏輯
 * 3. 統一管理斷點值，便於維護和修改
 * 
 * 使用範例：
 * import { breakpoints } from '../constants/breakpoints';
 * if (width < breakpoints.sm) { ... }
 * 
 * 斷點說明：
 * - xs: 超小螢幕（手機豎屏）
 * - sm: 小螢幕（手機橫屏/小平板）
 * - md: 中等螢幕（平板）
 * - lg: 大螢幕（小桌面）
 * - xl: 超大螢幕（大桌面）
 */
export const breakpoints = {
  xs: 0,      // 超小螢幕：< 600px（手機豎屏）
  sm: 600,    // 小螢幕：>= 600px（手機橫屏/小平板）
  md: 905,    // 中等螢幕：>= 905px（平板）
  lg: 1240,   // 大螢幕：>= 1240px（小桌面顯示器）
  xl: 1440,   // 超大螢幕：>= 1440px（大桌面顯示器）
};
