@component('email.components.layout')

    @slot('header')
        @component('email.components.header', ['p' => ''])
            @lang($title)
        @endcomponent
    @endslot

    @lang($message)

    @component('email.components.button', ['url' => $url])
        @lang($button)
    @endcomponent

    @slot('signature')
        {{ $signature }}
    @endslot

    @slot('footer')
        @component('email.components.footer', ['url' => 'https://tamtam.com', 'url_text' => '&copy; TamTam'])
            For any info, please visit TamTam.
        @endcomponent
    @endslot

@endcomponent
