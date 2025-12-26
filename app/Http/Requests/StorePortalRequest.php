<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePortalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'portal_id' => 'required|exists:portals,id',
            'priority' => 'nullable|in:Low,Medium,High',
            'comments' => 'required|string|min:10|max:2000',
            'documents' => 'nullable|array',
            'documents.*' => 'file|max:10240|mimes:pdf,doc,docx,xls,xlsx,jpg,jpeg,png,txt',
        ];
    }

    public function messages(): array
    {
        return [
            'portal_id.required' => 'Please select a portal.',
            'portal_id.exists' => 'The selected portal does not exist.',
            'priority.in' => 'Priority must be Low, Medium, or High.',
            'comments.required' => 'Please provide comments for the request.',
            'comments.min' => 'Comments must be at least 10 characters.',
            'comments.max' => 'Comments must not exceed 2000 characters.',
            'documents.*.max' => 'Each document must not exceed 10MB.',
            'documents.*.mimes' => 'Allowed document types: pdf, doc, docx, xls, xlsx, jpg, jpeg, png, txt.',
        ];
    }
}