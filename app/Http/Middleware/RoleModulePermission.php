<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleModulePermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */


    public function handle( Request $request, Closure $next, string $roles ): Response {
        
        $user = $request->user();

        if (! $user) {
            abort(401);
        }

        /**
         * SuperAdmin bypass
         */
        if ($user->hasRole('SuperAdmin')) {
            return $next($request);
        }

        /**
         * Convert "admin|developer|manager" → array
         */
        $roleList = array_map('trim', explode('|', $roles));

        /**
         * Role-based short-circuit
         */
        if ($user->hasAnyRole($roleList)) {
            return $next($request);
        }

        abort(403, 'You do not have access to this module.');
    }
}
