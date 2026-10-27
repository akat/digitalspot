<?php

use App\Enums\LeadSource;
use App\Models\Account;
use App\Models\Contact;
use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rule;

Route::post('/website/leads', function (Request $request) {
    $expectedToken = (string) config('website-leads.token', '');
    $providedToken = (string) $request->header('X-Website-CRM-Token', '');

    if ($expectedToken === '' || !hash_equals($expectedToken, $providedToken)) {
        abort(401, 'Unauthorized.');
    }

    $validated = $request->validate([
        'name' => ['required', 'string', 'min:2', 'max:160'],
        'email' => ['required', 'email', 'max:254'],
        'phone' => ['nullable', 'string', 'max:40'],
        'company' => ['nullable', 'string', 'max:160'],
        'interest' => [
            'required',
            'string',
            Rule::in([
                'website',
                'eshop',
                'mobile-app',
                'custom-platform',
                'ai-automation',
                'brand-design',
                'seo-growth',
                'other',
            ]),
        ],
        'message' => ['required', 'string', 'min:10', 'max:10000'],
    ]);

    $interestLabels = [
        'website' => 'Ιστοσελίδα',
        'eshop' => 'Ηλεκτρονικό κατάστημα',
        'mobile-app' => 'Εφαρμογή κινητού',
        'custom-platform' => 'Προσαρμοσμένη πλατφόρμα',
        'ai-automation' => 'AI και αυτοματισμοί',
        'brand-design' => 'Σχεδιασμός και ταυτότητα',
        'seo-growth' => 'SEO και ανάπτυξη',
        'other' => 'Άλλο',
    ];

    $lead = DB::transaction(function () use ($validated, $interestLabels) {
        $account = Account::query()->firstOrCreate(
            ['email' => $validated['email']],
            [
                'name' => $validated['company'] ?: $validated['name'],
                'phone' => $validated['phone'] ?? null,
            ],
        );

        if ($validated['company'] && $account->name !== $validated['company']) {
            $account->name = $validated['company'];
            $account->save();
        }

        $contact = Contact::query()->firstOrNew([
            'email' => $validated['email'],
            'account_id' => $account->id,
        ]);
        $contact->name = $validated['name'];
        $contact->phone = $validated['phone'] ?? null;
        $contact->save();

        $interest = $interestLabels[$validated['interest']];
        $description = implode("\n", [
            "Υπηρεσία ενδιαφέροντος: {$interest}",
            "Όνομα: {$validated['name']}",
            "Email: {$validated['email']}",
            'Τηλέφωνο: '.($validated['phone'] ?? 'Δεν δόθηκε'),
            'Επιχείρηση: '.($validated['company'] ?? 'Δεν δόθηκε'),
            '',
            'Μήνυμα:',
            $validated['message'],
        ]);

        return Lead::query()->create([
            'title' => "Νέο αίτημα · {$interest}",
            'customer_id' => $account->id,
            'source' => LeadSource::Web->value,
            'description' => $description,
        ]);
    });

    return response()->json(['id' => $lead->id], 201);
})->middleware('throttle:20,1');
