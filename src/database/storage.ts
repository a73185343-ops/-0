// ============ نظام التخزين المحلي ============

const STORAGE_PREFIX = 'sweet_shop_';

/**
 * حفظ البيانات في LocalStorage
 */
export const saveToStorage = (key: string, data: any): void => {
  try {
    const storageKey = `${STORAGE_PREFIX}${key}`;
    localStorage.setItem(storageKey, JSON.stringify(data));
    console.log(`✅ تم حفظ ${key}`);
  } catch (error) {
    console.error(`❌ خطأ في حفظ ${key}:`, error);
  }
};

/**
 * جلب البيانات من LocalStorage
 */
export const getFromStorage = (key: string, defaultValue: any = null): any => {
  try {
    const storageKey = `${STORAGE_PREFIX}${key}`;
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`❌ خطأ في جلب ${key}:`, error);
    return defaultValue;
  }
};

/**
 * حذف البيانات من LocalStorage
 */
export const removeFromStorage = (key: string): void => {
  try {
    const storageKey = `${STORAGE_PREFIX}${key}`;
    localStorage.removeItem(storageKey);
    console.log(`✅ تم حذف ${key}`);
  } catch (error) {
    console.error(`❌ خطأ في حذف ${key}:`, error);
  }
};

/**
 * مسح جميع البيانات
 */
export const clearAllStorage = (): void => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    console.log('✅ تم مسح جميع البيانات');
  } catch (error) {
    console.error('❌ خطأ في مسح البيانات:', error);
  }
};
