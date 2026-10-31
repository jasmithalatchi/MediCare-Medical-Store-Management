/**
 * MediCare - Image Utility Helper
 * Provides reliable, local SVG image resolution and safe fallback handling
 * for all 13 medical categories and general medicine items.
 */

export const CATEGORY_IMAGE_MAP = {
  tablets: '/images/categories/tablets.svg',
  capsules: '/images/categories/capsules.svg',
  syrups: '/images/categories/syrups.svg',
  tonics: '/images/categories/tonics.svg',
  serums: '/images/categories/serums.svg',
  injections: '/images/categories/injections.svg',
  creams: '/images/categories/creams.svg',
  gels: '/images/categories/gels.svg',
  ors: '/images/categories/ors.svg',
  'first-aid': '/images/categories/first-aid.svg',
  vitamins: '/images/categories/vitamins.svg',
  supplements: '/images/categories/supplements.svg',
  'baby-care': '/images/categories/baby-care.svg',
};

export const DEFAULT_MEDICINE_IMAGE = '/images/default-medicine.svg';

/**
 * Normalizes a category name into a slug key matching the image asset map.
 */
export const getCategorySlug = (category) => {
  if (!category || typeof category !== 'string') return '';
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Returns the local SVG image path for a specific category.
 */
export const getCategoryImage = (category) => {
  const slug = getCategorySlug(category);
  return CATEGORY_IMAGE_MAP[slug] || DEFAULT_MEDICINE_IMAGE;
};

/**
 * Resolves the primary image URL for a medicine object.
 * Replaces broken external placeholders or outdated .png paths with reliable local SVG assets.
 */
export const getMedicineImage = (medicine) => {
  if (!medicine) return DEFAULT_MEDICINE_IMAGE;

  const rawUrl = medicine.imageUrl || medicine.image;
  if (rawUrl && typeof rawUrl === 'string') {
    // If it points to an external placeholder or non-existent .png, resolve to local category SVG
    if (rawUrl.includes('placehold.co')) {
      return getCategoryImage(medicine.category);
    }
    if (rawUrl.endsWith('.png')) {
      const svgCandidate = rawUrl.replace(/\.png$/, '.svg');
      return svgCandidate;
    }
    return rawUrl;
  }

  return getCategoryImage(medicine.category);
};

/**
 * Handles image error events with guaranteed loop prevention.
 * First tries category-specific SVG, then universal default SVG, then stops.
 */
export const handleImageFallback = (e, category) => {
  const target = e.currentTarget || e.target;
  if (!target) return;

  if (!target.dataset.triedCategoryFallback) {
    target.dataset.triedCategoryFallback = 'true';
    target.src = getCategoryImage(category);
    return;
  }

  if (!target.dataset.triedDefaultFallback) {
    target.dataset.triedDefaultFallback = 'true';
    target.src = DEFAULT_MEDICINE_IMAGE;
    return;
  }

  // Prevent infinite loop if browser cannot load any image
  target.onerror = null;
};
