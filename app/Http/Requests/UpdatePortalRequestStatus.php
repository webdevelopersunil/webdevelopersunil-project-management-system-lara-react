<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePortalRequestStatus extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'status' => 'required|in:Pending,Under Review,Approved,Rejected,Cancelled,Completed',
            'reason' => 'nullable|string|max:1000',
            'additional_comment' => 'nullable|string|max:500',
        ];
    }
}