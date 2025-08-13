import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // Define public routes that don't require authentication
  const publicRoutes = [
    "/sign-in",
    "/sign-up", 
    "/forgot-password",
    "/reset-password",
    "/",
    "/api/auth/forgot-password",
    "/api/auth/reset-password",
    "/api/auth/callback",
    "/api/auth/password-reset-callback"
  ];

  const isPublicRoute = publicRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  // Create a response object that we can modify
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // For public routes, just return the response without auth check
  if (isPublicRoute) {
    return response;
  }

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // no user, redirect to login page
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  // If user is authenticated and trying to access sign-in/sign-up pages, redirect to dashboard
  if (
    user &&
    (request.nextUrl.pathname.startsWith("/sign-in") ||
     request.nextUrl.pathname.startsWith("/sign-up"))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the response object for the middleware to work
  // properly.
  return response;
}
