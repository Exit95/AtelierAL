/**
 * Security utilities for input sanitization and validation
 */

/**
 * Sanitize HTML to prevent XSS attacks
 * Removes all HTML tags and encodes special characters
 */
export function sanitizeHtml(input: string): string {
    if (!input) return '';
    
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

/**
 * Sanitize input for safe storage and display
 * Trims whitespace and removes potentially dangerous characters
 */
export function sanitizeInput(input: string): string {
    if (!input) return '';
    
    return input
        .trim()
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Remove control characters
        .substring(0, 10000); // Limit length
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate phone number format (German)
 */
export function isValidPhone(phone: string): boolean {
    // Allow common German phone formats
    const phoneRegex = /^[\d\s+\-()./]{6,20}$/;
    return phoneRegex.test(phone);
}

/**
 * Validate name (no special characters except common ones)
 */
export function isValidName(name: string): boolean {
    // Allow letters, spaces, hyphens, apostrophes (common in names)
    const nameRegex = /^[a-zA-ZäöüÄÖÜßéèêëàâáãåæçíìîïñóòôõøúùûý\s\-'\.]{2,100}$/;
    return nameRegex.test(name);
}

/**
 * Check for common SQL injection patterns
 */
export function hasSqlInjection(input: string): boolean {
    const sqlPatterns = [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE)\b)/i,
        /(--|;|\/\*|\*\/|xp_|sp_)/i,
        /(\bOR\b.*=.*\bOR\b)/i,
        /(\bAND\b.*=.*\bAND\b)/i,
        /(UNION.*SELECT)/i
    ];
    
    return sqlPatterns.some(pattern => pattern.test(input));
}

/**
 * Check for XSS patterns
 */
export function hasXssPattern(input: string): boolean {
    const xssPatterns = [
        /<script[^>]*>/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /<iframe[^>]*>/i,
        /<object[^>]*>/i,
        /<embed[^>]*>/i,
        /data:text\/html/i
    ];
    
    return xssPatterns.some(pattern => pattern.test(input));
}

/**
 * Comprehensive input validation
 * Returns true if input is safe, false if potentially malicious
 */
export function isSafeInput(input: string): boolean {
    if (!input) return true;
    
    return !hasSqlInjection(input) && !hasXssPattern(input);
}

/**
 * Validate and sanitize form data
 */
export function validateFormData(data: Record<string, unknown>): { 
    valid: boolean; 
    errors: string[]; 
    sanitized: Record<string, unknown> 
} {
    const errors: string[] = [];
    const sanitized: Record<string, unknown> = {};
    
    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
            // Check for malicious patterns
            if (!isSafeInput(value)) {
                errors.push(`Ungültige Zeichen in Feld: ${key}`);
                continue;
            }
            
            // Sanitize the input
            sanitized[key] = sanitizeInput(value);
        } else {
            sanitized[key] = value;
        }
    }
    
    return {
        valid: errors.length === 0,
        errors,
        sanitized
    };
}

