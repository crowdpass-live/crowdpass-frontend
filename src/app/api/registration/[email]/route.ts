import { NextRequest, NextResponse } from "next/server";
import Registration from "../../../models/registrationModel";
import { connectDB } from "@/app/lib/db";

const ALLOWED_ORIGINS = [
  "https://www.crowdpassevents.com",
  "http://localhost:3000",
  "http://localhost:3001",
  
];

function addCorsHeaders(response: NextResponse, request: NextRequest) {
  const origin = request.headers.get("origin");

  const allowedPatterns = [
    /^https:\/\/.*\.crowdpassevents\.com$/,
    /^http:\/\/localhost:\d+$/,
  ];

  const isAllowed =
    origin &&
    (ALLOWED_ORIGINS.includes(origin) ||
      allowedPatterns.some((pattern) => pattern.test(origin)));

  if (isAllowed) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  response.headers.set("Access-Control-Max-Age", "86400");
  response.headers.set("Access-Control-Allow-Credentials", "true");

  return response;
}

// OPTIONS preflight
export async function OPTIONS(request: NextRequest) {
  const response = new NextResponse(null, { status: 200 });
  return addCorsHeaders(response, request);
}

// GET user address by email
export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    await connectDB();

    const email = decodeURIComponent(params.email);

    if (!email) {
      const res = NextResponse.json({ message: "Email is required" }, { status: 400 });
      return addCorsHeaders(res, request);
    }

    const registration = await Registration.findOne({ email });

    if (!registration) {
      const res = NextResponse.json({ message: "Registration not found" }, { status: 404 });
      return addCorsHeaders(res, request);
    }

    const res = NextResponse.json(
      {
        email: registration.email,
        address: registration.address,
        eventId: registration.eventId,
        eventName: registration.eventName,
      },
      { status: 200 }
    );
    return addCorsHeaders(res, request);
  } catch (err) {
    console.error("Error fetching registration:", err);
    const res = NextResponse.json({ message: "Failed to fetch registration" }, { status: 500 });
    return addCorsHeaders(res, request);
  }
}
