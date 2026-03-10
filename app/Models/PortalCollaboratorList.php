<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortalCollaboratorList extends Model
{
    protected $fillable = [
        'portal_request_id',
        'document_id',
        'text',
        'submitted_by',
    ];

    public function portalRequest()
    {
        return $this->belongsTo(PortalRequest::class);
    }

    public function document()
    {
        return $this->belongsTo(PortalRequestDocument::class);
    }

    public function submitter()
    {
        return $this->belongsTo(User::class, 'submitted_by');
    }
}
