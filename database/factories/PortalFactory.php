<?php

namespace Database\Factories;

use App\Models\Portal;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Portal>
 */
class PortalFactory extends Factory
{
    protected $model = Portal::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company() . ' Portal',
            'description' => $this->faker->optional()->paragraph(),

            'owner_id' => User::query()->inRandomOrder()->value('id'),

            'url' => $this->faker->url(),
            'domain' => $this->faker->optional()->domainName(),

            'active' => $this->faker->boolean(90),

            'ip_address' => $this->faker->optional()->ipv4(),

            'status' => $this->faker->randomElement([
                'completed',
                'pending',
                'in-progress',
            ]),

            'server_backup' => $this->faker->boolean(30),
            'db_backup' => $this->faker->boolean(40),
            'migrate_to_new_server' => $this->faker->boolean(20),

            'vm_name' => $this->faker->optional()->bothify('vm-###'),
            'framework' => $this->faker->optional()->randomElement([
                'Laravel',
                'Express',
                'Django',
                'Spring Boot',
            ]),

            'framework_version' => $this->faker->optional()->randomFloat(2, 5, 12),
            'database' => $this->faker->optional()->randomElement([
                'MySQL',
                'PostgreSQL',
                'SQL Server',
                'Oracle',
            ]),
            'database_version' => $this->faker->optional()->randomFloat(2, 5, 15),

            'is_public' => $this->faker->boolean(25),

            'machine_type' => $this->faker->randomElement([
                'Windows',
                'RHEL',
                'Ubuntu',
                'CentOS',
                'Other',
                'Not-Defined',
            ]),
        ];
    }
}