import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PortalRequestController::index
* @see app/Http/Controllers/PortalRequestController.php:26
* @route '/portal-requests'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/portal-requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortalRequestController::index
* @see app/Http/Controllers/PortalRequestController.php:26
* @route '/portal-requests'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalRequestController::index
* @see app/Http/Controllers/PortalRequestController.php:26
* @route '/portal-requests'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::index
* @see app/Http/Controllers/PortalRequestController.php:26
* @route '/portal-requests'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PortalRequestController::index
* @see app/Http/Controllers/PortalRequestController.php:26
* @route '/portal-requests'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::index
* @see app/Http/Controllers/PortalRequestController.php:26
* @route '/portal-requests'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::index
* @see app/Http/Controllers/PortalRequestController.php:26
* @route '/portal-requests'
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
* @see \App\Http\Controllers\PortalRequestController::show
* @see app/Http/Controllers/PortalRequestController.php:152
* @route '/portal-requests/{uuid}'
*/
export const show = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/portal-requests/{uuid}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortalRequestController::show
* @see app/Http/Controllers/PortalRequestController.php:152
* @route '/portal-requests/{uuid}'
*/
show.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { uuid: args }
    }

    if (Array.isArray(args)) {
        args = {
            uuid: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        uuid: args.uuid,
    }

    return show.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalRequestController::show
* @see app/Http/Controllers/PortalRequestController.php:152
* @route '/portal-requests/{uuid}'
*/
show.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::show
* @see app/Http/Controllers/PortalRequestController.php:152
* @route '/portal-requests/{uuid}'
*/
show.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PortalRequestController::show
* @see app/Http/Controllers/PortalRequestController.php:152
* @route '/portal-requests/{uuid}'
*/
const showForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::show
* @see app/Http/Controllers/PortalRequestController.php:152
* @route '/portal-requests/{uuid}'
*/
showForm.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::show
* @see app/Http/Controllers/PortalRequestController.php:152
* @route '/portal-requests/{uuid}'
*/
showForm.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\PortalRequestController::create
* @see app/Http/Controllers/PortalRequestController.php:65
* @route '/portal-requests/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/portal-requests/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortalRequestController::create
* @see app/Http/Controllers/PortalRequestController.php:65
* @route '/portal-requests/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalRequestController::create
* @see app/Http/Controllers/PortalRequestController.php:65
* @route '/portal-requests/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::create
* @see app/Http/Controllers/PortalRequestController.php:65
* @route '/portal-requests/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PortalRequestController::create
* @see app/Http/Controllers/PortalRequestController.php:65
* @route '/portal-requests/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::create
* @see app/Http/Controllers/PortalRequestController.php:65
* @route '/portal-requests/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::create
* @see app/Http/Controllers/PortalRequestController.php:65
* @route '/portal-requests/create'
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
* @see \App\Http\Controllers\PortalRequestController::store
* @see app/Http/Controllers/PortalRequestController.php:88
* @route '/portal-requests'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/portal-requests',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PortalRequestController::store
* @see app/Http/Controllers/PortalRequestController.php:88
* @route '/portal-requests'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalRequestController::store
* @see app/Http/Controllers/PortalRequestController.php:88
* @route '/portal-requests'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PortalRequestController::store
* @see app/Http/Controllers/PortalRequestController.php:88
* @route '/portal-requests'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PortalRequestController::store
* @see app/Http/Controllers/PortalRequestController.php:88
* @route '/portal-requests'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\PortalRequestController::edit
* @see app/Http/Controllers/PortalRequestController.php:257
* @route '/portal-requests/{uuid}/edit'
*/
export const edit = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/portal-requests/{uuid}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortalRequestController::edit
* @see app/Http/Controllers/PortalRequestController.php:257
* @route '/portal-requests/{uuid}/edit'
*/
edit.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { uuid: args }
    }

    if (Array.isArray(args)) {
        args = {
            uuid: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        uuid: args.uuid,
    }

    return edit.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalRequestController::edit
* @see app/Http/Controllers/PortalRequestController.php:257
* @route '/portal-requests/{uuid}/edit'
*/
edit.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::edit
* @see app/Http/Controllers/PortalRequestController.php:257
* @route '/portal-requests/{uuid}/edit'
*/
edit.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PortalRequestController::edit
* @see app/Http/Controllers/PortalRequestController.php:257
* @route '/portal-requests/{uuid}/edit'
*/
const editForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::edit
* @see app/Http/Controllers/PortalRequestController.php:257
* @route '/portal-requests/{uuid}/edit'
*/
editForm.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::edit
* @see app/Http/Controllers/PortalRequestController.php:257
* @route '/portal-requests/{uuid}/edit'
*/
editForm.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PortalRequestController::update
* @see app/Http/Controllers/PortalRequestController.php:311
* @route '/portal-requests/{uuid}'
*/
export const update = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/portal-requests/{uuid}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PortalRequestController::update
* @see app/Http/Controllers/PortalRequestController.php:311
* @route '/portal-requests/{uuid}'
*/
update.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { uuid: args }
    }

    if (Array.isArray(args)) {
        args = {
            uuid: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        uuid: args.uuid,
    }

    return update.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalRequestController::update
* @see app/Http/Controllers/PortalRequestController.php:311
* @route '/portal-requests/{uuid}'
*/
update.put = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PortalRequestController::update
* @see app/Http/Controllers/PortalRequestController.php:311
* @route '/portal-requests/{uuid}'
*/
const updateForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PortalRequestController::update
* @see app/Http/Controllers/PortalRequestController.php:311
* @route '/portal-requests/{uuid}'
*/
updateForm.put = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\PortalRequestController::updateStatus
* @see app/Http/Controllers/PortalRequestController.php:396
* @route '/portal-requests/{uuid}/status'
*/
export const updateStatus = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateStatus.url(args, options),
    method: 'put',
})

