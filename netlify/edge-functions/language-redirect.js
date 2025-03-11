export default async (request, context) => {
  try {
    // Get the current URL
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Extract path segments
    const pathSegments = path.split('/').filter(segment => segment);
    
    // Check if the URL already has a language code
    // This handles both /uk and /uk/
    const firstSegment = pathSegments[0] || '';
    const hasLanguagePrefix = ['uk', 'ru', 'en'].includes(firstSegment);
    
    // If we already have a language path, don't redirect
    if (hasLanguagePrefix) {
      return;
    }
    
    // Skip redirect for assets
    if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
      return;
    }
    
    // Get user's country from Netlify context
    const country = context.geo?.country?.code || '';
    
    // Map countries to languages
    let language = 'en'; // Default
    
    if (country === 'UA') {
      language = 'uk';
    } else if (['RU', 'BY', 'KZ'].includes(country)) {
      language = 'ru';
    }
    
    // Only redirect if not English
    if (language !== 'en') {
      // Create the redirect URL
      const redirectUrl = `/${language}${path}`;
      
      // Return a redirect response
      return Response.redirect(new URL(redirectUrl, request.url), 302);
    }
  } catch (error) {
    // Log error but don't fail
    console.error('Edge function error:', error);
    // If there's an error, don't redirect
    return;
  }
}; 