import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PortalRequestController::documents
* @see app/Http/Controllers/PortalRequestController.php:449
* @route '/portal-requests/api/{uuid}/documents'
*/
export const documents = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: documents.url(args, options),
    method: 'get',
})

documents.definition = {
    methods: ["get","head"],
    url: '/portal-requests/api/{uuid}/documents',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortalRequestController::documents
* @see app/Http/Controllers/PortalRequestController.php:449
* @route '/portal-requests/api/{uuid}/documents'
*/
documents.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return documents.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalRequestController::documents
* @see app/Http/Controllers/PortalRequestController.php:449
* @route '/portal-requests/api/{uuid}/documents'
*/
documents.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: documents.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::documents
* @see app/Http/Controllers/PortalRequestController.php:449
* @route '/portal-requests/api/{uuid}/documents'
*/
documents.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: documents.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PortalRequestController::documents
* @see app/Http/Controllers/PortalRequestController.php:449
* @route '/portal-requests/api/{uuid}/documents'
*/
const documentsForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: documents.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::documents
* @see app/Http/Controllers/PortalRequestController.php:449
* @route '/portal-requests/api/{uuid}/documents'
*/
documentsForm.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: documents.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::documents
* @see app/Http/Controllers/PortalRequestController.php:449
* @route '/portal-requests/api/{uuid}/documents'
*/
documentsForm.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: documents.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

documents.form = documentsForm

/**
* @see \App\Http\Controllers\PortalRequestController::addDocument
* @see app/Http/Controllers/PortalRequestController.php:500
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
* @see app/Http/Controllers/PortalRequestController.php:500
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
* @see app/Http/Controllers/PortalRequestController.php:500
* @route '/portal-requests/api/{uuid}/documents'
*/
addDocument.post = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addDocument.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PortalRequestController::addDocument
* @see app/Http/Controllers/PortalRequestController.php:500
* @route '/portal-requests/api/{uuid}/documents'
*/
const addDocumentForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addDocument.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PortalRequestController::addDocument
* @see app/Http/Controllers/PortalRequestController.php:500
* @route '/portal-requests/api/{uuid}/documents'
*/
addDocumentForm.post = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addDocument.url(args, options),
    method: 'post',
})

addDocument.form = addDocumentForm

/**
* @see \App\Http\Controllers\PortalRequestController::deleteDocument
* @see app/Http/Controllers/PortalRequestController.php:562
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
* @see app/Http/Controllers/PortalRequestController.php:562
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
* @see app/Http/Controllers/PortalRequestController.php:562
* @route '/portal-requests/api/{uuid}/documents/{documentId}'
*/
deleteDocument.delete = (args: { uuid: string | number, documentId: string | number } | [uuid: string | number, documentId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteDocument.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PortalRequestController::deleteDocument
* @see app/Http/Controllers/PortalRequestController.php:562
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
* @see app/Http/Controllers/PortalRequestController.php:562
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
* @see \App\Http\Controllers\PortalRequestController::statistics
* @see app/Http/Controllers/PortalRequestController.php:625
* @route '/portal-requests/api/statistics'
*/
export const statistics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(options),
    method: 'get',
})

statistics.definition = {
    methods: ["get","head"],
    url: '/portal-requests/api/statistics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortalRequestController::statistics
* @see app/Http/Controllers/PortalRequestController.php:625
* @route '/portal-requests/api/statistics'
*/
statistics.url = (options?: RouteQueryOptions) => {
    return statistics.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortalRequestController::statistics
* @see app/Http/Controllers/PortalRequestController.php:625
* @route '/portal-requests/api/statistics'
*/
statistics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::statistics
* @see app/Http/Controllers/PortalRequestController.php:625
* @route '/portal-requests/api/statistics'
*/
statistics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statistics.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PortalRequestController::statistics
* @see app/Http/Controllers/PortalRequestController.php:625
* @route '/portal-requests/api/statistics'
*/
const statisticsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: statistics.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::statistics
* @see app/Http/Controllers/PortalRequestController.php:625
* @route '/portal-requests/api/statistics'
*/
statisticsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: statistics.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortalRequestController::statistics
* @see app/Http/Controllers/PortalRequestController.php:625
* @route '/portal-requests/api/statistics'
*/
statisticsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: statistics.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

statistics.form = statisticsForm

const api = {
    documents: Object.assign(documents, documents),
    addDocument: Object.assign(addDocument, addDocument),
    deleteDocument: Object.assign(deleteDocument, deleteDocument),
    statistics: Object.assign(statistics, statistics),
}

export default api