import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PortalController::destroy
* @see app/Http/Controllers/PortalController.php:133
* @route '/portals/{portal}'
*/
export const destroy = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/portals/{portal}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PortalController::destroy
* @see app/Http/Controllers/PortalController.php:133
* @route '/portals/{portal}'
*/
destroy.url = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { portal: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { portal: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            portal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        portal: typeof args.portal === 'object'
        ? args.portal.id
        : args.portal,
    }

    return destroy.definition.url
            .replace('{portal}', parsedArgs.portal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalController::destroy
* @see app/Http/Controllers/PortalController.php:133
* @route '/portals/{portal}'
*/
destroy.delete = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PortalController::destroy
* @see app/Http/Controllers/PortalController.php:133
* @route '/portals/{portal}'
*/
const destroyForm = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PortalController::destroy
* @see app/Http/Controllers/PortalController.php:133
* @route '/portals/{portal}'
*/
destroyForm.delete = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const portals = {
    destroy: Object.assign(destroy, destroy),
}

export default portals