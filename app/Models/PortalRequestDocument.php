<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PortalRequestDocument extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'portal_request_id',
        'name',
        'path',
        'original_name',
        'mime_type',
        'size',
        'extension',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'size' => 'integer',
    ];

    /**
     * Get the portal request associated with the document.
     */
    public function portalRequest()
    {
        return $this->belongsTo(PortalRequest::class);
    }

    /**
     * Get the document URL.
     */
    public function getUrlAttribute()
    {
        return asset('storage/' . $this->path);
    }

    /**
     * Get the document formatted size.
     */
    public function getFormattedSizeAttribute()
    {
        if ($this->size >= 1073741824) {
            return number_format($this->size / 1073741824, 2) . ' GB';
        } elseif ($this->size >= 1048576) {
            return number_format($this->size / 1048576, 2) . ' MB';
        } elseif ($this->size >= 1024) {
            return number_format($this->size / 1024, 2) . ' KB';
        } else {
            return $this->size . ' bytes';
        }
    }
}