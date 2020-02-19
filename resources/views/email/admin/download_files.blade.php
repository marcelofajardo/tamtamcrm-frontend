@component('mail::layout')

 {{-- Header --}}
 @slot('header')
 @component('mail::header', ['url' => config('app.url')])
 Download
 @endcomponent
 @endslot

 {{-- Body --}}
 {{ $file_path }}

 {{-- Footer --}}
 @slot('footer')
 @component('mail::footer')
 © {{ date('Y') }} {{ config('taskmanager.app_name') }}.
 @endcomponent
 @endslot

 @endcomponent