updateStatus.definition = {
    methods: ["put"],
    url: '/portal-requests/{uuid}/status',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PortalRequestController::updateStatus
* @see app/Http/Controllers/PortalRequestController.php:396
* @route '/portal-requests/{uuid}/status'
*/
updateStatus.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { uuid: args }
    }

    if (Array.isArray(args)) {
        args = {
            uuid: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        uuid: args.uuid,
    }

    return updateStatus.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalRequestController::updateStatus
* @see app/Http/Controllers/PortalRequestController.php:396
* @route '/portal-requests/{uuid}/status'
*/
updateStatus.put = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateStatus.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PortalRequestController::updateStatus
* @see app/Http/Controllers/PortalRequestController.php:396
* @route '/portal-requests/{uuid}/status'
*/
const updateStatusForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PortalRequestController::updateStatus
* @see app/Http/Controllers/PortalRequestController.php:396
* @route '/portal-requests/{uuid}/status'
*/
updateStatusForm.put = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateStatus.form = updateStatusForm

/**
* @see \App\Http\Controllers\PortalRequestController::myRequests
* @see app/Http/Controllers/PortalRequestController.php:724
* @route '/portal-requests/my/requests'
*/
export const myRequests = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myRequests.url(options),
    method: 'get',
})

myRequests.definition = {
    methods: ["get","head"],
    url: '/portal-requests/my/requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortalRequestController::myRequests
* @see app/Http/Controllers/PortalRequestController.php:724
* @route '/portal-requests/my/requests'
*/
myRequests.url = (options?: RouteQueryOptions) => {
    return myRequests.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalRequestController::myRequests
* @see app/Http/Controllers/PortalRequestController.php:724
* @route '/portal-requests/my/requests'
*/
myRequests.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myRequests.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::myRequests
* @see app/Http/Controllers/PortalRequestController.php:724
* @route '/portal-requests/my/requests'
*/
myRequests.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myRequests.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PortalRequestController::myRequests
* @see app/Http/Controllers/PortalRequestController.php:724
* @route '/portal-requests/my/requests'
*/
const myRequestsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myRequests.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::myRequests
* @see app/Http/Controllers/PortalRequestController.php:724
* @route '/portal-requests/my/requests'
*/
myRequestsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myRequests.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::myRequests
* @see app/Http/Controllers/PortalRequestController.php:724
* @route '/portal-requests/my/requests'
*/
myRequestsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myRequests.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

myRequests.form = myRequestsForm

/**
* @see \App\Http\Controllers\PortalRequestController::getDocuments
* @see app/Http/Controllers/PortalRequestController.php:481
* @route '/portal-requests/api/{uuid}/documents'
*/
export const getDocuments = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDocuments.url(args, options),
    method: 'get',
})

getDocuments.definition = {
    methods: ["get","head"],
    url: '/portal-requests/api/{uuid}/documents',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortalRequestController::getDocuments
* @see app/Http/Controllers/PortalRequestController.php:481
* @route '/portal-requests/api/{uuid}/documents'
*/
getDocuments.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { uuid: args }
    }

    if (Array.isArray(args)) {
        args = {
            uuid: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        uuid: args.uuid,
    }

    return getDocuments.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalRequestController::getDocuments
* @see app/Http/Controllers/PortalRequestController.php:481
* @route '/portal-requests/api/{uuid}/documents'
*/
getDocuments.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDocuments.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::getDocuments
* @see app/Http/Controllers/PortalRequestController.php:481
* @route '/portal-requests/api/{uuid}/documents'
*/
getDocuments.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDocuments.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PortalRequestController::getDocuments
* @see app/Http/Controllers/PortalRequestController.php:481
* @route '/portal-requests/api/{uuid}/documents'
*/
const getDocumentsForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getDocuments.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::getDocuments
* @see app/Http/Controllers/PortalRequestController.php:481
* @route '/portal-requests/api/{uuid}/documents'
*/
getDocumentsForm.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getDocuments.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::getDocuments
* @see app/Http/Controllers/PortalRequestController.php:481
* @route '/portal-requests/api/{uuid}/documents'
*/
getDocumentsForm.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getDocuments.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getDocuments.form = getDocumentsForm

/**
* @see \App\Http\Controllers\PortalRequestController::addDocument
* @see app/Http/Controllers/PortalRequestController.php:532
* @route '/portal-requests/api/{uuid}/documents'
*/
export const addDocument = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addDocument.url(args, options),
    method: 'post',
})

