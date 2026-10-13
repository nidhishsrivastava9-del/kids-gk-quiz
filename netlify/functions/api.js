// Serverless function handler for Netlify
const serverless = require('serverless-http');
const app = require('../../server/server');

// Wrap Express app with serverless-http
const expressHandler = serverless(app);

exports.handler = async (event, context) => {
  // Normalize path if Netlify forwards /.netlify/functions/api/...
  if (event.path.startsWith('/.netlify/functions/api')) {
    event.path = event.path.replace('/.netlify/functions/api', '/api');
  } else if (!event.path.startsWith('/api')) {
    event.path = '/api' + event.path;
  }

  // Handle root API endpoint gracefully
  if (event.path === '/api/' || event.path === '/api') {
    event.path = '/api/health';
  }

  // Allow immediate response without waiting for background event loop drains
  context.callbackWaitsForEmptyEventLoop = false;

  return await expressHandler(event, context);
};
