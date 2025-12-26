<?php

namespace Database\Factories;

use App\Models\Portal;
use App\Models\PortalRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PortalRequestFactory extends Factory
{
    protected $model = PortalRequest::class;

    public function definition()
    {
        return [
            'portal_id' => Portal::factory(),
            'submitted_by' => User::factory(),
            'priority' => $this->faker->randomElement(['Low', 'Medium', 'High']),
            'status' => $this->faker->randomElement(['Pending', 'Under Review', 'Approved', 'Rejected']),
            'request_uuid' => $this->faker->uuid,
            'comments' => $this->faker->paragraph,
            'reason' => $this->faker->optional()->sentence,
            'reviewed_at' => $this->faker->optional()->dateTime,
            'reviewed_by' => $this->faker->optional()->randomElement(User::pluck('id')->toArray()),
        ];
    }
}