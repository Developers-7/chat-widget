/**
 * Created by WebStorm.
 * User: Zishan
 * Date: 02 Sep 2025
 * Time: 12:18 PM
 * Email: zishan.softdev@gmail.com
 */

export const GEMINI_BASE_URL = import.meta.env.VITE_BASE_URL_GEMINI;
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const GEMINI_AI_URL = `${GEMINI_BASE_URL}/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
