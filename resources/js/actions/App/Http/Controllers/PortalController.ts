import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PortalController::index
* @see app/Http/Controllers/PortalController.php:14
* @route '/portals'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/portals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortalController::index
* @see app/Http/Controllers/PortalController.php:14
* @route '/portals'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalController::index
* @see app/Http/Controllers/PortalController.php:14
* @route '/portals'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalController::index
* @see app/Http/Controllers/PortalController.php:14
* @route '/portals'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PortalController::index
* @see app/Http/Controllers/PortalController.php:14
* @route '/portals'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalController::index
* @see app/Http/Controllers/PortalController.php:14
* @route '/portals'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalController::index
* @see app/Http/Controllers/PortalController.php:14
* @route '/portals'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\PortalController::create
* @see app/Http/Controllers/PortalController.php:51
* @route '/portals/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/portals/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortalController::create
* @see app/Http/Controllers/PortalController.php:51
* @route '/portals/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalController::create
* @see app/Http/Controllers/PortalController.php:51
* @route '/portals/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalController::create
* @see app/Http/Controllers/PortalController.php:51
* @route '/portals/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PortalController::create
* @see app/Http/Controllers/PortalController.php:51
* @route '/portals/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalController::create
* @see app/Http/Controllers/PortalController.php:51
* @route '/portals/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalController::create
* @see app/Http/Controllers/PortalController.php:51
* @route '/portals/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

const PortalController = { index, create }

export default PortalController