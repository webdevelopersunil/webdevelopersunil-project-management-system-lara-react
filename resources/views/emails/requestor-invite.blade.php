<x-mail::message>
# You have been invited to join a Portal

You have been invited to join the Portal **{{ $portalName }}** as a Requestor.

Click the button below to register an account and start creating requests.

<x-mail::button :url="$registrationUrl">
Register as Requestor
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
