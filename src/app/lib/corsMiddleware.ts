import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "https://www.crowdpassevents.com",
  "http://localhost:3000",
];

export function corsMiddleware(request: NextRequest, handler: Function) {
   if (request.method === 'OPTIONS') {
    return handleCorsPreflightRequest(request);
  }

  return handler().then((response: NextResponse) => {
    return addCorsHeaders(response, request);
  });
}

function handleCorsPreflightRequest(request: NextRequest) {
  const response = new NextResponse(null, { status: 204 });
  return addCorsHeaders(response, request);
}

function addCorsHeaders(response: NextResponse, request: NextRequest) {
  const origin = request.headers.get("origin");
  
  const allowedPatterns = [
    /^https:\/\/.*\.crowdpassevents\.com$/,
    /^http:\/\/localhost:\d+$/,        
  ];
  
  const isAllowed = origin && (
    ALLOWED_ORIGINS.includes(origin) || 
    allowedPatterns.some(pattern => pattern.test(origin))
  );
  
  if (isAllowed) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }
  
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  response.headers.set("Access-Control-Max-Age", "86400");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  
  return response;
}