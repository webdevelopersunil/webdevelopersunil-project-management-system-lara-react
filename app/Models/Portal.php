<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\PortalCollaborator;

class Portal extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'portals';

    protected $fillable = [
        'name',
        'description',
        'owner_id',
        'url',
        'domain',
        'active',
        'ip_address',
        'status',
        'server_backup',
        'db_backup',
        'migrate_to_new_server',
        'vm_name',
        'framework',
        'framework_version',
        'database',
        'database_version',
        'is_public',
        'machine_type',
    ];

    protected $casts = [
        'active' => 'boolean',
        'server_backup' => 'boolean',
        'db_backup' => 'boolean',
        'migrate_to_new_server' => 'boolean',
        'framework_version' => 'double',
        'database_version' => 'double',

        'is_public' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
    
    public function collaborators()
    {
        return $this->hasMany(PortalCollaborator::class);
    }
    
    /**
     * Get the documents for the portal
     */
    public function documents()
    {
        return $this->hasMany(Document::class);
    }
    
}
