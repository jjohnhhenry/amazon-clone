/**
 * Categorías oficiales del sistema
 * Estas categorías deben ser consistentes en toda la aplicación
 * - value: Valor guardado en la base de datos
 * - label: Texto mostrado al usuario
 */
export const CATEGORIES = [
    { value: 'Electronica', label: 'Electrónica' },
    { value: 'Computadoras', label: 'Computadoras y Accesorios' },
    { value: 'Hogar', label: 'Hogar y Cocina' },
    { value: 'Deportes', label: 'Deportes y Aire Libre' },
    { value: 'Juguetes', label: 'Juguetes y Juegos' },
    { value: 'Moda', label: 'Moda' },
    { value: 'Libros', label: 'Libros' },
    { value: 'Salud', label: 'Salud y Cuidado Personal' }
];

/**
 * Obtiene el label de una categoría por su value
 * @param {string} value - El valor de la categoría
 * @returns {string} El label de la categoría o el value si no se encuentra
 */
export const getCategoryLabel = (value) => {
    const category = CATEGORIES.find(cat => cat.value === value);
    return category ? category.label : value;
};

/**
 * Mapeo de nombres display a categorías de BD (para retrocompatibilidad)
 */
export const CATEGORY_DISPLAY_MAP = {
    'Televisores': 'Electronica',
    'Computadora y accesorios': 'Computadoras',
    'Salud y Hogar': 'Hogar',
    'Deportes y Aire Libre': 'Deportes',
    'Juguetes y Juegos': 'Juguetes',
    'Moda para mujer': 'Moda',
    'AmazonBasics': 'Electronica',
    'Seleccionados en Belleza': 'Salud'
};
