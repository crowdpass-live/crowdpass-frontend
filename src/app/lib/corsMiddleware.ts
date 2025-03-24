import { NextRequest, NextResponse } from "next/server";

export function corsMiddleware(request: NextRequest, handler: Function) {
  if (request.method === 'OPTIONS') {
    return handleCorsPreflightRequest();
  }

  return handler().then((response: NextResponse) => {
    return addCorsHeaders(response);
  });
}

function handleCorsPreflightRequest() {
  const response = new NextResponse(null, { status: 204 });
  return addCorsHeaders(response);
}

function addCorsHeaders(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  response.headers.set("Access-Control-Max-Age", "86400");
  
  return response;
}