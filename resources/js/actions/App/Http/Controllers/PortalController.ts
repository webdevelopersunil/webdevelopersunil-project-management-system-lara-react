import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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

/**
* @see \App\Http\Controllers\PortalController::store
* @see app/Http/Controllers/PortalController.php:59
* @route '/portals'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/portals',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PortalController::store
* @see app/Http/Controllers/PortalController.php:59
* @route '/portals'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalController::store
* @see app/Http/Controllers/PortalController.php:59
* @route '/portals'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PortalController::store
* @see app/Http/Controllers/PortalController.php:59
* @route '/portals'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PortalController::store
* @see app/Http/Controllers/PortalController.php:59
* @route '/portals'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\PortalController::destroy
* @see app/Http/Controllers/PortalController.php:170
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
* @see app/Http/Controllers/PortalController.php:170
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
* @see app/Http/Controllers/PortalController.php:170
* @route '/portals/{portal}'
*/
destroy.delete = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PortalController::destroy
* @see app/Http/Controllers/PortalController.php:170
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
* @see app/Http/Controllers/PortalController.php:170
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

/**
* @see \App\Http\Controllers\PortalController::edit
* @see app/Http/Controllers/PortalController.php:121
* @route '/portals/{portal}/edit'
*/
export const edit = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/portals/{portal}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortalController::edit
* @see app/Http/Controllers/PortalController.php:121
* @route '/portals/{portal}/edit'
*/
edit.url = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{portal}', parsedArgs.portal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalController::edit
* @see app/Http/Controllers/PortalController.php:121
* @route '/portals/{portal}/edit'
*/
edit.get = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalController::edit
* @see app/Http/Controllers/PortalController.php:121
* @route '/portals/{portal}/edit'
*/
edit.head = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PortalController::edit
* @see app/Http/Controllers/PortalController.php:121
* @route '/portals/{portal}/edit'
*/
const editForm = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalController::edit
* @see app/Http/Controllers/PortalController.php:121
* @route '/portals/{portal}/edit'
*/
editForm.get = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalController::edit
* @see app/Http/Controllers/PortalController.php:121
* @route '/portals/{portal}/edit'
*/
editForm.head = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\PortalController::update
* @see app/Http/Controllers/PortalController.php:133
* @route '/portals/{portal}'
*/
export const update = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/portals/{portal}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PortalController::update
* @see app/Http/Controllers/PortalController.php:133
* @route '/portals/{portal}'
*/
update.url = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{portal}', parsedArgs.portal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalController::update
* @see app/Http/Controllers/PortalController.php:133
* @route '/portals/{portal}'
*/
update.put = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PortalController::update
* @see app/Http/Controllers/PortalController.php:133
* @route '/portals/{portal}'
*/
const updateForm = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PortalController::update
* @see app/Http/Controllers/PortalController.php:133
* @route '/portals/{portal}'
*/
updateForm.put = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\PortalController::show
* @see app/Http/Controllers/PortalController.php:109
* @route '/portals/{portal}'
*/
export const show = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/portals/{portal}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortalController::show
* @see app/Http/Controllers/PortalController.php:109
* @route '/portals/{portal}'
*/
show.url = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{portal}', parsedArgs.portal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalController::show
* @see app/Http/Controllers/PortalController.php:109
* @route '/portals/{portal}'
*/
show.get = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalController::show
* @see app/Http/Controllers/PortalController.php:109
* @route '/portals/{portal}'
*/
show.head = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PortalController::show
* @see app/Http/Controllers/PortalController.php:109
* @route '/portals/{portal}'
*/
const showForm = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalController::show
* @see app/Http/Controllers/PortalController.php:109
* @route '/portals/{portal}'
*/
showForm.get = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalController::show
* @see app/Http/Controllers/PortalController.php:109
* @route '/portals/{portal}'
*/
showForm.head = (args: { portal: number | { id: number } } | [portal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const PortalController = { index, create, store, destroy, edit, update, show }

export default PortalController