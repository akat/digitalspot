<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class WebsiteIntegrationAdminSeeder extends Seeder
{
    public function run(): void
    {
        $email = (string) env('CRM_ADMIN_EMAIL', 'admin@digitalspot.local');
        $password = (string) env('CRM_ADMIN_PASSWORD', '');

        if ($password === '') {
            throw new \RuntimeException('CRM_ADMIN_PASSWORD must be configured.');
        }

        User::query()->firstOrCreate(
            ['email' => $email],
            [
                'name' => (string) env('CRM_ADMIN_NAME', 'Digital Spot'),
                'password' => Hash::make($password),
            ],
        );
    }
}
