/* ========================================== */
/* SUPABASE CONFIGURATION */
/* ========================================== */

/**
 * Supabase configuration object
 * IMPORTANT: Replace these with your actual Supabase project credentials
 */
const SUPABASE_CONFIG = {
    url: 'https://bzbximgipjziqrwkctop.supabase.co', // Replace with your Supabase URL (e.g., https://xxxxx.supabase.co)
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6YnhpbWdpcGp6aXFyd2tjdG9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MzI2MzMsImV4cCI6MjA4MDAwODYzM30.F6-CCUPgJodPAOJl9rKRSSXmjb2UY_RDwPBqICniSMM' // Replace with your Supabase anon/public key
};

/**
 * Initialize Supabase client
 * This will be available globally throughout the application
 */
let supabase = null;

/**
 * Initialize the Supabase client when the Supabase library is loaded
 */
function initializeSupabase() {
    if (window.supabase && SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey) {
        supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
        console.log('✅ Supabase client initialized');
        return true;
    } else {
        console.error('❌ Failed to initialize Supabase. Check your configuration.');
        return false;
    }
}