addDocument.definition = {
    methods: ["post"],
    url: '/portal-requests/api/{uuid}/documents',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PortalRequestController::addDocument
* @see app/Http/Controllers/PortalRequestController.php:532
* @route '/portal-requests/api/{uuid}/documents'
*/
addDocument.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { uuid: args }
    }

    if (Array.isArray(args)) {
        args = {
            uuid: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        uuid: args.uuid,
    }

    return addDocument.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalRequestController::addDocument
* @see app/Http/Controllers/PortalRequestController.php:532
* @route '/portal-requests/api/{uuid}/documents'
*/
addDocument.post = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addDocument.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PortalRequestController::addDocument
* @see app/Http/Controllers/PortalRequestController.php:532
* @route '/portal-requests/api/{uuid}/documents'
*/
const addDocumentForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addDocument.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PortalRequestController::addDocument
* @see app/Http/Controllers/PortalRequestController.php:532
* @route '/portal-requests/api/{uuid}/documents'
*/
addDocumentForm.post = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addDocument.url(args, options),
    method: 'post',
})

addDocument.form = addDocumentForm

/**
* @see \App\Http\Controllers\PortalRequestController::deleteDocument
* @see app/Http/Controllers/PortalRequestController.php:594
* @route '/portal-requests/api/{uuid}/documents/{documentId}'
*/
export const deleteDocument = (args: { uuid: string | number, documentId: string | number } | [uuid: string | number, documentId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteDocument.url(args, options),
    method: 'delete',
})

deleteDocument.definition = {
    methods: ["delete"],
    url: '/portal-requests/api/{uuid}/documents/{documentId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PortalRequestController::deleteDocument
* @see app/Http/Controllers/PortalRequestController.php:594
* @route '/portal-requests/api/{uuid}/documents/{documentId}'
*/
deleteDocument.url = (args: { uuid: string | number, documentId: string | number } | [uuid: string | number, documentId: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            uuid: args[0],
            documentId: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        uuid: args.uuid,
        documentId: args.documentId,
    }

    return deleteDocument.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace('{documentId}', parsedArgs.documentId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalRequestController::deleteDocument
* @see app/Http/Controllers/PortalRequestController.php:594
* @route '/portal-requests/api/{uuid}/documents/{documentId}'
*/
deleteDocument.delete = (args: { uuid: string | number, documentId: string | number } | [uuid: string | number, documentId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteDocument.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PortalRequestController::deleteDocument
* @see app/Http/Controllers/PortalRequestController.php:594
* @route '/portal-requests/api/{uuid}/documents/{documentId}'
*/
const deleteDocumentForm = (args: { uuid: string | number, documentId: string | number } | [uuid: string | number, documentId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteDocument.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PortalRequestController::deleteDocument
* @see app/Http/Controllers/PortalRequestController.php:594
* @route '/portal-requests/api/{uuid}/documents/{documentId}'
*/
deleteDocumentForm.delete = (args: { uuid: string | number, documentId: string | number } | [uuid: string | number, documentId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteDocument.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

deleteDocument.form = deleteDocumentForm

/**
* @see \App\Http\Controllers\PortalRequestController::getStatistics
* @see app/Http/Controllers/PortalRequestController.php:657
* @route '/portal-requests/api/statistics'
*/
export const getStatistics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStatistics.url(options),
    method: 'get',
})

getStatistics.definition = {
    methods: ["get","head"],
    url: '/portal-requests/api/statistics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortalRequestController::getStatistics
* @see app/Http/Controllers/PortalRequestController.php:657
* @route '/portal-requests/api/statistics'
*/
getStatistics.url = (options?: RouteQueryOptions) => {
    return getStatistics.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalRequestController::getStatistics
* @see app/Http/Controllers/PortalRequestController.php:657
* @route '/portal-requests/api/statistics'
*/
getStatistics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStatistics.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::getStatistics
* @see app/Http/Controllers/PortalRequestController.php:657
* @route '/portal-requests/api/statistics'
*/
getStatistics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStatistics.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PortalRequestController::getStatistics
* @see app/Http/Controllers/PortalRequestController.php:657
* @route '/portal-requests/api/statistics'
*/
const getStatisticsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getStatistics.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::getStatistics
* @see app/Http/Controllers/PortalRequestController.php:657
* @route '/portal-requests/api/statistics'
*/
getStatisticsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getStatistics.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::getStatistics
* @see app/Http/Controllers/PortalRequestController.php:657
* @route '/portal-requests/api/statistics'
*/
getStatisticsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getStatistics.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getStatistics.form = getStatisticsForm

const PortalRequestController = { index, show, create, store, edit, update, updateStatus, myRequests, getDocuments, addDocument, deleteDocument, getStatistics }

export default PortalRequestController