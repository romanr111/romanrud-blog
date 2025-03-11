export default async (request, context) => {
  // Get the current URL path
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Skip redirect if already accessing a language path
  if (path.match(/^\/(uk|ru|en)\//)) {
    return;
  }
  
  // Skip redirect for certain paths like assets, images, etc.
  if (
    path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/) ||
    path.includes("/static/") ||
    path.includes("/page-data/")
  ) {
    return;
  }
  
  // Get user's country from Netlify context
  const country = context.geo?.country?.code;
  
  // Map countries to languages
  let language = 'en'; // Default
  
  if (country === 'UA') {
    language = 'uk';
  } else if (['RU', 'BY', 'KZ'].includes(country)) {
    language = 'ru';
  }
  
  // Only redirect if not English (since English is at root)
  if (language !== 'en') {
    // Create the redirect URL
    const redirectUrl = `/${language}${path === '/' ? '' : path}${url.search}`;
    
    // Return a redirect response
    return Response.redirect(new URL(redirectUrl, request.url), 302);
  }
}; 