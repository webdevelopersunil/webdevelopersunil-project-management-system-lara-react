import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:11
* @route '/dashboard'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:11
* @route '/dashboard'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:11
* @route '/dashboard'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:11
* @route '/dashboard'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:11
* @route '/dashboard'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:11
* @route '/dashboard'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::index
* @see app/Http/Controllers/DashboardController.php:11
* @route '/dashboard'
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
* @see \App\Http\Controllers\DashboardController::index2
* @see app/Http/Controllers/DashboardController.php:163
* @route '/dashboard/2'
*/
export const index2 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index2.url(options),
    method: 'get',
})

index2.definition = {
    methods: ["get","head"],
    url: '/dashboard/2',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::index2
* @see app/Http/Controllers/DashboardController.php:163
* @route '/dashboard/2'
*/
index2.url = (options?: RouteQueryOptions) => {
    return index2.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::index2
* @see app/Http/Controllers/DashboardController.php:163
* @route '/dashboard/2'
*/
index2.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index2.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::index2
* @see app/Http/Controllers/DashboardController.php:163
* @route '/dashboard/2'
*/
index2.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index2.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardController::index2
* @see app/Http/Controllers/DashboardController.php:163
* @route '/dashboard/2'
*/
const index2Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index2.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::index2
* @see app/Http/Controllers/DashboardController.php:163
* @route '/dashboard/2'
*/
index2Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index2.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::index2
* @see app/Http/Controllers/DashboardController.php:163
* @route '/dashboard/2'
*/
index2Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index2.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index2.form = index2Form

/**
* @see \App\Http\Controllers\DashboardController::index3
* @see app/Http/Controllers/DashboardController.php:0
* @route '/dashboard/3'
*/
export const index3 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index3.url(options),
    method: 'get',
})

index3.definition = {
    methods: ["get","head"],
    url: '/dashboard/3',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::index3
* @see app/Http/Controllers/DashboardController.php:0
* @route '/dashboard/3'
*/
index3.url = (options?: RouteQueryOptions) => {
    return index3.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::index3
* @see app/Http/Controllers/DashboardController.php:0
* @route '/dashboard/3'
*/
index3.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index3.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::index3
* @see app/Http/Controllers/DashboardController.php:0
* @route '/dashboard/3'
*/
index3.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index3.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardController::index3
* @see app/Http/Controllers/DashboardController.php:0
* @route '/dashboard/3'
*/
const index3Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index3.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::index3
* @see app/Http/Controllers/DashboardController.php:0
* @route '/dashboard/3'
*/
index3Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index3.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::index3
* @see app/Http/Controllers/DashboardController.php:0
* @route '/dashboard/3'
*/
index3Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index3.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index3.form = index3Form

const DashboardController = { index, index2, index3 }

export default DashboardController